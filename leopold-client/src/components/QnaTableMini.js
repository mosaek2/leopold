import { useNavigate } from "react-router-dom";
import "./QnaTableMini.css";

export default function QnaTableMini({ qna, index }) {
  const navigate = useNavigate();
  const date = new Date(qna?.date);
  const year = date?.getFullYear();
  const month = String(date?.getMonth() + 1)?.padStart(2, "0");
  const day = String(date?.getDate())?.padStart(2, "0");

  return (
    <div className="qtm" style={{ borderBottom: "1px solid #dfdfdf" }}>
      <div className="qtm-center" style={{ width: "70px" }}>
        {index + 1}
      </div>

      <div className="qtm-title">
        <p
          className="qtm-title-p"
          onClick={() => {
            navigate(`/one2one/${qna?.uid}`);
          }}
        >
          {qna?.title}
        </p>
      </div>

      <div className="qtm-date qtm-center">
        {year}-{month}-{day}
      </div>

      <div className="qtm-answer qtm-center">
        {qna?.answerYn === "y" ? "O" : "X"}
      </div>
    </div>
  );
}
