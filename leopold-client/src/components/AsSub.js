import { useState } from "react";
import "./AsSub.css";

export default function AsSub({ list }) {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <>
            {/* Q */}
            <div
                className="asSub-move"
                onClick={() => setIsOpen(isOpen => !isOpen)}
            >
                <span>
                    <img src="images\FAQ\faq_q.svg" alt="Q" />
                </span>
                {list?.question}
                <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    className={isOpen ? "asSub-arrow-up" : ""}
                >
                    <path
                        d="M4 8L12 16L20 8"
                        stroke="#1A1A1A"
                        strokeWidth="1.2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />
                </svg>
            </div>
            {/* A */}
            <div className={isOpen ? "asSub-has-sub-a" : "asSub-has-sub-b"}>
                <div className="asSub-wrap">
                    <span>
                        <img src="\images\FAQ\faq_a.svg" alt="A" />
                    </span>
                    <div dangerouslySetInnerHTML={{ __html: list?.answer }} />
                </div>
            </div>
        </>
    );
}