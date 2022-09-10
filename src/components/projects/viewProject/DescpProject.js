import React, { Fragment } from "react";
import { Card, CardBody, CardTitle } from "reactstrap";

const DescpProject = React.memo(({ projectName, projectDescp }) => {
  console.log("DescpPRoject");
  return (
    <Fragment>
      <Card className="project-view-crad mb-4">
        <CardBody>
          <CardTitle>
            <h4 className="project-title">
              {/* <a href={`/viewProject/${project.projectId}`}>
                    {project.projectName}
                  </a> */}
              {projectName}
            </h4>
          </CardTitle>
          <small className="block text-ellipsis m-b-15">
            <span className="text-xs">1</span>{" "}
            <span className="text-muted">open tasks, </span>
            <span className="text-xs">9</span>{" "}
            <span className="text-muted">tasks completed</span>
          </small>
          <span className="text-muted mt-3 project-description">
            {projectDescp}
            {/* Louis Vuitton Malletier, commonly referred to as Louis Vuitton
            (French pronunciation: ​[lwi vɥitɔ̃]) or shortened to LV, is a French
            fashion house and luxury retail company founded in 1854 by Louis
            Vuitton. The label's LV monogram appears on most of its products,
            ranging from luxury trunks and leather goods to ready-to-wear,
            shoes, watches, jewelry, accessories, sunglasses and books.
            <br></br> <br></br> Louis Vuitton is one of the world's leading
            international fashion houses; it sells its products through
            standalone boutiques, lease departments in high-end department
            stores, and through the e-commerce section of its website.[5][6] For
            six consecutive years (2006–2012), Louis Vuitton was named the
            world's most valuable luxury brand. Its 2012 valuation was US$25.9
            billion.[7] The 2013 valuation of the brand was US$28.4 billion with
            revenue of US$9.4 billion.[8] The company operates in 50 countries
            with more than 460 stores worldwide.[9] */}
          </span>
        </CardBody>
      </Card>
    </Fragment>
  );
});

export default DescpProject;
