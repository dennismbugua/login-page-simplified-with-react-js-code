import React, {
  useState,
  Fragment,
  useEffect,
  useRef,
  useCallback,
} from "react";
import { connect } from "react-redux";
import { getEmpList } from "../../../redux/actions/employee/employee.action";
import {
  getAllAsset,
  addAsset,
  updateAsset,
  delAsset,
  getItemsList,
  addItem,
} from "../../../redux/actions/adminSettings/adminSettings.action";
import { Button, Row, Col } from "reactstrap";
import {
  ListAssetItem,
  FormAddEditAssetItem,
  AssetsTabs,
} from "../../../components/adminSettings/assets/index";
import FormFields from "../../../components/adminSettings/FormFields";
import useFormValidation from "../../../components/common/useFormValidation";

const Assets = (props) => {
  const {
    getEmpList,
    getItemsList,
    getAllAsset,
    addAsset,
    updateAsset,
    delAsset,
    addItem,
  } = props;

  const { assetList, itemList } = props.assetList; // from reducer.
  // const { itemList } = props.itemList;
  const { empList } = props.empList; // user list.
  const [assets, setAssets] = useState([]);
  const [items, setItems] = useState([]);
  const [assetName, setAssetName] = useState(""); // main asset category :ie, mouse,keybord etc
  const [itemCategoryId, setItemCategoryId] = useState("");

  const [selectedAssetList, setSelectedAssetList] = useState("");
  const [selectedAsset, setSelectedAsset] = useState("");
  const [selectedItem, setSelectedItem] = useState("");

  const [isOpenGridView, setIsOpenGridView] = useState(true);
  const [isOpenForm, setIsOpenForm] = useState(false);
  const [isOpenAssetItems, setIsOpenAssetItems] = useState(false);
  const [isOpenFormAssetAddItems, setIsOpenFormAssetAddItems] = useState(false);
  // --------------------------------------------------------------------
  const [assetInpuFields] = useState([
    {
      label: "Item Name",
      type: "text",
      placeholder: "Enter Asset Name",
      name: "itemName", // this name should be equal to the name in api key's.
      handleOnChange: (val) => {
        setAssetName(val);
      },
    },
    {
      label: "Item Category",
      type: "select",
      name: "itemCategory",
      option: [
        { ItemCategoryId: 1, ItemCategoryName: "Software" },
        { ItemCategoryId: 2, ItemCategoryName: "hardware" },
      ],
      displayData: { selectedData: "ItemCategoryName", id: "ItemCategoryId" },
      handleOnChange: (val) => {
        setItemCategoryId(val);
      },
    },
  ]);
  const [formValidationState, setFormValidationState] = useState({});
  const callValidationAsset = useRef(false);

  useEffect(() => {
    getItemsList();
    getAllAsset();
    getEmpList();
  }, [getItemsList, getAllAsset, getEmpList]);

  // when itemList chanegs
  useEffect(() => {
    setItems(itemList);
  }, [itemList]);

  // custom hook.
  const assetAddFormValidation = useFormValidation(formValidationState);

  useEffect(() => {
    // calls when asset add form is submited.
    callValidationAsset.current && callBackAfterValidationAsset();
  }, [assetAddFormValidation.formValidation]);

  // Function -------------------
  // =============== Function for Asset main window.
  const toggleFromGridViews = useCallback(() => {
    // setIsOpenListView(!isOpenListView);
    setIsOpenGridView((prevState) => !prevState);
    setIsOpenAssetItems((prevState) => !prevState);
    // setIsOpenForm(false);
  }, [setIsOpenGridView, setIsOpenAssetItems]);

  const toggleFromGridViewsAddBtn = useCallback(() => {
    // setIsOpenListView(!isOpenListView);
    setIsOpenGridView((prevState) => !prevState);
    setIsOpenForm((prevState) => !prevState);
  }, [setIsOpenGridView, setIsOpenForm]);

  //  on click the tile ,open the listAssetItem.
  const handleSelectedItem = useCallback(
    (val, id) => {
      console.log(val);
      console.log(assetList);
      let assetArr = assetList.filter((el) => el.itemId === val.itemId);
      setSelectedAssetList(assetArr);
      // set seleted item.
      setSelectedItem(val);
    },
    [assetList]
  );

  // ======================== Functions for asset items listin window.
  //   handle asset item edit click from listAssetItem.js
  const handleEditAssetItem = (assetItemDate, i) => {
    setSelectedAsset(assetItemDate);
    toggleFromListAssetItems();
  };

  // toggle from Add and update buttons from listAssetItem.
  const toggleFromListAssetItems = React.useCallback(() => {
    setIsOpenFormAssetAddItems(true);
    setIsOpenAssetItems(false);
  }, []);

  // toggel from add edit asset form.
  const handleCancelFromListAssetItem = React.useCallback(() => {
    setSelectedAsset("");
    setIsOpenFormAssetAddItems(false);
    setIsOpenAssetItems(true);
  }, [setIsOpenFormAssetAddItems, setIsOpenAssetItems]);

  // ============================ CRUD Calls.

  // handle Delete asset by itemNo.
  const handleDelAsset = React.useCallback(
    (delId) => {
      delAsset(delId);
      handleSelectedItem(selectedItem);
    },
    [delAsset, selectedItem, handleSelectedItem]
  );

  //  handle add assets items.
  const handleAddItemsToAsset = React.useCallback(
    (assetFormData) => {
      addAsset(assetFormData);
      handleCancelFromListAssetItem();
    },
    [addAsset, handleCancelFromListAssetItem]
  );

  // handle updated asset items.
  const handleUpdateItemsToAsset = React.useCallback(
    (assetFormData) => {
      updateAsset(assetFormData);
      handleCancelFromListAssetItem();
    },
    [updateAsset, handleCancelFromListAssetItem]
  );

  //  asset add validation.
  const formValidationOnSubmitAddAsset = React.useCallback(
    (e) => {
      e.preventDefault();
      let formValidationList = {
        // key name should be same as the input field name to represtent in form.
        itemName: {
          required: true,
          isValid: true,
          value: assetName,
          errorMessage: "",
        },
        itemCategory: {
          required: true,
          isValid: true,
          value: String(itemCategoryId),
          errorMessage: "",
        },
      };
      setFormValidationState(formValidationList); //this set call the custom hook useFormValidation.
      callValidationAsset.current = true;
    },
    [assetName, itemCategoryId]
  );

  // asset add after validation.
  const callBackAfterValidationAsset = React.useCallback(() => {
    if (assetAddFormValidation.isFormValid) {
      // if form valid.
      let itemFormData = {
        itemType: itemCategoryId,
        itemName: assetName,
        itemCategoryId: 0, //same structure should go to back-end
      };
      addItem(itemFormData);
      setIsOpenForm(false);
      setIsOpenGridView(true);
    }
  }, [itemCategoryId, assetName, addItem, assetAddFormValidation.isFormValid]);

  // to go back.
  const handleBackwardClick = React.useCallback(() => {
    setIsOpenGridView(true);
    setIsOpenAssetItems(false);
    setSelectedItem("");
  }, []);

  return (
    <div>
      {/* ------------------------ Top Row--------------------- */}
      <Row>
        <Col>
          {isOpenFormAssetAddItems ? (
            <h3>Add Item to {selectedItem.itemName}</h3>
          ) : (
            // <h3>Add Item to </h3>
            <h3>
              Assets{selectedItem !== "" ? `/${selectedItem.itemName}` : ""}
            </h3>
          )}
        </Col>
        <Col>
          {/* back button */}
          {isOpenAssetItems ? (
            <Fragment>
              <Button
                color=""
                className="btn-admin-settings float-right"
                onClick={handleBackwardClick}
              >
                <i className="fas fa-arrow-left  "></i>
              </Button>
              <Button
                color=""
                className="btn-admin-settings float-right"
                onClick={toggleFromListAssetItems}
              >
                <i className="fas fa-plus"></i>
              </Button>
            </Fragment>
          ) : null}
        </Col>
      </Row>
      {/* ------------------------ Top Row---------------------- */}
      <hr></hr>

      {/* AssetsTabs have tabs of All Assets and Employee Assets. */}
      {isOpenGridView ? (
        <AssetsTabs
          itemList={items}
          openAssetItem={toggleFromGridViews}
          openAddForm={toggleFromGridViewsAddBtn}
          handleSelectedAsset={handleSelectedItem}
          userList={empList}
          assets={assetList}
        ></AssetsTabs>
      ) : null}
      {/* show the items corresponding to an asset. */}
      {isOpenAssetItems ? (
        <ListAssetItem
          assetList={assetList}
          selectedItem={selectedItem}
          isOpen={isOpenAssetItems}
          userList={empList}
          handleEditAssetItem={handleEditAssetItem}
          handleDelAsset={handleDelAsset}
        ></ListAssetItem>
      ) : null}

      {/* show add asset form */}
      {isOpenForm ? (
        <FormFields
          inputFields={assetInpuFields}
          // handleSubmit={handleAssetAdd}
          handleSubmit={formValidationOnSubmitAddAsset}
          formValidation={assetAddFormValidation.formValidation}
          button={"Add"}
          toggle={toggleFromGridViewsAddBtn}
        ></FormFields>
      ) : null}

      {/* show edit and add asset item form */}
      {isOpenFormAssetAddItems ? (
        <FormAddEditAssetItem
          selectedItem={selectedItem}
          selectedAsset={selectedAsset}
          userList={empList}
          handleAddAsset={handleAddItemsToAsset}
          handleUpdateAsset={handleUpdateItemsToAsset}
          handleCancel={handleCancelFromListAssetItem}
        ></FormAddEditAssetItem>
      ) : null}
    </div>
  );
};

const mapStateToProps = (state) => ({
  assetList: state.adminSettingReducer,
  empList: state.empReducer,
  itemList: state.itemReducer,
});

export default connect(mapStateToProps, {
  getEmpList,
  getItemsList,
  addItem,
  getAllAsset,
  addAsset,
  updateAsset,
  delAsset,
})(Assets);
