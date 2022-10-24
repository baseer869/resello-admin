import React, { useState, useEffect } from "react";
import DashboardHeader from "../../components/DashboardHeader";
import _ from "lodash";
// import all_orders from "../../constants/orders";
import useFetch from "../../hooks/useFetch";
// import { calculateRange, sliceData } from "../../utils/table-pagination";
import "../styles.css";
import viewIcon from "../../assets/icons/view.png";
import { NavLink } from "react-router-dom";

function Orders(props) {
  const { data, loading, error } = useFetch("/resello/api/v1/cms/listOrder");

  const [search, setSearch] = useState("");
  const [orders, setOrders] = useState(null);
  const [page, setPage] = useState(1);
  const [paginationOrder, setPaginationOrder] = useState();
  const [currentPage, setCurrentPage] = useState(1);

  function setDataHandler() {
    if (data && data.status === 200) {
      setOrders(data?.data.order);
    } else if (data.status === 202) {
      setOrders(null);
    }
  }

  function bgStatusStyleHandler(status) {
    let styleColor;
    switch (status) {
      case "Completed":
        styleColor = "completed";
        break;
      case "Pending":
        styleColor = "pending";
        break;
      case "Rejected":
        styleColor = "rejected";
        break;
      case "Cancelled":
        styleColor = "canceled";
        break;
      default:
        styleColor = "rejected";
    }
    return styleColor;
  }

  const [option, setOption] = useState(null);

  useEffect(() => {
    // setPagination(calculateRange(data, 8));
    setDataHandler();
    setPaginationOrder(_(orders).slice(0).take(pageSize).value());
  }, [data]);

  const __handleSearch = (event) => {
    setSearch(event.target.value);
    if (event.target.value !== "") {
      let search_results = paginationOrder.filter(
        (item) =>
          item.orderNumber.toLowerCase().includes(search.toLowerCase()) ||
          item.id.toLowerCase().includes(search.toLowerCase()) ||
          item.orderDate.toLowerCase().includes(search.toLowerCase())
      );
      setOrders(search_results);
    } else {
      // __handleChangePage(1);
    }
  };

  const pageSize = 5;
  const pageCount = orders ? Math.ceil(orders.length / pageSize) : 0;
  if (pageCount === 1) return null;
  const pages = _.range(1, pageCount + 1);

  const pagination = (pageNum) => {
    setCurrentPage(pageNum);
    const startIndex = (pageNum - 1) * pageSize;
    const paginatedData = _(orders).slice(startIndex).take(pageSize).value();
    setPaginationOrder(paginatedData);
  };
  console.log(paginationOrder);

  return (
    <div className="dashboard-content">
      <DashboardHeader btnText="New Order" />
      <div className="dashboard-content-container">
        <div className="dashboard-content-header">
          <h2>Orders List</h2>
          <div className="dashboard-content-search">
            <input
              type="text"
              value={search}
              placeholder="Search.."
              className="dashboard-content-input"
              onChange={(e) => __handleSearch(e)}
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

          {orders?.length !== 0 ? (
            loading ? (
              "loading data please wait..."
            ) : (
              <tbody>
                {paginationOrder?.map((order, index) => (
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
                          Pending Completed Shipped Cancelled
                          Partially_Completed
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
          ) : (
            "Loading Please wait"
          )}
        </table>

        <span className="pagination">
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
        </span>

        {/* {orders !== null || orders?.length !== 0 ? (
          <div className="dashboard-content-footer">
            {pagination.map((item, index) => (
              <span
                key={index}
                className={item === page ? "active-pagination" : "pagination"}
                onClick={() => __handleChangePage(item)}
              >
                {item}
              </span>
            ))}
          </div>
        ) : (
          <div className="dashboard-content-footer">
            <span className="empty-table">No data</span>
          </div>
        )} */}
      </div>
    </div>
  );
}

export default Orders;
