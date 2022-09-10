import React, { useState, useEffect, useRef } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Collapse, Row, Col, Button, Input } from "reactstrap";
import TableWithSortPagtn from "../../../components/common/TableWithSortPagtn";
import {
  GridView,
  FormEditHolidayCalender,
  FormAddHolidayCalender,
  useHolidayCalendarTable,
} from "../../../components/adminSettings/index";
import {
  getCalendar,
  addCalendar,
  updateCalendar,
  delCalendar,
} from "../../../redux/actions/adminSettings/adminSettings.action";
import useFormValidation from "../../../components/common/useFormValidation";

let dayArr = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

const HolidayCalendar = (props) => {
  const { getCalendar, addCalendar, updateCalendar, delCalendar } = props;
  const { holidayCalendar } = props.holidayCalendar;
  const [holidayCalendarArray, setholidayCalendarArray] = useState([]);
  const [selectedCalendar, setSelectedCalendar] = useState({ id: "", val: "" });
  const [holidayCalenderInpuFields, setHolidayCalenderInpuFields] = useState(
    []
  );
  const [title, setTitle] = useState("");
  const [type, setType] = useState("");
  const [day, setDay] = useState("");
  const [year, setYear] = useState("");
  const [date, setDate] = useState("");
  const [calenderDate, setCalenderDate] = useState({});
  const [dataArr, setDataArr] = useState([]);
  const [isOpenGridView, setIsOpenGridView] = useState(true);
  const [isOpenListView, setIsOpenListView] = useState(false);
  const [isOpenForm, setIsOpenForm] = useState(false);
  const [formValidationState, setFormValidationState] = useState({});
  const callValidation = useRef(false);

  // custom hook.
  const { formValidation, isFormValid } = useFormValidation(
    formValidationState
  );

  useEffect(() => {
    // calls when form submited`
    callValidation.current && callBackAfterValidation();
  }, [formValidation]);

  // call the employee type data
  useEffect(() => {
    getCalendar();
  }, [getCalendar]);

  // input fileds.
  useEffect(() => {
    setholidayCalendarArray(holidayCalendar);
    setHolidayCalenderInpuFields([
      {
        label: "Event/Title",
        type: "text",
        placeholder: "Enter Event",
        name: "title",
        handleOnChange: (val) => {
          setTitle(val);
        },
      },
      {
        label: "Type",
        type: "text",
        placeholder: "Enter Type of holiday",
        name: "type",
        handleOnChange: (val) => {
          setType(val);
        },
      },
    ]);
  }, [holidayCalendar]);

  //   Fucntion --------------------------
  //   onchange the year on the select box.
  const handleYearChange = (year) => {
    // console.log(year);
    if (year !== "") {
      let filterArr = holidayCalendarArray.filter((ele) => {
        let date = new Date(ele.type2);

        return String(date.getFullYear()) === year;
      });

      console.log(filterArr);
      setDataArr(filterArr);
    } else {
      setDataArr(holidayCalendarArray);
    }
  };
  // onchange calender date.
  const handleOnchangeDate = (date) => {
    setDate(date);
    setCalenderDate({
      date: date.getDate(),
      day: dayArr[date.getDay()],
      year: date.getFullYear(),
    });
  };
  const handleOnchangeToSelectedData = (val, field) => {
    let tempObj = selectedCalendar; // for not mutating reducer state.
    console.log(selectedCalendar);
    let updateObj = {
      ...tempObj,
      val: {
        ...tempObj.val,
        [field]: val,
      },
    };

    setSelectedCalendar(updateObj);
  };
  // toggle between the form a grid view and form .

  const toggle = () => {
    // setSelectedDesg({ id: "", val: "" });
    setIsOpenGridView(!isOpenGridView);
    setIsOpenForm(!isOpenForm);
  };
  //  on click the tile ,open the from with data filed.
  const handleEditHolidayCalendar = React.useCallback((val, id) => {
    console.log(val);
    setSelectedCalendar({ id: id, val: val });
  }, []);

  const handleAddHolidayCalendar = (e) => {
    e.preventDefault();
    let formData = {
      year: parseInt(calenderDate.year),
      title: title,
      holidayDate: date,
      day: calenderDate.day,
      type: type,
    };
    addCalendar(formData);
    toggle();
  };

  const handleUpdateHolidayCalendar = (e) => {
    e.preventDefault();
    updateCalendar(selectedCalendar.val);
    setSelectedCalendar({ id: "", val: "" });
    toggle();
  };

  // delete
  const handleDelHolidayCalendar = React.useCallback(
    (year) => {
      delCalendar(year);
    },
    [delCalendar]
  );

  const onClickToggleFromTable = React.useCallback(() => {
    setIsOpenListView((prevState) => !prevState);
    setIsOpenForm((prevState) => !prevState);
  }, [setIsOpenListView, setIsOpenForm]);

  // customer hook.
  const { thead, trow } = useHolidayCalendarTable(
    holidayCalendarArray,
    handleDelHolidayCalendar,
    handleEditHolidayCalendar,
    onClickToggleFromTable
  );

  const formValidationOnSubmitAdd = (e) => {
    e.preventDefault();
    let formValidationList = {
      // key name should be same as the input field name.
      title: {
        required: true,
        isValid: true,
        value: title,
        errorMessage: "",
      },
      type: {
        required: true,
        isValid: true,
        value: type,
        errorMessage: "",
      },
      date: {
        required: true,
        isValid: true,
        value: calenderDate.day ?? "", // if date is present then day also should present, give day instead of date for validation.
        errorMessage: "",
      },
    };
    setFormValidationState(formValidationList); //this set call the custom hook useFormValidation.
    callValidation.current = true;
  };
  // update form validation.
  const formValidationOnSubmitUpdate = (e) => {
    e.preventDefault();
    let formValidationList = {
      // key name should be same as the input field name.
      title: {
        required: true,
        isValid: true,
        value: selectedCalendar.val.title,
        errorMessage: "",
      },
      type: {
        required: true,
        isValid: true,
        value: selectedCalendar.val.type,
        errorMessage: "",
      },
      date: {
        required: true,
        isValid: true,
        value: selectedCalendar.val.holidayDate ?? "", // if date is present then day also should present, give day instead of date for validation.
        errorMessage: "",
      },
    };
    setFormValidationState(formValidationList); //this set call the custom hook useFormValidation.
    callValidation.current = true;
  };
  const callBackAfterValidation = () => {
    if (isFormValid) {
      // if form valid.
      if (selectedCalendar.id !== "") {
        updateCalendar(selectedCalendar.val);
        setSelectedCalendar({ id: "", val: "" });
        toggle();
      } else {
        let formData = {
          year: parseInt(calenderDate.year),
          title: title,
          holidayDate: date,
          day: calenderDate.day,
          type: type,
        };
        addCalendar(formData);
        toggle();
      }
    }
  };

  return (
    <div>
      <Row>
        <Col sm={8} xs={4}>
          <h3>Holiday Calender</h3>
        </Col>
        <Col sm={3} xs={4} className="">
          {!isOpenForm ? (
            <Input
              type="select"
              name="select"
              id="exampleSelect"
              onChange={(e) => handleYearChange(e.target.value)}
            >
              <option value={""}>All</option>
              <option value={"2020"}>2020</option>
              <option value={"2019"}>2019</option>
              <option value={"2018"}>2018</option>
            </Input>
          ) : null}
        </Col>
        <Col sm={1} xs={4}>
          <Button
            color=""
            className="btn-admin-settings float-right"
            onClick={() => {
              setIsOpenListView(!isOpenListView);
              setIsOpenGridView(!isOpenGridView);
              // setSelectedCalendar({ id: "", val: "" });
            }}
          >
            <i class="fas fa-list "></i>
          </Button>
        </Col>
      </Row>
      <hr></hr>
      <Collapse isOpen={isOpenForm}>
        {selectedCalendar.id !== "" ? (
          <FormEditHolidayCalender
            inputFields={holidayCalenderInpuFields}
            handleOnchangeToSelectedData={(val, field) =>
              handleOnchangeToSelectedData(val, field)
            }
            // handleSubmit={handleUpdateHolidayCalendar}
            handleSubmit={formValidationOnSubmitUpdate}
            formValidation={formValidation}
            button={"Update"}
            calenderDate={calenderDate}
            formData={selectedCalendar}
            toggle={toggle}
            handleOnchangeDate={(date) => handleOnchangeDate(date)}
          ></FormEditHolidayCalender>
        ) : (
          <FormAddHolidayCalender
            inputFields={holidayCalenderInpuFields}
            handleOnchangeToSelectedData={(val, field) =>
              handleOnchangeToSelectedData(val, field)
            }
            // handleSubmit={handleAddHolidayCalendar}
            handleSubmit={formValidationOnSubmitAdd}
            formValidation={formValidation}
            button={"Add"}
            calenderDate={calenderDate}
            toggle={toggle}
            handleOnchangeDate={(date) => handleOnchangeDate(date)}
          ></FormAddHolidayCalender>
        )}
      </Collapse>
      <Collapse isOpen={isOpenGridView}>
        <GridView
          pagaData={holidayCalendarArray}
          displayData={{ heading: "title", id: "holidayCalendarId" }}
          isOpenGridView={isOpenGridView}
          emptyFormField={() => setSelectedCalendar({ id: "", val: "" })}
          handleDel={handleDelHolidayCalendar}
          toggle={toggle}
          handleSelectedDesg={(val, id) => handleEditHolidayCalendar(val, id)}
        ></GridView>
      </Collapse>
      <Collapse isOpen={isOpenListView}>
        <TableWithSortPagtn thead={thead} trow={trow}></TableWithSortPagtn>
      </Collapse>
    </div>
  );
};

HolidayCalendar.prototype = {
  getCalendar: PropTypes.func,
  addCompanyPolicies: PropTypes.func,
  updateCalendar: PropTypes.func,
  delCalendar: PropTypes.func,
};

const mapStateToProps = (state) => ({
  holidayCalendar: state.adminSettingReducer,
});

export default connect(mapStateToProps, {
  getCalendar,
  addCalendar,
  updateCalendar,
  delCalendar,
})(HolidayCalendar);
