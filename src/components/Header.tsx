import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function Header() {
  const [isLogin, setIsLogin] = useState<boolean>(false);

  useEffect(() => {
    if (localStorage.getItem("logininfo") !== null) {
      setIsLogin(true);
    } else {
      setIsLogin(false);
    }
  }, []);

  const logout = () => {
    localStorage.removeItem("logininfo");
    setIsLogin(false);
  };

  return (
    <div>
      {isLogin ? (
        <div>
          {localStorage.getItem("logininfo")}
          <button onClick={logout}>logout</button>
        </div>
      ) : (
        <>
          <Link to={`/login`}>login</Link>
        </>
      )}
    </div>
  );
}
