import React, { Component } from "react";
import ClassNames from "classnames/bind";
import { observable, action } from "mobx";
import { observer, inject } from "mobx-react";
import styles from "./index.scss";

const cx = ClassNames.bind(styles);

interface Props {
  onChange: (_: React.FormEvent) => void;
  onSearch: () => void;
}
@observer
class index extends Component<Props> {
  render() {
    const { onChange, onSearch } = this.props;
    return (
      <div className={cx("add-member")}>
        <input
          className={cx("search-input")}
          placeholder="유저 Id를 검색해주세요"
          id="id"
          onChange={onChange}
          onKeyPress={e => {
            if (e.key === "Enter") onSearch();
          }}
        />
        <button
          type="button"
          className={cx("search-button")}
          onClick={onSearch}
        >
          검색
        </button>
      </div>
    );
  }
}
export default index;
