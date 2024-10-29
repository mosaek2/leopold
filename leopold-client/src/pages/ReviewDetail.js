import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import CommentTable from "../components/CommentTable";
import Footer from "../components/Footer";
import Main from "../components/Main";
import WhiteHeader from "../components/WhiteHeader";
import "./ReviewDetail.css";

export default function ReviewDetail() {
    const [review, setReview] = useState({
        title: "",
        name: "",
        writeDate: "",
        content: "",
        deleteYn: "",
    });

    const [comment, setComment] = useState({
        name: "",
        writeDate: "",
        content: "",
    });

    const [content, setContent] = useState("");

    const [commentList, setCommentList] = useState([]);

    // * 표시
    const length = review?.name?.length;
    let name = review?.name;

    if (length === 2) {
        name = name[0] + "*" + name[1];
    } else if (length === 3) {
        name = name[0] + "*" + name[2];
    } else if (length >= 4) {
        name = name[0] + "*" + name.slice(-1);
    }

    // 시간 설정
    const date = new Date(review?.writeDate);
    const year = date?.getFullYear();
    const month = String(date.getMonth() + 1)?.padStart(2, "0");
    const day = String(date.getDate())?.padStart(2, "0");

    const { uid } = useParams();

    const navigate = useNavigate();

    // 리뷰 조회
    useEffect(() => {
        axios
            .get(`${process.env.REACT_APP_API_URL}/review/${uid}`)
            .then((res) => {
                setReview(res.data);
            })
            .catch((e) => {
                console.log(e);
            });

        axios
            .get(`${process.env.REACT_APP_API_URL}/comment/${uid}`)
            .then((resp) => {
                console.log(resp.data);
                setComment(resp.data);
                setCommentList(resp.data);
            })
            .catch((error) => console.log(error));
    }, []);

    // 리뷰 삭제
    const handleDelete = () => {
        if (window.confirm("해당 글을 삭제하시겠습니까?") === true) {
            axios
                .delete(`${process.env.REACT_APP_API_URL}/review/${uid}`, {
                    data: {
                        deleteYn: "y",
                    },
                    withCredentials: true,
                })
                .then((resp) => {
                    alert("삭제 완료!");
                    navigate(`/review`);
                })
                .catch((e) => {
                    alert("본인이 작성한 글만 삭제할 수 있습니다.");
                });
        } else {
            alert("취소되었습니다.");
            return;
        }
    };

    // 댓글 작성
    const handleSubmit = () => {
        axios
            .post(
                `${process.env.REACT_APP_API_URL}/comment/write/${uid}`,
                {
                    content: `${content}`,
                },
                {
                    withCredentials: true,
                }
            )
            .then((resp) => {
                navigate(`/review/${uid}`);
            })
            .catch((e) => {
                alert("로그인이 필요합니다!");
            });
    };

    // 댓글 조회
    const printCommentList = commentList?.map((list) => (
        <CommentTable list={list} />
    ));

    return (
        <>
            <WhiteHeader />
            <Main>
                {/* 메뉴 바 */}
                <div className="review-comm_title">
                    <ul className="review-tab">
                        <li className="review-on">
                            <Link to="/notices">
                                <div className="review-img">
                                    <img src="\images\Download\cs_notice.svg" alt="확성기" />
                                </div>
                                <br />
                                <div className="review-txt">공지사항</div>
                            </Link>
                        </li>
                        <li className="review-on">
                            <Link to="/downloads">
                                <div className="review-img">
                                    <img src="\images\Notice\cs_download.svg" alt="구름" />
                                </div>
                                <br />
                                <div className="review-txt">자료실</div>
                            </Link>
                        </li>
                        <li className="review-on">
                            <Link to="/faq">
                                <div className="review-img">
                                    <img src="\images\Notice\cs_faq.svg" alt="보고서" />
                                </div>
                                <br />
                                <div className="review-txt">FAQ</div>
                            </Link>
                        </li>
                        <li className="review-on">
                            <Link to="/as">
                                <div className="review-img">
                                    <img src="\images\Notice\cs_as.svg" alt="스패너" />
                                </div>
                                <br />
                                <div className="review-txt">A/S 접수</div>
                            </Link>
                        </li>
                        <li className="review-on">
                            <Link to="/review">
                                <div className="review-img">
                                    <img src="\images\Review\cs_review_on.svg" alt="말풍선" />
                                </div>
                                <br />
                                <div className="review-txt">사용자 리뷰</div>
                            </Link>
                        </li>
                    </ul>
                </div>
                {/* 제목 */}
                <div className="review-titleArea">
                    <h2>사용자 리뷰</h2>
                    <p>User review</p>
                </div>
                {/* 조회 */}
                <div className="datail-contanier">
                    <div className="title-box">
                        <p className="title-text1">{review.title}</p>
                        <div className="text2-box">
                            <p className="title-text2">{name}</p>
                            <div className="title-line"></div>
                            <p className="title-text2">
                                {year}.{month}.{day}
                            </p>
                        </div>
                    </div>
                    <div className="content-box">
                        <p
                            className="content-text"
                            dangerouslySetInnerHTML={{ __html: review.content }}
                        ></p>
                    </div>
                    <div className="review-catalog-container">
                        <Link to="/review">
                            <button className="catalog-box">목록</button>
                        </Link>
                        <div className="delete-container">
                            <button className="catalog-box" onClick={handleDelete}>
                                삭제
                            </button>
                            <Link to={`/review/modify/${uid}`}>
                                <button className="review-modify-box">수정</button>
                            </Link>
                        </div>
                    </div>
                    {/* 댓글 조회 */}
                    {printCommentList}
                    {/* 댓글 작성*/}
                    <form className="write-comment-container" onSubmit={handleSubmit}>
                        <p className="write-comment-text">댓글달기</p>
                        <textarea
                            className="write-comment-content"
                            onChange={(e) => {
                                setContent(e.target.value);
                            }}
                        ></textarea>
                        <div>
                            <button className="write-comment-check">확인</button>
                        </div>
                    </form>
                </div>
            </Main>
            <Footer />
        </>
    );
}