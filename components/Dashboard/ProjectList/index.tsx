import React, { Component } from "react";
import Link from "next/link";
import ClassNames from "classnames/bind";
import { observable, action } from "mobx";
import { observer, inject } from "mobx-react";
import styles from "./index.scss";

const cx = ClassNames.bind(styles);

@observer
class index extends Component {
  render() {
    return (
      <div className={cx("list")}>
        <div className={cx("top-info")}>
          <h1 className={cx("title")}>프로젝트 리스트</h1>
          <Link href="/project/newProject">
            <button type="button" className={cx("make-new-project")}>
              새 프로젝트 만들기
            </button>
          </Link>
        </div>
        <table className={cx("list-table")}>
          <thead>
            <tr>
              <th className={cx("table-title")}>제목</th>
              <th className={cx("table-issue-count")}>이슈 개수</th>
              <th className={cx("table-issue-ing")}>진행중</th>
            </tr>
          </thead>
        </table>
      </div>
    );
  }
}
export default index;
