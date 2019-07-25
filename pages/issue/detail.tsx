import React, { Component } from "react";
import { observable, action } from "mobx";
import { observer, inject } from "mobx-react";
import { toast } from "react-toastify";
import { Navigation, IssueDetail } from "../../components";
import Issue, { IIssue } from "../../store/issue";

interface Props {
  issue: Issue;
  id: string;
}

@inject("issue")
@observer
class detail extends Component<Props> {
  static async getInitialProps({ query }) {
    return query;
  }
  componentDidMount() {
    const { issue, id } = this.props;
    issue.getDetailIssue(id).then(() => {});
  }

  onToggleIssue = (id: string) => {
    const { issue } = this.props;
    const { toggleOpen } = issue;
    toggleOpen(id)
      .then(() => {})
      .catch(code => {
        const errMsg = [
          "",
          "로그인을 해주세요",
          "다시 시도해주세요",
          "권한이 없습니다"
        ];
        toast.error(errMsg[code]);
      });
  };

  render() {
    const { issue } = this.props;
    return (
      <div>
        <Navigation />
        <IssueDetail issue={issue} toggleIssue={this.onToggleIssue} />
      </div>
    );
  }
}
export default detail;
