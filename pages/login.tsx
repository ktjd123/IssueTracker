import React, { Component } from "react";
import Router from "next/router";
import { observable, action } from "mobx";
import { observer, inject } from "mobx-react";
import { Navigation } from "../components";
import Auth from "../store/auth";

interface Props {
  auth: Auth;
}

@inject("auth")
@observer
class login extends Component<Props> {
  componentDidMount() {
    const { auth } = this.props;
    auth
      .check()
      .then(() => {
        Router.push("/dashboard");
      })
      .catch();
  }

  render() {
    return (
      <div>
        <Navigation />
      </div>
    );
  }
}
export default login;
