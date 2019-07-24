import { observable, action, runInAction } from "mobx";
import axios from "axios";

const APIBASE = "/api/project";

const API = {
  getProjects: APIBASE + "/list",
  newProject: APIBASE + "/new"
};

interface Iproject {
  _id: string;
  title: string;
  ing: boolean;
  issueCount: number;
}

export default class project {
  @observable projects: Array<Iproject> = [];

  @action getProjects = async () => {
    const result = await axios.get(API.getProjects);

    if (result.data.code) throw result.data.code;

    runInAction(() => {
      this.projects = result.data;
    });

    return this.projects;
  };

  @action createNewProject = async (title: string) => {
    const result = await axios.post(API.newProject, { title });

    if (result.data.code) throw result.data.code;

    return true;
  };
}
