import React, { Component } from "react";
import Link from "next/link";
import ClassNames from "classnames/bind";
import { observable, action } from "mobx";
import { observer, inject } from "mobx-react";
import styles from "./index.scss";

const cx = ClassNames.bind(styles);

interface Props {}

@observer
class index extends Component<Props> {
  render() {
    return (
      <div className={cx("list")}>
        <div className={cx("top-info")}>
          <h1 className={cx("title")}>이슈 리스트</h1>
          <Link href="/issue/newIssue">
            <button type="button" className={cx("make-new-project")}>
              새 이슈 만들기
            </button>
          </Link>
        </div>
        <table className={cx("list-table")}>
          <thead>
            <tr>
              <th className={cx("table-title")}>제목</th>
              <th className={cx("table-issue-count")}>조회수</th>
              <th className={cx("table-issue-ing")}>진행중</th>
            </tr>
          </thead>
          <tbody>
            <Link href={`/project/detail/`}>
              <tr className={cx("pointer")}>
                <td>제목</td>
                <td className={cx("center")}>카운트</td>
                <td className={cx("center")}>종료</td>
              </tr>
            </Link>
          </tbody>
        </table>
      </div>
    );
  }
}
export default index;
