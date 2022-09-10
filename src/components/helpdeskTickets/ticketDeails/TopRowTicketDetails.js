import React, { useState } from "react";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  Input,
  Form,
  FormText,
  Button,
} from "reactstrap";

const TopRowTicketDetails = React.memo(
  ({ selectedTicket, handleAddComment }) => {
    const [attachment, setAttachment] = useState({});
    const [inputFields, setInputFields] = useState(null);

    // Function.

    const handleSelectAttachement = (e) => {
      if (e.target.files.length) {
        setAttachment(e.target.files[0]);
      }
    };
    // input field change funtion. ----------------------
    const handleChangeInput = (e) => {
      setInputFields({
        ...inputFields,
        [e.target.name]: e.target.value,
      });
    };

    // function on submit commet.----------------------------------
    const handleSubmitComment = (e) => {
      e.preventDefault();
      handleAddComment(inputFields);
    };

    return (
      selectedTicket !== null && (
        <div>
          <div className="d-flex ">
            <div className="tab-view-left-icon">
              <i className="fas fa-desktop"></i>
            </div>
            <div className="flex-fill tab-view-right-content  ">
              <div
              //   onClick={() => handleOnclickSubCategory(data)}
              >
                <h5 className="d-inline">
                  {selectedTicket.categoriesName} /{" "}
                  {selectedTicket.subcategoriesname} /
                </h5>
                <span className="d-inline  text-muted">
                  {" "}
                  {selectedTicket.ticketId}
                </span>
              </div>
              <div className="text-muted sub-heading">
                {selectedTicket.ticketHeading}
              </div>
            </div>
          </div>
          <div className="ml-4 d-flex  ">
            <div className="employee-image ">
              <img
                class="profile-img-table"
                alt=""
                src={require(`../../../img/employee/${selectedTicket.profilePicture}`)}
              />
            </div>
            <div className="w-100 ml-2 mt-1">
              <Form onSubmit={handleSubmitComment}>
                <InputGroup>
                  <Input
                    bsSize="sm"
                    name="comment"
                    placeholder="Comment on this request"
                    onChange={(e) => handleChangeInput(e)}
                  />

                  <label htmlFor="upload-attachment">
                    <InputGroupAddon addonType="append">
                      <InputGroupText
                        style={{ background: "transparent", border: "none" }}
                      >
                        <i className="fas fa-paperclip"></i>
                        <input
                          id="upload-attachment"
                          type="file"
                          style={{ display: "none" }}
                          onChange={(e) => handleSelectAttachement(e)}
                        ></input>
                      </InputGroupText>
                    </InputGroupAddon>
                  </label>
                  <Button
                    outline
                    color="primary"
                    size="sm"
                    className="ml-1"
                    style={{ height: "32px" }}
                  >
                    Submit
                  </Button>
                </InputGroup>
                <FormText color="muted">{attachment?.name ?? ""}</FormText>
              </Form>
            </div>
          </div>
        </div>
      )
    );
  }
);

export default TopRowTicketDetails;
