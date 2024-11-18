import { useEffect } from "react";

export default function DaumPostcode({ onComplete }) {
  useEffect(() => {
    const script = document.createElement("script");
    script.src =
      "//t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js";
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  function openPostcode() {
    new window.daum.Postcode({
      oncomplete: function (data) {
        onComplete(data);
      },
    }).open();
  }

  return (
    <button type="button" onClick={openPostcode} className="DaumPostcode">
      주소검색
    </button>
  );
}
