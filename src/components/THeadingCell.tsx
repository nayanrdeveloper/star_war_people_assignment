import React from "react";
import { THeadingCellProps } from "../types";

const THeadingCell: React.FC<THeadingCellProps> = ({
  name,
  sortField,
  sortType,
  handleSort,
}) => {
  return (
    <th className="py-3 px-6 text-left" onClick={() => handleSort(sortField)}>
      {name}
      {sortField === sortType && (
        <span className="text-black">{sortType === "asc" ? "▲" : "▼"}</span>
      )}
    </th>
  );
};

export default THeadingCell;
