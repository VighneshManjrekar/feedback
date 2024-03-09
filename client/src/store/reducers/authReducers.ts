import { SET_TOKEN, REMOVE_TOKEN, SET_ID } from "../actions/authAction";

interface InitialState {
  token: string | null;
  id: string | null;
}

const initialState: InitialState = {
  token: null,
  id: null,
};

const authReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case SET_TOKEN:
      return {
        ...state,
        token: action.payload,
      };
    case SET_ID:
      return {
        ...state,
        id: action.payload,
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
