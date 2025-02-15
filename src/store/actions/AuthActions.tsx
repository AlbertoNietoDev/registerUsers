import { authConstants } from "../constants/AuthConstants.tsx";

interface IAuthAction {
  token: string;
  verified: string;
  uid: string;
  email: string;
}

export const Auth = (data: IAuthAction) => {
  return {
    type: authConstants.AUTH_SUCCESS,
    payload: data,
  };
};
