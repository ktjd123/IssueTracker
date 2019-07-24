import React, { Component } from "react";
import { observable, action } from "mobx";
import { observer, inject } from "mobx-react";
import { PageHead, Navigation, HomeTitle } from "../components";

@observer
class index extends Component {
  render() {
    return (
      <div>
        <PageHead />
        <Navigation />
        <HomeTitle />
      </div>
    );
  }
}
export default index;
