import React, { useState } from "react";
import { Bars3Icon } from "@heroicons/react/24/outline";
import Drawer from "./Drawer";

const MenuButton = () => {
const [isHovered, setIsHovered] = useState(false);
const [isDrawerOpen, setIsDrawerOpen] = useState(false);

const toggleDrawer = () => {
    setIsDrawerOpen((prev) => !prev);
};

return (
    <div className="flex items-center justify-center">
    <button
        type="button"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={toggleDrawer}
        className={`relative rounded-lg p-2 text-slate-900 hover:text-blue-600 transition-all focus:outline-none focus:ring-offset-2 ${
        isHovered ? "hover:bg-gray-500/10 text-blue-600" : ""
        }`}
    >
        <span className="sr-only">Open menu</span>
        <Bars3Icon aria-hidden="true" className="h-6 w-6" />
    </button>

    <Drawer isDrawerOpen={isDrawerOpen} toggleDrawer={toggleDrawer} />
    </div>
    );
};

export default MenuButton;
