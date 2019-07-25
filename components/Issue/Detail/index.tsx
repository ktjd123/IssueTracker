import React, { Component } from "react";
import ClassNames from "classnames/bind";
import { observable, action } from "mobx";
import { observer, inject } from "mobx-react";
import styles from "./index.scss";
import Issue from "../../../store/issue";

const cx = ClassNames.bind(styles);

interface Props {
  issue: Issue;
  toggleIssue: (id: string) => void;
}
@observer
class index extends Component<Props> {
  render() {
    const { issue, toggleIssue } = this.props;
    return (
      <div className={cx("issue")}>
        <h1 className={cx("title")}>{issue!.detailIssue.title}</h1>
        <div className={cx("status")}>
          이슈
          {issue.detailIssue.open === true ? "열림" : "닫힘"}
        </div>
        <div
          className={cx("content")}
          dangerouslySetInnerHTML={{ __html: issue!.detailIssue.content }}
        />
        <button
          type="button"
          className={cx("button", { reverse: !issue.detailIssue.open })}
          onClick={() => {
            toggleIssue(issue.detailIssue._id);
          }}
        >
          이슈 {issue.detailIssue.open === true ? "닫기" : "열기"}
        </button>
      </div>
    );
  }
}
export default index;
