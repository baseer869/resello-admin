import React, { useEffect, useState } from "react";
import DashboardHeader from "../../components/DashboardHeader";

import useFetch from "../../hooks/useFetch";

const cardDetails = [
  {
    productImage:
      "https://phonedroid.com.pk/wp-content/uploads/2022/09/apple-watch-ultra-1-500x500.jpeg?x64364",
    productName: "Apple Watch ulltra 49mm",
    Quantity: "2",
    Price: "88900",
  },
  {
    productImage:
      "https://s.yimg.com/uu/api/res/1.2/rE07qBdq9AnvGJrSkxLWyA--~B/Zmk9ZmlsbDtoPTQwNTt3PTY3NTthcHBpZD15dGFjaHlvbg--/https://s.yimg.com/os/creatr-uploaded-images/2022-09/757bc950-2ed2-11ed-bcfa-7d344d3eacf7.cf.jpg",
    productName: "Apple Watch ulltra 49mm",
    Quantity: "1",
    Price: "49900",
  },
  {
    productImage:
      "https://i3-prod-assets.indiaistore.com/files/uploads/products/pdp/apple-watch-ultra-starlight/pdp_1664432815_386.png",
    productName: "Apple Watch ulltra 49mm",
    Quantity: "3",
    Price: "138900",
  },
];
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
          {orders?.length !== 0 ? console.log(orders) : "no Data"}
          <h3 className="order-title">Order Detail</h3>
          <div className="order-detail detail">
            <div className="order_detail">
              <label htmlFor="id">Order Number</label>
              <div className="input">
                <input type="text" id="id" value="" placeholder=" 38833" />
              </div>
              <label htmlFor="id">Paid</label>
              <div className="input">
                <input type="text" value="" placeholder=" Yes" />
              </div>
              <label htmlFor="id">Profit</label>
              <div className="input">
                <input type="text" value="" placeholder=" 300" />
              </div>
            </div>
            {/*  */}
            <div className="order_detail">
              <label htmlFor="id">Status</label>
              <div className="input">
                <input type="text" id="id" value="" placeholder="Completed" />
              </div>
              <label htmlFor="id">Order Date</label>
              <div className="input">
                <input type="text" value="" placeholder="2022-02-01" />
              </div>
            </div>
          </div>
          <div className="ship-detail">
            <h3 className="ship-title">Shiping information</h3>
            <div className="sec">
              <div className="order_detail">
                <label htmlFor="id">Order By</label>
                <div className="input">
                  <input
                    type="text"
                    id="id"
                    value=""
                    placeholder="Seller Name"
                  />
                </div>
                <label htmlFor="id">Phone Number</label>
                <div className="input">
                  <input
                    type="text"
                    value=""
                    placeholder="Customer Phone Number"
                  />
                </div>
              </div>

              <div className="order_detail">
                <label htmlFor="id">Order To</label>
                <div className="input">
                  <input
                    type="text"
                    id="id"
                    value=""
                    placeholder="Customer Name"
                  />
                </div>
                <label htmlFor="id">Address</label>
                <div className="input">
                  <input
                    type="text"
                    value=""
                    placeholder="Customer Shiping Address"
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="customer-detail ">
            <h3 className="ship-title">Product details</h3>
            {cardDetails.map((item, index) => {
              return (
                <>
                  <div className="sec">
                    <div className="card-detail">
                      <div className="card-img">
                        <img src={item.productImage} alt="product image" />
                      </div>
                      <div className="card-body">
                        <h5>{item.productName}</h5>
                        <h5>QTY: {item.Quantity}</h5>
                        <h5>Price: {item.Price}</h5>
                      </div>
                    </div>
                  </div>
                </>
              );
            })}

            {/* <div className="sec">
              <div className="order_detail">
                <div className="card-img">
                  <img src="" alt="" />
                </div>
                <div className="card-body">
                  <h5>apple watch</h5>
                  <h5>QTY: 2</h5>
                  <h5>Price: 88000</h5>
                </div>
              </div>
            </div> */}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Orders;
