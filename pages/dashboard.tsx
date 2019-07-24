import React, { Component } from "react";
import Router from "next/router";
import { observable, action } from "mobx";
import { observer, inject } from "mobx-react";
import { Navigation, DashboardProjectList } from "../components";
import Auth from "../store/auth";

interface Props {
  auth: Auth;
}

@inject("auth")
@observer
class dashboard extends Component<Props> {
  componentDidMount() {
    const { auth } = this.props;
    auth
      .check()
      .then()
      .catch(() => {
        Router.push("/login");
      });
  }

  render() {
    return (
      <div>
        <Navigation />
        <DashboardProjectList />
      </div>
    );
  }
}
export default dashboard;