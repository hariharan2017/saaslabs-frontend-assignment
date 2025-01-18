import { useEffect, useState, useMemo } from "react";
import styles from "./Table.module.css";

const pageSizeOptions = [5, 10, 15];
const PER_PAGE = 5;

export const Table = ({ data = [], columns = [], title, paginate }) => {
  const [page, setPage] = useState(0);
  const [perPage, setPerPage] = useState(PER_PAGE);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    if (data?.length) setTotalPages(Math.ceil(data?.length / perPage));
  }, [perPage, data?.length]);

  const paginatedData = useMemo(() => {
    return paginate ? data?.slice(page * perPage, (page + 1) * perPage) : data;
  }, [paginate, data, perPage, page]);

  useEffect(() => {
    setPage(0);
  }, [perPage]);

  return (
    <div className={styles["table-container"]}>
      {title && <header className={styles["table-title"]}>{title}</header>}
      <div className={styles["table-wrapper"]}>
        <table>
          <thead>
            <tr>
              {columns.map((col) => {
                return (
                  <th key={col?.id} className={styles["table-header"]}>
                    {col?.label}
                  </th>
                );
              })}
            </tr>
          </thead>
          <tbody>
            {paginatedData?.map((rowData) => {
              return (
                <tr key={rowData?.id}>
                  {columns?.map((col) => {
                    return (
                      <td
                        key={`${rowData?.id}-${rowData?.[col?.accessor]}`}
                        className={styles["table-data-item"]}
                      >
                        {rowData?.[col?.accessor]}
                      </td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
        {paginate && totalPages > 1 && (
          <div className={styles["table-footer"]}>
            <div>
              <span className={styles["pagesize-label"]}>Items per page</span>
              <select
                value={perPage}
                onChange={(e) => setPerPage(Number(e.target.value))}
              >
                {pageSizeOptions.map((sizeOption) => {
                  return (
                    <option key={"size " + sizeOption} value={sizeOption}>
                      {sizeOption}
                    </option>
                  );
                })}
              </select>
            </div>
            <div>
              <button
                disabled={page === 0}
                onClick={() => setPage((oldPage) => oldPage - 1)}
                className={styles["table-btn"]}
              >
                Prev
              </button>
              <span>
                {page + 1} of {totalPages}
              </span>
              <button
                disabled={page === totalPages - 1}
                onClick={() => setPage((oldPage) => oldPage + 1)}
                className={styles["table-btn"]}
              >
                Next
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
