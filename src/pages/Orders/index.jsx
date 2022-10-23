import React, { useState, useEffect } from "react";
import DashboardHeader from "../../components/DashboardHeader";

// import all_orders from "../../constants/orders";
import useFetch from "../../hooks/useFetch";
import { calculateRange, sliceData } from "../../utils/table-pagination";
import "../styles.css";
import completed from "../styles.css";
import pending from "../styles.css";
import rejected from "../styles.css";
import canceled from "../styles.css";
import viewIcon from "../../assets/icons/view.png";
import { NavLink } from "react-router-dom";

function Orders(props) {
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
  const [orderId, setOrderId] = useState();
  console.log(orderId);
  console.log(option);

  useEffect(() => {
    // setPagination(calculateRange(data, 8));
    setDataHandler();

    let styleColor;
    switch (data.transactionStatus) {
      case "Completed":
        styleColor = "completed";
        break;
      case "Pending":
        styleColor = "pending";
        break;
      case "Rejected":
        styleColor = "rejected";
        break;
      case "Canceled":
        styleColor = "canceled";
        break;
      default:
        styleColor = "rejected";
    }
    console.log(styleColor);
    setBgColor(styleColor);
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
  const [bgColor, setBgColor] = useState();
  console.log(bgColor);
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
                      <div className={`${bgColor} select-option`}>
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
                    </td>
                    <td>
                      <span>{order.paid}</span>
                    </td>
                    <td>
                      <span>Rs.{order.orderdetails[0]?.total}</span>
                    </td>
                    <td>
                      <span className="dropmenu">
                        <NavLink
                          to="/orderView"
                          onClick={() => setOrderId(order.id)}
                        >
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
