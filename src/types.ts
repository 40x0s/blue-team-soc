export interface Section {
  id: string;
  title: string;
  icon: string;
}

export interface LabStep {
  step: number;
  command?: string;
  description: string;
  expected?: string;
  /** تفسير ما يتعلمه الطالب من الخطوة، وليس وصف الزر فقط. */
  why?: string;
  /** تحذير خاص بالخطوة إذا كانت تغيّر النظام أو تولّد نشاطًا هجوميًا. */
  caution?: string;
}

export interface Lab {
  id: string;
  title: string;
  objective: string;
  tools: string[];
  steps: LabStep[];
  deliverable: string;
  filters?: string[];
  prerequisites?: string[];
  evidence?: string[];
  cleanup?: string;
  estimatedMinutes?: number;
  safety?: string;
}
