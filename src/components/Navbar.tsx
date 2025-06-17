import { DropdownMenu, DropdownMenuTrigger,  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator, } from "./ui/dropdown-menu";
import { CirclePlus, Bell, Mail, Settings , Moon , Sun  } from 'lucide-react';
import { Avatar, AvatarImage, AvatarFallback } from "./ui/avatar";
import React from 'react'

const Navbar = () => {
  return (
    <div className="flex ">
        <div>
            <div></div>
            <div>
                <h2>Test Project</h2>
            </div>
        </div>
        <div>
            <div></div>
            <div>
              <div>
                <Moon/>
              </div>
              <div>
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>

                    </DropdownMenuTrigger>
                </DropdownMenu>
              </div>

            </div>
        </div>

    </div>
  )
}

export default Navbar