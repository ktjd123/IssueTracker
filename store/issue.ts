import { observable, action, runInAction } from "mobx";
import axios from "axios";

const APIBASE = "/api/issue";
const API = {
  listIssue: APIBASE + "/list",
  newIssue: APIBASE + "/new"
};

interface Issue {
  _id: string;
  title: string;
  content: string;
  viewCount: number;
  open: boolean;
}

export default class issue {
  @observable issues: Array<Issue> = [];

  @action getIssues = async (id: string) => {
    const result = await axios.get(API.listIssue + "/" + id);

    if (result.data.code) throw result.data.code;

    runInAction(() => {
      this.issues = result.data;
    });

    return this.issues;
  };

  @action createNewIssue = async (
    title: string,
    content: string,
    project: string
  ) => {
    const result = await axios.post(API.newIssue, { title, content, project });

    if (result.data.code) throw result.data.code;

    return result.data;
  };
}
