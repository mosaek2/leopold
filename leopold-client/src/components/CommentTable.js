import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function CommentTable({ list }) {
    const navigate = useNavigate();

    // 시간 설정
    const date = new Date(list?.writeDate);
    const year = date?.getFullYear();
    const month = String(date.getMonth() + 1)?.padStart(2, "0");
    const day = String(date.getDate())?.padStart(2, "0");

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

    // 댓글 삭제
    const handleDelete = () => {
        if (window.confirm("해당 글을 삭제하시겠습니까?") === true) {
            axios
                .delete(`${process.env.REACT_APP_API_URL}/comment/${list?.uid}`, {
                    withCredentials: true,
                })
                .then((resp) => {
                    alert("삭제 완료!");
                    navigate(0);
                })
                .catch((err) => {
                    console.log(err);
                    if (axios.isAxiosError(err)) {
                        err.response?.status === 401 && alert("로그인이 필요합니다.");
                    }
                    if (axios.isAxiosError(err)) {
                        err.response?.status === 403 &&
                            alert("본인이 작성한 댓글만 삭제할 수 있습니다.");
                    }
                })
        } else {
            alert("취소되었습니다.")
            return false;
        }
    }

    return (
        <>
            <div className="comment-container">
                <div className="comment-box1">
                    <p className="comment-name">{name}</p>
                    <p className="comment-text">
                        {year}.{month}.{day}
                    </p>
                    <div className="modify-container">
                        <button className="modify-box" onClick={handleDelete}>
                            삭제
                        </button>
                    </div>
                </div>
                <div className="comment-box2">
                    <p className="comment-text">{list.content}</p>
                </div>
            </div>
        </>
    );
}