'use client'
import React, { useRef } from 'react';
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Input,
  Button,
  DropdownTrigger,
  Dropdown,
  DropdownMenu,
  DropdownItem,
  Chip,
  User,
  Pagination,
  Tooltip,
  Textarea,
    Modal,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalFooter,
    useDisclosure,
    Autocomplete,
    AutocompleteItem,
    select,
} from "@nextui-org/react";
import { useRouter } from "next/navigation";

import {PlusIcon, SearchIcon, ChevronDownIcon, DeleteIcon, EditIcon, VerticalDotsIcon } from "@/_components/icon";
import { handleSelectedChecks } from "@/app/redux/slices/selectedChecksSlice";
import {useDispatch} from "react-redux";
import { useSelector } from "react-redux";
import {Spinner} from "@nextui-org/react";


// export function capitalize(str) {
//     return str.charAt(0).toUpperCase() + str.slice(1);
//   }





export default function DataTable ({ data, columns, statusOptions, columnSort, statusColorMap, columnName, actionsContent, operation, handleOpen, handleClick, handleDelete, handleSubmit}) {
  let INITIAL_VISIBLE_COLUMNS;

if(operation === "pms_roomtype") {
  INITIAL_VISIBLE_COLUMNS = ["id",
  "room_name",
  "room_type",
  "room_rate",
  "status",
  "actions"];
}else if(operation === "propManagement"){
  // INITIAL_VISIBLE_COLUMNS = ["Hotel_Id", "Hotel_name", "status"];
  INITIAL_VISIBLE_COLUMNS = ["Hotel_Id", "Hotel_name", "status", "actions", "Contact_Name", "Phone_Number", "Address", "Location", "State"];
}
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
  const [isLoading, setIsLoading] = React.useState(true);
  const [filterValue, setFilterValue] = React.useState("");
  const [selectedKeys, setSelectedKeys] = React.useState(new Set([]));
  const [visibleColumns, setVisibleColumns] = React.useState(new Set(INITIAL_VISIBLE_COLUMNS));
  const [statusFilter, setStatusFilter] = React.useState("all");
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [result, setResult] = React.useState([]);
  const [sortDescriptor, setSortDescriptor] = React.useState({
    column: columnSort,
    direction: "ascending",
  });
  const [page, setPage] = React.useState(1);

  const pages = Math.ceil(result && result?.length / rowsPerPage);

  const hasSearchFilter = Boolean(filterValue);

  const router = useRouter();
  const dispatch = useDispatch();
  const checksRef = useRef();
  checksRef.current = useSelector((state) => state.checks.selectedChecks);

  React.useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false); 
    }, 2000); 
    return () => clearTimeout(timer); 
  }, []);

  const headerColumns = React.useMemo(() => {
    if (visibleColumns === "all") return columns;

    return columns.filter((column) => Array.from(visibleColumns).includes(column.uid));
  }, [visibleColumns]);

  const filteredItems = React.useMemo(() => {
    let filteredUsers = [...result];

    if (hasSearchFilter) {
      filteredUsers = filteredUsers.filter((result) =>
      
        result[columnName].toLowerCase().includes(filterValue.toLowerCase()),
      );
    }
    if (statusFilter !== "all" && Array.from(statusFilter).length !== statusOptions.length) {
      filteredUsers = filteredUsers.filter((result) =>
        Array.from(statusFilter).includes(result.status),
      );
    }

    return filteredUsers;
  }, [result, hasSearchFilter, statusFilter, filterValue]);

  const items = React.useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;

    return filteredItems.slice(start, end);
  }, [page, filteredItems, rowsPerPage]);

  const sortedItems = React.useMemo(() => {
    return [...items].sort((a, b) => {
      const first = a[sortDescriptor.column];
      const second = b[sortDescriptor.column];
      const cmp = first < second ? -1 : first > second ? 1 : 0;

      return sortDescriptor.direction === "descending" ? -cmp : cmp;
    });
  }, [sortDescriptor, items]);

  const renderCell = React.useCallback((result, columnKey) => {
    const cellValue = result[columnKey];

    switch (columnKey) {
      case columnName:
        return (

           <div className="flex flex-col">
           <p className="text-bold text-small capitalize">{cellValue}</p>
           {/* <p className="text-bold text-tiny capitalize text-default-500">{result.Hotel_name}</p> */}
         </div>
        );
      case columnSort:
        return (
          <div className="flex flex-col">
            <p className="text-bold text-small capitalize">{cellValue}</p>
            {/* <p className="text-bold text-tiny capitalize text-default-500">{result.Hotel_Id}</p> */}
          </div>
        );
      case "status":
        return (
            operation === "propManagement" ? <Chip
                className="capitalize border-none gap-1 text-default-600"
                color={statusColorMap[result.status]}
                size="sm"
                variant="dot"
          >
            {cellValue}
          </Chip> 
          :  <Chip className="capitalize" color={statusColorMap[result.status]} size="sm" variant="flat">
          {cellValue}
                </Chip>
        );
      case "actions":
        return (
          actionsContent
        );
      default:
        return cellValue;
    }
  }, []);

  const onRowsPerPageChange = React.useCallback((e) => {
    setRowsPerPage(Number(e.target.value));
    setPage(1);
  }, []);


  const onSearchChange = React.useCallback((value) => {
    if (value) {
      setFilterValue(value);
      setPage(1);
    } else {
      setFilterValue("");
    }
  }, []);

  const topContent = React.useMemo(() => {
    return (
      <div className="flex flex-col gap-4 p-6 w-full">
        <div className="flex gap-3 justify-between items-end ml-2">
          <Input
            isClearable
            classNames={{
              base: "w-96",
              inputWrapper: "border-1",
            }}
            placeholder={operation === "listHotel" ? "Search by date..." : "Search by name..."}
            size="sm"
            radius="lg"
            color="primary"
            startContent={<SearchIcon className="text-default-300" />}
            value={filterValue}
            variant="bordered"
            onClear={() => setFilterValue("")}
            onValueChange={onSearchChange}
          />
          <div className="flex gap-3 ml-10">
            <Dropdown>
              <DropdownTrigger className="hidden sm:flex">
                <Button
                  endContent={<ChevronDownIcon className="text-small" />}
                  size="sm"
                  className="text-foreground"
                  variant='shadow'
                >
                  Status
                </Button>
              </DropdownTrigger>
              <DropdownMenu
                disallowEmptySelection
                aria-label="Table Columns"
                closeOnSelect={false}
                selectedKeys={statusFilter}
                selectionMode="multiple"
                onSelectionChange={setStatusFilter}
              >
                {statusOptions.map((status) => (
                  <DropdownItem key={status.uid} className="capitalize">
                    {status.name}
                    {/* {capitalize(status.name)} */}
                  </DropdownItem>
                ))}
              </DropdownMenu>
            </Dropdown>
            {operation === "propManagement" || operation === "pms_roomtype" ? <Dropdown>
              <DropdownTrigger className="hidden sm:flex">
                <Button
                  endContent={<ChevronDownIcon className="text-small" />}
                  size="sm"
                  variant="flat"
                >
                  Columns
                </Button>
              </DropdownTrigger>
              <DropdownMenu
                disallowEmptySelection
                aria-label="Table Columns"
                closeOnSelect={false}
                selectedKeys={visibleColumns}
                selectionMode="multiple"
                onSelectionChange={setVisibleColumns}
              >
                {columns.map((column) => (
                  <DropdownItem key={column.uid} className="capitalize">
                    {column.name}
                    {/* {capitalize(column.name)} */}
                  </DropdownItem>
                ))}
              </DropdownMenu>
            </Dropdown> : " "}
            {operation === "listHotel" ? "" 
            : <><Button
                className="text-white"
                variant='shadow'
                //onClick={(e) => {operation === "propManagement" ? " " : handleOpen("editmany")}}
                onClick={(e) => {handleOpen("editmany")}}
                startContent={<EditIcon className="size-4" />}
                size="sm"
                color="success"
              >
                Edit
              </Button>
              <Button
                className="text-white"
                variant='shadow'
                onClick={(e) => {operation === "propManagement" ? " " : handleDelete('',"deleteSelected",checksRef.current)}}
                startContent={<DeleteIcon className="size-4" />}
                size="sm"
                color="danger"
              >
                Delete
              </Button>
              <Button
                className="text-white"
                variant='shadow'
                onPress={(e) => operation === "propManagement" ? router.push('/admin/onboarding') : handleOpen("add")}
                onClick={(e) => operation === "propManagement" ? "" : handleClick()}
                startContent={<PlusIcon />}
                size="sm"
                color="primary"
              >
                Add New
              </Button></>
            }
          </div>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-default-400 text-small">Total {result.length} hotels</span>
          <label className="flex items-center text-default-400 text-small">
            Rows per page:
            <select
              className="bg-transparent outline-none text-default-400 text-small"
              onChange={onRowsPerPageChange}
              defaultValue={10}
            >
              <option value="10">10</option>
              <option value="50">50</option>
              <option value="100">100</option>
            </select>
          </label>
        </div>
      </div>
    );
  }, [filterValue, statusFilter, visibleColumns, onSearchChange, onRowsPerPageChange, result.length]);

  const bottomContent = React.useMemo(() => {
    return (
      <div className="py-2 px-2 flex justify-between items-center">
        <span className="w-[30%] text-small text-default-400">
          {selectedKeys === "all"
            ? "All items selected"
            : `${selectedKeys.size} of ${filteredItems.length} selected`}
        </span>
        <Pagination
          showControls
          classNames={{
            cursor: "bg-primary text-background",
          }}
          color="primary"
          isDisabled={hasSearchFilter}
          page={page}
          total={pages}
          variant="light"
          onChange={setPage}
        />
        <span className="text-small text-default-400">
          {selectedKeys === "all"
            ? "All items selected"
            : `${selectedKeys.size} of ${items.length} selected`}
        </span>
      </div>
    );
  }, [selectedKeys, items.length, page, pages, hasSearchFilter]);

  const classNames = React.useMemo(
    () => ({
      wrapper: ["max-h-[382px] max-w-[500px]"],
      th: ["bg-transparent", "text-default-500", "border-b", "border-divider"],
      td: [
        // changing the rows border radius
        // first
        "group-data-[first=true]:first:before:bg-red-500",
        "group-data-[first=true]:last:before:rounded-none",
        // middle
        "group-data-[middle=true]:before:rounded-none",
        // last
        "group-data-[last=true]:first:before:rounded-none",
        "group-data-[last=true]:last:before:rounded-none",
      ],
    }),
    [],
  );

    React.useEffect(() => {
        setResult(data)
    }, [data])

