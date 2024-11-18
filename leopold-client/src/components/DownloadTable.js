import { Link } from "react-router-dom";
import "./DownloadTable.css";

export default function DownloadTable({ list, index, page, size }) {
  return (
    <>
      {/* 자료실 게시판 목록 내용 */}
      <tbody>
        <tr className="downloadTable-tbody">
          <td
            className="downloadTable-tbodyContent"
            style={{
              color: "#1a1a1a",
            }}
          >
            {list.totalElements - ((page - 1) * size + index)}
          </td>
          <td
            className="downloadTable-tbodyContent"
            style={{
              color: "#9a9a9a",
            }}
          >
            {list.categoryName}
          </td>
          <td
            className="downloadTable-tbodyContent"
            style={{
              color: "#555555",
              padding: "28px 0 28px 32px",
              textAlign: "left",
            }}
          >
            <Link to={`/download/${list.uid}`}>{list.title}</Link>
          </td>
          <td className="downloadTable-tbodyContent">
            <img src="images/Notice/ico_nick1.gif" alt="이모티콘" />
            {"Leopold"}
          </td>
          <td className="downloadTable-tbodyContent">
            <span>{list.writeDate}</span>
          </td>
        </tr>
      </tbody>
    </>
  );
}
