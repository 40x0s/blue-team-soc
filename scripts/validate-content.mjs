import fs from 'node:fs';
import path from 'node:path';
import { createServer } from 'vite';

const root = process.cwd();
const errors = [];
const assert = (condition, message) => {
  if (!condition) errors.push(message);
};

const server = await createServer({
  server: { middlewareMode: true },
  appType: 'custom',
  logLevel: 'error',
});
const loadTypeScriptModule = relativePath => server.ssrLoadModule(`/${relativePath}`);

const quizData = await loadTypeScriptModule('src/data/quizData.ts');
const quizNames = ['networkingQuiz', 'linuxQuiz', 'windowsQuiz', 'socQuiz'];
let totalQuestionCount = 0;
for (const quizName of quizNames) {
  const questions = quizData[quizName];
  assert(Array.isArray(questions), `${quizName}: export is not an array`);
  if (!Array.isArray(questions)) continue;
  assert(questions.length === 25, `${quizName}: expected 25 questions, found ${questions.length}`);
  const localIds = new Set();
  questions.forEach((question, index) => {
    const label = `${quizName}[${index}]`;
    assert(Number.isInteger(question.id), `${label}: id must be an integer`);
    assert(!localIds.has(question.id), `${quizName}: duplicate id ${question.id}`);
    localIds.add(question.id);
    totalQuestionCount += 1;
    assert(typeof question.question === 'string' && question.question.trim().length > 0, `${label}: missing English question`);
    assert(typeof question.questionAr === 'string' && question.questionAr.trim().length > 0, `${label}: missing Arabic question`);
    assert(Array.isArray(question.options) && question.options.length >= 2, `${label}: needs at least two options`);
    if (Array.isArray(question.options)) {
      const normalized = question.options.map(option => String(option).trim().toLocaleLowerCase('en'));
      assert(new Set(normalized).size === normalized.length, `${label}: duplicate options`);
      assert(Number.isInteger(question.correct) && question.correct >= 0 && question.correct < question.options.length, `${label}: correct index is out of range`);
    }
    assert(typeof question.explanation === 'string' && question.explanation.trim().length > 0, `${label}: missing explanation`);
  });
}
assert(totalQuestionCount === 100, `quiz data: expected 100 questions, found ${totalQuestionCount}`);

const sections = await loadTypeScriptModule('src/data/sections.ts');
const appSource = fs.readFileSync(path.join(root, 'src/App.tsx'), 'utf8');
const courseContracts = {
  foundation: { exportName: 'foundationSections', mapName: null },
  networking: { exportName: 'networkSections', mapName: 'netMap' },
  linux: { exportName: 'linuxSections', mapName: 'linuxMap' },
  windows: { exportName: 'windowsSections', mapName: 'winMap' },
  soc: { exportName: 'socSections', mapName: 'socMap' },
  projects: { exportName: 'projectsSections', mapName: 'projMap' },
  quizzes: { exportName: 'quizSections', mapName: 'quizMap' },
  career: { exportName: 'careerSections', mapName: 'careerMap' },
};

const mapKeys = mapName => {
  const marker = `const ${mapName}:`;
  const start = appSource.indexOf(marker);
  assert(start >= 0, `App.tsx: ${mapName} not found`);
  if (start < 0) return [];
  const bodyStart = appSource.indexOf('{', start);
  const bodyEnd = appSource.indexOf('\n    };', bodyStart);
  assert(bodyEnd >= 0, `App.tsx: could not find end of ${mapName}`);
  if (bodyEnd < 0) return [];
  const body = appSource.slice(bodyStart + 1, bodyEnd);
  const keys = [];
  const pattern = /(?:^|,)\s*(?:'([^']+)'|([A-Za-z][\w-]*))\s*:/g;
  let match;
  while ((match = pattern.exec(body))) keys.push(match[1] ?? match[2]);
  return keys;
};

for (const [course, contract] of Object.entries(courseContracts)) {
  const sectionList = sections[contract.exportName];
  assert(Array.isArray(sectionList), `${contract.exportName}: export is not an array`);
  if (!Array.isArray(sectionList)) continue;
  const ids = sectionList.map(section => section.id);
  assert(new Set(ids).size === ids.length, `${contract.exportName}: duplicate section id`);
  sectionList.forEach((section, index) => {
    assert(typeof section.id === 'string' && section.id.length > 0, `${contract.exportName}[${index}]: missing id`);
    assert(typeof section.title === 'string' && section.title.length > 0, `${contract.exportName}[${index}]: missing title`);
  });
  const rendered = contract.mapName ? mapKeys(contract.mapName) : ['start-here', 'lab-setup'];
  const missing = ids.filter(id => !rendered.includes(id));
  const orphaned = rendered.filter(id => !ids.includes(id));
  assert(missing.length === 0, `${course}: sections without renderer: ${missing.join(', ')}`);
  assert(orphaned.length === 0, `${course}: renderers missing from navigation: ${orphaned.join(', ')}`);
}

