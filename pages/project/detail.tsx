import React, { Component } from "react";
import { observable, action } from "mobx";
import { observer, inject } from "mobx-react";
import { Navigation, DashboardIssueList } from "../../components";
import Issue from "../../store/issue";

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
    const { id, issue } = this.props;
    issue.getIssues(id).then(() => {});
  }

  render() {
    const { id, issue } = this.props;
    return (
      <div>
        <Navigation />
        <DashboardIssueList id={id} issue={issue} />
      </div>
    );
  }
}
export default detail;
