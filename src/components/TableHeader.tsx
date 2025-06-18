import React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Funnel, CalendarDays, Check } from "lucide-react";
import { ChevronDownIcon } from "lucide-react";
const TableTop = () => {
  return (
    <div className="flex justify-between items-center py-4 px-8">
      <div className="flex items-center gap-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-8 text-gray-400" />
          <Input
            placeholder="Search Particular"
            className="pl-10 h-8 text-sm bg-white border-gray-200 focus:border-gray-300"
          />
        </div>
        <div className="relative">
          <Funnel className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400 z-10" />
          <Select>
            <SelectTrigger className="w-[200px] pl-10 ">
              <SelectValue placeholder="Filter by assigned" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="light">Recently</SelectItem>
              <SelectItem value="dark">Oldest</SelectItem>
              <SelectItem value="system">Most Popular</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="relative">
          <CalendarDays className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400 z-10" />
          <Button
            className="pl-10 h-8 text-sm bg-white border-gray-200 focus:border-gray-300"
            variant={"outline"}
          >
            <span className="flex items-center gap-2 text-gray-400">
              <p>Date</p>
              <ChevronDownIcon className="h-4 w-4" />
            </span>
          </Button>
        </div>
        <div className="relative">
          <Check className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400 z-10" />
          <Button
            className="pl-10 h-8 text-sm bg-white border-gray-200 focus:border-gray-300"
            variant={"outline"}
          >
            <span className="flex items-center gap-2 text-gray-400">
              <p>Status</p>
              <ChevronDownIcon className="h-4 w-4" />
            </span>
          </Button>
        </div>
      </div>
      <div className="flex items-center gap-8">
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-2 text-gray-400">
            <Funnel />
            <p>Filter</p>
          </div>
          <div className="px-1">
            <div className="h-6 w-px bg-gray-500 font-size-xl dark:bg-gray-600 "></div>
          </div>
          <div className="flex items-center gap-2 text-gray-400">
            <svg
              width="10"
              height="16"
              viewBox="0 0 10 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M0.833344 10.5L5.00001 14.6666L9.16668 10.5M0.833344 5.49998L5.00001 1.33331L9.16668 5.49998"
                stroke="#667085"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>

            <p>Sort</p>
          </div>
          <div className="px-1">
            <div className="h-6 w-px bg-gray-500 font-size-xl dark:bg-gray-600 "></div>
          </div>
          <div className="flex items-center gap-2 text-gray-400">
            <Funnel />
            <p>Saved Filter</p>
          </div>
        </div>
        <div>
          <p className="text-blue-600 cursor-pointer">Clear</p>
        </div>
      </div>
    </div>
  );
};

export default TableTop;
