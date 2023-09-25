import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import { storageState } from "../atom/Atoms";

import { AiOutlineEyeInvisible, AiOutlineEye } from "react-icons/ai";
import imgLogo from "../img/logo.png";
import InputBox from "../components/InputBox";

export default function Login() {
  const [showPswd, setShowPswd] = useState<boolean>(false); // password type
  const [idEnable, setidEnable] = useState<boolean>(true); // id 검사 > btn
  const [pwEnable, setpwEnable] = useState<boolean>(true); // pw 검사 > btn

  const [CurrentId, setCurrentId] = useRecoilState(storageState);
  const navigate = useNavigate();

  // input value
  const [form, setForm] = useState({
    id: "",
    password: "",
  });

  const [ErrMsg, setErrMsg] = useState({
    idMessage: "",
    pwMessage: "",
  });

  useEffect(() => {
    const idReg = /^[A-za-z0-9]{5,15}$/;
    if (idReg.test(form.id)) {
      setErrMsg({
        ...ErrMsg,
        idMessage: "",
      });
      setidEnable(true);
    } else if (form.id === "") {
      setidEnable(false);
    } else {
      setErrMsg({
        ...ErrMsg,
        idMessage: "아이디는 영문 또는 숫자로 5~15자 이여야 합니다.",
      });
      setidEnable(false);
    }
  }, [form.id]);

  useEffect(() => {
    const pwdReg =
      /^(?=.*[a-zA-z])(?=.*[0-9])(?=.*[$`~!@$!%*#^?&\\(\\)\-_=+]).{8,16}$/;
    if (pwdReg.test(form.password)) {
      setErrMsg({
        ...ErrMsg,
        pwMessage: "",
      });
      setpwEnable(true);
    } else if (form.password === "") {
      setpwEnable(false);
    } else {
      setErrMsg({
        ...ErrMsg,
        pwMessage:
          "비밀번호는 영문, 숫자, 특수문자를 포함한 8~16자 이내여야 합니다.",
      });
      setpwEnable(false);
    }
  }, [form.password]);

  // submit
  const loginFunc = (e: any) => {
    e.preventDefault();

    setCurrentId(form.id);
    navigate("/", { replace: true });
  };

  const toggleShowPswd = () => {
    setShowPswd(!showPswd);
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
            place="Enter your username"
            type="text"
            id="id"
            name="id"
            value={form.id}
            onChange={(e: any) => setForm({ ...form, id: e.target.value })}
            errMsg={ErrMsg.idMessage}
          />
          <InputBox
            place="············"
            type={showPswd ? "text" : "password"}
            id="password"
            name="password"
            value={form.password}
            onChange={(e: any) =>
              setForm({ ...form, password: e.target.value })
            }
            errMsg={ErrMsg.pwMessage}
          >
            <span className="input-icon" onClick={toggleShowPswd}>
              {showPswd ? <AiOutlineEye /> : <AiOutlineEyeInvisible />}
            </span>
          </InputBox>

          <button
            className="btn btn-primary"
            type="submit"
            disabled={idEnable && pwEnable ? false : true}
          >
            Sign in
          </button>
        </form>
      </div>
    </div>
  );
}
