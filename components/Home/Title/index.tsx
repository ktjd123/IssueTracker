import React, { Component } from "react";
import ClassNames from "classnames/bind";
import { observable, action } from "mobx";
import { observer, inject } from "mobx-react";
import styles from "./index.scss";

const cx = ClassNames.bind(styles);

@observer
class index extends Component {
  render() {
    return (
      <div className={cx("title")}>
        <div className={cx("first-title")}>Dekina</div>
        <div className={cx("second-title")}>이슈 트래커에 어서오세요</div>
        <div className={cx("third-title")}>
          시작하려면 오른쪽 위의 대시보드를 클릭해주세요
        </div>
      </div>
    );
  }
}
export default index;
