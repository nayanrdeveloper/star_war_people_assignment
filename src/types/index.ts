export type PersonType = {
  name: string;
  height: string;
  [key: string]: string;
};

export type StarWarPeoplesHookType = {
  peoples: PersonType[];
  searchQuery: string;
  currentPage: number;
  totalPages: number;
  loading: boolean;
  error: boolean;
  sortType: string;
  sortField: string;
  handleSort: (field: string) => void;
  handlePreviousPage: () => void;
  handleNextPage: () => void;
  handleSearch: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

export type TableCellType = {
  name: string;
  sortField: string;
};

export type THeadingCellProps = {
    name: string;
    sortField: string;
    sortType: string;
    handleSort: (field: string) => void;
}
