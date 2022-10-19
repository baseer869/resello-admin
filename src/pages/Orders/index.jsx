import React, { useState, useEffect } from "react";
import DashboardHeader from "../../components/DashboardHeader";

// import all_orders from "../../constants/orders";
import useFetch from "../../hooks/useFetch";
import { calculateRange, sliceData } from "../../utils/table-pagination";

import "../styles.css";
import DoneIcon from "../../assets/icons/done.svg";
import CancelIcon from "../../assets/icons/cancel.svg";
import RefundedIcon from "../../assets/icons/refunded.svg";
import menuIcon from "../../assets/icons/menu.png";
import cancelIcon from "../../assets/icons/cancel.svg";
import viewIcon from "../../assets/icons/view.png";

function Orders() {
  const { data, loading, error } = useFetch("/resello/api/v1/cms/listOrder");

  const [search, setSearch] = useState("");
  const [orders, setOrders] = useState(data);
  const [page, setPage] = useState(1);
  const [pagination, setPagination] = useState([]);

  useEffect(() => {
    setPagination(calculateRange(data, 8));
    setOrders(sliceData(data, page, 8));
  }, [page, data]);

  const __handleSearch = (event) => {
    setSearch(event.target.value);
    if (event.target.value !== "") {
      let search_results = orders.order.filter(
        (item) =>
          item.userId.toLowerCase().includes(search.toLowerCase()) ||
          item.id.toLowerCase().includes(search.toLowerCase()) ||
          item.orderDate.toLowerCase().includes(search.toLowerCase())
      );
      setOrders(search_results);
    } else {
      __handleChangePage(1);
    }
  };

  const __handleChangePage = (new_page) => {
    setPage(new_page);
    setOrders(sliceData(data, new_page, 5));
  };

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
            <th>COSTUMER</th>
            <th>STATUS</th>
            <th>PAID</th>
            <th>TOTAL AMOUNT</th>
            <th>ACTION</th>
          </thead>

          {orders.length !== 0 ? (
            <tbody>
              {orders.map((order, index) => (
                <tr key={index}>
                  <td>
                    <span>{index}</span>
                  </td>
                  <td>
                    <span>{order.id}</span>
                  </td>
                  <td>
                    <span>{order.date}</span>
                  </td>
                  <td>
                    <div>
                      <img
                        src={order.image}
                        className="dashboard-content-avatar"
                        alt={order.category}
                      />
                      <span>
                        {order.category}
                        {/* {order.first_name} {order.last_name} */}
                      </span>
                    </div>
                  </td>
                  <td>
                    <div>
                      {order.status === "Paid" ? (
                        <img
                          src={DoneIcon}
                          alt="paid-icon"
                          className="dashboard-content-icon"
                        />
                      ) : order.status === "Canceled" ? (
                        <img
                          src={CancelIcon}
                          alt="canceled-icon"
                          className="dashboard-content-icon"
                        />
                      ) : order.status === "Refunded" ? (
                        <img
                          src={RefundedIcon}
                          alt="refunded-icon"
                          className="dashboard-content-icon"
                        />
                      ) : null}
                      <span>{order.status}</span>
                    </div>
                  </td>
                  <td>
                    <span>{order.paid}</span>
                  </td>
                  <td>
                    <span>${order.price}</span>
                  </td>

                  {/* <td>
                    <span>{order.paid}</span>
                  </td> */}
                  <td>
                    <span className="dropmenu">
                      <img
                        className="menu_icon"
                        src={menuIcon}
                        alt="menu icon"
                      />
                      <div class="menu-content">
                        <div className="menu-link">
                          <img
                            className="menu_icon"
                            src={viewIcon}
                            alt="menu icon"
                          />
                          <img
                            className="menu_icon"
                            src={cancelIcon}
                            alt="menu icon"
                          />
                          <img
                            className="menu_icon"
                            src={DoneIcon}
                            alt="menu icon"
                          />
                        </div>
                      </div>
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          ) : null}
        </table>

        {orders.length !== 0 ? (
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
        )}
      </div>
    </div>
  );
}

export default Orders;
