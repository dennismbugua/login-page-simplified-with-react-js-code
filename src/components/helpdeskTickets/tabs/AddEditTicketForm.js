import React, { useState, useEffect } from "react";
import { Button, Form, FormGroup, Label, Input, FormText } from "reactstrap";
import DragDropImg from "../../common/DragDropImg";
import api from "../../../apis/api";

var loginUser = JSON.parse(localStorage.getItem("user"));

const AddEditTicketForm = React.memo(
  ({ selectedSubCatgory, toggleAddEditTicketFrom, updateTicketList }) => {
    console.log(selectedSubCatgory);
    const [inputFieldData, setInputFieldData] = useState(null);

    const [file, setFile] = useState(null);

    // set input values.
    useEffect(() => {
      console.log(selectedSubCatgory.ticketId);
      // on edit only set value to inputfield.
      if (selectedSubCatgory.ticketId !== undefined) {
        setInputFieldData({
          summary: selectedSubCatgory.summary,
          description: selectedSubCatgory.description,
        });
      }
    }, [selectedSubCatgory]);

    // Functions-----------------------------------------------------------------------
    const handleDrop = (files) => {
      setFile(files[0].name);
      console.log(files);
      // for (var i = 0; i < files.length; i++) {
      //   if (!files[i].name) return;
      //   fileList.push(files[i].name);
      // }
      // this.setState({ files: fileList });
    };

    // handle input field change value ----------------------------------------
    const handleInputChange = (e) => {
      setInputFieldData({
        ...inputFieldData,
        [e.target.name]: e.target.value,
      });
    };

    // handle submite function ----------------------------------------------

    const handleSubmit = (e) => {
      e.preventDefault();
      let formData = {};
      if (selectedSubCatgory.ticketId !== undefined) {
        // then UPDATED.
        formData = {
          ticketId: selectedSubCatgory.ticketId,
          employeeId: loginUser.employeeId,
          categoriesId: selectedSubCatgory.categoriesId,
          subcategoriesId: selectedSubCatgory.subcategoriesId,
          summary: inputFieldData.summary,
          description: inputFieldData.description,
          attachment: "abc",
          status: 1,
          taggedList: 0,
          createdDate: new Date(),
          createdBy: loginUser.employeeId,
          modifiedDate: new Date(),
          modifiedBy: 0,
        };
      } else {
        // then ADD.
        formData = {
          employeeId: loginUser.employeeId,
          categoriesId: selectedSubCatgory.categoriesId,
          subcategoriesId: selectedSubCatgory.subcategoriesId,
          summary: inputFieldData.summary,
          description: inputFieldData.description,
          attachment: "abc",
          status: 1,
          taggedList: 0,
          createdDate: new Date(),
          createdBy: loginUser.employeeId,
          modifiedDate: new Date(),
          modifiedBy: 0,
        };
      }

      api.helpdesk().addEditTicket(formData);
      // only calls when update function is prestent.
      if (updateTicketList !== undefined) {
        updateTicketList(formData);
      }
      // set input fields to null.
      setInputFieldData(null);
    };

    return (
      <div className="ticket-add-form">
        <div className="d-flex ">
          <div className="tab-view-left-icon">
            <i className={"far fa-keyboard text-info"}></i>
          </div>
          <div className="flex-fill tab-view-right-content  ">
            <div
            //   onClick={() => handleOnclickSubCategory(data)}
            >
              <h5>
                {selectedSubCatgory.categoriesName}/
                {selectedSubCatgory.subcategoriesname}
              </h5>
            </div>
            <div className="text-muted sub-heading">
              {selectedSubCatgory.subCatagorySubHeading}
            </div>
          </div>
        </div>

        <div>
          <Form onSubmit={handleSubmit}>
            <FormGroup>
              <Label for="exampleSelect">Location</Label>
              <Input type="select" name="select" id="exampleSelect">
                <option>Trivandrum</option>
                <option>2</option>
                <option>3</option>
                <option>4</option>
                <option>5</option>
              </Input>
              <FormText color="muted">
                Which office are you associated with.
              </FormText>
            </FormGroup>

            <FormGroup>
              <Label for="summary">Summary</Label>
              <Input
                type="text"
                name="summary"
                onChange={(e) => handleInputChange(e)}
                value={inputFieldData?.summary ?? ""}
              />
            </FormGroup>

            <FormGroup>
              <Label for="exampleText">Description</Label>
              <Input
                type="textarea"
                name="description"
                onChange={(e) => handleInputChange(e)}
                value={inputFieldData?.description ?? ""}
              />
            </FormGroup>
            {/* <FormGroup>
            <Label for="exampleFile">File</Label>
            <Input type="file" name="file" id="exampleFile" />
            <FormText color="muted">
              Attachment / Screenshot (optional)
            </FormText>
          </FormGroup> */}
            <FormGroup>
              <FormText color="muted">
                Attachment / Screenshot (optional)
              </FormText>
              <DragDropImg handleDropEvent={handleDrop}>{file}</DragDropImg>
            </FormGroup>

            <div className="text-center">
              <Button outline color="info">
                Add
              </Button>
              <Button
                className="ml-2"
                outline
                color="warning"
                onClick={toggleAddEditTicketFrom}
              >
                cancel
              </Button>
            </div>
          </Form>
        </div>
      </div>
    );
  }
);

export default AddEditTicketForm;
