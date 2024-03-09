import { SET_RESUME } from "../actions/profileAction";

interface InitialState {
  resume: string | null;
}

const initialState: InitialState = {
  resume: null,
};

const profileReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case SET_RESUME:
      return {
        ...state,
        token: action.payload,
      };

    default:
      return state;
  }
};


export default profileReducer;
