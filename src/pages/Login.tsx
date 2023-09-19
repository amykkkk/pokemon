import { useState } from "react";
import imgLogo from "../img/logo.png";
import { AiOutlineEyeInvisible } from "react-icons/ai";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [inputId, setInputId] = useState("");
  const [inputPw, setInputPw] = useState("");
  const [button, setButton] = useState(true);
  const navigate = useNavigate();

  // 유효성 검사
  const changeButton = () => {
    inputId.includes("@") && inputPw.length >= 8
      ? setButton(false)
      : setButton(true);
  };

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
          <div className="form-wrap">
            <label htmlFor="email" className="form-label">
              Email or Username
            </label>
            <input
              className="form-control"
              type="text"
              id="email"
              name="email-username"
              placeholder="Enter your email or username"
              value={inputId}
              onChange={(e) => setInputId(e.target.value)}
              onKeyUp={changeButton}
            />
          </div>

          <div className="form-wrap">
            <label className="form-label" htmlFor="password">
              Password
            </label>
            <div className="pw-box">
              <input
                className="form-control"
                type="password"
                id="password"
                name="password"
                placeholder="············"
                aria-describedby="password"
                value={inputPw}
                onChange={(e) => setInputPw(e.target.value)}
                onKeyUp={changeButton}
              />
              <span className="pw-icon">
                <AiOutlineEyeInvisible />
              </span>
            </div>
          </div>

          <button className="btn btn-primary" type="submit">
            Sign in
          </button>
        </form>
      </div>
    </div>
  );
}
