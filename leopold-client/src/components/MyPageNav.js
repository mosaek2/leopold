import { Link } from "react-router-dom";
import "./MyPageNav.css";

export default function MyPageNav() {
    return (
        <div className="MyPageNav">
            <div className="mpn-title">
                <Link to={"/mypage"}><p>My Page</p></Link>
            </div>

            <div className="mpn-menu">
                <Link to={"/order"}><p>주문 내역 조회</p></Link>
            </div>

            <div className="mpn-menu">
                <Link to={"/interest"}><p>관심 상품</p></Link>
            </div>

            <div className="mpn-menu">
                <Link to={"/modify"}><p>회원 정보 수정</p></Link>
            </div>
        </div >
    )
}