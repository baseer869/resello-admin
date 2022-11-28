import React from "react";
import _ from "lodash";

function index(props) {
  const { orders, pagination, setPage, currentPage, setCurrentPage } = props;

  const pageCount = orders
    ? Math.ceil(pagination.count / pagination.per_page)
    : 0;
  if (pageCount === 0) return null;
  const pages = _.range(1, pageCount + 1);
  const nPages = pagination.count;
  //   for Previous page
  const nextPage = () => {
    if (currentPage !== nPages) setCurrentPage(currentPage + 1);
  };
  const prevPage = () => {
    if (currentPage !== 1) setCurrentPage(currentPage - 1);
  };

  return (
    <>
      <span className="pagination">
        <ul className="pagination-sec">
          <li onClick={() => setPage(currentPage - 1)}>
            <a href="#!" className="">
              Prev
            </a>
          </li>
          {pages?.map((page, index) => {
            return (
              <>
                <li className="dot-com">
                  <a href="#!" className="dots">
                    ...
                  </a>
                </li>
                <li
                  key={index}
                  className={page === currentPage ? "active" : ""}
                  onClick={() => setPage(page)}
                >
                  <a href="#!" key={index} className="">
                    {page}
                  </a>
                </li>
                <li className="dot-com">
                  <a href="#!" className="dots">
                    ...
                  </a>
                </li>
              </>
            );
          })}
          <li onClick={() => setPage(currentPage + 1)}>
            <a href="#!" className="">
              Next
            </a>
          </li>
        </ul>
      </span>
    </>
  );
}

export default index;
