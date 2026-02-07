// @ts-ignore
import axiosClient from "./axios.ts";

// @ts-ignore
import { callApiWithLoader } from "./apiWrapper.ts";

export const expenseApi = {
    // GET: lấy toàn bộ danh sách chi tiêu
    getAll: async () => {
        return callApiWithLoader(() => axiosClient.get("/category"))
    },

    delCate: async (id) => {
        return callApiWithLoader(() => axiosClient.post("/category/remove?id=" + id));
    },

    update: async (data) => {
        return callApiWithLoader(() => axiosClient.post("/category/update", data));
    },

    create: async (data) => {
        return callApiWithLoader(() => axiosClient.post("/category/create", data));
    },

    getTransaction: async (data) => {
        return callApiWithLoader(() => axiosClient.post("/transaction", data));
    },

    income: async (data) => {
        return callApiWithLoader(() => axiosClient.post("/category/income", data));
    },

    expenseMoney: async (data) => {
        return callApiWithLoader(() => axiosClient.post("/category/expense", data));
    },
};
