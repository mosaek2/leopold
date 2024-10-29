import "./Footer.css";

export default function Footer() {
    return (
        <div className="Footer">
            <div className="footer-upper">
                <p>Leopold</p>
                <p>이용약관</p>
                <p>개인정보처리방침</p>
                <p>이용방침</p>
            </div>

            <div className="footer-lower">
                <div className="f-l-title">
                    <p>회사정보</p>
                    <p style={{ marginLeft: 566 }}>고객센터</p>
                    <p style={{ marginLeft: 382 }}>계좌정보</p>
                </div>

                <div className="f-l-info-container">
                    <div className="f-l-s-title">
                        <p>회사명</p>
                        <p>대표자</p>
                        <p>주소</p>
                        <p>개인정보관리책임자</p>
                        <p>사업자등록번호</p>
                        <p>통신판매업신고번호</p>
                    </div>

                    <div className="f-l-s-content">
                        <p>레오폴드(주)</p>
                        <p>강산</p>
                        <p>경기 고양시 일산동구 하늘마을로 158 B동 306호 레오폴드(주)</p>
                        <p>강산</p>
                        <p>106-86-40380 [사업자정보확인]</p>
                        <p>제 2013-고양일산동-0425호</p>
                    </div>

                    <div className="f-l-s-title">
                        <p>TEL</p>
                        <p>FAX</p>
                        <p>E-MAIL</p>
                        <p>운영시간</p>
                        <p>점심시간</p>
                    </div>

                    <div className="f-l-s-content">
                        <p>050-2020-1030</p>
                        <p>031-926-7704</p>
                        <p>webmaster@leopold.co.kr</p>
                        <p>AM 10:00 - PM 17:00 (주말 및 공휴일 휴무)</p>
                        <p>12:00~13:30</p>
                    </div>

                    <div className="f-l-s-title">
                        <p>입금계좌</p>
                        <p>예금주</p>
                    </div>

                    <div className="f-l-s-content">
                        <p>국민은행 477401-01-100878</p>
                        <p>레오폴드(주)</p>
                    </div>
                </div>
            </div>
        </div>
    )
}