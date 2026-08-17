import fs from 'node:fs';
import path from 'node:path';
import React from 'react';
import { renderToString } from 'react-dom/server';
import { createServer } from 'vite';

const root = process.cwd();
const contentRoot = path.join(root, 'src/content');
const propDrivenModules = new Set([
  '/src/content/LabPage.tsx',
  '/src/content/linux/LinuxLabPage.tsx',
  '/src/content/windows/WindowsLabPage.tsx',
  '/src/content/soc/SocLabPage.tsx',
  '/src/content/quiz/QuizPage.tsx',
]);

const walk = directory => fs.readdirSync(directory, { withFileTypes: true }).flatMap(entry => {
  const absolute = path.join(directory, entry.name);
  return entry.isDirectory() ? walk(absolute) : [absolute];
});

const modulePaths = walk(contentRoot)
  .filter(filename => filename.endsWith('.tsx'))
  .map(filename => `/${path.relative(root, filename).replaceAll(path.sep, '/')}`)
  .filter(filename => !propDrivenModules.has(filename));

const server = await createServer({
  server: { middlewareMode: true },
  appType: 'custom',
  logLevel: 'error',
});

let renderedCount = 0;
const renderCase = (Component, props, label) => {
  const html = renderToString(React.createElement(Component, props));
  if (html.length < 50) throw new Error(`${label}: suspiciously empty render`);
  if (html.includes('NaN%')) throw new Error(`${label}: rendered NaN percentage`);
  for (const malformedPath of ['C:SOC-Lab', 'SystemRootSystem32', 'HKLM:SOFTWARE']) {
    if (html.includes(malformedPath)) throw new Error(`${label}: malformed escaped path ${malformedPath}`);
  }
  for (const [tableIndex, tableHtml] of [...html.matchAll(/<table\b[\s\S]*?<\/table>/g)].map(match => match[0]).entries()) {
    const headerCount = (tableHtml.match(/<th\b/g) ?? []).length;
    const bodyRows = [...tableHtml.matchAll(/<tr\b[\s\S]*?<\/tr>/g)]
      .map(match => match[0])
      .filter(row => row.includes('<td'));
    for (const [rowIndex, rowHtml] of bodyRows.entries()) {
      const cellCount = (rowHtml.match(/<td\b/g) ?? []).length;
      if (cellCount !== headerCount) {
        throw new Error(`${label}: table ${tableIndex + 1}, body row ${rowIndex + 1} has ${cellCount} cells for ${headerCount} headers`);
      }
    }
  }
  renderedCount += 1;
  return html;
};

try {
  const { default: App } = await server.ssrLoadModule('/src/App.tsx');
  const appHtml = renderCase(App, {}, 'App initial route');
  if (!appHtml.includes('ابدأ هنا') || !appHtml.includes('SOC Training')) {
    throw new Error('App initial route: expected navigation markers are missing');
  }

  for (const modulePath of modulePaths) {
    const loaded = await server.ssrLoadModule(modulePath);
    const components = Object.entries(loaded).filter(([, value]) => typeof value === 'function');
    if (components.length === 0) throw new Error(`${modulePath}: no exported component function`);
    for (const [exportName, Component] of components) {
      renderCase(Component, {}, `${modulePath}#${exportName}`);
    }
  }

  const labCases = [
    ['/src/content/LabPage.tsx', '/src/data/labs.ts', 'labs'],
    ['/src/content/linux/LinuxLabPage.tsx', '/src/data/linuxLabs.ts', 'linuxLabs'],
    ['/src/content/windows/WindowsLabPage.tsx', '/src/data/windowsLabs.ts', 'windowsLabs'],
    ['/src/content/soc/SocLabPage.tsx', '/src/data/socLabs.ts', 'socLabs'],
  ];
  for (const [pagePath, dataPath, exportName] of labCases) {
    const { default: LabPage } = await server.ssrLoadModule(pagePath);
    const data = await server.ssrLoadModule(dataPath);
    for (const lab of data[exportName]) renderCase(LabPage, { labId: lab.id }, `${pagePath}:${lab.id}`);
  }

  const { default: QuizPage } = await server.ssrLoadModule('/src/content/quiz/QuizPage.tsx');
  const quizData = await server.ssrLoadModule('/src/data/quizData.ts');
  for (const quizName of ['networkingQuiz', 'linuxQuiz', 'windowsQuiz', 'socQuiz']) {
    renderCase(QuizPage, { title: quizName, icon: '🧪', questions: quizData[quizName] }, `QuizPage:${quizName}`);
  }
  const emptyQuizHtml = renderCase(QuizPage, { title: 'empty', icon: '🧪', questions: [] }, 'QuizPage:empty');
  if (!emptyQuizHtml.includes('لا توجد أسئلة متاحة')) throw new Error('QuizPage: empty-state marker missing');

  console.log(`SSR smoke passed: ${renderedCount} route/component renders.`);
} finally {
  await server.close();
}
