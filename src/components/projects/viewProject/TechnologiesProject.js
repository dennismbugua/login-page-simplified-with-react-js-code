// <- ViewProject.js
import React, { useState, Fragment, useEffect } from "react";
import PropTypes from "prop-types";
import {
  Row,
  Col,
  Input,
  Card,
  CardBody,
  CardTitle,
  Button,
  Popover,
  PopoverHeader,
  PopoverBody,
} from "reactstrap";

const TechnologiesProject = React.memo(({ technologies }) => {
  console.log("TechnologiesProject");
  const [technologiesArr, setTechnologiesArr] = useState([]);
  const [technology, setTechnology] = useState("");
  const [popoverOpenAddFrom, setPopoverOpenAddForm] = useState(false);

  useEffect(() => {
    setTechnologiesArr(technologies);
  }, [technologies]);

  const toggle = () => setPopoverOpenAddForm(!popoverOpenAddFrom);

  // append leader to array.
  const apendTechnology = React.useCallback(() => {
    let technologyData = {
      //   technologyId: technologiesArr.length + 1,
      skillName: technology,
    };
    setTechnologiesArr((prevState) => prevState.concat(technologyData));
  }, [setTechnologiesArr, technology]);
  // delete the selected leader.
  const delTechnology = React.useCallback(
    (index) => {
      const filteredTechnology = technologiesArr
        .slice(0, index)
        .concat(technologiesArr.slice(index + 1, technologiesArr.length));
      setTechnologiesArr(filteredTechnology);
    },
    [technologiesArr]
  );
  return (
    <Fragment>
      <Card className="project-view-crad mb-4 ">
        <CardBody className="project-user">
          <CardTitle>
            <h4 className="project-title d-inline ">Technologies</h4>
            <Button
              className="d-inline float-right "
              outline
              color="primary"
              size="sm"
              id="popoverOpenAddFrom"
              type="button"
            >
              {!popoverOpenAddFrom ? (
                <i className="fas fa-plus"></i>
              ) : (
                <i className="fas fa-times "></i>
              )}
            </Button>
          </CardTitle>
          <ul className="list-box ">
            {technologiesArr.map((technology, i) => (
              <li key={i} className="d-inline ml-2 ">
                {/* <div className="list-item">
                  <div className="list-left"> */}
                <Button size="sm" color="warning" className="mt-2">
                  <small> {technology.skillName}</small>
                  <i
                    className=" ml-2 fas fa-times"
                    onClick={() => delTechnology(i)}
                  ></i>
                </Button>
                {/* </div>
                </div> */}
              </li>
            ))}
          </ul>

          <Popover
            placement="top"
            isOpen={popoverOpenAddFrom}
            target="popoverOpenAddFrom"
            toggle={toggle}
          >
            <PopoverHeader style={{ minWidth: "100px" }}>
              Add Technologies
            </PopoverHeader>
            <PopoverBody>
              <Row style={{ minWidth: "250px" }}>
                <Col>
                  <Input
                    type="text"
                    onChange={(e) => setTechnology(e.target.value)}
                  />
                </Col>
                <Button
                  className="d-inline float-right mr-2"
                  outline
                  color="primary"
                  size="sm"
                  onClick={apendTechnology}
                >
                  <i className="fa fa-check"></i>
                </Button>
              </Row>
            </PopoverBody>
          </Popover>
        </CardBody>
      </Card>
    </Fragment>
  );
});

TechnologiesProject.propTypes = {
  technologies: PropTypes.array.isRequired,
};

export default TechnologiesProject;
