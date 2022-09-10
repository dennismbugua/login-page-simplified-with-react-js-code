import React, { useState, useEffect, Fragment } from "react";
import { Row, Col } from "reactstrap";
import {
  Categories,
  SubCategories,
  AddEditTicketForm,
} from "../../components/helpdeskTickets";
import { helpdeskTicket } from "../../datas/helpdeskTickets";
import api from "../../apis/api";

export default function HelpdeskTickets() {
  const [activeTab, setActiveTab] = useState(1);
  const [helpdeskTicketData, setHelpdeskTicketData] = useState([]);
  const [selectedTabData, setSelectedTabData] = useState([]);
  const [category, setCategory] = useState([]);
  const [subCategory, setSubCategory] = useState([]);

  const [selectedSubCatgory, setSelectedSubCatgory] = useState(null);
  const [isOpenAddEditTicketForm, setIsOpenAddEditTicketForm] = useState(false);

  // api calls -----------------------------------------------------------------
  useEffect(() => {
    const fetchApi = async () => {
      await api
        .helpdesk()
        .getAllCategory()
        .then((res) => setCategory(res.data));
      await api
        .helpdesk()
        .getallSubCategory()
        .then((res) => setSubCategory(res.data));
    };
    fetchApi();
  }, []);

  useEffect(() => {
    setHelpdeskTicketData(helpdeskTicket);
    setSelectedTabData(helpdeskTicket[0]);

    // set active subcategory.
    let filterSubCategory = subCategory.filter(
      (el) => el.categoriesId === category[0].categoriesId
    );
    setSelectedTabData(filterSubCategory);
  }, [category, subCategory]);

  // Function -------------------

  const toggleTabs = (categoriesId) => {
    if (activeTab !== categoriesId) setActiveTab(categoriesId);
    handleSelectedCategory(categoriesId);
  };

  // to set selected tab details.
  const handleSelectedCategory = React.useCallback(
    (categoriesId) => {
      // take only selected categories subcategory.
      let filterSubCategory = subCategory.filter(
        (el) => el.categoriesId === categoriesId
      );
      setSelectedTabData(filterSubCategory);
    },
    [setSelectedTabData, subCategory]
  );

  // on click on the subcatogry in tab details.
  const handleOnclickSubCategory = (subCatagory) => {
    let tempSubCatagory = {
      categoriesId: subCatagory.categoriesId,
      categoriesName: subCatagory.categoriesName,
      subcategoriesId: subCatagory.subcategoriesId,
      subcategoriesname: subCatagory.subcategoriesName,
      subCatagorySubHeading: subCatagory.description,
      icon: subCatagory.icon,
    };
    setSelectedSubCatgory(tempSubCatagory);
    toggleAddEditTicketFrom();
  };

  // Toggle add edit ticket from.
  const toggleAddEditTicketFrom = React.useCallback(() => {
    setIsOpenAddEditTicketForm((prevState) => !prevState);
  }, []);

  return (
    <Fragment>
      <Row>
        <Col sm={8} xs={4}>
          <h3>Helpdesk Tickets</h3>
        </Col>
      </Row>
      <hr></hr>

      {!isOpenAddEditTicketForm && (
        <Row>
          <Col sm={4}>
            <Categories
              category={category}
              activeTab={activeTab}
              toggleTabs={toggleTabs}
            ></Categories>
          </Col>
          <Col>
            <SubCategories
              selectedTabData={selectedTabData}
              handleOnclickSubCategory={handleOnclickSubCategory}
            ></SubCategories>
          </Col>
        </Row>
      )}

      {isOpenAddEditTicketForm && (
        <AddEditTicketForm
          selectedSubCatgory={selectedSubCatgory}
          toggleAddEditTicketFrom={toggleAddEditTicketFrom}
        ></AddEditTicketForm>
      )}
    </Fragment>
  );
}
