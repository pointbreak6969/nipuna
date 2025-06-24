"use client";
import { Separator } from "./ui/separator";
import type React from "react";
import { useState, useCallback, useRef, useEffect, useMemo } from "react";
import TableTop from "./TableHeader";
import { Button } from "./ui/button";
import { Check, ChevronDownIcon, MoreVertical } from "lucide-react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  flexRender,
  getCoreRowModel,
  useReactTable,
  type ColumnDef,
  type VisibilityState,
  type Column,
} from "@tanstack/react-table";
import { Checkbox } from "./ui/checkbox";
type Data = {
  id: number;
  name: string;
  email: string;
  addedFrom: string;
  tags: string;
  internalId: string;
  clientId: string;
  phone: string;
  clientPortal: string;
  assignee: string;
  followers: string[];
  status: string;
  applications: number;
  lastUpdated: string;
};
const mockData: Data[] = [
  {
    id: 1,
    name: "John Doe",
    email: "john.doe@gmail.com",
    addedFrom: "Web",
    tags: "premium",
    internalId: "ID001",
    clientId: "C001",
    phone: "123-456-7890",
    clientPortal: "Active",
    assignee: "Jane Smith",
    followers: ["Alice Johnson", "Bob Wilson"],
    status: "completed",
    applications: 8,
    lastUpdated: "2023-10-01",
  },
  {
    id: 2,
    name: "Sarah Connor",
    email: "sarah.connor@email.com",
    addedFrom: "Referral",
    tags: "vip",
    internalId: "ID002",
    clientId: "C002",
    phone: "234-567-8901",
    clientPortal: "Active",
    assignee: "Mike Davis",
    followers: ["Charlie Brown", "Diana Prince"],
    status: "in-progress",
    applications: 12,
    lastUpdated: "2023-10-15",
  },
  {
    id: 3,
    name: "Robert Miller",
    email: "robert.miller@company.com",
    addedFrom: "LinkedIn",
    tags: "corporate",
    internalId: "ID003",
    clientId: "C003",
    phone: "345-678-9012",
    clientPortal: "Inactive",
    assignee: "Lisa Anderson",
    followers: ["Eve Martinez", "Frank Castle"],
    status: "pending",
    applications: 5,
    lastUpdated: "2023-09-28",
  },
  
];
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
const EditableCell = ({
  value: mockData,
  row,
  column,
  table,
  avatar,
  email,
}: {
  value: any;
  row: any;
  column: any;
  table: any;
  avatar: any;
  email: any;
}) => {
  const [value, setValue] = useState(mockData);
  const [isEditing, setIsEditing] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const divRef = useRef<HTMLDivElement>(null);

  // Set value if external data changes
  useEffect(() => {
    setValue(mockData);
  }, [mockData]);

  // Auto focus the input when editing starts
  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
      inputRef.current.select();
    }
  }, [isEditing]);

  // Exit editing on blur
  const onBlur = () => {
    setIsEditing(false);
    table.options.meta?.updateData(row.index, column.id, value);
  };

  // Enter editing on double click
  const onDoubleClick = () => {
    setIsEditing(true);
  };

  // Enter editing on Enter key when not editing
  const onKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "Enter") {
      if (!isEditing) {
        e.preventDefault();
        setIsEditing(true);
      } else {
        onBlur();
      }
    }
  };

  // Update value on change
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  if (isEditing) {
    return (
      <div className="flex">
        {avatar === "yes" ? (
          <div className="flex items-start gap-2 w-full">
            <div className="w-8 h-8 bg-gray-300 rounded-full flex-shrink-0 flex items-center justify-center text-xs font-medium">
              <Avatar className="h-7 w-7">
                <AvatarImage src="./image.png" />
                <AvatarFallback className="text-xs">H</AvatarFallback>
              </Avatar>
            </div>
            <div className="flex-1 min-w-0">
              <input
                ref={inputRef}
                value={value}
                onChange={onChange}
                onBlur={onBlur}
                onKeyDown={onKeyDown}
                className="w-full h-6 px-1 border-2 border-blue-500 rounded focus:outline-none text-sm font-medium"
              />
              {email === "yes" && (
                <div className="text-xs text-gray-500 mt-1">
                  {row.original.email}
                </div>
              )}
            </div>
          </div>
        ) : (
          <input
            ref={inputRef}
            value={value}
            onChange={onChange}
            onBlur={onBlur}
            onKeyDown={onKeyDown}
            className="w-full h-8 px-2 border-2 border-blue-500 rounded focus:outline-none max-w-full"
          />
        )}
      </div>
    );
  }

  return (
    <div
      ref={divRef}
      tabIndex={0}
      onDoubleClick={onDoubleClick}
      onKeyDown={onKeyDown}
      className="cursor-pointer hover:bg-gray-50 p-2 rounded min-h-8 flex items-center w-full focus:outline-none focus:ring-2 focus:ring-blue-300 overflow-hidden text-ellipsis"
      title="Double-click or press Enter to edit"
    >
      {avatar === "yes" ? (
        <div className="flex items-start gap-2 w-full">
          <div className="w-8 h-8 bg-gray-300 rounded-full flex-shrink-0 flex items-center justify-center text-xs font-medium">
            <Avatar className="h-7 w-7">
              <AvatarImage src="./image.png" />
              <AvatarFallback className="text-xs">H</AvatarFallback>
            </Avatar>
          </div>
          <div className="flex-1 min-w-0">
            <div className="text-sm font-medium truncate">{value}</div>
            {email === "yes" && (
              <div className="text-xs text-gray-500 mt-1 truncate">
                {row.original.email}
              </div>
            )}
          </div>
        </div>
      ) : (
        <span className="truncate w-full">{value}</span>
      )}
    </div>
  );
};

