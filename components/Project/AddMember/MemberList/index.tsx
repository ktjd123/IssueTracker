import React, { Component } from "react";
import ClassNames from "classnames/bind";
import { observable, action } from "mobx";
import { observer, inject } from "mobx-react";
import styles from "./index.scss";
import Auth from "../../../../store/auth";
import Member from "../../../../store/member";

const cx = ClassNames.bind(styles);

interface Props {
  id: string;
  auth: Auth;
  member: Member;
  onAddMember: (newMember: string) => void;
}
@observer
class index extends Component<Props> {
  render() {
    const { auth, member, id, onAddMember } = this.props;
    return (
      <div className={cx("list")}>
        {auth.searchedAccounts.map(account => {
          return (
            <div key={account._id} className={cx("account-container")}>
              <div className={cx("id")}>{account.id}</div>
              <button
                type="button"
                className={cx("add")}
                onClick={() => {
                  onAddMember(account._id);
                }}
              >
                추가
              </button>
            </div>
          );
        })}
      </div>
    );
  }
}
export default index;
