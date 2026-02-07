import "./style.css";
import React from "react";

const CommonFrom = ({children}) => {

    return (
        <>
            <div className="common-form">{children}</div>
        </>
    )
}

export default CommonFrom;