const TableData = () => {
  const [data, setData] = useState<Data[]>(mockData);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const baseColums: ColumnDef<Data>[] = [
    {
      accessorKey: "name",
      header: "Name",
      size: 300,
      cell: ({ getValue, row, column, table }) => (
        <EditableCell
          value={getValue()}
          row={row}
          column={column}
          table={table}
          email={"yes"}
          avatar={"yes"}
        />
      ),
    },
    {
      accessorKey: "addedFrom",
      header: "Added From",
      size: 300,
      cell: ({ getValue, row, column, table }) => (
        <EditableCell
          avatar={"no"}
          email={"no"}
          value={getValue()}
          row={row}
          column={column}
          table={table}
        />
      ),
    },
    {
      accessorKey: "tags",
      header: "Tags",
      size: 300,
      cell: ({ getValue, row, column, table }) => (
        <EditableCell
          avatar={"no"}
          email={"no"}
          value={getValue()}
          row={row}
          column={column}
          table={table}
        />
      ),
    },
    {
      accessorKey: "internalId",
      header: "Internal Id",
      size: 300,
      cell: ({ getValue, row, column, table }) => (
        <EditableCell
          avatar={"no"}
          email={"no"}
          value={getValue()}
          row={row}
          column={column}
          table={table}
        />
      ),
    },
    {
      accessorKey: "clientId",
      header: "Client Id",
      size: 300,
      cell: ({ getValue, row, column, table }) => (
        <EditableCell
          avatar={"no"}
          email={"no"}
          value={getValue()}
          row={row}
          column={column}
          table={table}
        />
      ),
    },
    {
      accessorKey: "phone",
      header: "Phone",
      size: 300,
      cell: ({ getValue, row, column, table }) => (
        <EditableCell
          avatar={"no"}
          email={"no"}
          value={getValue()}
          row={row}
          column={column}
          table={table}
        />
      ),
    },
    {
      accessorKey: "clientPortal",
      header: "Client Portal",
      size: 300,
      cell: ({ getValue, row, column, table }) => (
        <EditableCell
          avatar={"no"}
          email={"no"}
          value={getValue()}
          row={row}
          column={column}
          table={table}
        />
      ),
    },
    {
      accessorKey: "assignee",
      header: "Assignee",
      size: 300,
      cell: ({ getValue, row, column, table }) => (
        <EditableCell
          avatar={"yes"}
          email={"yes"}
          value={getValue()}
          row={row}
          column={column}
          table={table}
        />
      ),
    },
    {
      accessorKey: "followers",
      header: "Followers",
      size: 300,
      cell: ({ getValue, row, column, table }) => (
        <EditableCell
          avatar={"no"}
          email={"no"}
          value={getValue()}
          row={row}
          column={column}
          table={table}
        />
      ),
    },
    {
      accessorKey: "status",
      header: "Status",
      size: 300,
      cell: ({ getValue, row, column, table }) => (
        <EditableCell
          avatar={"no"}
          email={"no"}
          value={getValue()}
          row={row}
          column={column}
          table={table}
        />
      ),
    },
    {
      accessorKey: "applications",
      header: "Applications",
      size: 300,
      cell: ({ getValue, row, column, table }) => (
        <EditableCell
          avatar={"no"}
          email={"no"}
          value={getValue()}
          row={row}
          column={column}
          table={table}
        />
      ),
    },
    {
      accessorKey: "lastUpdated",
      header: "Last Updated",
      size: 300,
      cell: ({ getValue, row, column, table }) => (
        <EditableCell
          avatar={"no"}
          email={"no"}
          value={getValue()}
          row={row}
          column={column}
          table={table}
        />
      ),
    },
  ];
  const [columns, setColumns] = useState<ColumnDef<Data>[]>(baseColums);
  //update data function
  const updateData = useCallback(
    (rowIndex: number, columnId: string, value: any) => {
      setData((oldData) =>
        oldData.map((row, index) => {
          if (index === rowIndex) {
            return {
              ...row,
              [columnId]: value,
            };
          }
          return row;
        })
      );
    },
    []
  );
  // Add new row
  const addRow = () => {
    const newRow: Data = {
      id: data.length + 1,
      name: "Default Name",
      email: "Default Email",
      addedFrom: " Web",
      tags: "default",
      internalId: "default-id",
      clientId: "default-client-id",
      phone: "default-phone",
      clientPortal: "default-portal",
      assignee: "default-assignee",
      followers: ["default-follower1", "default-follower2"],
      status: "default-status",
      applications: 0,
      lastUpdated: new Date().toLocaleDateString(),
    };

    // Add any custom columns with empty values
    columns.forEach((col) => {
      if (
        "accessorKey" in col &&
        col.accessorKey &&
        !Object.prototype.hasOwnProperty.call(newRow, col.accessorKey)
      ) {
        (newRow as any)[col.accessorKey] = "";
      }
    });

    setData((prev) => [...prev, newRow]);
  };
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    state: {
      columnVisibility,
    },
    meta: {
      updateData,
    },
  });
  const hiddenColumns: Column<any, any>[] = useMemo(() => {
    return table.getAllColumns().filter((column) => !column.getIsVisible());
  }, [table, columnVisibility]);
  // Function to show a column
  const showColumn = (columnId: any) => {
    const column = table.getColumn(columnId);
    if (column) {
      column.toggleVisibility(true);
    }
  };

  // Function to show all hidden columns (for your "add" button)
  const showAllHiddenColumns = () => {
    hiddenColumns.forEach((column) => {
      column.toggleVisibility(true);
    });
  };
  return (
    <div className="h-full flex flex-col">
      <div>
        {" "}
        <TableTop />
      </div>

      <Separator className="bg-gray-200 h-[1px] my-2" />
      <div className="h-full">
        <div className="flex items-center justify-between px-4 py-2">
          <div className="inline-flex items-center bg-[#7474C9] p-1 rounded-md text-white ">
            <Button variant="ghost" onClick={addRow}>
              New Client
            </Button>
            <ChevronDownIcon className="h-4 w-4 mr-2" />
          </div>
          <div className="flex items-center gap-4">
            <div className="text-gray-500 text-sm w-full">
              <p>{"Prospects(18)"}</p>
            </div>
            <div className="text-gray-500 text-sm underline underline-offset-4 decoration-green-400 w-full ">
              <p>{"Clients(10)"}</p>
            </div>
            <div className="text-gray-500 text-sm w-full">
              <p>{"Archived(0)"}</p>
            </div>
          </div>
        </div>

        <div className="border border-gray-300 bg-white rounded-sm h-[500px] overflow-scroll ">
            <Table className="border-collapse  ">
            <TableCaption className="text-gray-500 bg-gray-50 border-b border-gray-300 py-2 caption-top">
              A list of clients and prospects. For Keyboard Navigation click
              "Enter" on the desired cell to enable editing.
            </TableCaption>
            <TableHeader>
              {table.getHeaderGroups().map((headerGroup) => {
              const visibleHeaders = headerGroup.headers;
              const totalVisibleColumns = visibleHeaders.length;
              const columnWidth =
                totalVisibleColumns > 0
                ? `${Math.floor(90 / totalVisibleColumns)}%`
                : "90%";
              const addColumnWidth = "10%";

              return (
                <TableRow key={headerGroup.id}>
                <TableHead className="border-r p-2 border-gray-200 min-w-[50px]">
                  <Checkbox />
                </TableHead>
                {visibleHeaders.map((header) => (
                  <TableHead
                  key={header.id}
                  className="border-r border-gray-200 min-w-[120px]"
                  style={{ width: columnWidth }}
                  >
                  <div className="flex items-center justify-between p-2 text-md text-gray-700">
                    {header.isPlaceholder
                    ? null
                    : flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                      )}
                    <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <MoreVertical className="cursor-pointer hover:bg-gray-100 rounded p-1 " />
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-48" align="end">
                      <DropdownMenuItem
                      onClick={() => {
                        header.column.toggleVisibility(false);
                      }}
                      >
                      Hide Column
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                  </TableHead>
                ))}

                <TableHead
                  className="border-r border-gray-200 min-w-[100px]"
                  style={{ width: addColumnWidth }}
                >
                  <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                    variant="ghost"
                    className="p-1 text-gray-500 hover:bg-gray-100 rounded w-full"
                    >
                    + Add Column
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-48" align="end">
                    {hiddenColumns.length > 0 ? (
                    hiddenColumns.map((column) => (
                      <DropdownMenuItem
                      key={column.id}
                      onClick={() => showColumn(column.id)}
                      >
                      {
                        (column.columnDef as ColumnDef<any, any>)
                        ?.header as string
                      }
                      </DropdownMenuItem>
                    ))
                    ) : (
                    <DropdownMenuItem disabled>
                      No hidden columns
                    </DropdownMenuItem>
                    )}
                  </DropdownMenuContent>
                  </DropdownMenu>
                </TableHead>
                </TableRow>
              );
              })}
            </TableHeader>
            <TableBody>
              {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row, index) => {
                const visibleCells = row.getVisibleCells();
                const totalVisibleColumns = visibleCells.length;
                const columnWidth =
                totalVisibleColumns > 0
                  ? `${Math.floor(90 / totalVisibleColumns)}%`
                  : "90%";

                return (
                <TableRow key={row.id}>
                  <TableCell className="border-r p-2 border-gray-200 min-w-[50px]">
                  <Checkbox />
                  </TableCell>
                  {visibleCells.map((cell) => (
                  <TableCell
                    key={cell.id}
                    className="p-2 border-r border-gray-200 min-w-[120px] overflow-hidden"
                    style={{ width: columnWidth }}
                  >
                    {flexRender(
                    cell.column.columnDef.cell,
                    cell.getContext()
                    )}
                  </TableCell>
                  ))}
                  <TableCell
                  className="p-2 border-r border-gray-200 min-w-[100px]"
                  style={{ width: "10%" }}
                  >
                  {/* Empty cell for add column alignment */}
                  </TableCell>
                </TableRow>
                );
              })
              ) : (
              <TableRow>
                <TableCell
                colSpan={table.getVisibleFlatColumns().length + 1}
                className="text-center text-gray-500 border-r border-gray-200"
                >
                No data available
                </TableCell>
              </TableRow>
              )}
        
              <TableCell
                colSpan={table.getVisibleFlatColumns().length + 1}
                className="p-2 border-r border-gray-200"
              >
                <div className="flex items-center justify-between">
                <Button variant="outline" onClick={addRow}>
                  Add Row
                </Button>
                </div>
            
              </TableCell>
            </TableBody>
            </Table>
        </div>
      </div>
    </div>
  );
};
export default TableData;
