import { Link } from "react-router-dom";
import "./NoticeTable.css";

export default function NoticeTable({ list }) {
    return (
        <>
            {/* 공지사항 게시판 내용 */}
            <tbody>
                <tr className="noticeTable-tbody">
                    <td
                        className="noticeTable-tbodyContent"
                        style={{
                            color: "#1a1a1a",
                        }}
                    >
                        {list.uid}
                    </td>
                    <td
                        className="noticeTable-tbodyContent"
                        style={{
                            color: "#555555",
                            padding: "28px 0 28px 32px",
                            textAlign: "left",
                        }}
                    >
                        <Link to={`/notice/${list.uid}`}>
                            {list.title}
                        </Link>
                    </td>
                    <td className="noticeTable-tbodyContent">
                        <img src="images/Notice/ico_nick1.gif" alt="이모티콘" />
                        {"Leopold"}
                    </td>
                    <td className="noticeTable-tbodyContent">
                        <span>{list.writeDate}</span>
                    </td>
                    <td className="noticeTable-tbodyContent">
                        <span>{list.hit}</span>
                    </td>
                </tr>
            </tbody>
        </>
    );
}