import "./style.css"
import React, {useRef, useState} from "react";
// @ts-ignore
import CloseIcon from "../../assets/dấu x.png";

const actionArray = [
    {id: 1, name: "Chi tiêu"},
    {id: 2, name: "Đóng tiền"}
]

export const Transaction = ({id, onClose, onExecute}) => {

    const [amount, setAmount] = useState(0)
    const [note, setNote] = useState(null)
    const [showDropdown, setShowDropdown] = useState(false)
    const [actionPay, setActionPay] = useState(null)

    const checkEnableButton = () => {
        if(amount === 0) return false
        if(note == null || note === "") return false
        return true
    }

    return (
        <div className="popup-overlay" onClick={onClose}>
            <div className="popup-container popup-update-category" onClick={(e) => e.stopPropagation()}>
                Đóng tiền/Chi tiêu
                <div className="popup-icon-close" onClick={onClose}><img src={CloseIcon}/></div>
                <div className="popup-update-container">
                    <div className="popup-update-input">
                        <input
                            className="text-input-value"
                            id="name"
                            type="text" placeholder=" "
                            value={amount}
                            onChange={(e) => setAmount(e.target.value)}
                        />
                        <label htmlFor="name" className="text-input-label">Số tiền</label>
                    </div>
                    <div className="popup-update-input">
                        <input
                            className="text-input-value"
                            id="name"
                            type="text" placeholder=" "
                            value={note}
                            onChange={(e) => setNote(e.target.value)}
                        />
                        <label htmlFor="name" className="text-input-label">Ghi chú</label>
                    </div>
                    <div className="selection-box-action" onClick={() => setShowDropdown(!showDropdown)}>
                        {actionPay !== null ? actionPay?.name : "Chọn loại chi tiêu"}
                        <i className={"fa-solid fa-angle-down" + (showDropdown ? " rotate-up" : " rotate-down")}></i>
                    </div>
                    {showDropdown && <div className="selection-box-container">
                        {actionArray?.map((item, index) => (
                            <div className="selection-box-item" key={index} onClick={() => {
                                setActionPay(item)
                                setShowDropdown(!showDropdown)
                            }}>{item?.name}</div>
                        ))}
                    </div>}
                    <div className="popup-button-both">
                        <div className="popup-button" onClick={onClose}>Hủy</div>
                        <div className={"popup-button confirm-button" + (checkEnableButton() ? "" : " disabled-button")} onClick={() => {
                            onExecute({
                                categoryId: id,
                                amount: amount,
                                note: note
                            }, actionPay?.id)
                        }}>Đồng ý</div>
                    </div>
                </div>
            </div>
        </div>
    )
}