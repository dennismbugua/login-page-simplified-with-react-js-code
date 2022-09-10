import React, { useEffect } from "react";
// import styled from "styled-components";
import { useTable, usePagination, useSortBy } from "react-table";
import {
  Table,
  Row,
  Col,
  Pagination,
  PaginationItem,
  PaginationLink,
} from "reactstrap";

function TableView({ columns, data }) {
  // Use the state and functions returned from useTable to build your UI
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    page, // Instead of using 'rows', we'll use page,
    // which has only the rows for the active page

    // The rest of these things are super handy, too ;)
    canPreviousPage,
    canNextPage,
    pageOptions,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,
    state: { pageIndex, pageSize },
  } = useTable(
    {
      columns,
      data,
      initialState: { pageIndex: 0 },
    },
    useSortBy,
    usePagination
  );
  useEffect(() => {
    // set the page size to 5.
    setPageSize(5);
  }, [setPageSize]);

  // Render the UI for your table
  return (
    <>
      {/* <div style={{ width: "100%", overflowY: "auto" }}> */}
      <Row className="mb-2" id="showPageCountInTable">
        <Col sm={2}>
          <select
            className="form-control"
            value={pageSize}
            onChange={(e) => {
              setPageSize(Number(e.target.value));
            }}
            // style={{ width: "140px" }}
          >
            {[5, 10, 20, 30, 40, 50].map((pageSize) => (
              <option key={pageSize} value={pageSize}>
                Show {pageSize}
              </option>
            ))}
          </select>
        </Col>
      </Row>

      <table
        className="table-with-pagination"
        cellspacing="0"
        cellpadding="0"
        border="0"
        width="100%"
      >
        {/* <tr>
          <td> */}
        {/* <div style={{ width: "500px", height: "180px", overflow: "auto" }}> */}
        <div
          className="main-div"
          // style={{ width: "500px", height: "180px", overflow: "auto" }}
        >
          <Table hover {...getTableProps()}>
            <thead>
              {headerGroups.map((headerGroup, p) => (
                <tr key={p} {...headerGroup.getHeaderGroupProps()}>
                  {headerGroup.headers.map((column) => (
                    <th
                      {...column.getHeaderProps(column.getSortByToggleProps())}
                    >
                      {/* Add a sort direction indicator */}
                      <span className="">
                        {column.render("Header")}

                        <small>
                          <i className="fas fa-exchange-alt fa-rotate-90 ml-3"></i>
                        </small>
                      </span>
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
            <tbody {...getTableBodyProps()}>
              {page.map((row, i) => {
                prepareRow(row);
                return (
                  <tr key={i} {...row.getRowProps()}>
                    {row.cells.map((cell, k) => {
                      return (
                        <td key={k} {...cell.getCellProps()}>
                          {cell.render("Cell")}
                        </td>
                      );
                    })}
                  </tr>
                );
              })}
            </tbody>
          </Table>
        </div>
        {/* </td>
        </tr> */}
      </table>

      {/* 
        Pagination can be built however you'd like. 
        This is just a very basic UI implementation:
      */}
      <Row className="table-pagination">
        <Col>
          <Pagination
            // size="sm"
            aria-label="Page navigation example"
            className="pagination"
          >
            <PaginationItem>
              <PaginationLink
                first
                onClick={() => gotoPage(0)}
                disabled={!canPreviousPage}
              />
            </PaginationItem>
            <PaginationItem>
              <PaginationLink
                previous
                onClick={() => previousPage()}
                disabled={!canPreviousPage}
              />
            </PaginationItem>
            &nbsp;
            <strong className="mt-1">
              {pageIndex + 1} of {pageOptions.length}
            </strong>
            &nbsp;
            <PaginationItem>
              <PaginationLink
                next
                onClick={() => nextPage()}
                disabled={!canNextPage}
              />
            </PaginationItem>
            <PaginationItem>
              <PaginationLink
                last
                onClick={() => gotoPage(pageCount - 1)}
                disabled={!canNextPage}
              />
            </PaginationItem>
          </Pagination>

          {/* <div className="pagination">
            <button onClick={() => gotoPage(0)} disabled={!canPreviousPage}>
              {"<<"}
            </button>{" "}
            <button onClick={() => previousPage()} disabled={!canPreviousPage}>
              {"<"}
            </button>
            <span>
              Page{" "}
              <strong>
                {pageIndex + 1} of {pageOptions.length}
              </strong>{" "}
            </span>
            <button onClick={() => nextPage()} disabled={!canNextPage}>
              {">"}
            </button>{" "}
            <button
              onClick={() => gotoPage(pageCount - 1)}
              disabled={!canNextPage}
            >
              {">>"}
            </button>{" "}
          </div> */}
        </Col>
        <Col>
          <Row className="table-goto-page">
            <Col sm={12} xs={6} md={7} lg={12}>
              <div
                className="input-group mb-3 float-right"
                style={{ width: "180px" }}
              >
                <div className="input-group-prepend">
                  <label className="input-group-text">Go to page</label>
                </div>
                <input
                  className="form-control"
                  type="number"
                  defaultValue={pageIndex + 1}
                  onChange={(e) => {
                    const page = e.target.value
                      ? Number(e.target.value) - 1
                      : 0;
                    gotoPage(page);
                  }}
                />
              </div>
              {/* <span>Go to page:
              <input
                  className="form-control"
                  type="number"
                  defaultValue={pageIndex + 1}
                  onChange={(e) => {
                    const page = e.target.value
                      ? Number(e.target.value) - 1
                      : 0;
                    gotoPage(page);
                  }}
                  style={{ width: "50px" }}
                />
              </span>{" "} */}
            </Col>
            {/* <Col sm={4} xs={6} md={5} lg={4}></Col> */}
          </Row>
        </Col>
      </Row>
      {/* </div> */}
    </>
  );
}
const TableWithSorPagtn = React.memo((props) => {
  const { thead } = props;
  // console.log("Table with sort and pagination");
  // const row = [
  //   { "employee name": "jerry", action: 28 },
  //   { "employee name": "jerry", action: 28 },
  // ];

  // const columns = React.useMemo(
  //   () => [
  //     {
  //       Header: "Employee Name",
  //       accessor: "Employee Name", // accessor is the "key" in the data
  //     },
  //     {
  //       Header: "age",
  //       accessor: "age",
  //     },
  //   ],
  //   []
  // );
  const columns = React.useMemo(
    () =>
      thead.map((el, i) => {
        return { Header: el, accessor: el };
      }),
    [thead]
  );
  const data = React.useMemo(() => props.trow, [props.trow]);

  return (
    // <Styles>

    <TableView columns={columns} data={data} />
    // </Styles>
  );
});

export default TableWithSorPagtn;
