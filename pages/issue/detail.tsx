import React, { Component } from "react";
import { observable, action } from "mobx";
import { observer, inject } from "mobx-react";
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
  @observable issue: IIssue | undefined;

  componentDidMount() {
    const { issue, id } = this.props;
    issue.getDetailIssue(id).then(detailIssue => {
      this.issue = detailIssue;
    });
  }

  render() {
    console.log(this.issue);
    return (
      <div>
        <Navigation />
        <IssueDetail issue={this.issue} />
      </div>
    );
  }
}
export default detail;
