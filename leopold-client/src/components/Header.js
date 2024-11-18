import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { ContextSystem } from "../functions/MyContext";
import "./Header.css";

export default function Header() {
  const location = useLocation();
  const [point, setPoint] = useState(0);

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/point`, { withCredentials: true })
      .then((response) => {
        console.log(response.data);
        setPoint(response.data);
      })
      .catch((error) => {
        console.log(error.response.data);
      });
  }, [location]);

  const { get, set } = useContext(ContextSystem);
  const navigate = useNavigate();

  const [isTop, setIsTop] = useState(true);

  const handleScroll = () => {
    if (window.scrollY === 0) {
      setIsTop(true);
    } else {
      setIsTop(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const [isMenuExtend, setIsMenuExtend] = useState(false);

  const [is1Extend, setIs1Extend] = useState(true);

  const [is1_1Extend, setIs1_1Extend] = useState(false);
  const [is1_2Extend, setIs1_2Extend] = useState(false);
  const [is1_3Extend, setIs1_3Extend] = useState(false);

  const [is1_1_1Extend, setIs1_1_1Extend] = useState(false);
  const [is1_1_2Extend, setIs1_1_2Extend] = useState(false);

  function handleClickProduct(category) {
    navigate(`/shopping?category=${category}&page=1&sort=new`);
    setIsMenuExtend(false);
  }

  function handleClickMyPage() {
    axios
      .get(`${process.env.REACT_APP_API_URL}/isLogin`, {
        withCredentials: true,
      })
      .then((response) => {
        console.log(response.data);
        navigate("/mypage");
      })
      .catch((error) => {
        console.log(error.response.data);
        alert("로그인 후 이용해 주세요.");

        localStorage.setItem("isLogin", "false");
        set.isLogin(false);

        navigate("/login");
      });
  }

  function handleClickCart() {
    axios
      .get(`${process.env.REACT_APP_API_URL}/isLogin`, {
        withCredentials: true,
      })
      .then((response) => {
        console.log(response.data);
        navigate("/cart");
      })
      .catch((error) => {
        console.log(error.response.data);
        alert("로그인 후 이용해 주세요.");

        localStorage.setItem("isLogin", "false");
        set.isLogin(false);

        navigate("/login");
      });
  }

  function handleClickInterest() {
    axios
      .get(`${process.env.REACT_APP_API_URL}/isLogin`, {
        withCredentials: true,
      })
      .then((response) => {
        console.log(response.data);
        navigate("/interest");
      })
      .catch((error) => {
        console.log(error.response.data);
        alert("로그인 후 이용해 주세요.");

        localStorage.setItem("isLogin", "false");
        set.isLogin(false);

        navigate("/login");
      });
  }

  return (
    <div className="Header">
      {isTop ? (
        <div className="header-transparence">
          <div className="header-wrapper">
            <div className="header-menu-wrapper">
              <img
                src="\images\Header\h_menu.png"
                alt="menu_white"
                className="header-menu-icon"
                onClick={() => {
                  setIsMenuExtend(true);
                }}
              />
            </div>

            <Link to="/">
              <img
                src="\images\Header\mh_logo.png"
                alt="logo_white"
                className="logo"
              />
            </Link>

            <div className="header-container">
              {get.isLogin ? (
                <p className="header-point" style={{ color: "white" }}>
                  적립금{" "}
                  {point?.toString()?.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}P
                </p>
              ) : undefined}
              <Link to="/support">
                <p className="header-service" style={{ color: "white" }}>
                  고객지원
                </p>
              </Link>
              <img
                src="\images\Shopping\white_interest.png"
                alt="search_white"
                onClick={handleClickInterest}
              />
              <img
                src="\images\Header\mypage.png"
                alt="mypage_white"
                onClick={handleClickMyPage}
              />
              <img
                src="\images\Header\h_cart.png"
                alt="cart_white"
                onClick={handleClickCart}
              />
            </div>
          </div>
        </div>
      ) : (
        <div className="header-normal">
          <div className="header-wrapper">
            <div className="header-menu-wrapper">
              <img
                src="\images\Header\h_menu_black.png"
                alt="menu_black"
                className="header-menu-icon"
                onClick={() => {
                  setIsMenuExtend(true);
                }}
              />
            </div>

            <Link to="/">
              <img
                src="\images\Header\logo_black.png"
                alt="logo_black"
                className="logo"
              />
            </Link>

            <div className="header-container">
              {get.isLogin ? (
                <p className="header-point">
                  적립금{" "}
                  {point?.toString()?.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}P
                </p>
              ) : undefined}
              <Link to="/support">
                <p className="header-service">고객지원</p>
              </Link>
              <img
                src="\images\Shopping\interest.png"
                alt="search_black"
                onClick={handleClickInterest}
              />
              <img
                src="\images\Header\h_mypage_black.png"
                alt="mypage_black"
                onClick={handleClickMyPage}
              />
              <img
                src="\images\Header\h_cart_black.png"
                alt="cart_black"
                onClick={handleClickCart}
              />
            </div>
          </div>
        </div>
      )}

      <div className={isMenuExtend ? "header-extend-yes" : "header-extend-no"}>
        <img
          src="\images\Header\close.png"
          onClick={() => {
            setIsMenuExtend(false);
          }}
          alt="close"
          className="header-close"
        />

        <div className="header-menu-container">
          <div className="header-c1">
            <p>쇼핑</p>
            {is1Extend ? (
              <div
                className="header-minus"
                onClick={() => {
                  setIs1Extend(!is1Extend);
                }}
              >
                -
              </div>
            ) : (
              <div
                className="header-plus"
                onClick={() => {
                  setIs1Extend(!is1Extend);
                }}
              >
                +
              </div>
            )}
          </div>

          <div
            className={
              is1Extend ? "header-c2-container" : "header-c2-container-hide"
            }
          >
            <div className="header-c2">
              <p
                style={{ cursor: "pointer" }}
                onClick={() => handleClickProduct(1)}
              >
                레오폴드 키보드
              </p>
              {is1_1Extend ? (
                <div
                  className="header-minus"
                  onClick={() => {
                    setIs1_1Extend(!is1_1Extend);
                  }}
                >
                  -
                </div>
              ) : (
                <div
                  className="header-plus"
                  onClick={() => {
                    setIs1_1Extend(!is1_1Extend);
                  }}
                >
                  +
                </div>
              )}
            </div>

            <div
              className={
                is1_1Extend ? "header-3-container" : "header-3-container-hide"
              }
            >
              <div className="header-c3">
                <p
                  style={{ cursor: "pointer" }}
                  onClick={() => handleClickProduct(4)}
                >
                  기계식 유·무선 키보드
                </p>
                {is1_1_1Extend ? (
                  <div
                    className="header-minus"
                    onClick={() => {
                      setIs1_1_1Extend(!is1_1_1Extend);
                    }}
                  >
                    -
                  </div>
                ) : (
                  <div
                    className="header-plus"
                    onClick={() => {
                      setIs1_1_1Extend(!is1_1_1Extend);
                    }}
                  >
                    +
                  </div>
                )}
              </div>

              <div
                className={
                  is1_1_1Extend
                    ? "header-c4-container"
                    : "header-c4-container-hide"
                }
              >
                <p className="header-c4" onClick={() => handleClickProduct(7)}>
                  FC900RBT MX2A
                </p>
                <p className="header-c4" onClick={() => handleClickProduct(8)}>
                  FC900RBT
                </p>
                <p className="header-c4" onClick={() => handleClickProduct(9)}>
                  NP900RBT
                </p>
                <p className="header-c4" onClick={() => handleClickProduct(10)}>
                  FC750RBT MX2A
                </p>
                <p className="header-c4" onClick={() => handleClickProduct(11)}>
                  FC750RBT
                </p>
                <p className="header-c4" onClick={() => handleClickProduct(12)}>
                  NP750RBT
                </p>
                <p className="header-c4" onClick={() => handleClickProduct(13)}>
                  FC730MBT MX2A
                </p>
                <p className="header-c4" onClick={() => handleClickProduct(14)}>
                  FC630MBT MX2A
                </p>
                <p className="header-c4" onClick={() => handleClickProduct(15)}>
                  FC660MBT
                </p>
                <p className="header-c4" onClick={() => handleClickProduct(16)}>
                  FC980MBT
                </p>
                <p className="header-c4" onClick={() => handleClickProduct(17)}>
                  FC650MDSBT
                </p>
              </div>

              <div className="header-c3">
                <p
                  style={{ cursor: "pointer" }}
                  onClick={() => handleClickProduct(5)}
                >
                  기계식 무선 키보드
                </p>
                {is1_1_2Extend ? (
                  <div
                    className="header-minus"
                    onClick={() => {
                      setIs1_1_2Extend(!is1_1_2Extend);
                    }}
                  >
                    -
                  </div>
                ) : (
                  <div
                    className="header-plus"
                    onClick={() => {
                      setIs1_1_2Extend(!is1_1_2Extend);
                    }}
                  >
                    +
                  </div>
                )}
              </div>

              <div
                className={
                  is1_1_2Extend
                    ? "header-c4-container"
                    : "header-c4-container-hide"
                }
              >
                <p className="header-c4" onClick={() => handleClickProduct(18)}>
                  FC900R MX2A
                </p>
                <p className="header-c4" onClick={() => handleClickProduct(19)}>
                  FC900R
                </p>
                <p className="header-c4" onClick={() => handleClickProduct(20)}>
                  FC750R
                </p>
                <p className="header-c4" onClick={() => handleClickProduct(21)}>
                  FC980M
                </p>
                <p className="header-c4" onClick={() => handleClickProduct(22)}>
                  FC660M
                </p>
                <p className="header-c4" onClick={() => handleClickProduct(23)}>
                  FC650MDS
                </p>
                <p className="header-c4" onClick={() => handleClickProduct(24)}>
                  FC210TP
                </p>
              </div>

              <div className="header-c3">
                <p
                  style={{ cursor: "pointer" }}
                  onClick={() => handleClickProduct(6)}
                >
                  정전용량 무접점
                </p>
              </div>
            </div>

            <div className="header-c2">
              <p style={{ color: "gray" }}>리얼포스 키보드</p>
              {is1_2Extend ? (
                <div
                  className="header-minus"
                  onClick={() => {
                    setIs1_2Extend(!is1_2Extend);
                  }}
                >
                  -
                </div>
              ) : (
                <div
                  className="header-plus"
                  onClick={() => {
                    setIs1_2Extend(!is1_2Extend);
                  }}
                >
                  +
                </div>
              )}
            </div>

            <div
              className={
                is1_2Extend ? "header-3-container" : "header-3-container-hide"
              }
            ></div>

            <div className="header-c2">
              <p style={{ color: "gray" }}>악세서리</p>
              {is1_3Extend ? (
                <div
                  className="header-minus"
                  onClick={() => {
                    setIs1_3Extend(!is1_3Extend);
                  }}
                >
                  -
                </div>
              ) : (
                <div
                  className="header-plus"
                  onClick={() => {
                    setIs1_3Extend(!is1_3Extend);
                  }}
                >
                  +
                </div>
              )}
            </div>

            <div
              className={
                is1_3Extend ? "header-3-container" : "header-3-container-hide"
              }
            ></div>
          </div>

          <img
            src="\images\Header\leopold_logo.png"
            alt="logo"
            style={{ marginTop: 10, width: 122 }}
          />

          <div></div>

          <p
            className="header-c1"
            style={{ cursor: "pointer" }}
            onClick={() => {
              navigate("/support");
            }}
          >
            Contact
          </p>

          <div></div>

          <p
            className="header-c1"
            style={{ cursor: "pointer" }}
            onClick={() => {
              navigate("/one2one");
            }}
          >
            Q&A
          </p>

          <div></div>

          <div className="login-container">
            {get.isLogin ? (
              <p
                style={{ cursor: "pointer" }}
                onClick={() => {
                  axios
                    .post(
                      `${process.env.REACT_APP_API_URL}/logout`,
                      {},
                      { withCredentials: true },
                    )
                    .then((response) => {
                      console.log(response.data);

                      localStorage.setItem("isLogin", "false");
                      set.isLogin(false);

                      alert("로그아웃 되었습니다.");
                      navigate("/");
                    })
                    .catch((error) => {
                      console.log(error.response.data);

                      localStorage.setItem("isLogin", "false");
                      set.isLogin(false);

                      alert("이미 세션이 종료된 상태입니다.");
                      navigate("/login");
                    });
                }}
              >
                로그아웃
              </p>
            ) : (
              <Link to="/login">
                <p>로그인</p>
              </Link>
            )}

            {get.isLogin ? undefined : <p>·</p>}
            {get.isLogin ? undefined : (
              <Link to="/join">
                <p>회원가입</p>
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
