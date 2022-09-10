import React, { useEffect, useState } from "react";
import {
  TopRowInvoice,
  TableInvoice,
  AddEditPettyCash,
} from "../../components/finance/index";

import api from "../../apis/api";

const Invoice = () => {
  const [pettycashList, setPettycashList] = useState([]);
  const [isOpenAddEditForm, setAddEditForm] = useState(false);
  const [selectedPettyCash, setSelectedPettyCash] = useState(null);

  useEffect(() => {
    fetchPettycash();
  }, []);
  // Functions.
  // Function to fetch all pettycash ------------------------------------------------
  const fetchPettycash = async () => {
    await api
      .pettycash()
      .getAllPettyCash()
      .then((res) => {
        if (res.status === 200) {
          setPettycashList(res.data);
        }
      });
  };
  // toggle b/w AddEditForm,
  const toggleAddEditForm = React.useCallback(() => {
    setAddEditForm((prevState) => !prevState);
  }, []);

  // handle click on edit.
  const handleOnEditCLick = React.useCallback(
    (data) => {
      setSelectedPettyCash(data);
      toggleAddEditForm();
    },
    [toggleAddEditForm]
  );

  // function handles when from submited to add petty cash to DB -------------------------
  const dbEntry = React.useCallback((e, fieldValues) => {
    e.preventDefault();
    let formData = {
      pettyCashDetailsId: fieldValues?.pettyCashDetailsId ?? 0,
      operatingExpenses: fieldValues.operatingExpenses,
      invoiceAmount: parseInt(fieldValues.invoiceAmount),
      invoiceDate: fieldValues.invoiceDate,
      amountPaid: parseInt(fieldValues.amountPaid),
      billNo: parseInt(fieldValues.billNo),
      modeOfPayment: fieldValues.modeOfPayment,
      paidDate: fieldValues.paidDate,
      paidBy: "string",
    };
    api
      .pettycash()
      .addEditPettyCash(formData)
      .then((res) => {
        if (res.status === 200) {
          fetchPettycash();
          toggleAddEditForm();
        }
      });
  }, []);

  // fucntion petty cash ----------------------------
  const deletePettycash = React.useCallback((delId) => {
    api
      .pettycash()
      .deletePettyCash(delId)
      .then((res) => {
        if (res.status === 200) {
          fetchPettycash();
        }
      });
  }, []);

  return (
    <div>
      <TopRowInvoice toggleAddEditForm={toggleAddEditForm}></TopRowInvoice>
      {isOpenAddEditForm && (
        <AddEditPettyCash
          selectedPettyCash={selectedPettyCash}
          toggleAddEditForm={toggleAddEditForm}
          pettycashList={pettycashList}
          dbEntry={dbEntry}
        ></AddEditPettyCash>
      )}

      {!isOpenAddEditForm && (
        <TableInvoice
          pettyCashData={pettycashList}
          handleOnEditCLick={handleOnEditCLick}
          deletePettycash={deletePettycash}
        ></TableInvoice>
      )}
    </div>
  );
};

export default Invoice;
