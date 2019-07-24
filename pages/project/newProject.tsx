import React, { Component } from "react";
import Router from "next/router";
import { observable, action } from "mobx";
import { observer, inject } from "mobx-react";
import { toast } from "react-toastify";
import { Navigation, ProjectNewProject } from "../../components";
import Auth from "../../store/auth";

interface Props {
  auth: Auth;
}

@inject("auth")
@observer
class newProject extends Component<Props> {
  componentDidMount() {
    const { auth } = this.props;
    auth
      .check()
      .then(() => {})
      .catch(() => {
        Router.push("/auth");
      });
  }

  onAddProject = () => {
    toast.success("프로젝트 생성 완료");
    Router.push("/dashboard");
  };

  render() {
    return (
      <div>
        <Navigation />
        <ProjectNewProject onAddProject={this.onAddProject} />
      </div>
    );
  }
}
export default newProject;
