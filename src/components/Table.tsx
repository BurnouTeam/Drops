import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSort, faSortUp, faSortDown } from "@fortawesome/free-solid-svg-icons";

type TableProps<T> = {
  data: T[];
  search: string;
  filterType: string | null;
  filterStatus: string | null;
  headers: { label: string; field: keyof T | Array<keyof T> }[];
  sortField: keyof T | null;
  sortOrder: "asc" | "desc";
  onSort: (field: keyof T) => void;
  onRoleChange?: (id: string, newRole: string) => void;
  roleOptions?: Role[];
  actions?: (item: T) => React.ReactNode;
};

const Table = <T extends { id: string; role?: string; name?: string; profilePhoto?: string }>({
  data,
  headers,
  search,
  filterType,
  filterStatus,
  sortField,
  sortOrder,
  onSort,
  onRoleChange,
  roleOptions = [],
  actions,
}: TableProps<T>) => {
  const filteredData = data
    ? data
        .filter((data) => {
          const matchesSearch = data.name?.toLowerCase().includes(search.toLowerCase()) ?? true;
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
            return sortOrder === "asc" ? valueA.localeCompare(valueB) : valueB.localeCompare(valueA);
          }
          return 0;
        })
    : [];

  return (
    <table className="table-auto w-full bg-[#FAFAFA]">
      <thead className="bg-custom_light_gray">
        <tr>
          {headers.map(({ label, field }) => (
            <th
              key={String(field)}
              className="px-4 py-4 cursor-pointer text-left first:rounded-l-xl last:rounded-r-xl"
              onClick={() => onSort(field as keyof T)}
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
          {actions && <th className="px-4 py-2 rounded-r-xl" />}
        </tr>
      </thead>
      <tbody>
        {filteredData.map((item, index) => (
          <tr key={index} className="text-left border-b-gray-300 border-b">
            {headers.map(({ field }) => (
              <td key={String(field)} className="px-4 py-8">
                {/* Profile Photo + Name */}
                {Array.isArray(field) && field.includes("profilePhoto") && field.includes("name") ? (
                  <div className="flex items-center space-x-2">
                    <img src={item?.profilePhoto || "profile-default.png"} alt={item.name} className="w-10 h-10 rounded-full" />
                    <span>{item.name}</span>
                  </div>
                ) : field === "role" && onRoleChange ? (
                  /* Role Selection */
                  <select
                    className="border px-2 py-1 rounded-lg"
                    value={item.roleId}
                    onChange={(e) => onRoleChange(item.id, e.target.value)}
                  >
                    {roleOptions.map((role) => (
                      <option key={role.id} value={role.id}>
                        {role.name}
                      </option>
                    ))}
                  </select>
                ) : (
                  /* Default Text */
                  (Array.isArray(field) ? field.map((f) => item[f]).join(" - ") : item[field]) ?? "-"
                )}
              </td>
            ))}
            {actions && <td className="px-4 py-2 text-center">{actions(item)}</td>}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Table;