//   React.useEffect(() => {
//     initialFxn()
// }, [])

// const initialFxn = async () => {
//     try {
//         const response = await fetch("/api/hotels/hotel_info", {
//             method: "GET",
//             headers: {
//                 "Content-Type": "application/json",
//             },
//         });
//         const result = await response.json();
//         console.log("Data:", result.data);
//         setResult(result.data);
//     } catch (error) {
//         console.error("Error fetching data:", error);
//     }
// }

// React.useEffect(() => {
//   // console.log("Selected Keys: ",selectedKeys?.forEach((item) => console.log(item)),selectedKeys.size)

//   console.log("Selected Keys: ",selectedKeys.size, selectedKeys, selectedKeys.entries())
// }, [selectedKeys])

React.useEffect(() => {
  dispatch(handleSelectedChecks([...selectedKeys]))
}, [dispatch, selectedKeys]);

  return (
   <>
      <Table
          isCompact
          isHeaderSticky
          // removeWrapper
          aria-label="Example table with custom cells, pagination and sorting"
          bottomContent={bottomContent}
          bottomContentPlacement="outside"
          checkboxesProps={{
            classNames: {
              wrapper: "after:bg-background after:text-foreground text-foreground",
            },
          }}
          selectedKeys={selectedKeys}
          selectionMode="multiple"
          sortDescriptor={sortDescriptor}
          topContent={topContent}
          topContentPlacement="outside"
          onSelectionChange={setSelectedKeys}
          onSortChange={setSortDescriptor}
      >
              <TableHeader columns={operation === "propManagement" || operation === "pms_roomtype"  ? headerColumns : columns}>
                  {(column) => (
                      <TableColumn
                          key={column.uid}
                          align={column.uid === "actions" ? "center" : "start"}
                          allowsSorting={column.sortable}
                      >
                          {column.name}
                      </TableColumn>
                  )}
              </TableHeader>
              <TableBody className='w-[10px]' emptyContent={isLoading &&  sortedItems.length === 0
              ? <Spinner />
            : "No data found"} items={sortedItems}>
  {(item) => (
    <TableRow key={operation === "propManagement" ? item.Hotel_Id : item.id} className= {operation === "pms_roomtype" ? "text-foreground" : ""}>
      {(columnKey) => {
        if (columnKey === 'actions') {
          // Customize rendering for the actions column
          return (
            <TableCell>
              {actionsContent(
                item,
                (rowData) => {
                  // Callback function to handle edit click
                  console.log("Edit clicked:", rowData);
                  // Handle the edit click event here
                },
                (rowData) => {
                  // Callback function to handle delete click
                  console.log("Delete clicked:", rowData);
                  // Handle the delete click event here
                }
              )}
            </TableCell>
          );
        } else {
          // Render other columns normally
          return <TableCell>{renderCell(item, columnKey)}</TableCell>;
        }
      }}
    </TableRow>
  )}
</TableBody>
          </Table></>
  );
}
