import { useMemo } from "react";
import { useLocation, Link } from "react-router-dom";
//import useAxios from "axios-hooks";
import { useTable, useRowSelect } from "react-table";
//import Error from "../error";

export default function Table(props) {
  const { pathname } = useLocation();
  const columns = useMemo(() => props.columns, [props.columns]);
  const data = useMemo(() => props.data ? props.data : [], [props.data]);
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    selectedFlatRows,
    state: { selectedRowIds }
  } = useTable(
    {
      columns,
      data
    },
    useRowSelect, hooks => {
      hooks.visibleColumns.push(columns => [
        {
          id: "selection",
          Cell: ({ row }) => (
            <input type="checkbox"/>
          )
        },
        ...columns,
      ])
    }
  );

  return (
    <table {...getTableProps()} className="table table-hover table-bordered">
      <thead>
        {headerGroups.map(headerGroup => (
          <tr {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map(column => (
              <th {...column.getHeaderProps()} scope="col">
                {column.render("Header")}
              </th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody {...getTableBodyProps()}>
        {rows.map(row => {
          prepareRow(row);
          return (
            <tr {...row.getRowProps()}>
              {row.cells.map(cell => {
                return (
                  <td {...cell.getCellProps()}
                    className={(cell.column.id.startsWith("num") ? "num" : '')
                    || (cell.column.id.startsWith("check") ? "check" : '')}>
                    {cell.column.id === "name" ?
                    <Link to={`${pathname}/items/${row.original._id}`}>
                      {cell.render("Cell")}
                    </Link>
                    : cell.render("Cell")}
                  </td>
                )
              })}
            </tr>
          )
        })}
      </tbody>
    </table>
  );
}
