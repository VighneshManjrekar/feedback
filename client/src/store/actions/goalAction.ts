import { Step } from "./../../types/goal";

export const SAVE_STEPS = "SAVE_STEPS";
export const UPDATE_STEP_COMPLETION = "UPDATE_STEP_COMPLETION";

export const saveSteps = (steps: Step[]) => {
  const stepsWithCompletion = steps.map((step) => ({
    ...step,
    completed: false,
  }));
  return {
    type: SAVE_STEPS,
    payload: stepsWithCompletion,
  };
};

export const updateStepCompletion = (steps: Step[]) => ({
  type: UPDATE_STEP_COMPLETION,
  payload: steps,
});
