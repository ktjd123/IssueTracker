import React, { Component } from "react";
import { observable, action } from "mobx";
import { observer, inject } from "mobx-react";
import { toast } from "react-toastify";
import Auth from "../../store/auth";
import Member from "../../store/member";

import {
  Navigation,
  ProjectAddMemberSearch,
  ProjectAddMemberMemberList
} from "../../components";

interface Props {
  id: string;
  auth: Auth;
  member: Member;
}

@inject("member")
@inject("auth")
@observer
class addMember extends Component<Props> {
  static async getInitialProps({ query }) {
    return query;
  }
  @observable id = "";
  @action
  onChange = (e: any) => {
    this[e.target.id] = e.target.value;
  };

  @action
  onSearch = async () => {
    const { auth } = this.props;
    const { searchUsers } = auth;

    searchUsers(this.id).then(() => {});
  };

  onAddMember = (newMember: string) => {
    const { id, member } = this.props;
    const { addNewMember } = member;
    addNewMember(newMember, id)
      .then(() => {
        toast.success("추가되었습니다");
      })
      .catch(code => {
        const errMsg = [
          "",
          "로그인해주세요",
          "다시 시도해주세요",
          "없는 프로젝트입니다",
          "권한이 없습니다",
          "없는 유저입니다"
        ];
        toast.error(errMsg[code]);
      });
  };

  render() {
    const { auth, member, id } = this.props;
    return (
      <div>
        <Navigation />
        <ProjectAddMemberSearch
          onChange={this.onChange}
          onSearch={this.onSearch}
        />
        <ProjectAddMemberMemberList
          auth={auth}
          member={member}
          id={id}
          onAddMember={this.onAddMember}
        />
      </div>
    );
  }
}
export default addMember;
