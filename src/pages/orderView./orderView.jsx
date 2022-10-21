import React, { useEffect, useState } from "react";
import DashboardHeader from "../../components/DashboardHeader";

import useFetch from "../../hooks/useFetch";
const imgs =
  "http://res.cloudinary.com/resello/image/upload/v1665384167/w_500%2Cq_auto%2Cf_auto/poma08r3opmfkli09ztr.jpg";
function Orders() {
  const id = 133;
  const { data, loading, error } = useFetch(`/resello/api/v1/cms/listOrder`);
  console.log(data);
  const [orders, setOrders] = useState(null);
  console.log(orders);
  function setDataHandler() {
    if (data && data.status === 200) {
      setOrders(data?.data.order);
    } else if (data.status === 202) {
      setOrders(null);
    }
  }
  useEffect(() => {
    // setPagination(calculateRange(data, 8));
    setDataHandler();
  }, [data]);

  return (
    <div className="dashboard-content">
      <DashboardHeader btnText="New Order" />
      <div className="dashboard-content-container">
        <div className="dashboard-content-header details">
          <h3 className="order-title">Order Detail</h3>
          {orders?.length !== 0 ? console.log(orders) : "no Data"}
          <div className="order-detail detail">
            <div className="img-sec">
              <img src={imgs} alt="product image" />
            </div>
            <div className="order_detail">
              <label htmlFor="id">Order Id</label>
              <div className="input">
                <input type="text" id="id" value="" />
              </div>
              <label htmlFor="id">User Id</label>
              <div className="input">
                <input type="text" value="" />
              </div>
              <label htmlFor="id">Order Number</label>
              <div className="input">
                <input type="text" value="" />
              </div>
              <label htmlFor="id">Order Date</label>
              <div className="input">
                <input type="text" value="" />
              </div>
            </div>
            {/*  */}
            <div className="order_detail">
              <label htmlFor="id">Order Id</label>
              <div className="input">
                <input type="text" id="id" value="" />
              </div>
              <label htmlFor="id">User Id</label>
              <div className="input">
                <input type="text" value="" />
              </div>
              <label htmlFor="id">Order Number</label>
              <div className="input">
                <input type="text" value="" />
              </div>
              <label htmlFor="id">Order Date</label>
              <div className="input">
                <input type="text" value="" />
              </div>
            </div>
          </div>
          <div className="line"></div>
          <div className="ship-detail">
            <h3 className="ship-title">Shiping Detail</h3>
            <div className="sec">
              <div className="order_detail">
                <label htmlFor="id">Order Id</label>
                <div className="input">
                  <input type="text" id="id" value="" />
                </div>
                <label htmlFor="id">User Id</label>
                <div className="input">
                  <input type="text" value="" />
                </div>
                <label htmlFor="id">Order Number</label>
                <div className="input">
                  <input type="text" value="" />
                </div>
                <label htmlFor="id">Order Date</label>
                <div className="input">
                  <input type="text" value="" />
                </div>
              </div>

              <div className="order_detail">
                <label htmlFor="id">Order Id</label>
                <div className="input">
                  <input type="text" id="id" value="" />
                </div>
                <label htmlFor="id">User Id</label>
                <div className="input">
                  <input type="text" value="" />
                </div>
                <label htmlFor="id">Order Number</label>
                <div className="input">
                  <input type="text" value="" />
                </div>
                <label htmlFor="id">Order Date</label>
                <div className="input">
                  <input type="text" value="" />
                </div>
              </div>
            </div>
          </div>
          <div className="line"></div>
          <div className="customer-detail ">
            <h3 className="ship-title">Customer Detail</h3>
            <div className="sec">
              <div className="order_detail">
                <label htmlFor="id">Order Id</label>
                <div className="input">
                  <input type="text" id="id" value="" />
                </div>
                <label htmlFor="id">User Id</label>
                <div className="input">
                  <input type="text" value="" />
                </div>
                <label htmlFor="id">Order Number</label>
                <div className="input">
                  <input type="text" value="" />
                </div>
                <label htmlFor="id">Order Date</label>
                <div className="input">
                  <input type="text" value="" />
                </div>
              </div>
              <div className="order_detail">
                <label htmlFor="id">Order Id</label>
                <div className="input">
                  <input type="text" id="id" value="" />
                </div>
                <label htmlFor="id">User Id</label>
                <div className="input">
                  <input type="text" value="" />
                </div>
                <label htmlFor="id">Order Number</label>
                <div className="input">
                  <input type="text" value="" />
                </div>
                <label htmlFor="id">Order Date</label>
                <div className="input">
                  <input type="text" value="" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Orders;
