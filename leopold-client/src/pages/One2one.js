import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import Footer from "../components/Footer";
import Main from "../components/Main";
import One2OneTable from "../components/One2OneTable";
import WhiteHeader from "../components/WhiteHeader";
import "./One2one.css";

export default function One2one() {
    const [queryParams] = useSearchParams();

    const page = queryParams.get("page") ? parseInt(queryParams.get("page")) : 1;
    const size = queryParams.get("size") ? parseInt(queryParams.get("size")) : 10;
    const [one2OneList, setOne2OneList] = useState([]);

    useEffect(() => {
        axios.get(`${process.env.REACT_APP_API_URL}/one2ones?page=${page}&size=${size}`, {
            withCredentials: true,
        })
            .then((res) => {
                console.log(res.data);
                setOne2OneList(res.data);
            })
            .catch((err) => console.log(err.res.data));
    }, [page, size])


    const printOne2OneList = one2OneList["list"]?.map((list, index) => (
        <One2OneTable list={list} key={index} />
    ))



    return (
        <div className="One2One">
            <WhiteHeader />
            <Main>
                <div id="one2one-container">
                    <div id="one2one-contents">
                        <div className="one2one-board-listPackage">
                            {/* 제목 */}
                            <div className="one2one-board-title">
                                <h2>
                                    <font>1:1문의</font>
                                </h2>
                                <p>Q&A</p>
                            </div>
                            {/* 게시판 카테고리*/}
                            <div className="one2one-base-table">
                                <table>
                                    <colgroup className="one2one-board-listHeader">
                                        <col style={{ width: "70px" }} />
                                        <col style={{ width: "auto" }} />
                                        <col style={{ width: "120px" }} />
                                        <col style={{ width: "120px" }} />
                                        <col style={{ width: "120px" }} />
                                    </colgroup>
                                    <thead className="one2one-board-listHeader">
                                        <tr>
                                            <th>번호</th>
                                            <th>제목</th>
                                            <th>작성자</th>
                                            <th>작성일</th>
                                            <th>답변</th>
                                        </tr>
                                    </thead>
                                    {/* 게시판 목록 */}
                                    {printOne2OneList}
                                </table>
                            </div>
                            {/* 글쓰기 버튼 */}
                            <div className="one2one-btn">
                                <span className="one2one-gRight">
                                    <Link to="/one2one/write" className="one2one-btnSubmit">
                                        글쓰기
                                    </Link>
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </Main>
            <Footer />
        </div>
    );
}