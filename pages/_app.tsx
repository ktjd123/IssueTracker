import React from "react";
import App, { Container } from "next/app";
import { Provider } from "mobx-react";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";
import { css } from "glamor";

// stores
import AuthStore from "../store/auth";
import ProjectStore from "../store/project";
import IssueStore from "../store/issue";
import MemberStore from "../store/member";

import { PageHead } from "../components";

import "quill/dist/quill.snow.css";

import "../styles/default.scss";

const auth = new AuthStore();
const project = new ProjectStore();
const issue = new IssueStore();
const member = new MemberStore();

export default class MyApp extends App {
  render() {
    const { Component, pageProps } = this.props;
    return (
      <Container>
        <PageHead />
        <ToastContainer
          autoClose={3000}
          position="bottom-center"
          toastClassName={css({
            background: "black"
          })}
        />
        <Provider auth={auth} project={project} issue={issue} member={member}>
          <Component {...this.state} {...pageProps} />
        </Provider>
      </Container>
    );
  }
}
