import "./style.css"
import React, {useRef, useState} from "react";
// @ts-ignore
import CloseIcon from "../../assets/dấu x.png";

export const Category = ({data, onClose, onUpdate, type}) => {

    const [name, setName] = useState(data?.name || null)
    const [desc, setDesc] = useState(data?.description || null)
    const [icon, setIcon] = useState(data?.icon || null)

    const uploadImage = async (file: File) => {
        const formData = new FormData();
        formData.append("file", file);
        formData.append("upload_preset", "expense-management");

        const res = await fetch(
            "https://api.cloudinary.com/v1_1/dln9yldmf/image/upload",
            {
                method: "POST",
                body: formData
            }
        );

        return await res.json()
    };

    const fileInputRef = useRef<HTMLInputElement>(null);

    const openFilePicker = () => {
        fileInputRef.current?.click();
    };

    const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            uploadImage(file).then(r => setIcon(r.secure_url))
        }
    };

    const checkEnableButton = () => {
        if(name === null || name === "") return false
        if(desc === null || desc === "") return false
        if(icon === null || icon === "") return false
        return true
    }

    return (
        <div className="popup-overlay" onClick={onClose}>
            <div className="popup-container popup-update-category" onClick={(e) => e.stopPropagation()}>
                {type === "update" ? "Thay đổi danh mục theo ý bạn" : "Thêm mới một danh mục"}
                <div className="popup-icon-close" onClick={onClose}><img src={CloseIcon} alt="ảnh icon close"/></div>
                <div className="popup-update-container">
                    <div className="popup-update-input">
                        <input
                            className="text-input-value"
                            id="name"
                            type="text" placeholder=" "
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                        <label htmlFor="name" className="text-input-label">Tên danh mục</label>
                    </div>
                    <div className="popup-update-input">
                        <input
                            className="text-input-value"
                            id="name"
                            type="text" placeholder=" "
                            value={desc}
                            onChange={(e) => setDesc(e.target.value)}
                        />
                        <label htmlFor="name" className="text-input-label">Mô tả ngắn</label>
                    </div>
                    <input
                        type="file"
                        accept="image/*"
                        ref={fileInputRef}
                        hidden
                        onChange={onFileChange}
                    />
                    {icon ? <div className="popup-update-icon">
                            <img src={icon} alt="ảnh icon danh mục"/>
                            <i className="fa-solid fa-circle-xmark" onClick={() => setIcon(null)}></i>
                        </div> :
                        <div className="popup-button" onClick={() => openFilePicker()}>Chọn ảnh</div>
                    }
                    <div className="popup-button-both">
                        <div className="popup-button" onClick={onClose}>Hủy</div>
                        <div className={"popup-button confirm-button" + (checkEnableButton() ? "" : " disabled-button")}
                             onClick={() => {
                                 onUpdate({
                                     id: data?.id,
                                     name: name,
                                     description: desc,
                                     icon: icon
                                 })
                             }}>{type === "update" ? "Cập nhật" : "Thêm mới"}</div>
                    </div>
                </div>
            </div>
        </div>
    )
}