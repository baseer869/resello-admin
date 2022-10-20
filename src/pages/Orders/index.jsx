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
// import Dropdown from "react-dropdown";
// import "react-dropdown/style.css";

function Orders() {
  const { data, loading, error } = useFetch("/resello/api/v1/cms/listOrder");

  const [search, setSearch] = useState("");
  const [orders, setOrders] = useState(null);
  const [page, setPage] = useState(1);
  const [pagination, setPagination] = useState([]);

  function setDataHandler() {
    if (data && data.status === 200) {
      setOrders(data?.data.order);
    } else if (data.status === 202) {
      setOrders(null);
    }
  }
  const [option, setOption] = useState(null);
  const bg_style =
    option === "Completed"
      ? setColor("completed")
      : option === "Rejected"
      ? setColor("rejected")
      : "completed";
  const [color, setColor] = useState(bg_style);
  console.log(option);

  useEffect(() => {
    // setPagination(calculateRange(data, 8));
    setDataHandler();
  }, [data]);

  const __handleSearch = (event) => {
    setSearch(event.target.value);
    if (event.target.value !== "") {
      let search_results = orders.filter(
        (item) =>
          item.orderNumber.toLowerCase().includes(search.toLowerCase()) ||
          item.orderNumber.toLowerCase().includes(search.toLowerCase()) ||
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
  console.log("order response==>", data);
  // const options = ["one", "two", "four"];
  // const defaultOption = options[0];

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
            {/* <th>COSTUMER</th> */}
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
                    {/* <td>
                      <div>
                        <img
                          src={order.image}
                          className="dashboard-content-avatar"
                          alt={order.category}
                        />
                        <span>{order.category}</span>
                      </div>
                    </td> */}
                    <td>
                      <div className="select-option">
                        <select
                          value={option ? null : order.transactionStatus}
                          onChange={(e) => setOption(e.target.value)}
                          className={`select-trans-status`}
                        >
                          <option>Completed</option>
                          <option>Pending</option>
                          <option>Canceled</option>
                          <option>Rejected</option>
                        </select>
                      </div>

                      {/* <div className="">
                        {order.transactionStatus === "Pending" ? (
                          <Dropdown
                            options={options}
                            onChange={(text) =>
                              console.log("shsskjsksjl", text)
                            }
                            value={order.transactionStatus}
                            placeholder="Select an option"
                            className="option-dropdown"
                          />
                        ) : order.transactionStatus === "Completed" ? (
                          <Dropdown
                            options={options}
                            className="drop_down"
                            onChange={(text) =>
                              console.log("shsskjsksjl", text)
                            }
                            value={order.transactionStatus}
                            placeholder="Select an option"
                          />
                        ) : order.transactionStatus === "Refunded" ? (
                          <img
                            src={RefundedIcon}
                            alt="refunded-icon"
                            className="dashboard-content-icon"
                          />
                        ) : null}
                        <span>{order.transactionStatus}</span>
                      </div> */}
                    </td>
                    <td>
                      <span>{order.paid}</span>
                    </td>
                    <td>
                      <span>Rs.{order.orderdetails[0]?.total}</span>
                    </td>

                    {/* <td>
                    <span>{order.paid}</span>
                  </td> */}
                    <td>
                      <span className="dropmenu">
                        <a to="#!" className="">
                          <img
                            className="menu_icon"
                            src={viewIcon}
                            alt="menu icon"
                          />
                        </a>

                        {/* <div class="menu-content">
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
                        </div> */}
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

        {orders !== null || orders?.length !== 0 ? (
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
