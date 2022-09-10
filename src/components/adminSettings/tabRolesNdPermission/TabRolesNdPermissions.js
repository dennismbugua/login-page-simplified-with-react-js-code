import React, { Fragment } from "react";
import {
  Collapse,
  Row,
  Col,
  ListGroup,
  ListGroupItem,
  Label,
  Input,
  Table,
} from "reactstrap";
// let arr = [];
export default function TabRolesNdPermissions(props) {
  const { collapse, roleDataActive } = props;

  // useEffect(() => {
  //   console.log(roleDataActive.moduleAccess);
  // }, [roleDataActive]);

  return roleDataActive.role !== undefined ? (
    <Fragment>
      {console.log(roleDataActive)}
      <Row>
        <Col>
          <h5>Module Access /{props.roleDataActive.role}</h5>
        </Col>
      </Row>
      <Row>
        <Col sm="12">
          <ListGroup>
            {roleDataActive.moduleAccess.map((moduleName, i) => {
              return (
                <ListGroupItem>
                  <Row className="module-access-row">
                    <Col sm={10} xs={6} md={10}>
                      {/* object key gives the name of the module */}
                      {Object.keys(moduleName)}
                    </Col>
                    <Col sm={2} xs={6} md={2}>
                      {console.log(moduleName)}
                      <Label check className="switch">
                        <Input
                          type="checkbox"
                          className="toggleBtn"
                          onChange={(e) =>
                            props.handleToggleBtnChange(
                              Object.keys(moduleName),
                              e.target.checked
                            )
                          }
                          // moduleName give as obj
                          // moduleName = {Employee: true}.
                          // Object.keys(moduleName) = Employee
                          // moduleName[Object.keys(moduleName)] = true.
                          checked={moduleName[Object.keys(moduleName)]}
                        />
                        <span class="slider round"></span>
                      </Label>
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      <Collapse
                        isOpen={
                          String(Object.keys(collapse)) ===
                          String(Object.keys(moduleName))
                            ? collapse[Object.keys(collapse)]
                            : null
                        }
                        // isOpen={true}
                      >
                        <Table striped className="mt-2">
                          <thead>
                            <tr>
                              <th>Module Permission</th>
                              <th>Read</th>
                              <th>Write</th>
                              <th>Create</th>
                              <th>Delete</th>
                              <th>Import</th>
                              <th>Export</th>
                              <th>
                                <i
                                  className="fas fa-times"
                                  onClick={props.hanndleClosePermission}
                                ></i>
                              </th>
                            </tr>
                          </thead>
                          <tbody>
                            {/* tr will the array element in modulePermission in parent comp. */}
                            {roleDataActive.modulePermission
                              .filter((ele) => {
                                return (
                                  // find moduleName equal to corresponding ModulePermisson
                                  String(Object.keys(ele)) ===
                                  String(Object.keys(moduleName))
                                );
                              })
                              .map((moduleName, i) => {
                                return (
                                  <tr key={i}>
                                    {/* get the key name ie the module name. */}
                                    <th>{Object.keys(moduleName)}</th>
                                    {/* td will the array element of selected element in modulePermission : check parent data. */}
                                    {moduleName[Object.keys(moduleName)].map(
                                      (permissions, i) => {
                                        return (
                                          <td className="text-center">
                                            <Input
                                              type="checkbox"
                                              // checked={
                                              //   permissions[
                                              //     Object.keys(permissions)
                                              //   ]
                                              // }
                                            />
                                          </td>
                                        );
                                      }
                                    )}
                                    {/* empty td to show close icon col */}
                                    <td></td>
                                  </tr>
                                );
                              })}
                          </tbody>
                        </Table>
                      </Collapse>
                    </Col>
                  </Row>
                </ListGroupItem>
              );
            })}
          </ListGroup>
        </Col>
      </Row>
    </Fragment>
  ) : null;
}
