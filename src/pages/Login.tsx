import { useCallback, useEffect, useState } from "react";
import imgLogo from "../img/logo.png";
import { AiOutlineEyeInvisible } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import InputBox from "../components/InputBox";

export default function Login() {
  const [inputId, setInputId] = useState<string>("");
  const [inputPw, setInputPw] = useState<string>("");
  const navigate = useNavigate();

  // input value
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [ErrMsg, setErrMsg] = useState({
    emailMessage: "",
    pwMessage: "",
  });

  useEffect(() => {
    const idReg = /^[A-za-z0-9]{5,15}$/;
    if (idReg.test(form.email) || form.email === "") {
      setErrMsg({
        ...ErrMsg,
        emailMessage: "",
      });
    } else {
      setErrMsg({
        ...ErrMsg,
        emailMessage: "아이디는 영문 또는 숫자로 5~15자 이여야 합니다.",
      });
    }
  }, [form.email]);

  useEffect(() => {
    const pwdReg = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
    if (pwdReg.test(form.password) || form.password === "") {
      setErrMsg({
        ...ErrMsg,
        pwMessage: "",
      });
    } else {
      setErrMsg({
        ...ErrMsg,
        pwMessage: "비밀번호는 문자 또는 숫자로 8자 이상이여야 합니다.",
      });
    }
  }, [form.password]);

  // submit
  const loginFunc = (e: any) => {
    e.preventDefault();

    if (!inputId.includes("@")) {
      return alert("idddd");
    } else if (inputPw.length < 8) {
      return alert("pwwwww");
    }

    localStorage.setItem("logininfo", inputId);
    //navigate("/", { replace: true });
    window.location.href = "/";
    console.log("ID :", inputId, "PW :", inputPw);
  };

  return (
    <div className="container">
      <div className="card">
        <a href="/" className="logo">
          <img src={imgLogo} />
        </a>

        <form
          id="formAuthentication"
          action="/"
          method="POST"
          onSubmit={loginFunc}
        >
          <InputBox
            place="Enter your email or username"
            type="text"
            id="email"
            name="email"
            value={form.email}
            onChange={(e: any) => setForm({ ...form, email: e.target.value })}
            errMsg={ErrMsg.emailMessage}
          />
          <InputBox
            place="············"
            type="password"
            id="password"
            name="password"
            value={form.password}
            onChange={(e: any) =>
              setForm({ ...form, password: e.target.value })
            }
            errMsg={ErrMsg.pwMessage}
          >
            <span className="pw-icon">
              <AiOutlineEyeInvisible />
            </span>
          </InputBox>

          <button className="btn btn-primary" type="submit">
            Sign in
          </button>
        </form>
      </div>
    </div>
  );
}
