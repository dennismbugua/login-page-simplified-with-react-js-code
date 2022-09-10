import React, { useState, useEffect } from "react";

const useFormValidation = (formValidationList) => {
  const [validationListObj, setValidationListObj] = useState({});
  const [isFormValid, setIsFormValid] = useState(false);
  useEffect(() => {
    let updatedFormValidationList = formValidationList;
    for (let el in updatedFormValidationList) {
      let isValid = true;
      // loop through the validation json, ie take each input values.
      if (updatedFormValidationList[el].required) {
        isValid =
          String(updatedFormValidationList[el].value).trim() !== "" && isValid;
        updatedFormValidationList[el].isValid = isValid;
        updatedFormValidationList[el].errorMessage = "* Field Required";
      }
    }
    setValidationListObj(updatedFormValidationList);

    let isFormValidCheck = true;
    for (let el in updatedFormValidationList) {
      if (!updatedFormValidationList[el].isValid) {
        isFormValidCheck = false;
        setIsFormValid(false);
      }
      if (updatedFormValidationList[el].isValid) {
        isFormValidCheck === false
          ? setIsFormValid(false)
          : setIsFormValid(true);
      }
    }

    // for (let el of formValidationList) {
    //   let isValid = true;
    //   //   let el = { ...el };
    //   let keyName = Object.keys(el)[0];

    //   if (el[keyName].required) {
    //     isValid = el[keyName].value.trim() !== "" && isValid;
    //     el[keyName].isValid = isValid;
    //     el[keyName].errorMessage = "Field Required";
    //   }
    //   //   console.log(formValidationList[0]["employeeName"]);
    // }
  }, [formValidationList]);
  //   console.log(validationListObj);

  return { formValidation: validationListObj, isFormValid: isFormValid };
};

export default useFormValidation;
