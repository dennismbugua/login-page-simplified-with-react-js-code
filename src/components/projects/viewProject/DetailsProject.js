// <- viewPage.js
import React, { Fragment } from "react";
import { Card, CardBody, CardTitle, Table } from "reactstrap";

const DetailsProject = React.memo(({ projectDetails }) => {
  console.log("DetailsProject");
  return (
    <Fragment>
      <Card className="project-view-crad mb-4">
        <CardBody>
          <CardTitle>
            <h4 className="project-title">
              {/* <a href={`/viewProject/${project.projectId}`}>
                    {project.projectName}
                  </a> */}
              Project Deatils
            </h4>
          </CardTitle>
          <Table striped className="project-details-table mt-4">
            <tbody>
              <tr>
                <td>Cost</td>
                <td>${projectDetails.projectBudget}</td>
              </tr>
              <tr>
                <td>Total Hours</td>
                <td>{projectDetails.estimatedHours} hours</td>
              </tr>
              <tr>
                <td>Created</td>
                <td>{projectDetails.createdOn?.substr(0, 10)}</td>
              </tr>
              <tr>
                <td>Created by</td>
                <td className="link-name">{projectDetails.createdBy}</td>
              </tr>
              <tr>
                <td>Status</td>
                <td>
                  {projectDetails.projectStatus === 1 ? "Active" : "Block"}
                </td>
              </tr>
            </tbody>
          </Table>
        </CardBody>
      </Card>
    </Fragment>
  );
});

export default DetailsProject;
