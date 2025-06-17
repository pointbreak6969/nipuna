import React from "react";
import { ShieldUser, Ellipsis } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
const Header = () => {
  return (
    <div className="bg-white m-2 flex justify-between items-center">
      <div className="flex items-center gap-2 py-4 px-8">
        <div>
          <ShieldUser />
        </div>
        <div>
          <p className="text-xl"> Clients</p>
        </div>
      </div>
      <div className="flex items-center gap-4 py-4 px-8">
        <div>
          <Select>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Branch (Kathmandu)" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="light">Light</SelectItem>
              <SelectItem value="dark">Dark</SelectItem>
              <SelectItem value="system">System</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div>
          <Ellipsis className="text-xl" />
        </div>
      </div>
    </div>
  );
};

export default Header;
