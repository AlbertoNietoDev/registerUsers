import { authConstants } from "../constants/AuthConstants.tsx";

const initialState = {
  loading: false,
  error: null,
  items: null,
};
interface IAction {
  type: string;
  payload: any;
}

export const AuthReducer = (state = initialState, action: IAction) => {
  if (action.type == authConstants.AUTH_SUCCESS) {
    return {
      ...state,
      items: action.payload,
    };
  } else {
    return state; //Retornar state vacío o actual
  }
};
