import React, { useState, useEffect } from "react";
import DashboardHeader from "../../components/DashboardHeader";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import _ from "lodash";
import useFetch from "../../hooks/useFetch";
import "../styles.css";
import viewIcon from "../../assets/icons/view.png";
import { NavLink } from "react-router-dom";
import Overlay from "../../components/overlay/index";
import ChangeStatus from "../../utils/ChangeStatus";
// for pagination
import { Pagination } from "antd";

function Orders() {
  const [spinloading, setSpinLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [currentPage, setCurrentPage] = useState(page);
  const [per_page, setPer_Page] = useState(8);
  // const [transStatus, setTransStatus] = useState("Cancelled");
  const [sort_Order, setSort_Order] = useState("DESC");
  const [pagination, setPagination] = useState();

  // new paginati changes
  const [total, setTotal] = useState("");

  //
  const { data, loading, reFetch } = useFetch(
    `/resello/api/v1/cms/listOrder?page=${page}&per_page=${per_page}&sort_order=${sort_Order}&sort_by=created_at`
  );

  const [orders, setOrders] = useState(null);
  const [option, setOption] = useState(null);

  //
  console.log(`this is option data from order page${option}`);
  function setDataHandler() {
    setSpinLoading(true);
    if (data && data.status === 200) {
      setOrders(data?.data.order);
      setPagination(data?.data.pagination);
      setTotal(data?.data.pagination.count);
    } else if (data.status === 202) {
      setOrders(null);
    }
  }

  console.log(`TRhe current page ${currentPage}`);
  useEffect(() => {
    setDataHandler();
    setCurrentPage(page);
    setSpinLoading(false);
  }, [orders, option, page, reFetch]);

  console.log(total);
  const pageCount = orders ? Math.ceil(total / pagination.per_page) : 0;
  console.log(pageCount);
  if (pageCount === 0) return null;
  const pages = _.range(1, pageCount + 1);

  const indexOfLastPage = page + per_page;
  const indexOfFirstPage = indexOfLastPage - per_page;
  const currentPost = orders.slice(indexOfFirstPage, indexOfLastPage);

  return (
    <>
      <ToastContainer />
      {/* setting loader  */}
      {spinloading ? (
        <Overlay loadingText="Loading Page Please Wait..." />
      ) : (
        <div className="dashboard-content">
          <DashboardHeader btnText="New Order" />

          <div className="dashboard-content-container">
            <div className="dashboard-content-header">
              <h2>Orders List</h2>
              <div className="dashboard-content-search">
                <input
                  type="text"
                  placeholder="Search.."
                  className="dashboard-content-input"
                />
              </div>
            </div>
            {loading ? (
              <Overlay
                className="overlay-center"
                loadingText="Loading Data Please Wait..."
              />
            ) : (
              <table>
                <thead>
                  <th>ID</th>
                  <th>ORDER ID</th>
                  <th>ORDER DATE</th>
                  <th>STATUS</th>
                  <th>PAID</th>
                  <th>TOTAL AMOUNT</th>
                  <th>ACTION</th>
                </thead>

                {orders !== null || orders?.length !== 0 ? (
                  loading ? (
                    <Overlay className="overlay-center" loadingText="Data" />
                  ) : (
                    <tbody>
                      {orders?.map((order, index) => (
                        <tr key={index}>
                          <td className="text">
                            <span class="text-style">{order.id}</span>
                          </td>
                          <td>
                            <span class="text-style">{order.orderNumber}</span>
                          </td>
                          <td>
                            <span class="text-style">{order.orderDate}</span>
                          </td>

                          <td>
                            <ChangeStatus
                              orderTrans={order.transactionStatus}
                              setOption={setOption}
                              option={option}
                              orderid={order.id}
                            />
                          </td>
                          <td>
                            <span class="text-style">{order.paid}</span>
                          </td>
                          <td>
                            <span class="text-style">
                              Rs.{order.orderdetails[0]?.total}
                            </span>
                          </td>
                          <td>
                            <span className="dropmenu">
                              <NavLink to="/orderView">
                                <img
                                  className="menu_icon"
                                  src={viewIcon}
                                  alt="menu icon"
                                />
                              </NavLink>
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  )
                ) : null}
              </table>
            )}
            <div className="paginations">
              <Pagination
                pageSize={per_page}
                total={total}
                current={page}
                onChange={(value) => setPage(value)}
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Orders;
