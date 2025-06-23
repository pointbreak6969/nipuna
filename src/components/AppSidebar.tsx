"use client"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  ChevronDown,
  Search,
  LayoutDashboard,
  Building2,
  MessageSquare,
  Users,
  Settings,
  FileText,
  ClipboardList,
  MoreHorizontal,
  Menu
} from "lucide-react"
import { useSidebar } from "./ui/sidebar"
const AppSidebar = () => {
  const menuItems = [
    { icon: LayoutDashboard, label: "Dashboard" },
    { icon: Building2, label: "Office Check-in" },
    { icon: MessageSquare, label: "Enquiries" },
    { icon: Users, label: "Clients" },
    { icon: Settings, label: "Services" },
    { icon: FileText, label: "Quotation" },
    { icon: ClipboardList, label: "Tasks" },
  ]
  const {open, setOpen} = useSidebar()
  return (
    <div className="w-64 h-screen bg-white mt-2" >
      {/* CRM Dropdown Header */}
      <div className="p-1 flex items-center justify-between">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              className=" justify-between h-8 px-2 text-sm font-medium text-gray-700 hover:bg-gray-100"
            >
              CRM
              <ChevronDown className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start" className="w-56">
            <DropdownMenuItem>CRM</DropdownMenuItem>
            <DropdownMenuItem>Sales</DropdownMenuItem>
            <DropdownMenuItem>Marketing</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        <div>
          <Menu/>
        </div>
      </div>

      {/* Search Bar */}
      <div className="px-4 py-2">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input placeholder="Search" className="pl-10 h-8 text-sm bg-white border-gray-200 focus:border-gray-300" />
          <Button
            variant="ghost"
            size="sm"
            className="absolute right-1 top-1/2 transform -translate-y-1/2 h-6 w-6 p-0 hover:bg-gray-100"
          >
            <MoreHorizontal className="h-3 w-3 text-gray-400" />
          </Button>
        </div>
      </div>

      {/* Navigation Menu */}
      <div className="p-2">
        {menuItems.map((item, index) => {
          const IconComponent = item.icon
          return (
            <div
              key={index}
              className="flex items-center justify-between group hover:bg-[#EBEBF8] rounded-md px-3 py-2 mb-1"
            >
              <div className="flex items-center gap-3">
                <IconComponent className="h-4 w-4 text-gray-500" />
                <span className="text-sm text-gray-700 font-medium">{item.label}</span>
              </div>
              <Button
                variant="ghost"
                size="sm"
                className="h-6 w-6 p-0 opacity-0 group-hover:opacity-100 hover:bg-gray-200"
              >
                <MoreHorizontal className="h-3 w-3 text-gray-400" />
              </Button>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default AppSidebar
