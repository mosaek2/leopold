import "./ShoppingDetailTable.css";

export default function ShoppingDetailTable({ preview, setPreview }) {


    const printPreviewList = preview?.map((pt, index) => {
        const fixedPrice = pt.price / pt.quantity;

        return (
            <div key={index}>
                <div style={{ display: "flex", alignItems: "center" }}>
                    <div style={{
                        display: "flex", width: 283, height: 49, justifyContent: "space-evenly", flexDirection: "column", gap: 7
                    }}>
                        <p className="sdt-font1">{pt.category2} {pt.category3}</p>
                        <p className="sdt-font2">- {pt.category4}/{pt.category5}</p>
                    </div>

                    <input className="sdt-quantity-input" type="number" defaultValue={1} min={1}
                        onChange={(e) => {
                            const newPreview = preview?.map((pt, idx) => {
                                if (idx === index) {
                                    return {
                                        ...pt,
                                        quantity: parseInt(e.target.value),
                                        price: fixedPrice * parseInt(e.target.value)
                                    }
                                }
                                return pt;
                            });

                            setPreview(newPreview);

                            console.log(pt);
                        }} />

                    <button className="sdt-cancel-btn" onClick={() => {
                        const newPreview = preview.filter((_, idx) => idx !== index);
                        setPreview(newPreview);
                    }}>X</button>

                    <p className="sdt-price-text">{pt.price?.toString()?.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}원</p>
                </div>

            </div >
        )
    })

    return (
        <div className="sdt">
            {printPreviewList}
        </div>
    )
}