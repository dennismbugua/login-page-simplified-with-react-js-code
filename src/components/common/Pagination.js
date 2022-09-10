import React, { Fragment } from "react";
import { Pagination, PaginationItem, PaginationLink } from "reactstrap";
let first = 1;
let second = 2;
let thirid = 3;
let forth = 4;
let fifth = 5;

const PaginationLayOut = React.memo(
  ({ totalPost, postPerPage, handlePageClick, currentPage }) => {
    const pageNumber = [];

    const totalPageNum = Math.ceil(totalPost / postPerPage);
    for (let i = 1; i <= Math.ceil(totalPost / postPerPage); i++) {
      pageNumber.push(i);
    }

    const nextBtnClick = () => {
      let lastPageNo = fifth + 1;
      if (lastPageNo <= totalPageNum) {
        first = fifth + 1;
        second = fifth + 2;
        thirid = fifth + 3;
        forth = fifth + 4;
        fifth = fifth + 5;
        handlePageClick(first);
      }
    };
    const prevBtnClick = () => {
      if (![1, 2, 3, 4, 5].includes(currentPage)) {
        fifth = first - 1;
        forth = first - 2;
        thirid = first - 3;
        second = first - 4;
        first = first - 5;
        handlePageClick(first);
      }
    };
    const firstBtnClick = () => {
      first = 1;
      second = 2;
      thirid = 3;
      forth = 4;
      fifth = 5;
      handlePageClick(1);
    };

    const lastBtnClick = () => {
      if (totalPageNum > 5) {
        fifth = totalPageNum;
        forth = totalPageNum - 1;
        thirid = totalPageNum - 2;
        second = totalPageNum - 3;
        first = totalPageNum - 4;
      }

      handlePageClick(totalPageNum);
    };
    return (
      <Pagination aria-label="Page navigation example" className="mt-2">
        {console.log("pagination")}

        {totalPageNum < 5 ? (
          <Fragment>
            <PaginationItem>
              <PaginationLink
                previous
                onClick={() => handlePageClick(currentPage - 1)}
              />
            </PaginationItem>
            {pageNumber.map((pageNum) => (
              <PaginationItem
                key={pageNum}
                active={pageNum === currentPage ? true : null}
              >
                <PaginationLink onClick={() => handlePageClick(pageNum)}>
                  {pageNum}
                </PaginationLink>
              </PaginationItem>
            ))}
            <PaginationItem>
              <PaginationLink
                next
                onClick={() => handlePageClick(currentPage + 1)}
              />
            </PaginationItem>
          </Fragment>
        ) : null}
        {totalPageNum > 5 ? (
          <Fragment>
            <PaginationItem>
              <PaginationLink first onClick={firstBtnClick} />
            </PaginationItem>
            <PaginationItem>
              <PaginationLink
                previous
                onClick={() => {
                  prevBtnClick();
                }}
              />
            </PaginationItem>
            <PaginationItem active={first === currentPage ? true : null}>
              <PaginationLink onClick={() => handlePageClick(first)}>
                {first}
              </PaginationLink>
            </PaginationItem>
            <PaginationItem active={second === currentPage ? true : null}>
              <PaginationLink onClick={() => handlePageClick(second)}>
                {second}
              </PaginationLink>
            </PaginationItem>
            <PaginationItem active={thirid === currentPage ? true : null}>
              <PaginationLink
                onClick={() => {
                  handlePageClick(thirid);
                }}
              >
                {thirid}
              </PaginationLink>
            </PaginationItem>
            <PaginationItem active={forth === currentPage ? true : null}>
              <PaginationLink
                onClick={() => {
                  handlePageClick(forth);
                }}
              >
                {forth}
              </PaginationLink>
            </PaginationItem>
            <PaginationItem active={fifth === currentPage ? true : null}>
              <PaginationLink
                onClick={() => {
                  handlePageClick(fifth);
                }}
              >
                {fifth}
              </PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationLink
                next
                onClick={() => {
                  nextBtnClick();
                }}
              />
            </PaginationItem>
            <PaginationItem>
              <PaginationLink last onClick={lastBtnClick} />
            </PaginationItem>
          </Fragment>
        ) : null}

        {/* {pageNumber.map((pageNum) => (
        <PaginationItem key={pageNum}>
          <PaginationLink onClick={() => handlePageClick(pageNum)}>
            {pageNum}
          </PaginationLink>
        </PaginationItem>
      ))} */}
      </Pagination>
    );
  }
);

export default PaginationLayOut;
