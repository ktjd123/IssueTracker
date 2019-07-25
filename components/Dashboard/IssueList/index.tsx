import React, { Component } from "react";
import Link from "next/link";
import ClassNames from "classnames/bind";
import { observable, action } from "mobx";
import { observer, inject } from "mobx-react";
import styles from "./index.scss";
import Issue from "../../../store/issue";

const cx = ClassNames.bind(styles);

interface Props {
  id: string;
  issue: Issue;
}

@observer
class index extends Component<Props> {
  render() {
    const { id, issue } = this.props;
    return (
      <div className={cx("list")}>
        <div className={cx("top-info")}>
          <h1 className={cx("title")}>이슈 리스트</h1>
          <div className={cx("buttons")}>
            <Link href={`/project/addMember/${id}`}>
              <button type="button" className={cx("add-new-member")}>
                새 멤버 추가하기
              </button>
            </Link>
            <Link href={`/issue/newIssue/${id}`}>
              <button type="button" className={cx("make-new-project")}>
                새 이슈 만들기
              </button>
            </Link>
          </div>
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
            {issue.issues.map(issue => {
              return (
                <Link href={`/issue/detail/${issue._id}`} key={issue._id}>
                  <tr className={cx("pointer")}>
                    <td>{issue.title}</td>
                    <td className={cx("center")}>{issue.viewCount}</td>
                    <td className={cx("center")}>
                      {issue.open === true ? "열림" : "닫힘"}
                    </td>
                  </tr>
                </Link>
              );
            })}
          </tbody>
        </table>
      </div>
    );
  }
}
export default index;
