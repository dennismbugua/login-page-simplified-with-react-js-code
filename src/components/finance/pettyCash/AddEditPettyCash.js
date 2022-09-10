import React, { useState, useEffect } from "react";
import { Row, Col, Button, Form, FormGroup, Label, Input } from "reactstrap";
import SelectBoxSearch from "../../common/SelectBoxSearch";

const AddEditPettyCash = ({
  selectedPettyCash,
  toggleAddEditForm,
  pettycashList,
  dbEntry,
}) => {
  const [fieldValues, setFieldValues] = useState({
    operatingExpenses: 0,
    invoiceAmount: 0,
    invoiceDate: new Date(),
    amountPaid: 0,
    paidDate: new Date(),
    paymentMode: "",
    paidBy: null,
  });

  useEffect(() => {
    if (selectedPettyCash !== null) {
      console.log(selectedPettyCash);
      setFieldValues({
        pettyCashDetailsId: selectedPettyCash.pettyCashDetailsId,
        billNo: selectedPettyCash.billNo,
        operatingExpenses: selectedPettyCash.operatingExpenses,
        invoiceAmount: selectedPettyCash.invoiceAmount,
        invoiceDate: new Date(selectedPettyCash.invoiceDate),
        amountPaid: selectedPettyCash.amountPaid,
        paidDate: new Date(selectedPettyCash.paidDate),
        modeOfPayment: selectedPettyCash.modeOfPayment,
        paidBy: selectedPettyCash.paidBy,
      });
    } else {
      setFieldValues({
        operationExpenses: 0,
        billNo: pettycashList.length + 1,
        invoiceAmount: 0,
        invoiceDate: new Date(),
        amountPaid: 0,
        paidDate: new Date(),
        modeOfPayment: "",
        paidBy: null,
      });
    }
  }, [selectedPettyCash, pettycashList]);

  // Function -------------------------------------
  // function to set on change field value  -----------------------
  const handleChangeFieldValues = (e) => {
    setFieldValues({
      ...fieldValues,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div>
      <div
        style={{
          margin: "0rem 10rem",
          padding: "2rem 5rem",
          marginTop: "10px",
          backgroundColor: "#fff",
        }}
      >
        <Form onSubmit={(e) => dbEntry(e, fieldValues)}>
          <Row form>
            <Col md={6} className="pr-3">
              <FormGroup>
                <Label for="exampleEmail">Bill No.</Label>
                <Input
                  type="text"
                  disabled
                  value={fieldValues.billNo}

                  // value={`# ${Math.floor(Math.random() * 999 + 1)}`}
                />
              </FormGroup>
            </Col>
            <Col md={6} className="pl-3">
              <FormGroup>
                <Label>Operation Expense</Label>
                <Input
                  type="text"
                  name="operatingExpenses"
                  onChange={(e) => handleChangeFieldValues(e)}
                  value={fieldValues.operatingExpenses}
                />
              </FormGroup>
            </Col>
          </Row>
          <Row form>
            <Col md={6} className="pr-3">
              <FormGroup>
                <FormGroup>
                  <Label>Invoice Amount</Label>
                  <Input
                    type="text"
                    name="invoiceAmount"
                    onChange={(e) => handleChangeFieldValues(e)}
                    value={fieldValues.invoiceAmount}
                  />
                </FormGroup>
              </FormGroup>
            </Col>
            <Col md={6} className="pl-3">
              <FormGroup>
                <Label>Invoice Date</Label>
                <Input
                  type="date"
                  name="invoiceDate"
                  onChange={(e) => handleChangeFieldValues(e)}
                  value={fieldValues.invoiceDate.toISOString().substr(0, 10)}
                />
              </FormGroup>
            </Col>
          </Row>
          <Row form>
            <Col md={6} className="pr-3">
              <FormGroup>
                <FormGroup>
                  <Label>Paid Amount</Label>
                  <Input
                    type="text"
                    name="amountPaid"
                    onChange={(e) => handleChangeFieldValues(e)}
                    value={fieldValues.amountPaid}
                  />
                </FormGroup>
              </FormGroup>
            </Col>
            <Col md={6} className="pl-3">
              <FormGroup>
                <Label>Paid Date</Label>
                <Input
                  type="date"
                  name="paidDate"
                  onChange={(e) => handleChangeFieldValues(e)}
                  value={fieldValues.paidDate.toISOString().substr(0, 10)}
                />
              </FormGroup>
            </Col>
          </Row>
          <Row form>
            <Col md={6} className="pr-3">
              <FormGroup>
                <FormGroup>
                  <Label>Payment Mode</Label>
                  <Input
                    type="text"
                    name="modeOfPayment"
                    onChange={(e) => handleChangeFieldValues(e)}
                    value={fieldValues.modeOfPayment}
                  />
                </FormGroup>
              </FormGroup>
            </Col>
            <Col md={6} className="pl-3">
              <FormGroup>
                <Label>Paid By</Label>
                <SelectBoxSearch></SelectBoxSearch>
              </FormGroup>
            </Col>
          </Row>
          <div className="text-center">
            <Button outline color="info">
              Add
            </Button>
            <Button
              outline
              color="danger"
              className="ml-2"
              onClick={toggleAddEditForm}
            >
              Cancel
            </Button>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default AddEditPettyCash;
