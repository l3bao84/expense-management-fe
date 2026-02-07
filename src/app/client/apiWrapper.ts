// @ts-ignore
import { showLoading, hideLoading } from "./loadingUI.ts";

export const callApiWithLoader = async (apiFn: () => Promise<any>) => {
    try {
        showLoading();      // bật loader
        const res = await apiFn(); // CHỜ API THẬT
        return res;
    } catch (err) {
        throw err;
    } finally {
        hideLoading();     // tắt loader NGAY khi API xong
    }
};

