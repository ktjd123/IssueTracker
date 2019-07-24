import { observable, action, runInAction } from "mobx";
import axios from "axios";

const APIBASE = "/api/project";

const API = {
  newProject: APIBASE + "/new"
};

export default class project {
  @action createNewProject = async (title: string) => {
    const result = await axios.post(API.newProject, { title });

    if (result.data.code) throw result.data.code;

    return true;
  };
}
