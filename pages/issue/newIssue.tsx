import React, { Component } from "react";
import Router from "next/router";
import { observable, action } from "mobx";
import { observer, inject } from "mobx-react";
import { toast } from "react-toastify";
import { Navigation, IssueNewIssue } from "../../components";
import Issue from "../../store/issue";

interface Props {
  issue: Issue;
  id: string;
}

@inject("issue")
@observer
class newIssue extends Component<Props> {
  @observable title = "";
  @observable content = "";
  @action
  static async getInitialProps({ query }) {
    return query;
  }
  onChange = (e: any) => {
    this[e.target.id] = e.target.value;
  };

  onChangeQuill = data => {
    this.content = data;
  };

  onAddIssue = () => {
    const { issue, id } = this.props;
    const { title, content } = this;

    if (title.length < 1) return toast.error("제목을 입력해주세요");
    if (content.length < 1) return toast.error("내용을 입력해주세요");

    return issue
      .createNewIssue(title, content, id)
      .then(() => {
        toast.success("이슈가 등록되었습니다");
        Router.push(`/project/detail/${id}`);
      })
      .catch(code => {
        const errMsg: Array<string> = [
          "",
          "로그인해주세요",
          "다시 입력해주세요",
          "없어진 프로젝트입니다",
          "권한이 없습니다."
        ];
        return toast.error(errMsg[code]);
      });
  };
  render() {
    return (
      <div>
        <Navigation />
        <IssueNewIssue
          onChange={this.onChange}
          onChangeQuill={this.onChangeQuill}
          onAddIssue={this.onAddIssue}
        />
      </div>
    );
  }
}
export default newIssue;
