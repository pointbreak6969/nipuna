import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import {
  CirclePlus,
  Bell,
  Mail,
  Settings,
  Moon,
  Grip,
  ChevronDown,
} from "lucide-react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

const Navbar = () => {
  return (
    <div className="flex justify-between items-center px-6 py-3 bg-white border-b">
      <div className="flex items-center gap-3">
        <Button variant="ghost" size="icon" className="h-8 w-8">
          <Grip className="font-size-xl" />
        </Button>
        <h2 className="text-lg font-medium text-gray-900">Test Project</h2>
      </div>

      <div className="flex items-center gap-1">
        <div className="flex items-center gap-6">
          <Button variant="ghost" size="icon" className="h-8 w-8">
            <CirclePlus className="font-size-xl" />
          </Button>
          <Button variant="ghost" size="icon" className="h-8 w-8 relative">
            <Bell className="font-size-xl" />
            <span className="absolute -top-1 -right-1 h-3 w-3 bg-green-500 rounded-full border-2 border-white"></span>
          </Button>
          <Button variant="ghost" size="icon" className="h-8 w-8">
            <Mail className="font-size-xl" />
          </Button>
          <Button variant="ghost" size="icon" className="h-8 w-8">
            <Settings className="font-size-xl" />
          </Button>
        </div>
        <div className="px-3">
          <div className="h-6 w-px bg-black font-size-xl dark:bg-gray-600 "></div>
        </div>

        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" className="h-8 w-8">
            <Moon className="font-size-xl" />
          </Button>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant={"ghost"}
                className="h-[40.5px] w-[40.5px] p-0 rounded-full"
              >
                <div className="flex items-center h-full w-full">
                  <Avatar className="h-7 w-7">
                    <AvatarImage src="./image.png" />
                    <AvatarFallback className="text-xs">H</AvatarFallback>
                  </Avatar>
                  <ChevronDown className=" h-4 w-4" />
                </div>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-78" align="end">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuGroup>
                <DropdownMenuItem>
                  <span>Profile</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <span>Rewards</span>
                </DropdownMenuItem>
              </DropdownMenuGroup>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <span>Contact</span>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <span>Log out</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
