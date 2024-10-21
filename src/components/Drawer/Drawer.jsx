import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import logo from "../../components/picture/logo.png";
import {
Squares2X2Icon,
CalendarIcon,
UserGroupIcon,
ClipboardDocumentListIcon,
ChevronDownIcon,
ShoppingBagIcon,
CubeIcon,
ClipboardIcon,
WalletIcon,
QuestionMarkCircleIcon,
Cog6ToothIcon,
XMarkIcon,
} from "@heroicons/react/24/outline";
import Scrollbar from "perfect-scrollbar"; 
import "perfect-scrollbar/css/perfect-scrollbar.css"; 

const menuItems = [
{
    name: "Dashboard",
    icon: <Squares2X2Icon aria-hidden="true" className="h-5 w-5" />,
    href: "/dashboard",  // Adjusted href
},
{
    name: "Customer",
    icon: <UserGroupIcon aria-hidden="true" className="h-5 w-5" />,
    href: "/customers",  // Adjusted href
},
{
    name: "Booking",
    icon: <CalendarIcon aria-hidden="true" className="h-5 w-5" />,
    href: "/appointments",  // Adjusted href
},
{
    name: "Packages",
    icon: <ShoppingBagIcon aria-hidden="true" className="h-5 w-5" />,
    href: "/packages",  // Adjusted href
},
];

const ecommerceItems = [
{ name: "Create Orders", href: "/orders" },
{ name: "Orders Lab", href: "/standingorders" },
{ name: "Record & Accept", href: "/confirm" },
];

const analyticsItems = [
{
name: "Report ",
icon: <ClipboardIcon aria-hidden="true" className="h-5 w-5" />,
href: "/report",
},
{
name: "Billing",
icon: <WalletIcon aria-hidden="true" className="h-5 w-5" />,
href: "/billing",
},
{
name: "Stock",
icon: <CubeIcon aria-hidden="true" className="h-5 w-5" />,
href: "/items",
},
];

const helpAndSettingsItems = [
{
name: "Help Center",
icon: <QuestionMarkCircleIcon aria-hidden="true" className="h-5 w-5" />,
href: "#",
},
{
name: "Setting",
icon: <Cog6ToothIcon aria-hidden="true" className="h-5 w-5" />,
href: "#",
},
];

function Drawer({ toggleDrawer, isDrawerOpen }) {
const [isEcommerceOpen, setIsEcommerceOpen] = useState(false);
const [hoveredItem, setHoveredItem] = useState(null);
const dropdownRef = useRef(null);
const drawerRef = useRef(null); 

const toggleEcommerceDropdown = () => setIsEcommerceOpen((prev) => !prev);

useEffect(() => {
const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
    setIsEcommerceOpen(false);
    }
};

document.addEventListener("mousedown", handleClickOutside);
return () => {
    document.removeEventListener("mousedown", handleClickOutside);
};
}, []);

useEffect(() => {
let ps;
if (drawerRef.current) {
    ps = new Scrollbar(drawerRef.current); 
}
return () => {
    if (ps) {
    ps.destroy(); 
    }
};
}, [isDrawerOpen]);

const renderMenuItems = (items) => {
return items.map((item) => (
    <li key={item.name}>
    <Link 
                to={item.href} 
                className={`flex items-center p-2 text-gray-700 hover:text-blue-600 rounded-lg dark:text-white group ${
                    hoveredItem === item.name
                        ? "bg-gray-500/10 text-blue-600"
                        : "hover:bg-gray-100 dark:hover:bg-gray-700"
                }`}
                onMouseEnter={() => setHoveredItem(item.name)}
                onMouseLeave={() => setHoveredItem(null)}
            >
                {item.icon}
                <span className="ml-4">{item.name}</span>
            </Link> 
    </li>
));
};

const renderEcommerceDropdown = () => {
return (
    <>
    <button
        type="button"
        className={`flex items-center justify-between w-full p-2 text-base  text-gray-700 hover:text-blue-600 transition duration-75 rounded-lg group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700 ${
        hoveredItem === "Order" ? "bg-gray-500/10 text-blue-600" : ""
        }`}
        onClick={toggleEcommerceDropdown}
        onMouseEnter={() => setHoveredItem("Order")}
        onMouseLeave={() => setHoveredItem(null)}
    >
        <div className="flex items-center">
        <ClipboardDocumentListIcon aria-hidden="true" className="h-5 w-5" />
        <span className="ml-4 text-left whitespace-nowrap">Order</span>
        </div>
        <ChevronDownIcon aria-hidden="true" className="h-4 w-4" />
    </button>
    {isEcommerceOpen && (
        <ul className="py-2 space-y-2">
        {ecommerceItems.map((item) => (
            <li key={item.name}>
            <a
                href={item.href}
                className="flex items-center w-full p-2 text-gray-700 hover:text-blue-600 transition duration-75 rounded-lg pl-11 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
            >
                {item.name}
            </a>
            </li>
        ))}
        </ul>
    )}
    </>
);
};

return (
<div ref={dropdownRef}>
    {/* Drawer Component */}
    <div
    ref={drawerRef} 
    className={`fixed top-0 left-0 z-40 h-screen p-4 y-auto rounded-lg transition-transform bg-white shadow dark:bg-gray-800 ${
        isDrawerOpen ? "translate-x-0" : "-translate-x-full"
    } w-64`}
    >
    {/* Logo and Close Button */}
    <div className="flex items-center justify-between mb-4">
        <div className="flex items-center">
        <img alt="Your Company" src={logo} className="h-8 w-8" />
        <span className="ml-4 text-xl font-semibold text-blue-600">LIS</span>
        </div>
        {/* Close Drawer */}
        <button
        type="button"
        onClick={toggleDrawer}
        className="rounded-lg p-2 text-gray-900 hover:text-blue-600 hover:bg-gray-500/10 transition-all focus:outline-none"
        >
        <XMarkIcon aria-hidden="true" className="h-6 w-6" />
        </button>
    </div>

    <div className="text-xs font-medium md:mt-6 font-sans text-gray-500 dark:text-gray-400">
        Main Menu
    </div>
    <div className="py-4 drawer-content">
        <ul className="space-y-2 font-medium ">
        {renderMenuItems(menuItems)}
        <li>{renderEcommerceDropdown()}</li>
        </ul>
    </div>

    <div className="text-xs font-medium font-sans text-gray-500 dark:text-gray-400">
        Analytics
    </div>
    <div className="py-4 drawer-content">
        <ul className="space-y-2 font-medium">
        {renderMenuItems(analyticsItems)}
        </ul>
    </div>

    {/* Help and Settings */}
    <div className="text-xs font-medium font-sans text-gray-500 dark:text-gray-400 mt-10"></div>
    <div className="py-4 drawer-content">
        <ul className="space-y-2 font-medium">
        {renderMenuItems(helpAndSettingsItems)}
        </ul>
    </div>
    </div>
</div>
);
}

Drawer.propTypes = {
toggleDrawer: PropTypes.func.isRequired,
isDrawerOpen: PropTypes.bool.isRequired,
};

export default Drawer;
