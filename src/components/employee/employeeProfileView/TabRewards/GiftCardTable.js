import React from "react";

import { Card, CardBody, Table } from "reactstrap";
const GiftCardTable = () => {
  return (
    <Card className="flex-fill">
      <CardBody>
        {/* <CardTitle>
            <h3>Gift Card</h3>
          </CardTitle> */}
        <Table style={{ border: "" }}>
          <thead>
            <tr>
              <th width="10%">#</th>
              <th width="60%">Gift Card</th>
              <th>Expire Date</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>1</td>
              <td>Bday</td>
              <td>28/10/2019</td>
            </tr>
            <tr>
              <td>2</td>
              <td>Aniversary</td>
              <td>28/10/2019</td>
            </tr>
            <tr>
              <td>3</td>
              <td>10 year complition</td>
              <td>28/10/2019</td>
            </tr>
          </tbody>
        </Table>
      </CardBody>
    </Card>
  );
};

export default GiftCardTable;
