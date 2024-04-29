// goalReducer.ts

import { Step } from "./../../types/goal";

interface RoadmapState {
  steps: Step[];
}

const initialState: RoadmapState = {
  steps: [],
};

const goalReducer = (
  state: RoadmapState = initialState,
  action: any
): RoadmapState => {
  switch (action.type) {
    case "SAVE_STEPS":
      return {
        ...state,
        steps: action.payload,
      };
    case "UPDATE_STEP_COMPLETION":
      return {
        ...state,
        steps: state.steps.map((step, index) =>
          index === action.payload.index
            ? { ...step, completed: action.payload.completed }
            : step
        ),
      };

    default:
      return state;
  }
};

export default goalReducer;
