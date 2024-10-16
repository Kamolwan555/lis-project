// Dashboard.jsx
import React from "react";
import {
    Disclosure,
    Menu as HeadlessMenu,
    MenuButton as HeadlessMenuButton,
    MenuItem,
    MenuItems,
} from "@headlessui/react";
import {
    UserIcon,
    WalletIcon,
    Cog6ToothIcon,
    ArrowLeftEndOnRectangleIcon,
} from "@heroicons/react/24/outline";
import Search from "./components/Header/Search"
import Notification from "./components/Header/Notification"
import { useNavigate } from "react-router-dom";
import MenuButton from "./components/Drawer/MenuButton"
import RecordAcceptContent from "./Page/RecordAcceptContent";

const userNavigation = [
    { name: "Profile", href: "#", icon: UserIcon },
    { name: "Billing", href: "#", icon: WalletIcon },
    { name: "Setting", href: "#", icon: Cog6ToothIcon },
    { name: "Logout", href: "#", icon: ArrowLeftEndOnRectangleIcon },
];

export default function Dashboard() {
    const navigate = useNavigate(); 

    const handleLogout = () => {
        navigate("/login");
    };

    // User Example
    const user = {
        name: "John Doe",
        email: "doe@example.com",
        imageUrl:
            "https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1480&q=80",
    };

    return (
        <div className="min-h-full bg-gray-50">
            <Disclosure as="nav" className="bg-white shadow sticky top-0 z-10">
                <div className="mx-auto max-w-8xl px-4 sm:px-6 lg:px-8">
                    <div className="flex h-16 items-center justify-between">
                        {/* ส่วนแสดงโลโก้และช่องค้นหา */}
                        <div className="flex items-center">
                            <div className="flex-shrink-0">
                                <MenuButton /> 
                            </div>
                            <div className="hidden md:block">
                                <div className="ml-10">
                                    <Search />
                                </div>
                            </div>
                        </div>
                        {/* ส่วนแสดงไอคอนการแจ้งเตือนและเมนูโปรไฟล์ */}
                        <div className="hidden md:block">
                            <div className="ml-4 flex items-center md:ml-6">
                                <div><Notification /></div>
                                <HeadlessMenu as="div" className="relative ml-3">
                                    <div className="flex items-center gap-4">
                                        <HeadlessMenuButton className="relative flex max-w-xs items-center text-sm hover:text-blue-600 focus:outline-none focus:ring-offset-2 focus:ring-offset-gray-800">
                                            <span className="absolute -inset-1.5" />
                                            <span className="sr-only">Open user menu</span>
                                            <img
                                                alt=""
                                                src={user.imageUrl}
                                                className="h-8 w-8 rounded-full border-2 border-gray-900 p-0.5"
                                            />
                                            <div className="ml-4">
                                                <span className="text-sm font-medium font-sans">
                                                    {user.name}
                                                </span>
                                            </div>
                                        </HeadlessMenuButton>
                                    </div>
                                    <MenuItems
                                        transition
                                        className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
                                    >
                                        {userNavigation.map((item, index) => (
                                            <React.Fragment key={item.name}>
                                                <MenuItem>
                                                    {item.name === "Logout" ? (
                                                        <a
                                                            onClick={handleLogout}
                                                            className="flex items-center px-4 py-2 text-sm font-medium hover:text-blue-600 text-zinc-700 data-[focus]:bg-gray-100"
                                                        >
                                                            <item.icon className="h-5 w-5 mr-3" />
                                                            {item.name}
                                                        </a>
                                                    ) : (
                                                        <a
                                                            href={item.href}
                                                            className="flex items-center px-4 py-2 text-sm font-medium hover:text-blue-600 text-zinc-700 data-[focus]:bg-gray-100"
                                                        >
                                                            <item.icon className="h-5 w-5 mr-3" />
                                                            {item.name}
                                                        </a>
                                                    )}
                                                </MenuItem>
                                                {index === 2 && <hr className="my-3" />}
                                            </React.Fragment>
                                        ))}
                                    </MenuItems>
                                </HeadlessMenu>
                            </div>
                        </div>
                    </div>
                </div>
            </Disclosure>

            {/* Main Dashboard */}
            <RecordAcceptContent />
        </div>
    );
}
