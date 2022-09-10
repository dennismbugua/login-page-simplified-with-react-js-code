import React, { useState, useEffect, useRef } from "react";
import { Col, Row, Button, Form, FormGroup, Label, Input } from "reactstrap";
import SelectBoxSearch from "../../common/SelectBoxSearch";
import useFormValidation from "../../common/useFormValidation";

const FormAddEditAssetItem = React.memo((props) => {
  const {
    selectedItem,
    selectedAsset,
    userList,
    handleAddAsset,
    handleUpdateAsset,
  } = props;
  const [itemNo, setItemNo] = useState(0);
  const [itemModel, setItemModel] = useState("");
  const [itemUniqueId, setItemUniqueId] = useState("");
  const [itemModelNo, setItemModelNo] = useState("");
  const [itemUser, setItemUser] = useState(0);
  const [warrantyEndDate, setWarrantyEndDate] = useState("");
  const [warrentyFile, setWarrentyFile] = useState("");
  const [purchaseDate, setPurchaseDate] = useState("");
  const [vendor, setVendor] = useState("");
  // for item inside asset.
  const [
    formValidationStateAssetItem,
    setFormValidationStateAssetItem,
  ] = useState({});
  const callValidationAssetItem = useRef(false);

  const { formValidation, isFormValid } = useFormValidation(
    formValidationStateAssetItem
  ); // for item inside asset.
  useEffect(() => {
    // calls when asset item's add&edit form is submited.
    callValidationAssetItem.current && callBackAfterValidationAssetItem();
  }, [formValidation]);

  useEffect(() => {
    if (selectedAsset !== "") {
      setItemNo(selectedAsset.itemNo);
      setItemModel(selectedAsset.itemModel);
      setItemUniqueId(selectedAsset.uniqueIdentificationNumber);
      setItemModelNo(selectedAsset.modelNo);
      setVendor(selectedAsset.vendor);
      setPurchaseDate(selectedAsset.purchaseDate.substring(0, 10));
      setWarrantyEndDate(selectedAsset.warrantyEndDate.substring(0, 10));
      let assignedUser = userList.filter(
        (emp) => emp.value.employeeId === selectedAsset.employeeId
      );

      setItemUser(assignedUser.legth >= 0 ? assignedUser[0] : 0); // set user to search select box, took index cuz only one value will be there.
      setWarrentyFile(selectedAsset.WarrantyFileUpload);
    } else {
      setItemNo(0);
      setItemModel("");
      setItemUniqueId("");
      setItemModelNo("");
      setVendor("");
      setItemUser(0);
      setPurchaseDate(
        `${new Date().getFullYear()}-0${new Date().getMonth()}-${new Date().getDate()}`
      );
      setWarrantyEndDate(
        `${new Date().getFullYear()}-0${new Date().getMonth()}-${new Date().getDate()}`
      );
    }
  }, [selectedItem, selectedAsset, userList]);

  // function
  const handleFormSubmit = React.useCallback(() => {
    // e.preventDefault();
    console.log(typeof warrentyFile);
    console.log(warrentyFile);

    console.log(itemUser?.value?.employeeId ?? 0);
    let AssetFormData = new FormData();
    AssetFormData.set("itemNo", itemNo);
    AssetFormData.set("itemId", selectedItem.itemId);
    AssetFormData.set("itemModel", itemModel);
    AssetFormData.set("uniqueIdentificationNumber", itemUniqueId);
    AssetFormData.set("modelNo", itemModelNo);
    AssetFormData.set("purchaseDate", purchaseDate);
    AssetFormData.set("vendor", vendor);
    AssetFormData.set("warentyDetails", "");
    AssetFormData.set("warrantyEndDate", warrantyEndDate);
    AssetFormData.set(
      "employeeId",
      // itemUser !== 0 ? itemUser.value.employeeId : 0
      itemUser?.value?.employeeId ?? 0
    );
    AssetFormData.append("WarrantyFileUpload", warrentyFile);
    // console.log(warrentyFile);
    // warrentyFileData.append("file", warrentyFile);

    // let AssetFormData = {
    //   itemNo: itemNo,
    //   itemId: props.selectedItem.itemId,
    //   itemModel: itemModel,
    //   uniqueIdentificationNumber: itemUniqueId,
    //   modelNo: itemModelNo,
    //   purchaseDate: purchaseDate,
    //   vendor: vendor,
    //   warentyDetails: "",
    //   warrantyEndDate: warrantyEndDate,
    //   employeeId: itemUser !== 0 ? itemUser.value.employeeId : 0,
    //   // WarrantyFileUpload: warrentyFile !== "" ? warrentyFile[0].name : "", //file name.
    // };

    if (selectedAsset !== "") {
      handleUpdateAsset(AssetFormData);
    } else {
      handleAddAsset(AssetFormData);
    }
  }, [
    itemModel,
    itemNo,
    itemModelNo,
    itemUniqueId,
    itemUser,
    // props,
    selectedItem,
    handleAddAsset,
    handleUpdateAsset,
    purchaseDate,
    selectedAsset,
    vendor,
    warrantyEndDate,
    warrentyFile,
  ]);
  // asset item valdation's and ADD&EDIT call.
  const formValidationOnSubmitAddAssetItem = React.useCallback(
    (e) => {
      e.preventDefault();
      let formValidationList = {
        // key name should be same as the input field name to represtent in form.
        itemModel: {
          required: true,
          isValid: true,
          value: itemModel,
          errorMessage: "",
        },
        itemUniqueId: {
          required: true,
          isValid: true,
          value: itemUniqueId,
          errorMessage: "",
        },
      };
      setFormValidationStateAssetItem(formValidationList); //this set call the custom hook useFormValidation.
      callValidationAssetItem.current = true;
    },
    [itemModel, itemUniqueId]
  );

  // asset add after validation.
  const callBackAfterValidationAssetItem = React.useCallback(() => {
    if (isFormValid) {
      // if form valid.
      handleFormSubmit();
    }
  }, [isFormValid, handleFormSubmit]);

  return (
    <Form>
      <Row form>
        <Col md={6}>
          <FormGroup>
            <Label for="exampleEmail">Asset</Label>
            <Input type="text" value={props.selectedItem.itemName} disabled />
          </FormGroup>
        </Col>
        <Col md={6}>
          <FormGroup>
            <Label for="examplePassword">Item No</Label>
            <Input type="text" value={props.selectedItem.itemId} disabled />
          </FormGroup>
        </Col>
      </Row>
      <Row form>
        <Col md={6}>
          <FormGroup>
            <Label for="exampleEmail">Item Model</Label>
            <Input
              type="text"
              placeholder="Enter Item Model"
              value={itemModel}
              onChange={(e) => setItemModel(e.target.value)}
            />
            {
              // Object.keys(formValidation).length !== 0 &&
              !formValidation?.itemModel?.isValid && (
                <span className=" " style={{ color: "red" }}>
                  {formValidation?.itemModel?.errorMessage}
                </span>
              )
            }
          </FormGroup>
        </Col>
        <Col md={6}>
          <FormGroup>
            <Label for="examplePassword">Unique ID</Label>
            <Input
              type="text"
              name="uniquieId"
              placeholder="Enter Unique ID"
              value={itemUniqueId}
              onChange={(e) => setItemUniqueId(e.target.value)}
            />
            {
              // Object.keys(formValidation).length !== 0 &&
              !formValidation?.itemUniqueId?.isValid && (
                <span className=" " style={{ color: "red" }}>
                  {formValidation?.itemUniqueId?.errorMessage}
                </span>
              )
            }
          </FormGroup>
        </Col>
      </Row>
      <Row form>
        <Col md={6}>
          <FormGroup>
            <Label for="exampleEmail">Model No</Label>
            <Input
              type="text"
              name="modelNo"
              placeholder="Enter Model No"
              value={itemModelNo}
              onChange={(e) => setItemModelNo(e.target.value)}
            />
          </FormGroup>
        </Col>
        <Col md={6}>
          <FormGroup>
            <Label for="examplePassword">Vendor</Label>
            <Input
              type="text"
              value={vendor}
              onChange={(e) => setVendor(e.target.value)}
            />
          </FormGroup>
        </Col>
      </Row>
      <Row form>
        <Col md={6}>
          <Row>
            <Col md={6}>
              <FormGroup>
                <Label>User</Label>
                <SelectBoxSearch
                  selectedUser={itemUser}
                  options={userList}
                  onChange={(selectedOption) => setItemUser(selectedOption)}
                ></SelectBoxSearch>
              </FormGroup>
            </Col>
            <Col md={6}>
              <FormGroup>
                <Label for="exampleEmail">Purchase Date</Label>
                <Input
                  type="date"
                  value={purchaseDate}
                  onChange={(e) => setPurchaseDate(e.target.value)}
                />
              </FormGroup>
            </Col>
          </Row>
        </Col>
        <Col md={6}>
          <Row>
            <Col md={6}>
              <FormGroup>
                <Label for="exampleEmail">Warranty End Date</Label>
                <Input
                  type="date"
                  value={warrantyEndDate}
                  onChange={(e) => setWarrantyEndDate(e.target.value)}
                />
              </FormGroup>
            </Col>
            <Col md={6}>
              <FormGroup>
                <Label for="exampleEmail">Warrenty File</Label>
                <Input
                  type="file"
                  onChange={(e) => setWarrentyFile(e.target.files[0])}
                />
              </FormGroup>
            </Col>
          </Row>
        </Col>
      </Row>

      <Row>
        <Col className="text-center">
          <Button
            type="submit"
            color=""
            className="btn-admin-settings"
            // onClick={handleFormSubmit}
            onClick={formValidationOnSubmitAddAssetItem}
          >
            {selectedAsset !== "" ? "Update" : "Add"}
          </Button>
          &nbsp;
          <Button color="" className="btn-cancel" onClick={props.handleCancel}>
            cancel
          </Button>
        </Col>
      </Row>
    </Form>
  );
});

export default FormAddEditAssetItem;
