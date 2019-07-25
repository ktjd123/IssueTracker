import { observable, action, runInAction } from "mobx";
import axios from "axios";

const API = "/api/auth";

enum roleEnum {
  Admin,
  User
}

export interface authInterface {
  _id: string;
  id: string;
  role: roleEnum;
}

export default class auth {
  @observable auth: authInterface | undefined;
  @observable searchedAccounts: Array<authInterface> = [];

  @action searchUsers = async (id: string) => {
    const result = await axios.get(API + "/search/" + id);

    runInAction(() => {
      this.searchedAccounts = result.data;
    });

    return this.searchUsers;
  };

  @action check = async (renew = false) => {
    if (renew === false && typeof this.auth !== "undefined") return this.auth;

    const result = await axios.get(`${API}/check`);

    if (result.data.code) throw result.data.code;

    runInAction(() => {
      this.auth = result.data;
    });

    return this.auth;
  };

  @action login = async (id: string, pw: string) => {
    const result = await axios.post(`${API}/login`, { id, pw });
    if (result.data.code) throw result.data.code;

    this.check(true);

    return true;
  };

  @action register = async (id: string, pw: string) => {
    const result = await axios.post(`${API}/register`, { id, pw });
    if (result.data.code) throw result.data.code;

    return true;
  };
}
