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

import { PageHead } from "../components";

import "../styles/default.scss";
import "react-quill/dist/quill.snow.css";

const auth = new AuthStore();
const project = new ProjectStore();
const issue = new IssueStore();

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
        <Provider auth={auth} project={project} issue={issue}>
          <Component {...this.state} {...pageProps} />
        </Provider>
      </Container>
    );
  }
}
