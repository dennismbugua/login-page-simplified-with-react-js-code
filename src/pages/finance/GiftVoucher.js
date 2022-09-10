import React, { useEffect, useState } from "react";
import {
  TopRowGiftVoucher,
  TableGiftVoucher,
  AddEditGiftVoucher,
} from "../../components/finance";
import Notifications from "../../components/common/Notifications";

import api from "../../apis/api";

const GifVoucher = () => {
  const [isOpenAddEditForm, setAddEditForm] = useState(false);
  const [giftVoucherList, setGiftVoucherList] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchGiftVoucher();
  }, []);

  //   Functions ----------------------------------------------------
  // function to get all gift voucher's --------------------------------
  const fetchGiftVoucher = () => {
    api
      .giftVoucher()
      .getAllGiftVoucher()
      .then((res) => {
        if (res.status === 200) {
          setGiftVoucherList(res.data);
        } else {
          setError({
            ...error,
            message: "Bad Connection",
            status: 400,
          });
        }
      });
  };

  return (
    <div>
      <TopRowGiftVoucher
        heading={"Gift Vocher"}
        button={{ create: { name: "Create Voucher", handleAction: "" } }}
      ></TopRowGiftVoucher>

      {isOpenAddEditForm && (
        <AddEditGiftVoucher
        //   selectedPettyCash={selectedPettyCash}
        //   toggleAddEditForm={toggleAddEditForm}
        //   pettycashList={pettycashList}
        //   dbEntry={dbEntry}
        ></AddEditGiftVoucher>
      )}

      {!isOpenAddEditForm && (
        <TableGiftVoucher
          giftVoucherList={giftVoucherList}
          // handleOnEditCLick={handleOnEditCLick}
          // deletePettycash={deletePettycash}
        ></TableGiftVoucher>
      )}

      <Notifications notifications={error}></Notifications>
    </div>
  );
};

export default GifVoucher;
