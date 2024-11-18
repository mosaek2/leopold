import { Link } from "react-router-dom";

export default function One2OneTable({ list }) {
  const date = new Date(list?.writeDate);
  const year = date?.getFullYear();
  const month = String(date.getMonth() + 1)?.padStart(2, "0");
  const day = String(date.getDate())?.padStart(2, "0");

  const length = list?.name?.length;
  let name = list?.name;

  if (length === 2) {
    name = name[0] + "*" + name[1];
  } else if (length === 3) {
    name = name[0] + "*" + name[2];
  } else if (length >= 4) {
    name = name[0] + "*" + name.slice(-1);
  }

  return (
    <>
      {/* 1대1 문의 게시판 내용 */}
      <tbody className="one2one-board-list">
        <tr>
          <td>{list.uid}</td>
          <td className="one2one-subject">
            <Link to={`/one2one/${list.uid}`}>{list.title}</Link>
          </td>
          <td>{name}</td>
          <td>
            <span className="one2one-txtNum">
              {year}.{month}.{day}
            </span>
          </td>
          <td>
            <span className="one2one-txtOx">
              {list.answerYn === "y" ? "O" : "X"}
            </span>
          </td>
        </tr>
      </tbody>
    </>
  );
}
