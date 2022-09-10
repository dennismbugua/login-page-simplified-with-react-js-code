import PropTypes from "prop-types";
import React from "react";

const PageSpinner = ({ color = "primary" }) => {
  return (
    <div className="cr-page-spinner text-center" style={{ marginTop: "200px" }}>
      <div className="text-center">
        <div className="spinner-border" role="status">
          <span className="sr-only">Loading...</span>
        </div>
      </div>
    </div>
  );
};

PageSpinner.propTypes = {
  color: PropTypes.oneOf([
    "primary",
    "secondary",
    "success",
    "danger",
    "warning",
    "info",
    "light",
    "dark",
  ]),
};

export default PageSpinner;
