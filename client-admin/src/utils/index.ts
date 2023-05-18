import { AppConstant } from "../const";
import Cookies from "js-cookie";

export const hasLogin = (): boolean => Boolean(Cookies.get(AppConstant.KEY_TOKEN));

export const handlingLogin = (data: any): void => {
  Cookies.set(AppConstant.KEY_TOKEN, data.accessToken);
  Cookies.set(AppConstant.KEY_USER_ID, data.userId);
  Cookies.set(AppConstant.KEY_ROLE, data.role);
};

export const handlingLogout = (): void => {
  Cookies.remove(AppConstant.KEY_TOKEN);
  Cookies.remove(AppConstant.KEY_USER_ID);
  Cookies.remove(AppConstant.KEY_ROLE);
};