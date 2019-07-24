import React, { Component } from "react";
import Router from "next/router";
import { observable, action } from "mobx";
import { observer, inject } from "mobx-react";
import { Navigation, DashboardProjectList } from "../components";
import Auth from "../store/auth";
import Project from "../store/project";

interface Props {
  auth: Auth;
  project: Project;
}

@inject("project")
@inject("auth")
@observer
class dashboard extends Component<Props> {
  componentDidMount() {
    const { auth, project } = this.props;
    auth
      .check()
      .then()
      .catch(() => {
        Router.push("/auth");
      });

    project
      .getProjects()
      .then(() => {})
      .catch(() => {
        Router.push("/auth");
      });
  }

  render() {
    return (
      <div>
        <Navigation />
        <DashboardProjectList project={this.props.project} />
      </div>
    );
  }
}
export default dashboard;
