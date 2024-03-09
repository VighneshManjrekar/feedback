export const SET_TOKEN = "SET_TOKEN";
export const REMOVE_TOKEN = "REMOVE_TOKEN";
export const SET_ID = "SET_ID";

export const setToken = (token: string) => ({
  type: SET_TOKEN,
  payload: token,
});

export const setId = (id: string) => ({
  type: SET_ID,
  payload: id,
});

export const removeToken = () => ({
  type: REMOVE_TOKEN,
});
