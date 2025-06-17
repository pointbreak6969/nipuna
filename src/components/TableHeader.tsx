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
import { Search, MoreHorizontal } from "lucide-react";
const TableHeader = () => {
  return (
    <div className="flex justify-between items-center py-4 px-8">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-8 text-gray-400" />
        <Input
          placeholder="Search Particular"
          className="pl-10 h-8 text-sm bg-white border-gray-200 focus:border-gray-300"
        />
      </div>
    </div>
  );
};

export default TableHeader;