const labContracts = [
  ['networking', 'src/data/labs.ts', 'labs'],
  ['linux', 'src/data/linuxLabs.ts', 'linuxLabs'],
  ['windows', 'src/data/windowsLabs.ts', 'windowsLabs'],
  ['soc', 'src/data/socLabs.ts', 'socLabs'],
];
const labMapStart = appSource.indexOf('const labMap:');
const labMapEnd = appSource.indexOf('\n  };', labMapStart);
const labMapBody = appSource.slice(labMapStart, labMapEnd);
for (const [course, file, exportName] of labContracts) {
  const labs = (await loadTypeScriptModule(file))[exportName];
  assert(Array.isArray(labs), `${exportName}: export is not an array`);
  if (!Array.isArray(labs)) continue;
  const dataIds = labs.map(lab => lab.id);
  assert(new Set(dataIds).size === dataIds.length, `${exportName}: duplicate lab id`);
  labs.forEach((lab, labIndex) => {
    const label = `${exportName}[${labIndex}]`;
    for (const field of ['id', 'title', 'objective', 'deliverable', 'cleanup', 'safety']) {
      assert(typeof lab[field] === 'string' && lab[field].trim().length > 0, `${label}: missing ${field}`);
    }
    for (const field of ['tools', 'prerequisites', 'evidence']) {
      assert(Array.isArray(lab[field]) && lab[field].length > 0, `${label}: ${field} must be a non-empty array`);
    }
    assert(Number.isInteger(lab.estimatedMinutes) && lab.estimatedMinutes > 0, `${label}: estimatedMinutes must be positive`);
    assert(Array.isArray(lab.steps) && lab.steps.length > 0, `${label}: steps must be a non-empty array`);
    if (Array.isArray(lab.steps)) {
      const stepNumbers = lab.steps.map(step => step.step);
      assert(new Set(stepNumbers).size === stepNumbers.length, `${label}: duplicate step number`);
      assert(stepNumbers.every((step, index) => step === index + 1), `${label}: step numbers must be contiguous from 1`);
      lab.steps.forEach((step, stepIndex) => {
        assert(typeof step.description === 'string' && step.description.trim().length > 0, `${label}.steps[${stepIndex}]: missing description`);
        assert(typeof step.expected === 'string' && step.expected.trim().length > 0, `${label}.steps[${stepIndex}]: missing expected result`);
      });
    }
  });
  const match = labMapBody.match(new RegExp(`${course}:\\s*\\[([^\\]]*)\\]`));
  assert(Boolean(match), `App.tsx labMap: ${course} entry missing`);
  if (!match) continue;
  const navigationIds = [...match[1].matchAll(/'([^']+)'/g)].map(item => item[1]);
  const missing = dataIds.filter(id => !navigationIds.includes(id));
  const orphaned = navigationIds.filter(id => !dataIds.includes(id));
  assert(missing.length === 0, `${course} labs missing from labMap: ${missing.join(', ')}`);
  assert(orphaned.length === 0, `${course} labMap ids without data: ${orphaned.join(', ')}`);
}

const projectModule = await loadTypeScriptModule('src/content/projects/ProjectsDetailedSection.tsx');
const projects = projectModule.projects;
assert(Array.isArray(projects) && projects.length === 10, `portfolio: expected 10 projects, found ${projects?.length ?? 0}`);
if (Array.isArray(projects)) {
  const projectNumbers = projects.map(project => project.num);
  assert(new Set(projectNumbers).size === projectNumbers.length, 'portfolio: duplicate project number');
  assert(projectNumbers.every((number, index) => number === index + 1), 'portfolio: project numbers must be contiguous from 1');
  projects.forEach((project, index) => {
    const label = `projects[${index}]`;
    for (const field of ['title', 'goal', 'estimated', 'safety', 'reportTemplate']) {
      assert(typeof project[field] === 'string' && project[field].trim().length > 0, `${label}: missing ${field}`);
    }
    for (const field of ['requirements', 'steps', 'deliverables', 'acceptanceCriteria']) {
      assert(Array.isArray(project[field]) && project[field].length > 0, `${label}: ${field} must be a non-empty array`);
    }
    project.steps?.forEach((step, stepIndex) => {
      assert(typeof step.title === 'string' && step.title.trim().length > 0, `${label}.steps[${stepIndex}]: missing title`);
      assert(typeof step.code === 'string' && step.code.trim().length > 0, `${label}.steps[${stepIndex}]: missing code`);
    });
  });
}

const projectSource = fs.readFileSync(path.join(root, 'src/content/projects/ProjectsDetailedSection.tsx'), 'utf8');
const wazuhStart = projectSource.indexOf("title: 'Wazuh 4.14 End-to-End Validation'");
const wazuhEnd = projectSource.indexOf('num: 5,', wazuhStart);
const wazuhProject = projectSource.slice(wazuhStart, wazuhEnd);
for (const token of ['lab_event', 'PIPELINE_TEST', 'test_id', 'WAZUH-E2E-001', 'rule.id:100100', 'data.run']) {
  assert(wazuhProject.includes(token), `Wazuh project contract: missing ${token}`);
}
assert(!wazuhProject.includes('case_id'), 'Wazuh project contract: stale case_id field remains');
assert(!wazuhProject.includes('soc_lab":"true'), 'Wazuh project contract: stale soc_lab field remains');

const sourceFiles = directory => fs.readdirSync(directory, { withFileTypes: true }).flatMap(entry => {
  const absolute = path.join(directory, entry.name);
  return entry.isDirectory() ? sourceFiles(absolute) : [absolute];
});
for (const filename of sourceFiles(path.join(root, 'src')).filter(file => /\.(?:ts|tsx)$/.test(file))) {
  const relative = path.relative(root, filename);
  const source = fs.readFileSync(filename, 'utf8');
  assert(!source.includes('�'), `${relative}: Unicode replacement character found`);
  source.split('\n').forEach((line, index) => {
    const trailingSlashes = line.match(/\\+$/)?.[0].length ?? 0;
    assert(trailingSlashes % 2 === 0, `${relative}:${index + 1}: shell continuation must be escaped inside the TypeScript string`);
  });
}

await server.close();

if (errors.length > 0) {
  console.error(`Content validation failed with ${errors.length} error(s):`);
  errors.forEach(error => console.error(`- ${error}`));
  process.exit(1);
}

console.log('Content validation passed: 100 quiz questions, navigation, 21 labs, 10 projects, escaping, and Wazuh contract.');
