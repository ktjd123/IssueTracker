import React, { Component } from "react";
import { observable, action } from "mobx";
import { observer, inject } from "mobx-react";

@observer
class dashboard extends Component {
  render() {
    return <div>Dashboard</div>;
  }
}
export default dashboard;
