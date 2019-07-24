import React, { Component } from "react";
import Router from "next/router";
import { observable, action } from "mobx";
import { observer, inject } from "mobx-react";
import { toast } from "react-toastify";
import { Navigation, ProjectNewProject } from "../../components";
import Auth from "../../store/auth";
import Project from "../../store/project";

interface Props {
  auth: Auth;
  project: Project;
}

@inject("project")
@inject("auth")
@observer
class newProject extends Component<Props> {
  @observable title = "";

  componentDidMount() {
    const { auth } = this.props;
    auth
      .check()
      .then(() => {})
      .catch(() => {
        Router.push("/auth");
      });
  }

  @action
  onChange = (e: any) => {
    this[e.target.id] = e.target.value;
  };

  onAddProject = () => {
    const { title } = this;
    const { project } = this.props;
    if (title.length < 1) return toast.error("제목을 입력해주세요");

    return project.createNewProject(title).then(() => {
      toast.success("프로젝트 생성 완료");
      Router.push("/dashboard");
    });
  };

  render() {
    return (
      <div>
        <Navigation />
        <ProjectNewProject
          onChange={this.onChange}
          onAddProject={this.onAddProject}
        />
      </div>
    );
  }
}
export default newProject;
