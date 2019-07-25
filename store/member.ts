import { observable, action, runInAction } from "mobx";
import axios from "axios";

const APIHOST = "/api/member";

const API = {
  addNewMember: APIHOST + "/addNewMember"
};

export default class member {
  @action addNewMember = async (newMember: string, project: string) => {
    const result = await axios.post(API.addNewMember, { newMember, project });

    if (result.data.code) throw result.data.code;

    return true;
  };
}
