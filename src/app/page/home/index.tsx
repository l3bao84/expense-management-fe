import "./style.css";
import React, {useEffect, useState} from "react";
// @ts-ignore
import CommonFrom from "../../component/common-form/index.tsx";
// @ts-ignore
import {expenseApi} from "../../client/expenseAPI.ts";
// @ts-ignore
import {CommonPopup} from "../../component/popup/index.tsx";
// @ts-ignore
import {Category} from "../../component/category/index.tsx";
// @ts-ignore
import {ExpenseChart} from "../../component/expense-chart/index.tsx";


const Home = () => {

    const [page, setPage] = useState(1)
    const [showAmount, setShowAmount] = useState(false)
    const [showExpense, setShowExpense] = useState(false)
    const [popup, setPopup] = useState(null)
    const [categories, setCategories] = useState([])
    const [balance, setBalance] = useState(null)
    const [expense, setExpense] = useState(null)
    const [updateCate, setUpdateCate] = useState(null)
    const [newCate, setNewCate] = useState(false)
    const [category, setCategory] = useState(null)

    const getAllCategories = async () => {
        try {
            const data = await expenseApi.getAll();
            if(data?.errorCode === 0) {
                setCategories(data?.data);
                let totalBalance = 0
                data?.data?.map(cate => {
                    if(cate?.status !== 0) {
                        totalBalance += cate?.balance
                    }
                })
                setBalance(totalBalance)

                let totalExpense = 0
                data?.data?.map(cate => {
                    totalExpense += cate?.expense
                })
                setExpense(totalExpense)
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

    const removeCategory = async (id) => {
        try {
            const data = await expenseApi.delCate(id);
            if(data?.errorCode === 0) {
                setPopup({
                    title: "Thành công",
                    description: "Xóa danh mục thành công",
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

    const updateCategory = async (request) => {
        try {
            const data = await expenseApi.update(request);
            if(data?.errorCode === 0) {
                setPopup({
                    title: "Thành công",
                    description: "Cập nhật danh mục thành công",
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

    const createCategory = async (request) => {
        try {
            const data = await expenseApi.create(request);
            if(data?.errorCode === 0) {
                setPopup({
                    title: "Thành công",
                    description: "Tạo mới danh mục thành công",
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
        getAllCategories();
    }, []);

    const hanleUpdateCategory = (request: any) => {
        setUpdateCate(null)
        updateCategory(request).then(res => getAllCategories())
    }

    const hanleCreateCategory = (request: any) => {
        setNewCate(false)
        createCategory(request).then(res => getAllCategories())
    }

    const handleClosePopup = (data) => {
        const newPopup = {
            ...data,
            onClose: () => setPopup(null)
        }
        setPopup(newPopup)
    }

    return (
        <>
            <CommonFrom children={undefined}>
                {page === 1 &&
                    <div className="home-page-container">
                        <div className="home-page-header">
                            <div className="home-page-header-title">Xin chào, cùng quản lý chi tiêu của bạn nhé!</div>
                        </div>
                        <div className="home-balance-container">
                            <div className="home-balance-current">
                                <div className="home-page-balance-title">Số dư hiện có</div>
                                <div className="home-balance">
                                    <div className="home-balance-value">
                                        <span>{showAmount ? balance.toLocaleString("vi-VN") : "******"}</span> đ
                                    </div>
                                    <div className="home-balance-action" onClick={() => setShowAmount(!showAmount)}>
                                        {showAmount ? <i className="fa-solid fa-eye-slash"></i> :
                                            <i className="fa-solid fa-eye"></i>}
                                    </div>
                                </div>
                            </div>
                            <div className="home-balance-expense">
                                <div className="home-page-balance-title">Chi tiêu</div>
                                <div className="home-balance">
                                    <div className="home-balance-value">
                                        <span>{showExpense ? expense.toLocaleString("vi-VN") : "******"}</span> đ
                                    </div>
                                    <div className="home-balance-action" onClick={() => setShowExpense(!showExpense)}>
                                        {showExpense ? <i className="fa-solid fa-eye-slash"></i> :
                                            <i className="fa-solid fa-eye"></i>}
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="home-category-container">
                            <div className="home-category-title">Các danh mục chi tiêu của bạn</div>
                            <div className="home-category-list">
                                {categories && categories?.map((cate, index) => (
                                    <div className="category-box" key={index} onClick={() => {
                                        setPage(2)
                                        setCategory(cate)
                                    }}>
                                        <div className="category-box-icon">
                                            <img src={cate?.icon}/>
                                            <div className="category-box-name">{cate?.name}</div>
                                        </div>
                                        <div className="category-box-info">
                                            <div
                                                className={"category-box-info-balance" + (cate?.status !== 0 ? " current-balance" : " expense-balance")}>{(cate?.status == 0 ? "- " : "") + cate?.balance.toLocaleString("vi-VN") + " đ"}</div>
                                            <div className="category-box-info-action" onClick={(e) => {
                                                e.stopPropagation()
                                                setUpdateCate(cate)
                                            }}>
                                                <i className="fa-regular fa-pen-to-square"></i>
                                            </div>
                                        </div>
                                        <div className="category-remove-icon" onClick={(e) => {
                                            e.stopPropagation()
                                            const data = {
                                                title: "Thông báo",
                                                description: "Bạn có chắc chắn muốn xóa danh mục này",
                                                type: "confirm",
                                                labelBtn: "Đồng ý",
                                                onClose: () => setPopup(null),
                                                onConfirm: () => removeCategory(cate?.id)
                                            }
                                            setPopup(data)
                                        }}><i className="fa-solid fa-circle-xmark"></i></div>
                                    </div>
                                ))}
                                <div className="category-box-default" onClick={() => setNewCate(true)}>
                                    <i className="fa-solid fa-circle-plus"></i>
                                    <div>Thêm danh mục mới</div>
                                </div>
                            </div>
                        </div>
                    </div>
                }
                {page === 2 &&
                    <div className="category-detail-container">
                        <div className="home-page-header">
                            <div className="home-page-header-title">
                                <div className="fa-solid fa-arrow-left" onClick={() => {
                                    getAllCategories();
                                    setPage(1)
                                }}></div>
                                Tình hình thu chi
                            </div>
                        </div>
                        <ExpenseChart category={category} onPopup={handleClosePopup}></ExpenseChart>
                    </div>
                }
                {popup && <CommonPopup data={popup}></CommonPopup>}
                {updateCate && <Category type={"update"} data={updateCate} onClose={() => setUpdateCate(null)}
                                         onUpdate={hanleUpdateCategory}></Category>}
                {newCate && <Category type={"create"} data={null} onClose={() => setNewCate(null)}
                                      onUpdate={hanleCreateCategory}></Category>}
            </CommonFrom>
        </>
    )
}

export default Home;