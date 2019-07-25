import { observable, action, runInAction } from "mobx";
import axios from "axios";

const APIBASE = "/api/issue";
const API = {
  listIssue: APIBASE + "/list",
  newIssue: APIBASE + "/new",
  detailIssue: APIBASE + "/detail"
};

export interface IIssue {
  _id: string;
  title: string;
  content: string;
  viewCount: number;
  open: boolean;
}

export default class issue {
  @observable issues: Array<IIssue> = [];
  @observable detailIssue: IIssue = {
    _id: "",
    title: "로딩중",
    content: "로딩중",
    viewCount: 0,
    open: true
  };

  @action getIssues = async (id: string) => {
    const result = await axios.get(API.listIssue + "/" + id);

    if (result.data.code) throw result.data.code;

    runInAction(() => {
      this.issues = result.data;
    });

    return this.issues;
  };

  @action getDetailIssue = async (id: string) => {
    const result = await axios.get(API.detailIssue + "/" + id);

    if (result.data.code) throw result.data.code;

    runInAction(() => {
      this.detailIssue = result.data;
    });

    return this.detailIssue;
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
