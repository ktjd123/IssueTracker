import React, { Component } from "react";
import Router from "next/router";
import { observable, action } from "mobx";
import { observer, inject } from "mobx-react";
import { toast } from "react-toastify";
import { Navigation, AuthComponent } from "../components";
import Auth from "../store/auth";

interface Props {
  auth: Auth;
}

@inject("auth")
@observer
class login extends Component<Props> {
  @observable id = "";
  @observable pw = "";

  componentDidMount() {
    const { auth } = this.props;
    auth
      .check()
      .then(() => {
        Router.push("/dashboard");
      })
      .catch(() => {});
  }

  @action
  onChange = (e: any) => {
    this[e.target.id] = e.target.value;
  };

  @action onLogin = () => {
    const { id, pw } = this;
    const { auth } = this.props;
    if (id.length < 1) return toast.error("아이디를 입력해주세요");
    if (pw.length < 1) return toast.error("비밀번호를 입력해주세요");

    return auth
      .login(id, pw)
      .then(() => {
        toast.success("어서오세요");
        Router.push("/dashboard");
      })
      .catch((code: number) => {
        const errMsg: Array<string> = [
          "다시 입력해주세요",
          "없는 아이디입니다",
          "비밀번호가 맞지 않습니다"
        ];
        toast.error(errMsg[code]);
      });
  };
  @action onRegsiter = () => {
    const { id, pw } = this;
    const { auth } = this.props;
    if (id.length < 1) return toast.error("아이디를 입력해주세요");
    if (pw.length < 1) return toast.error("비밀번호를 입력해주세요");

    return auth
      .register(id, pw)
      .then(() => {
        toast.success("회원가입에 성공했습니다. 로그인해주세요");
      })
      .catch((code: number) => {
        const errMsg: Array<string> = [
          "다시 입력해주세요",
          "이미 존재하는 아이디입니다"
        ];
        toast.error(errMsg[code]);
      });
  };

  render() {
    return (
      <div>
        <Navigation />
        <AuthComponent
          onChange={this.onChange}
          onLogin={this.onLogin}
          onRegister={this.onRegsiter}
        />
      </div>
    );
  }
}
export default login;
