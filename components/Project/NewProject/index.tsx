import React, { Component } from "react";
import ClassNames from "classnames/bind";
import { observable, action } from "mobx";
import { observer, inject } from "mobx-react";
import styles from "./index.scss";

const cx = ClassNames.bind(styles);

interface Props {
  onAddProject: () => void;
}
@observer
class index extends Component<Props> {
  render() {
    const { onAddProject } = this.props;
    return (
      <div className={cx("new-project")}>
        <div className={cx("input-box")}>
          <h1 className={cx("input-title")}>제목</h1>
          <input placeholder="성공을 위한 프로젝트 1" />
        </div>
        <button type="button" className={cx("submit")} onClick={onAddProject}>
          프로젝트 생성
        </button>
      </div>
    );
  }
}
export default index;
