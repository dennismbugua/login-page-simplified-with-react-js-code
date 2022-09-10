import React, { Fragment } from "react";

const SubCategories = React.memo(
  ({ selectedTabData, handleOnclickSubCategory }) => {
    return (
      <Fragment>
        <div className="helpdesk-tab-view">
          {selectedTabData.length > 0 &&
            selectedTabData.map((el) => (
              <div className="d-flex ">
                <div className="tab-view-left-icon">
                  <i className={"far fa-keyboard text-info"}></i>
                </div>
                <div className="flex-fill tab-view-right-content  ">
                  <div onClick={() => handleOnclickSubCategory(el)}>
                    <h5>{el.subcategoriesName}</h5>
                  </div>
                  <div className="text-muted sub-heading">{el.description}</div>
                </div>
              </div>
            ))}
        </div>
      </Fragment>
    );
  }
);

export default SubCategories;
