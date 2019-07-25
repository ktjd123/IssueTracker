import React, { Component } from "react";
import ClassNames from "classnames/bind";
import { observable, action } from "mobx";
import { observer, inject } from "mobx-react";
import styles from "./index.scss";
import { IIssue } from "../../../store/issue";

const cx = ClassNames.bind(styles);

interface Props {
  issue: IIssue | undefined;
}
@observer
class index extends Component<Props> {
  render() {
    const { issue } = this.props;
    if (issue === undefined) return <div />;
    return (
      <div className={cx("issue")}>
        <h1 className={cx("title")}>{issue!.title}</h1>
        <div
          className={cx("content")}
          dangerouslySetInnerHTML={{ __html: issue!.content }}
        />
      </div>
    );
  }
}
export default index;
