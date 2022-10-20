import React, { useState, useEffect } from "react";
import DashboardHeader from "../../components/DashboardHeader";

// import all_products from "../../constants/product.js";
import useFetch from "../../hooks/useFetch.js";
import { calculateRange, sliceData } from "../../utils/table-pagination";

import "../styles.css";

function Orders() {
  const { data, loading, error } = useFetch(
    "/resello/api/v1/cms/listOrder"
  );
  console.log(data);
  const [search, setSearch] = useState("");
  const [products, setProducts] = useState(null);
  const [page, setPage] = useState(1);
  const [pagination, setPagination] = useState([]);

  console.log(products);

  useEffect(() => {
    // setPagination(calculateRange(data, 8));
    setProducts(data?.data?.order);
  }, [ data]);
  console.log('data',data);
  
  const __handleSearch = (event) => {
    setSearch(event.target.value);
    if (event.target.value !== "") {
      let search_results = products.filter(
        (item) =>
          item.title.toLowerCase().includes(search.toLowerCase()) ||
          item.title.toLowerCase().includes(search.toLowerCase()) ||
          item.title.toLowerCase().includes(search.toLowerCase())
      );
      setProducts(search_results);
    } else {
      __handleChangePage(1);
    }
  };

  const __handleChangePage = (new_page) => {
    setPage(new_page);
    setProducts(sliceData(data, new_page, 8));
  };

  return (
    <div className="dashboard-content">
      <DashboardHeader btnText="New Product" />

      <div className="dashboard-content-container">
        <div className="dashboard-content-header">
          <h2>Products List</h2>
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
