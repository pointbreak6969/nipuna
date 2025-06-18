"use client";
import { Separator } from "./ui/separator";
import React, { useState, useCallback, useRef, useEffect } from "react";
import TableTop from "./TableHeader";
import { Button } from "./ui/button";
import { ChevronDownIcon, MoreVertical } from "lucide-react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Checkbox } from "./ui/checkbox";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
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
  ColumnDef,
  VisibilityState,
} from "@tanstack/react-table";

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
    email: "email@gmail.com",
    addedFrom: "Web",
    tags: "yo",
    internalId: "ID123",
    clientId: "C123",
    phone: "123-456-7890",
    clientPortal: "Active",
    assignee: "Jane Smith",
    followers: ["Follower1", "Follower2"],
    status: "completed",
    applications: 8,
    lastUpdated: "2023-10-01",
  },
];
//Editable cell component
const EditableCell = ({
  value: mockData,
  row,
  column,
  table,
}: {
  value: any;
  row: any;
  column: any;
  table: any;
}) => {
  const [value, setValue] = useState(mockData);
  const [isEditing, setIsEditing] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const onBlur = () => {
    setIsEditing(false);
    table.options.meta?.updateData(row.index, column.id, value);
  };
  const onDoubleClick = () => {
    setIsEditing(true);
  };
  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      inputRef.current?.blur();
    } else if (e.key === "Escape") {
      setIsEditing(false);
      setValue(mockData);
    } else if (e.key === "Tab") {
      e.preventDefault();
      const nextCell = table.getNextCell({
        row: row.index,
        column: column.id,
      });
      if (nextCell) {
        table.setFocusedCell(nextCell);
      }
    }
  };
  useEffect(() => {
    setValue(mockData);
  }, [mockData]);

  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
      inputRef.current.select();
    }
  }, [isEditing]);

  if (isEditing) {
    return (
      <input
        ref={inputRef}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onBlur={onBlur}
        onKeyDown={onKeyDown}
        className="w-full h-8 px-2 border-2 border-blue-500 rounded focus:outline-none"
      />
    );
  }

  return (
    <div
      onDoubleClick={onDoubleClick}
      className="cursor-pointer hover:bg-gray-50 p-2 rounded min-h-8 flex items-center w-full"
      title="Double-click to edit"
    >
      {value}
    </div>
  );
};
const TableData = () => {
  const [data, setData] = useState<Data[]>(mockData);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [newColumnName, setNewColumnName] = useState("");
  const [showAddColumn, setShowAddColumn] = useState(false);

  const baseColums: ColumnDef<Data>[] = [
    {
      accessorKey: "name",
      header: "Name",
      cell: ({ getValue, row, column, table }) => (
        <EditableCell
          value={getValue()}
          row={row}
          column={column}
          table={table}
        />
      ),
    },
    {
      accessorKey: "addedFrom",
      header: "Added From",
      cell: ({ getValue, row, column, table }) => (
        <EditableCell
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
      cell: ({ getValue, row, column, table }) => (
        <EditableCell
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
      cell: ({ getValue, row, column, table }) => (
        <EditableCell
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
      cell: ({ getValue, row, column, table }) => (
        <EditableCell
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
      cell: ({ getValue, row, column, table }) => (
        <EditableCell
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
      cell: ({ getValue, row, column, table }) => (
        <EditableCell
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
      cell: ({ getValue, row, column, table }) => (
        <EditableCell
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
      cell: ({ getValue, row, column, table }) => (
        <EditableCell
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
      cell: ({ getValue, row, column, table }) => (
        <EditableCell
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
      cell: ({ getValue, row, column, table }) => (
        <EditableCell
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
      cell: ({ getValue, row, column, table }) => (
        <EditableCell
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
  // Add new column
  const addColumn = () => {
    if (!newColumnName.trim()) return;

    const newColumn: ColumnDef<Data> = {
      accessorKey: newColumnName.toLowerCase().replace(/\s+/g, "_"),
      header: newColumnName,
      cell: ({ getValue, row, column, table }) => (
        <EditableCell
          value={getValue() || ""}
          row={row}
          column={column}
          table={table}
        />
      ),
    };

    setColumns((prev) => [...prev, newColumn]);

    // Add the new field to all existing data rows
    setData((prev) =>
      prev.map((row) => ({
        ...row,
        [newColumnName.toLowerCase().replace(/\s+/g, "_")]: "",
      }))
    );

    setNewColumnName("");
    setShowAddColumn(false);
  };
  // Add new row
  const addRow = () => {
    const newRow: Data = {
      id: data.length + 1,
      name: "",
      email: "",
      addedFrom: "",
      tags: "",
      internalId: "",
      clientId: "",
      phone: "",
      clientPortal: "",
      assignee: "",
      followers: [],
      status: "",
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

  const handleTableKeyDown = (e: React.KeyboardEvent) => {
    // if (e.key === 'Tab') {
    //   e.preventDefault();
    //   const focusedCell = table.getFocusedCell();
    //   if (focusedCell) {
    //     const nextCell = table.getNextCell({
    //       row: focusedCell.row.index,
    //       column: focusedCell.column.id,
    //     });
    //     if (nextCell) {
    //       table.setFocusedCell(nextCell);
    //     } else {
    //       // If no next cell, add a new row
    //       addRow();
    //     }
    //   }
  };
  return (
    <div className="bg-white m-2">
      <TableTop />
      <Separator className="bg-gray-200 h-[1px] my-2" />
      <div>
        <div className="flex items-center justify-between px-4 py-2">
          <div className="inline-flex items-center bg-[#7474C9] p-1 rounded-md text-white ">
            <Button variant="ghost">New Client</Button>
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

        <div className="border border-gray-300 bg-white rounded-sm overflow-hidden">
          <Table
            className="overflow-x-auto overflow-y-auto border-collapse"
            onKeyDown={handleTableKeyDown}
          >
            <TableCaption className="text-gray-500 bg-gray-50 border-b border-gray-300 py-2">
              A list of clients and prospects.
            </TableCaption>
            <TableHeader>
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <TableHead key={header.id}>
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
                </TableRow>
              ))}
            </TableHeader>
            <TableBody>
              {table.getRowModel().rows?.length ? (
                table.getRowModel().rows.map((row, index) => (
                  <TableRow key={row.id}>
                    {row.getVisibleCells().map((cell) => (
                      <TableCell key={cell.id} className="p-2">
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={columns.length}
                    className="text-center text-gray-500"
                  >
                    No data available
                  </TableCell>
                </TableRow>
              )}
              <TableRow>
                <TableCell colSpan={columns.length} className="p-2">
                  <div className="flex items-center justify-between">
                    <Button variant="outline" onClick={addRow}>
                      Add Row
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
};

export default TableData;
