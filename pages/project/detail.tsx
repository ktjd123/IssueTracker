import React, { Component } from "react";
import { observable, action } from "mobx";
import { observer, inject } from "mobx-react";
import { Navigation, DashboardIssueList } from "../../components";

interface Props {}
@observer
class detail extends Component<Props> {
  render() {
    return (
      <div>
        <Navigation />
        <DashboardIssueList />
      </div>
    );
  }
}
export default detail;
