import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Footer from "../components/Footer";
import Main from "../components/Main";
import WhiteHeader from "../components/WhiteHeader";
import "./ForgotPs.css";

export default function ForgotPs() {
    const [isEmail, setIsEmail] = useState(true);
    const navigate = useNavigate();

    const [id, setId] = useState();
    const [name, setName] = useState();
    const [email, setEmail] = useState();
    const [phone1, setPhone1] = useState();
    const [phone2, setPhone2] = useState();
    const [phone3, setPhone3] = useState();

    function handleClickFind() {
        if (isEmail) {
            axios.get(`${process.env.REACT_APP_API_URL}/passwordByEmail?id=${id}&name=${name}&email=${email}`, { withCredentials: true })
                .then((response) => {
                    console.log(response.data);
                    alert(`회원님의 비밀번호는 ${response.data} 입니다. 로그인 창으로 이동합니다.`);
                    navigate("/login");
                })
                .catch((error) => {
                    console.log(error.response.data);
                    alert("비밀번호를 찾을 수 없습니다.");
                });
        } else {
            axios.get(`${process.env.REACT_APP_API_URL}/passwordByPhone?id=${id}&name=${name}&phone=${phone1}-${phone2}-${phone3}`, { withCredentials: true })
                .then((response) => {
                    console.log(response.data);
                    alert(`회원님의 비밀번호는 ${response.data} 입니다. 로그인 창으로 이동합니다.`);
                    navigate("/login");
                })
                .catch((error) => {
                    console.log(error.response.data);
                    alert("비밀번호를 찾을 수 없습니다.");
                });
        }
    }

    return (
        <div className="ForgotPs">
            <WhiteHeader />
            <Main>
                <p className="forgotPs-title">비밀번호 찾기</p>

                <div className="forgotPs-checkbox-wrapper">
                    <input type="radio" name="method" id="byEmail" defaultChecked
                        onChange={() => { setIsEmail(true) }} />
                    <label for="byEmail">이메일</label>

                    <input type="radio" name="method" id="byPhone"
                        onChange={() => { setIsEmail(false) }} />
                    <label for="byPhone">휴대폰 번호</label>
                </div>

                <div className="forgotPs-id">아이디</div>

                <input className="forgotPs-input"
                    onChange={(e) => { setId(e.target.value) }} />

                <div className="forgotPs-name">이름</div>

                <input className="forgotPs-input"
                    onChange={(e) => { setName(e.target.value) }} />

                {isEmail
                    ?
                    <div>
                        <div className="forgotPs-phone">
                            이메일로 찾기
                        </div>

                        <input className="forgotPs-input" type="email"
                            onChange={(e) => { setEmail(e.target.value) }} />
                    </div>
                    :
                    <div>
                        <div className="forgotPs-phone">
                            휴대폰 번호로 찾기
                        </div>

                        <div className="forgotPs-phone-wrapper">
                            <input className="forgotPs-phoneBox" maxLength={4}
                                onChange={(e) => { setPhone1(e.target.value) }} />

                            <span className="forgotPs-hyphen">-</span>

                            <input className="forgotPs-phoneBox" maxLength={4}
                                onChange={(e) => { setPhone2(e.target.value) }} />

                            <span className="forgotPs-hyphen">-</span>

                            <input className="forgotPs-phoneBox" maxLength={4}
                                onChange={(e) => { setPhone3(e.target.value) }} />
                        </div>
                    </div>}

                <button className="forgotPs-button"
                    onClick={handleClickFind}>확인</button>
            </Main>
            <Footer />
        </div>
    )
}