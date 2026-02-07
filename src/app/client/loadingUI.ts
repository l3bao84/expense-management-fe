let setLoadingFn: ((value: boolean) => void) | null = null;

export const registerLoading = (fn: (value: boolean) => void) => {
    setLoadingFn = fn;
};

export const showLoading = () => setLoadingFn?.(true);
export const hideLoading = () => setLoadingFn?.(false);
