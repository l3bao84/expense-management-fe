/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable array-callback-return */
/* eslint-disable react-hooks/exhaustive-deps */
import "./style.css";
import React from "react";
// @ts-ignore
import ErrorIcon from "../../assets/times-circle.png"
// @ts-ignore
import SuccessIcon from "../../assets/check-circle.png"
// @ts-ignore
import ConfirmIcon from "../../assets/info-circle.png"
// @ts-ignore
import CloseIcon from "../../assets/dấu x.png"

export const CommonPopup = ({data}) => {

    const onClose = () => {
        if(data?.onClose) {
            data?.onClose()
        }
    }

    const onConfirm = () => {
        if(data?.onConfirm) {
            data?.onConfirm()
        }
    }

    return (
        <div className="popup-overlay" onClick={() => onClose()}>
            <div className="popup-container" onClick={(e) => e.stopPropagation()}>
                <div className="popup-icon">
                    {data?.type === "error" && <img src={ErrorIcon} alt="ảnh icon cảnh báo"/>}
                    {data?.type === "success" && <img src={SuccessIcon} alt="ảnh icon thành công"/>}
                    {data?.type === "confirm" && <img src={ConfirmIcon} alt="ảnh icon xác nhận"/>}
                </div>
                <div className="popup-title">{data?.title}</div>
                <div className="popup-description">{data?.description}</div>
                {data?.type === "confirm"
                    ? <div className="popup-button-both">
                        <div className="popup-button" onClick={() => onClose()}>Hủy</div>
                        <div className="popup-button confirm-button" onClick={() => {
                            onClose()
                            onConfirm()
                        }}>{data?.labelBtn}</div>
                    </div>
                    : <div className="popup-button" onClick={() => onClose()}>{data?.labelBtn}</div>
                }
                <div className="popup-icon-close" onClick={() => onClose()}><img src={CloseIcon} alt="ảnh icon đóng"/></div>
            </div>
        </div>
    )
}