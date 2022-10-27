import React, { useState, useEffect } from "react";
import DashboardHeader from "../../components/DashboardHeader";
import _ from "lodash";
import useFetch from "../../hooks/useFetch";
import "../styles.css";
import viewIcon from "../../assets/icons/view.png";
import { NavLink } from "react-router-dom";
import { bgStatusStyleHandler } from "../../utils/ChangeOptionBg.js";
function Orders() {
  const [page, setPage] = useState(1);
  const [per_page, setPer_Page] = useState(10);
  const [sort_Order, setSort_Order] = useState("DESC");
  const [pagination, setPagination] = useState();
  const { data, loading, reFetch } = useFetch(
    `/resello/api/v1/cms/listOrder?transStatus=Pending&page=${page}&per_page=${per_page}&sort_order=${sort_Order}&sort_by=created_at`
  );

  const [orders, setOrders] = useState(null);
  const [option, setOption] = useState(null);

  function setDataHandler() {
    if (data && data.status === 200) {
      setOrders(data?.data.order);
      setPagination(data?.data.pagination);
    } else if (data.status === 202) {
      setOrders(null);
    }
  }

  useEffect(() => {
    setDataHandler();
  }, [orders, page]);

  const pageCount = orders
    ? Math.ceil(pagination.count / pagination.per_page)
    : 0;
  // if (pageCount === 1) return null;
  const pages = _.range(1, pageCount + 1);
  console.log(pages);

  const HandleNext = () => {
    setPage((pagination.page += 1));
    reFetch();
  };

  const HandlePrev = () => {
    setPage((pagination.page += 1));
    reFetch();
  };

  console.log(page);

  return (
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
              "loading Data Please Wait..."
            ) : (
              <tbody>
                {orders?.map((order, index) => (
                  <tr key={index}>
                    <td>
                      <span>{order.id}</span>
                    </td>
                    <td>
                      <span>{order.orderNumber}</span>
                    </td>
                    <td>
                      <span>{order.orderDate}</span>
                    </td>

                    <td>
                      <div
                        className={`${bgStatusStyleHandler(
                          order.transactionStatus
                        )} select-option`}
                      >
                        <select
                          value={option ? null : order.transactionStatus}
                          onChange={(e) => setOption(e.target.value)}
                          className={`select-trans-status`}
                        >
                          <option>Completed</option>
                          <option>Pending</option>
                          <option>Cancelled</option>
                          <option>Shipped</option>
                          <option>Partially_Completed</option>
                        </select>
                      </div>
                    </td>
                    <td>
                      <span>{order.paid}</span>
                    </td>
                    <td>
                      <span>Rs.{order.orderdetails[0]?.total}</span>
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

        <span className="pagination">
          <ul className="pagination-sec">
            <li onClick={HandlePrev}>
              <a href="#!" className="">
                Prev
              </a>
            </li>
            {pages?.map((page, index) => {
              return (
                <li onClick={() => setPage(index)}>
                  <a href="#!" key={index} className="">
                    {page}
                  </a>
                </li>
              );
            })}
            <li onClick={HandleNext}>
              <a href="#!" className="">
                Next
              </a>
            </li>
          </ul>
        </span>

        {/* <span className="pagination">
          <ul className="pagination-sec">
            <li>
              <a href="#!" className="">
                Prev
              </a>
            </li>
            {pages.map((page) => {
              return (
                <li
                  onClick={() => pagination(page)}
                  className={
                    page === currentPage
                      ? "pagination-list active"
                      : "pagination-list"
                  }
                >
                  <a href="#!" className="">
                    {page}
                  </a>
                </li>
              );
            })}
            <li>
              <a href="#!" className="">
                Next
              </a>
            </li>
          </ul>
        </span> */}
      </div>
    </div>
  );
}

export default Orders;
