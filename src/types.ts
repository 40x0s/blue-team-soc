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
}

export interface Lab {
  id: string;
  title: string;
  objective: string;
  tools: string[];
  steps: LabStep[];
  deliverable: string;
  filters?: string[];
}
