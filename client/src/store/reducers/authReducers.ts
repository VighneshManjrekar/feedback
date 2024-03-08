import { SET_TOKEN, REMOVE_TOKEN } from "../actions/authAction"

interface InitialState {
  token: string | null;
}

const initialState: InitialState = {
  token: null,
};

const authReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case SET_TOKEN:
      return {
        ...state,
        token: action.payload,
      };
    case REMOVE_TOKEN:
      return {
        ...state,
        token: null,
      };
    default:
      return state;
  }
};

export default authReducer;
