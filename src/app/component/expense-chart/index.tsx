import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";
import "./style.css"
// @ts-ignore
import {expenseApi} from "../../client/expenseAPI.ts";
import {useEffect, useState} from "react";
// @ts-ignore
import dayjs from "dayjs";
// @ts-ignore
import {Transaction} from "../../component/transaction/index.tsx";
// @ts-ignore
import {CommonPopup} from "../popup/index.tsx";

const COLORS = ["#409C37", "#EE0033"];

export const ExpenseChart = ({category, onPopup}) => {

    const [type, setType] = useState(null)
    const [from, setFrom] = useState("")
    const [to, setTo] = useState("")
    const [income, setIncome] = useState(0)
    const [expense, setExpense] = useState(0)
    const [transactions, setTransactions] = useState([])
    const [dataChart, setDataChart] = useState(null)
    const [showTransactionPopup, setShowTransactionPopup] = useState(false)
    const [popup, setPopup] = useState(false)

    const getTransaction = async () => {
        try {
            const request = {
                categoryId: category?.id,
                transactionType: type,
                from: from,
                to: to
            }
            const data = await expenseApi.getTransaction(request);
            if(data?.errorCode === 0) {
                setTransactions(data?.data)
                let totalIncome = 0
                data?.data?.map(cate => {
                    if(cate?.transactionType === "INCOME") {
                        totalIncome += cate?.amount
                    }
                })
                setIncome(totalIncome)

                let totalExpense = 0
                data?.data?.map(cate => {
                    if(cate?.transactionType === "EXPENSE") {
                        totalExpense += cate?.amount
                    }
                })
                setExpense(totalExpense)
                setDataChart([
                    {name: "Thu", value: totalIncome},
                    {name: "Chi", value: totalExpense}
                ])
            } else {
                onPopup({
                    title: "Không thành công",
                    description: data?.message || "Hệ thống bận, vui lòng thử lại sau",
                    type: "error",
                    labelBtn: "Đóng"
                })
            }
        } catch {
            onPopup({
                title: "Không thành công",
                description: "Hệ thống bận, vui lòng thử lại sau",
                type: "error",
                labelBtn: "Đóng"
            })
        }
    };

    const executeIncome = async (request) => {
        try {
            const data = await expenseApi.income(request);
            if(data?.errorCode === 0) {
                setPopup({
                    title: "Thành công",
                    description: data?.message,
                    type: "success",
                    labelBtn: "Đóng",
                    onClose: () => setPopup(null)
                })
            } else {
                setPopup({
                    title: "Không thành công",
                    description: data?.message || "Hệ thống bận, vui lòng thử lại sau",
                    type: "error",
                    labelBtn: "Đóng",
                    onClose: () => setPopup(null)
                })
            }
        } catch {
            setPopup({
                title: "Không thành công",
                description: "Hệ thống bận, vui lòng thử lại sau",
                type: "error",
                labelBtn: "Đóng",
                onClose: () => setPopup(null)
            })
        }
    };

    const executeExpense = async (request) => {
        try {
            const data = await expenseApi.expenseMoney(request);
            if(data?.errorCode === 0) {
                setPopup({
                    title: "Thành công",
                    description: data?.message,
                    type: "success",
                    labelBtn: "Đóng",
                    onClose: () => setPopup(null)
                })
            } else {
                setPopup({
                    title: "Không thành công",
                    description: data?.message || "Hệ thống bận, vui lòng thử lại sau",
                    type: "error",
                    labelBtn: "Đóng",
                    onClose: () => setPopup(null)
                })
            }
        } catch {
            setPopup({
                title: "Không thành công",
                description: "Hệ thống bận, vui lòng thử lại sau",
                type: "error",
                labelBtn: "Đóng",
                onClose: () => setPopup(null)
            })
        }
    };

    useEffect(() => {
        getTransaction().then()
    }, [])

    const handleExecuteTransaction = (request, type) => {
        if(type === 1) {
            executeExpense(request).then(() => {
                getTransaction().then()
                setShowTransactionPopup(false)
            })
        }else {
            executeIncome(request).then(() => {
                getTransaction().then()
                setShowTransactionPopup(false)
            })
        }
    }

    return (
        <>
            <div className="expense-chart-container">
                <PieChart width={`${100}%`} height={`${100}%`}>
                    <Pie data={dataChart} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={90}
                         innerRadius={50} label>
                        {dataChart && dataChart?.map((_, index) => (
                            <Cell key={index} fill={COLORS[index]}/>
                        ))}
                    </Pie>
                    <Tooltip formatter={(v) => v.toLocaleString()}/>
                    <Legend/>
                </PieChart>
            </div>
            <div className="transaction-add-button" onClick={() => setShowTransactionPopup(true)}>
                <i className="fa-solid fa-circle-plus"></i>
                <div>Đóng tiền/chi tiêu</div>
            </div>
            <div className="transaction-list-container">
                {(from === "" && to === "") ? "Trong tháng này" : (from + " - " + to)}
                <i className="fa-solid fa-filter"></i>
                <div className="transaction-list">
                    {transactions && transactions?.map((item, index) => (
                        <div className="transaction-item" key={index}>
                            <div className="transaction-item-type">
                                <div
                                    className={"transaction-icon" + (item?.transactionType === "INCOME" ? " transaction-type-in" : " transaction-type-out")}>
                                    {item?.transactionType === "INCOME" ? <i className="fa-solid fa-arrow-right"></i> :
                                        <i className="fa-solid fa-arrow-left"></i>}
                                </div>
                                <div className="transaction-name">
                                    <div>{item?.note}</div>
                                    <div>{dayjs(item?.transactionDate).format("HH:mm:ss DD/MM/YYYY")}</div>
                                </div>
                            </div>
                            <div
                                className={"transaction-item-info" + (item?.transactionType === "INCOME" ? " current-balance" : " expense-balance")}>
                                {(item?.transactionType === "INCOME" ? "" : "- ") + item?.amount.toLocaleString("vi-VN") + " đ"}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            {showTransactionPopup && <Transaction onExecute={handleExecuteTransaction} id={category?.id} onClose={() => setShowTransactionPopup(false)}></Transaction>}
            {popup && <CommonPopup data={popup}></CommonPopup>}
        </>
    )
}