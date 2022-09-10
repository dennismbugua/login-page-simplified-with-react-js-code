import React from "react";
import { useEffect, useState } from "react";

const useEmpListAssignRewards = (empArr, handleSelectedEmp) => {
  const [trow, setTrow] = useState([]);
  const [thead] = useState([
    "id",
    "name",
    "project",
    // "email",
    // "mobile",
    // "join date",
    // "role",
    // "action",
  ]);

  useEffect(() => {
    let trow = empArr.map((employee, i) => {
      return {
        id: <div>{employee.emp.employeeId}</div>,

        name: (
          <h2
            class="table-avatar"
            onClick={() => handleSelectedEmp(employee.emp)}
          >
            <img
              class="profile-img-table"
              alt=""
              src={require(`../../../img/employee/${employee.emp.profilePicture}`)}
            />
            <span className="ml-2">
              <span style={{ fontWeight: "400", color: "black" }}>
                {employee.emp.employeeName}
              </span>
              <span> {employee.emp.designationName}</span>
            </span>
          </h2>
        ),
        project: (
          <span>
            {/* <small>{project.projectName},</small> */}
            <small>Robo Control, E-commerce, Personal App</small>
          </span>
        ),
        // employee.project.map((project) => (
        //   <span key={project.projectId}>
        //     <small>{project.projectName},</small>

        //   </span>
        // )),
      };
    });

    setTrow(trow);
  }, [empArr, handleSelectedEmp]);

  return { thead, trow };
};

export default useEmpListAssignRewards;

// <table cellspacing="0" cellpadding="0" border="0" width="325">
//       <tr>
//         <td>
//           <Table hover style={{ margin: "0px" }} {...getTableProps()} striped className="mt-2">
//             <thead>
//   {headerGroups.map((headerGroup, p) => (
//     <tr key={p} {...headerGroup.getHeaderGroupProps()}>
//       {headerGroup.headers.map((column) => (
//         <th {...column.getHeaderProps(column.getSortByToggleProps())}>
//           {column.render("Header")}
//           {/* Add a sort direction indicator */}
//           <span className="">
//             <i className="fas fa-exchange-alt fa-rotate-90 ml-3"></i>
//             {/* {column.isSorted ? (
//               column.isSortedDesc ? (
//                 " 🔽"
//               ) : (
//                 " 🔼"
//               )
//             ) : (
//               <i className="fas fa-exchange-alt fa-rotate-90"></i>
//             )} */}
//           </span>
//         </th>
//       ))}
//     </tr>
//   ))}
// </thead>
//           </Table>
//         </td>
//       </tr>
//       <tr>
//         <td>
//           <div style={{ width: "500px", height: "180px", overflow: "auto" }}>
//             <Table hover>
// <tbody {...getTableBodyProps()}>
// {page.map((row, i) => {
//   prepareRow(row);
//   return (
//     <tr key={i} {...row.getRowProps()}>
//       {row.cells.map((cell, k) => {
//         return (
//           <td key={k} {...cell.getCellProps()}>
//             {cell.render("Cell")}
//           </td>
//         );
//       })}
//     </tr>
//   );
// })}
// </tbody>
//             </Table>
//            </div>
//          </td>
//        </tr>
//      </table>
