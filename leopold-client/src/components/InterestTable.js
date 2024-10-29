import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./InterestTable.css";

export default function InterestTable({ interest, selectedUidList, setSelectedUidList }) {
    const navigate = useNavigate();

    function handleChangeCheckBox(e) {
        if (e.target.checked === true) {
            const newList = selectedUidList?.map((selectedUid) => {
                if (selectedUid !== interest?.uid) return selectedUid;
            });
            newList.push(interest?.uid);
            console.log(newList);

            setSelectedUidList(newList);
        } else {
            const newList = selectedUidList?.filter(selectedUid => selectedUid !== interest?.uid);
            console.log(newList);

            setSelectedUidList(newList);
        }
    }

    return (
        <div className="interest-table">
            <div className="interest-table-td1" style={{ width: 77 }}>
                <input type="checkbox" onChange={handleChangeCheckBox} />
            </div>

            <div className="interest-table-td1" style={{ width: 130 }}>
                <img src={interest?.coverUrl} alt="cover" style={{ width: 100, height: 100, borderRadius: 10 }} />
            </div>

            <div className="interest-table-td2" style={{ width: 581 }}>
                <p style={{ cursor: "pointer" }} onClick={() => { navigate(`/shopping/detail?uid=${interest?.productUid}`) }}>{interest?.name} {interest?.color}</p>
            </div>

            <div className="interest-table-td1" style={{ width: 120, fontWeight: "bold" }}>
                {interest?.price?.toString()?.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}원
            </div>

            <div className="interest-table-td2" style={{ alignItems: "center", width: 195 }}>
                <button className="interest-table-delte"
                    onClick={() => {
                        axios.delete(`${process.env.REACT_APP_API_URL}/interest?interestUid=${interest.uid}`, { withCredentials: true })
                            .then((response) => {
                                console.log(response.data);
                                alert("상품이 삭제되었습니다.");
                                navigate(0);
                            }).catch((error) => {
                                alert(error.response.data);
                            })
                    }}>삭제</button>
            </div>
        </div>
    )
}