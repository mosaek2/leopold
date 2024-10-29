import { Link } from "react-router-dom";
import "./ReviewTable.css";

export default function ReviewTable({ list }) {

    const date = new Date(list?.writeDate);
    const year = date?.getFullYear();
    const month = String(date.getMonth() + 1)?.padStart(2, '0');
    const day = String(date.getDate())?.padStart(2, '0');

    // * 표시
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
            <tbody className="review-board-list">
                <tr>
                    <td>{list.uid}</td>
                    <td className="review-subject" style={{ color: "#555" }}>
                        <Link to={`/review/${list.uid}`}>{list.title}</Link>
                        <span className="review-txtEm" />
                    </td>
                    <td>{name}</td>
                    <td>
                        <span className="review-txtNum">{year}.{month}.{day}</span>
                    </td>
                </tr>
            </tbody>
        </>
    );
}