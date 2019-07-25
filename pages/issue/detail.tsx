import React, { Component } from "react";
import { observable, action } from "mobx";
import { observer, inject } from "mobx-react";
import { Navigation } from "../../components";
import Issue from "../../store/issue";

interface Props {
  issue: Issue;
}

@inject("issue")
@observer
class detail extends Component<Props> {
  render() {
    return (
      <div>
        <Navigation />
      </div>
    );
  }
}
export default detail;
