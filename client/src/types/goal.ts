export interface goalData {
  success: boolean;
  stage: goalStage[];
}

export interface goalStage {
  title: string;
  totalTime: string;
  role: string;
  steps: Step[];
}

export interface Step {
  step: string;
  time: string;
  completed: boolean;
}
