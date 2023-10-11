import { storageState } from "../atom/Atoms";
import { useRecoilValue, useResetRecoilState } from "recoil";
import { Link } from "react-router-dom";
import { AiOutlineLogin, AiOutlineLogout, AiOutlineUser } from "react-icons/ai";
import { styled } from "styled-components";
import imgLogo from "../assets/logo.png";

const HeaderWrap = styled.header`
  display: flex;
  position: fixed;
  justify-content: space-between;
  align-items: center;
  top: 0;
  left: 0;
  right: 0;
  z-index: 50;
  height: 60px;
  background-color: #fff;
  box-shadow: 0 1px 20px 0px rgba(0, 0, 0, 0.3);
  padding: 0 1.5rem;
`;

const LoginWrap = styled.ul`
  display: flex;
  align-items: center;
  font-size: 0.875rem;

  li {
    margin-right: 1rem;

    &:last-child {
      margin-right: 0;
    }
  }

  .icon {
    margin-right: 6px;
  }
`;

export default function Header() {
  const currentId = useRecoilValue(storageState);
  const resetId = useResetRecoilState(storageState);

  return (
    <HeaderWrap>
      <h1>
        <Link to={"/"}>
          <img src={imgLogo} />
        </Link>
      </h1>
      {currentId ? (
        <LoginWrap>
          <li>
            <Link to={"/"}>
              <span className="icon">
                <AiOutlineUser />
              </span>
              {currentId}
            </Link>
          </li>
          <li>
            <Link to={"/"} onClick={resetId}>
              <span className="icon">
                <AiOutlineLogout />
              </span>
              LOGOUT
            </Link>
          </li>
        </LoginWrap>
      ) : (
        <LoginWrap>
          <li>
            <Link to={`/login`}>
              <span className="icon">
                <AiOutlineLogin />
              </span>
              LOGIN
            </Link>
          </li>
        </LoginWrap>
      )}
    </HeaderWrap>
  );
}
