import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useActiveTool } from "@/lib/hooks/useActiveTool";
import { cn } from "@/lib/utils";
import { ChevronDown, Circle, PenLine, PenTool, Square } from "lucide-react";

type menuTypes = "Shape" | "Draw";

const MENU_ELEMENTS = [
  {
    menu: "Shape",
    items: [
      {
        label: "Rectangle",
        icon: <Square />,
      },
      {
        label: "Ellipse",
        icon: <Circle />,
      },
    ],
  },
  {
    menu: "Draw",
    items: [
      {
        label: "Pen",
        icon: <PenTool />,
      },
      {
        label: "Draw",
        icon: <PenLine />,
      },
    ],
  },
];

const NavMenuItem = ({ type }: { type: menuTypes }) => {
  const { tool, mainTool, setTool } = useActiveTool();
  const itemIndex = type == "Shape" ? 0 : 1;
  let previousSelectedItem =
    itemIndex === 0
      ? mainTool == "Rectangle"
        ? 0
        : 1
      : mainTool == "Pen"
      ? 0
      : 1;
  const menuTypeItem = MENU_ELEMENTS[itemIndex];
  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        asChild
        className={cn("h-full p-2", tool == type && "bg-teal-500")}
      >
        <span className="flex h-full items-center cursor-pointer">
          {menuTypeItem.items[previousSelectedItem].icon}
          <ChevronDown className=" stroke-1" />
        </span>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-48 bg-zinc-800 text-white">
        {menuTypeItem.items.map((item, index) => (
          <DropdownMenuItem
            className="gap-2"
            key={index}
            onClick={() => setTool(type, item.label as any)}
          >
            {item.icon}
            {item.label}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default NavMenuItem;
