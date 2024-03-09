import {
  SET_TOKEN,
  REMOVE_TOKEN,
  SET_ID,
  SET_ROLE,
} from "../actions/authAction";

interface InitialState {
  token: string | null;
  id: string | null;
  role: string | null;
}

const initialState: InitialState = {
  token: null,
  id: null,
  role: null,
};

const authReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case SET_TOKEN:
      return {
        ...state,
        token: action.payload,
      };
    case SET_ROLE:
      return {
        ...state,
        role: action.payload,
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
