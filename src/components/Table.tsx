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
  {
    id: 4,
    name: "Emily Johnson",
    email: "emily.johnson@startup.io",
    addedFrom: "Cold Call",
    tags: "startup",
    internalId: "ID004",
    clientId: "C004",
    phone: "456-789-0123",
    clientPortal: "Active",
    assignee: "Tom Wilson",
    followers: ["Grace Lee", "Henry Ford"],
    status: "completed",
    applications: 15,
    lastUpdated: "2023-10-20",
  },
  {
    id: 5,
    name: "Michael Brown",
    email: "michael.brown@tech.com",
    addedFrom: "Web",
    tags: "tech",
    internalId: "ID005",
    clientId: "C005",
    phone: "567-890-1234",
    clientPortal: "Active",
    assignee: "Anna Garcia",
    followers: ["Ivan Rodriguez", "Julia Roberts"],
    status: "on-hold",
    applications: 3,
    lastUpdated: "2023-10-05",
  },
  {
    id: 6,
    name: "Jessica Davis",
    email: "jessica.davis@finance.org",
    addedFrom: "Email Campaign",
    tags: "finance",
    internalId: "ID006",
    clientId: "C006",
    phone: "678-901-2345",
    clientPortal: "Inactive",
    assignee: "Kevin Thompson",
    followers: ["Liam Taylor", "Mia Jackson"],
    status: "rejected",
    applications: 2,
    lastUpdated: "2023-09-15",
  },
  {
    id: 7,
    name: "David Wilson",
    email: "david.wilson@healthcare.net",
    addedFrom: "Referral",
    tags: "healthcare",
    internalId: "ID007",
    clientId: "C007",
    phone: "789-012-3456",
    clientPortal: "Active",
    assignee: "Sophie Clark",
    followers: ["Noah Harris", "Olivia White"],
    status: "in-progress",
    applications: 9,
    lastUpdated: "2023-10-12",
  },
  {
    id: 8,
    name: "Amanda Taylor",
    email: "amanda.taylor@retail.com",
    addedFrom: "Social Media",
    tags: "retail",
    internalId: "ID008",
    clientId: "C008",
    phone: "890-123-4567",
    clientPortal: "Active",
    assignee: "Ryan Martinez",
    followers: ["Paul Walker", "Quinn Adams"],
    status: "completed",
    applications: 11,
    lastUpdated: "2023-10-18",
  },
  {
    id: 9,
    name: "Christopher Lee",
    email: "christopher.lee@manufacturing.biz",
    addedFrom: "Trade Show",
    tags: "manufacturing",
    internalId: "ID009",
    clientId: "C009",
    phone: "901-234-5678",
    clientPortal: "Inactive",
    assignee: "Rachel Green",
    followers: ["Sam Cooper", "Tina Turner"],
    status: "pending",
    applications: 6,
    lastUpdated: "2023-09-30",
  },
  {
    id: 10,
    name: "Ashley Garcia",
    email: "ashley.garcia@education.edu",
    addedFrom: "Web",
    tags: "education",
    internalId: "ID010",
    clientId: "C010",
    phone: "012-345-6789",
    clientPortal: "Active",
    assignee: "Mark Johnson",
    followers: ["Uma Thurman", "Victor Hugo"],
    status: "in-progress",
    applications: 7,
    lastUpdated: "2023-10-08",
  },
  {
    id: 11,
    name: "Daniel Martinez",
    email: "daniel.martinez@consulting.pro",
    addedFrom: "LinkedIn",
    tags: "consulting",
    internalId: "ID011",
    clientId: "C011",
    phone: "123-567-8901",
    clientPortal: "Active",
    assignee: "Natalie Wood",
    followers: ["William Blake", "Xena Warrior"],
    status: "completed",
    applications: 14,
    lastUpdated: "2023-10-22",
  },
  {
    id: 12,
    name: "Michelle Rodriguez",
    email: "michelle.rodriguez@legal.law",
    addedFrom: "Referral",
    tags: "legal",
    internalId: "ID012",
    clientId: "C012",
    phone: "234-678-9012",
    clientPortal: "Inactive",
    assignee: "Peter Parker",
    followers: ["Yuki Tanaka", "Zoe Saldana"],
    status: "on-hold",
    applications: 4,
    lastUpdated: "2023-09-25",
  },
  {
    id: 13,
    name: "James Anderson",
    email: "james.anderson@energy.power",
    addedFrom: "Cold Call",
    tags: "energy",
    internalId: "ID013",
    clientId: "C013",
    phone: "345-789-0123",
    clientPortal: "Active",
    assignee: "Monica Geller",
    followers: ["Adam Smith", "Betty Davis"],
    status: "pending",
    applications: 10,
    lastUpdated: "2023-10-10",
  },
  {
    id: 14,
    name: "Jennifer Thomas",
    email: "jennifer.thomas@media.tv",
    addedFrom: "Email Campaign",
    tags: "media",
    internalId: "ID014",
    clientId: "C014",
    phone: "456-890-1234",
    clientPortal: "Active",
    assignee: "Chandler Bing",
    followers: ["Carl Jung", "Dorothy Parker"],
    status: "completed",
    applications: 13,
    lastUpdated: "2023-10-25",
  },
  {
    id: 15,
    name: "Matthew Jackson",
    email: "matthew.jackson@transport.move",
    addedFrom: "Web",
    tags: "transport",
    internalId: "ID015",
    clientId: "C015",
    phone: "567-901-2345",
    clientPortal: "Inactive",
    assignee: "Ross Geller",
    followers: ["Emma Stone", "Finn Wolfhard"],
    status: "rejected",
    applications: 1,
    lastUpdated: "2023-09-12",
  },
  {
    id: 16,
    name: "Lauren White",
    email: "lauren.white@hospitality.stay",
    addedFrom: "Social Media",
    tags: "hospitality",
    internalId: "ID016",
    clientId: "C016",
    phone: "678-012-3456",
    clientPortal: "Active",
    assignee: "Phoebe Buffay",
    followers: ["George Clooney", "Helen Mirren"],
    status: "in-progress",
    applications: 8,
    lastUpdated: "2023-10-14",
  },
  {
    id: 17,
    name: "Andrew Harris",
    email: "andrew.harris@agriculture.farm",
    addedFrom: "Trade Show",
    tags: "agriculture",
    internalId: "ID017",
    clientId: "C017",
    phone: "789-123-4567",
    clientPortal: "Active",
    assignee: "Joey Tribbiani",
    followers: ["Ian McKellen", "Judi Dench"],
    status: "completed",
    applications: 16,
    lastUpdated: "2023-10-28",
  },
  {
    id: 18,
    name: "Stephanie Clark",
    email: "stephanie.clark@fashion.style",
    addedFrom: "Referral",
    tags: "fashion",
    internalId: "ID018",
    clientId: "C018",
    phone: "890-234-5678",
    clientPortal: "Inactive",
    assignee: "Rachel Green",
    followers: ["Kate Winslet", "Leonardo DiCaprio"],
    status: "pending",
    applications: 5,
    lastUpdated: "2023-10-02",
  },
  {
    id: 19,
    name: "Kevin Lewis",
    email: "kevin.lewis@automotive.drive",
    addedFrom: "LinkedIn",
    tags: "automotive",
    internalId: "ID019",
    clientId: "C019",
    phone: "901-345-6789",
    clientPortal: "Active",
    assignee: "Monica Geller",
    followers: ["Matt Damon", "Nicole Kidman"],
    status: "on-hold",
    applications: 7,
    lastUpdated: "2023-09-20",
  },
  {
    id: 20,
    name: "Rebecca Walker",
    email: "rebecca.walker@biotech.gene",
    addedFrom: "Cold Call",
    tags: "biotech",
    internalId: "ID020",
    clientId: "C020",
    phone: "012-456-7890",
    clientPortal: "Active",
    assignee: "Chandler Bing",
    followers: ["Oscar Isaac", "Penelope Cruz"],
    status: "completed",
    applications: 12,
    lastUpdated: "2023-10-30",
  },
  {
    id: 21,
    name: "Brian Hall",
    email: "brian.hall@aerospace.fly",
    addedFrom: "Web",
    tags: "aerospace",
    internalId: "ID021",
    clientId: "C021",
    phone: "123-678-9012",
    clientPortal: "Active",
    assignee: "Ross Geller",
    followers: ["Quentin Tarantino", "Reese Witherspoon"],
    status: "in-progress",
    applications: 9,
    lastUpdated: "2023-10-16",
  },
];
import {Avatar, AvatarFallback, AvatarImage} from "./ui/avatar";
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
                <AvatarImage src="/placeholder.svg?height=28&width=28" />
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
              <AvatarImage src="/placeholder.svg?height=28&width=28" />
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
                  <TableRow>
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

              <TableRow>
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
              </TableRow>
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
};
export default TableData;
