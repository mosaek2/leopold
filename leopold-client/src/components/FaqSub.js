import "./FaqSub.css";

export default function FaqSub({ faq, index, active, handleToggle }) {
  const isActive = active === index; // 현재 항목이 활성화되었는지 확인
  console.log(isActive);
  console.log(active);
  console.log(index);

  return (
    <>
      <div className="faqSub-move" onClick={() => handleToggle(index)}>
        <span>
          <img src="images\FAQ\faq_q.svg" alt="Q" />
        </span>
        {faq?.question}
        <svg
          width={24}
          height={24}
          viewBox="0 0 24 24"
          fill="none"
          className={isActive ? "faqSub-arrow-active" : "faqSub-arrow"}
        >
          <path
            d="M4 8L12 16L20 8"
            stroke="#1A1A1A"
            strokeWidth={1.2}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
      <div className={`faqSub-has-sub-a ${isActive ? "active" : ""}`}>
        <div className="faqSub-wrap">
          <span>
            <img src="images\FAQ\faq_a.svg" alt="A" />
          </span>
          <div>
            <p dangerouslySetInnerHTML={{ __html: faq?.answer }} />
            <br />
            {faq?.imageUrl && (
              <p>
                <img
                  src={faq?.imageUrl}
                  alt="faq 이미지"
                  className="faqSub-fr-dib"
                />
              </p>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
