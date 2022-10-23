import React, { useEffect, useState, Image } from "react";
import DashboardHeader from "../../components/DashboardHeader";
import { useParams } from 'react-router-dom';

import useFetch from "../../hooks/useFetch";
import Api from "../../services";
import { BASE_URL } from "../../config/config";

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
function OrdersView() {
  const params = useParams();
  let id = parseInt(params.id)


  //--//
  const [ordersDetails, setOrdersDetail] = useState(null);
  const [shippingInfo, setShippingInfo] = useState(null)

  async function setDataHandler() {
    let response = await Api(`${BASE_URL}/orderDetail/${id}`, null, 'GET', null)
    console.log('response of details ', response);
    if (response && response.status === 200) {
      setOrdersDetail(response?.data.details);
      setShippingInfo(response?.data.user);
    } else if (response.status === 202) {
      setOrdersDetail(null);
    }
  }

  //--//
  useEffect(() => {
    // setPagination(calculateRange(data, 8));
    setTimeout(() => {
      setDataHandler();
    }, 200);
  }, [id]);

  return (
    <div className="dashboard-content">
      <DashboardHeader btnText="New Order" />
      <div className="dashboard-content-container">
        {ordersDetails && ordersDetails?.length !== 0 ?

          <div className="dashboard-content-header details">
            <h3 className="order-title">Order Detail</h3>
            <div className="order-detail detail">
              <div className="order_detail">
                <label htmlFor="id">Order Number</label>
                <div className="input">
                  <input type="text" id="id" value={ordersDetails !== null ? ordersDetails[0]?.orderNumber : "Not found"} placeholder="" />
                </div>
                <label htmlFor="id">Paid</label>
                <div className="input">
                  <input type="text" value={ordersDetails !== null ? ordersDetails[0]?.paid : ""} placeholder="Yes/No" />
                </div>
                <label htmlFor="id">Profit</label>
                <div className="input">
                  <input type="text" value={ordersDetails !== null ? ordersDetails[0]?.margin : ""} placeholder="Profit" />
                </div>
              </div>
              {/*  */}
              <div className="order_detail">
                <label htmlFor="id">Status</label>
                <div className="input">
                  <input type="text" id="id" value={ordersDetails !== null ? ordersDetails[0]?.transactionStatus : ""} placeholder="Completed" />
                </div>
                <label htmlFor="id">Order Date</label>
                <div className="input">
                  <input type="text" value={ordersDetails !== null ? ordersDetails[0]?.orderDate : ""} placeholder="YYYY-MM-DD" />
                </div>
              </div>
            </div>
            <div className="ship-detail">
              <h3 className="ship-title">Shiping information</h3>
              <div className="sec">
                <div className="order_detail">
                  <label htmlFor="id">Seller name</label>
                  <div className="input">
                    <input
                      type="text"
                      id="id"
                      value={shippingInfo ? shippingInfo?.username : ""}
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
                  <label htmlFor="id">Customer name</label>
                  <div className="input">
                    <input
                      type="text"
                      id="id"
                      value={shippingInfo ? shippingInfo?.shipping_details[0]?.customer_name : ""}
                      placeholder="Customer Name"
                    />
                  </div>
                  <label htmlFor="id">Address</label>
                  <div className="input">
                    <input
                      type="text"
                      value={shippingInfo ? shippingInfo?.shipping_details[0]?.address : ""}
                      placeholder="Customer Shiping Address"
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="customer-detail ">
              <h3 className="ship-title">Product details</h3>
              {ordersDetails[0]?.orderdetails?.map((item, index) => {
                let { product } = item;
                console.log('product',);
                return (
                  <>
                    <div className="sec">
                      <div className="card-detail">
                        <div className="card-img">
                          <img src={product?.product_images[0]?.uri} style={{ width: "30%", height: '30%' }} alt="product image" />
                        </div>
                        <div className="card-body">
                          <h5>{product?.name}</h5>
                          <h5>QTY: {item.quantity}</h5>
                          <h5>Price: {item?.price}</h5>
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
          : "Loading"}
      </div>
    </div>
  );
}

export default OrdersView;
