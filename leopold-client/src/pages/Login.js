import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Footer from "../components/Footer";
import Main from "../components/Main";
import WhiteHeader from "../components/WhiteHeader";
import { ContextSystem } from "../functions/MyContext";
import "./Login.css";

export default function Login() {
  const navigate = useNavigate();
  const { get, set } = useContext(ContextSystem);

  const [id, setId] = useState();
  const [password, setPassword] = useState();

  useEffect(() => {
    document.getElementById("input-id").focus();
  }, []);

  function handleClickLogin() {
    axios
      .post(
        `${process.env.REACT_APP_API_URL}/login`,
        {
          id: `${id}`,
          password: `${password}`,
        },
        { withCredentials: true },
      )
      .then((response) => {
        console.log(response.data);

        localStorage.setItem("isLogin", "true");
        set.isLogin(true);

        alert("로그인 성공!");
        navigate("/");
      })
      .catch((error) => {
        console.log(error.response.data);
        alert(error.response.data);
      });
  }

  function handleKeyPress(e) {
    if (e.key === "Enter") {
      handleClickLogin();
    }
  }

  return (
    <div className="Login">
      <WhiteHeader />
      <Main>
        <p className="login-title">로그인</p>

        <div className="login-key1">ID</div>

        <input
          className="login-input"
          onChange={(e) => {
            setId(e.target.value);
          }}
          onKeyDown={handleKeyPress}
          id="input-id"
        />

        <div className="login-key2">PASSWORD</div>

        <input
          type="password"
          className="login-input"
          onChange={(e) => {
            setPassword(e.target.value);
          }}
          onKeyDown={handleKeyPress}
        />

        <div className="login-forgot-wrapper">
          <Link to={"/forgotId"}>
            <p className="login-forgot-button">아이디 찾기</p>
          </Link>
          <p>/</p>
          <Link to={"/forgotPs"}>
            <p className="login-forgot-button">비밀번호 찾기</p>
          </Link>
        </div>

        <button className="login-button" onClick={handleClickLogin}>
          로그인
        </button>

        <div className="login-not-member">아직 회원이 아니신가요?</div>

        <Link to={"/join"}>
          <button className="login-join-button">회원가입</button>
        </Link>
      </Main>
      <Footer />
    </div>
  );
}
