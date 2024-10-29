import { useState } from "react";
import "./PaymentContent.css";

export default function PaymentContent({ title, children }) {
    const [isExtend, setIsExtend] = useState(true);

    return (
        <div className="pc">
            <div className="pc-title" onClick={() => { setIsExtend(!isExtend) }}>
                <p>{title}</p>
                <img src="\images\Payment\Frame 418.png" alt="frame"
                    className={isExtend ? "pc-arrow-up" : "pc-arrow-down"} />
            </div>

            <div className={isExtend ? "pc-main" : "pc-main-hide"}>
                {children}
            </div>
        </div>
    )
}