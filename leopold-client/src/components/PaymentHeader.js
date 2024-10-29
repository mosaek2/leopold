import { useNavigate } from "react-router-dom";
import "./PaymentHeader.css";

export default function PaymentHeader() {
    const navigate = useNavigate();

    return (
        <div className="ph">
            <div className="ph-upper">
                <div className="ph-upper-size1">
                    <img src="\images\Payment\navigate_before.png" alt="before"
                        onClick={() => { navigate("/") }} />
                </div>

                <p>레오폴드</p>

                <div className="ph-upper-size1">
                    <img src="\images\Payment\bag-04.png" alt="bag"
                        onClick={() => { navigate("/cart") }} />
                    <img src="\images\Payment\user-profile-01.png" alt="profile"
                        onClick={() => { navigate("/mypage") }} />
                </div>
            </div>

            <div className="ph-lower">
                <p>주문/결제</p>
            </div>
        </div>
    )
}