import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSort, faSortUp, faSortDown, faPen, faTrash } from "@fortawesome/free-solid-svg-icons";

type TableProps<T> = {
  data: T[];
  search: string;
  filterType: string | null;
  filterStatus: string | null;
  headers: { label: string; field: keyof T }[];
  sortField: keyof T | null;
  sortOrder: "asc" | "desc";
  onSort: (field: keyof T) => void;
  actions?: (item: T) => React.ReactNode;
};

const Table = <T,>({
  data,
  headers,
  search,
  sortField,
  filterType,
  filterStatus,
  sortOrder,
  onSort,
  actions,
}: TableProps<T>) => {

  const filteredData = data?data.filter((data) => {
      const matchesSearch = data.name.toLowerCase().includes(search.toLowerCase());
      const matchesType = filterType ? data.type === filterType : true;
      const matchesStatus = filterStatus ? data.status === filterStatus : true;
      return matchesSearch && matchesType && matchesStatus;
    })
    .sort((a, b) => {
      if (!sortField) return 0;
      const valueA = a[sortField];
      const valueB = b[sortField];
      if (typeof valueA === "number" && typeof valueB === "number") {
        return sortOrder === "asc" ? valueA - valueB : valueB - valueA;
      }
      if (typeof valueA === "string" && typeof valueB === "string") {
        return sortOrder === "asc"
          ? valueA.localeCompare(valueB)
          : valueB.localeCompare(valueA);
      }
      return 0;
    }):[];

  return (
    <table className="table-auto w-full bg-[#FAFAFA]">
      <thead className="bg-custom_light_gray">
        <tr>
          {headers.map(({ label, field }) => (
            <th
              key={String(field)}
              className="px-4 py-4 cursor-pointer text-left first:rounded-l-xl last:rounded-r-xl"
              onClick={() => onSort(field)}
            >
              {label}{" "}
              {sortField === field ? (
                sortOrder === "asc" ? (
                  <FontAwesomeIcon icon={faSortUp} className="ml-1" />
                ) : (
                  <FontAwesomeIcon icon={faSortDown} className="ml-1" />
                )
              ) : (
                <FontAwesomeIcon icon={faSort} className="ml-1" />
              )}
            </th>
          ))}
          {actions && <th className="px-4 py-2 rounded-r-xl"/>}
        </tr>
      </thead>
      <tbody>
        {filteredData.map((item, index) => (
          <tr key={index} className="text-left border-b-gray-300 border-b">
            {headers.map(({ field }) => (
              <td key={String(field)} className="px-4 py-8">
                {item[field]}
              </td>
            ))}
            {actions && (
              <td className="px-4 py-2 text-center">{actions(item)}</td>
            )}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Table;
