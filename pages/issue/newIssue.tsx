import React, { Component } from "react";
import { observable, action } from "mobx";
import { observer, inject } from "mobx-react";
import { Navigation, IssueNewIssue } from "../../components";

interface Props {}
@observer
class newIssue extends Component<Props> {
  @action
  onChange = (e: any) => {
    this[e.target.id] = e.target.value;
  };
  onAddIssue = () => {};
  render() {
    return (
      <div>
        <Navigation />
        <IssueNewIssue onChange={this.onChange} onAddIssue={this.onAddIssue} />
      </div>
    );
  }
}
export default newIssue;
