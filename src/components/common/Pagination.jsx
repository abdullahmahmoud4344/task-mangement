import React from "react";
import _ from "lodash";

const Pagination = ({ itemCount, pageSize, onPageChange, currentPage }) => {
  const pagesCount = Math.ceil(itemCount / pageSize);
  const pages = _.range(1, pagesCount + 1);

  return (
    <nav aria-label="Page navigation">
      <ul className="pagination justify-content-center">
        {pages.map((page) => (
          <li
            className={`page-item ${currentPage === page ? "active" : ""}`}
            key={page}
          >
            <a
              className="page-link"
              href="#"
              onClick={(e) => {
                e.preventDefault();
                onPageChange(page);
              }}
            >
              {page}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Pagination;
