import { useEffect, useState } from "react";
// @ts-ignore
import { registerLoading } from "../../client/loadingUI.ts";
// @ts-ignore
import Loading from "../../component/loading/index.tsx";

const LoadingProvider = ({ children }) => {
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        registerLoading(setLoading);
    }, []);

    return (
        <>
            {loading && <Loading />}
            {children}
        </>
    );
};

export default LoadingProvider;
