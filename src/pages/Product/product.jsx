import React, { useState, useEffect } from "react";
import DashboardHeader from "../../components/DashboardHeader";

// import all_products from "../../constants/product.js";
import useFetch from "../../hooks/useFetch.js";

import "../styles.css";

function Orders() {
  const [page, setPage] = useState(1);
  const [per_page, setPer_Page] = useState(10);
  const [sort_Order, setSort_Order] = useState("DESC");
  const { data, loading, reFetch } = useFetch(
    `/resello/api/v1/cms/listOrder?transStatus=Pending&page=${page}&per_page=${per_page}&sort_order=${sort_Order}&sort_by=created_at`
  );
  console.log(data);
  const [products, setProducts] = useState(null);

  console.log(products);

  useEffect(() => {
    setProducts(data?.data?.order);
  }, [data]);
  console.log("data ====>  ", products);

  return (
    <div className="dashboard-content">
      <DashboardHeader btnText="New Product" />

      <div className="dashboard-content-container">
        <div className="dashboard-content-header">
          <h2>Products List</h2>
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
            <th>Image</th>
            <th>Title</th>
            <th>Price</th>
            <th>Category</th>
            <th>Action</th>
          </thead>

          {products?.length !== 0 ? (
            <tbody>
              {products?.map((product, index) => (
                <tr key={index}>
                  <td>
                    <span>{product.id}</span>
                  </td>
                  <td>
                    <div>
                      <img
                        src={product.image}
                        className="dashboard-content-avatar"
                        alt={product.title}
                      />
                    </div>
                  </td>
                  <td>
                    <span>{product.title}</span>
                  </td>
                  <td>
                    <span>{product.price}</span>
                  </td>

                  <td>
                    <span>{product.category}</span>
                  </td>
                  <td>
                    <button className="action_btn">View</button>
                  </td>
                </tr>
              ))}
            </tbody>
          ) : null}
        </table>

        {/* {products?.length !== 0 ? (
          <div className="dashboard-content-footer">
            {pagination.map((item, index) => (
              <span
                key={index}
                className={item === page ? "active-pagination" : "pagination"}
                // onClick={() => __handleChangePage(item)}
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
