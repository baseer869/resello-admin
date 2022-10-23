import React, { useState, useEffect } from "react";
import DashboardHeader from "../../components/DashboardHeader";
import { BASE_URL } from "../../config/config";
import Api from "../../services";
import "../styles.css";
function UserListView() {

  const [search, setSearch] = useState("");
  const [userList, setUserList] = useState(null);

  //--//
  async function setDataHandler() {
    let response = await Api(`${BASE_URL}/usersList`, null, 'GET', null)
    console.log('response of user List ', response);
    if (response && response.status === 200) {
      setUserList(response?.data.users);
    } else if (response.status === 202) {
      setUserList(null);
    }
  }

  //--//
  useEffect(() => {
    setTimeout(() => {
      setDataHandler();
    }, 200);
  }, []);


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
              // onChange={(e) => __handleSearch(e)}
            />
          </div>
        </div>
        <table>
          <thead>
            <th>ID</th>
            <th>USERNAME</th>
            <th>ROLE</th>
            <th>PROFIT</th>
            <th>STATUS</th>
          </thead>

          {userList?.length !== 0 ? (
            <tbody>
              {userList?.map((user, index) => (
                <tr key={index}>
                  <td>
                    <span class="text-style">{user.id}</span>
                  </td>
                  <td>
                    <span class="text-style">{user.username}</span>
                  </td>
                  <td>
                    <span class="text-style">{user.userType}</span>
                  </td>
                  <td>
                    <span class="text-style">{user.balance}</span>
                  </td>
                  <td >
                    <span class="text-style">{user.status}</span>
                  </td>
                  {/* <td>
                    <button className="action_btn">View</button>
                  </td> */}
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

export default UserListView;
