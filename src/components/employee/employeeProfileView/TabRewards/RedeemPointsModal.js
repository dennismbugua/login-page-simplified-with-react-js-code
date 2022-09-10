import React from "react";
import {
  Button,
  Modal,
  ModalBody,
  Form,
  FormGroup,
  Label,
  Input,
} from "reactstrap";

const RedeemPointsModal = ({
  openModal,
  toggleModal,
  onchangeInputField,
  handleSubmitRedmeededPoints,
}) => {
  // Function -------------------------

  return (
    <div>
      <Modal isOpen={openModal} toggle={toggleModal}>
        {/* <ModalHeader toggle={toggleModal}>Modal title</ModalHeader> */}
        <ModalBody>
          <Form>
            <FormGroup>
              <Label for="exampleEmail">Enter Points to get redeemed.</Label>
              <Input
                type="number"
                name="pointsToRedeem"
                id="pointsToRedeem"
                placeholder="Enter Points to get redeemed."
                onChange={(e) => onchangeInputField(e)}
              />
            </FormGroup>
            <Button outline color="info" onClick={handleSubmitRedmeededPoints}>
              Redeem
            </Button>{" "}
            <Button outline color="warning" onClick={toggleModal}>
              Cancel
            </Button>
          </Form>
        </ModalBody>
      </Modal>
    </div>
  );
};

export default RedeemPointsModal;
