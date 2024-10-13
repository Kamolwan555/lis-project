import React, { useState, useRef, useEffect } from "react";
import { BellIcon, CheckCircleIcon } from "@heroicons/react/24/outline";
import { Badge } from "@mui/material";

const Notification = () => {
const [isOpen, setIsOpen] = useState(false);
const [isHovered, setIsHovered] = useState(false);
const [badgeCount, setBadgeCount] = useState(3); // ตั้งค่าจำนวนการแจ้งเตือนเริ่มต้น
const dropdownRef = useRef(null);

const toggleDropdown = () => {
setIsOpen((prev) => !prev);
setIsHovered(true);
};

const markAllAsRead = () => {
setBadgeCount(0); // เมื่อกดปุ่มนี้ badge จะเปลี่ยนเป็น 0 (อ่านทั้งหมดแล้ว)
};

// ปิด dropdown เมื่อคลิกนอกบริเวณ
useEffect(() => {
const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
    setIsOpen(false);
    setIsHovered(false);
    }
};

document.addEventListener("mousedown", handleClickOutside);
return () => {
    document.removeEventListener("mousedown", handleClickOutside);
};
}, []);

return (
<div className="flex items-center justify-center">
    <div className="relative inline-block">
    {/* ปุ่ม Notification */}
    <Badge
        badgeContent={badgeCount}
        color="primary"
        overlap="circular"
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
    >
        <button
        id="dropdownNotificationButton"
        onClick={toggleDropdown}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => !isOpen && setIsHovered(false)}
        type="button"
        className={`relative rounded-lg p-2 text-slate-900 hover:text-blue-600 transition-all focus:outline-none focus:ring-offset-2 ${
            isHovered ? "hover:bg-gray-500/10 text-blue-600" : ""
        } ${isOpen ? "bg-gray-500/10" : ""}`}
        >
        <span className="absolute -inset-1.5" />
        <span className="sr-only">View notifications</span>
        <BellIcon aria-hidden="true" className="h-6 w-6" />
        </button>
    </Badge>

    {/* เมนู Dropdown */}
    {isOpen && (
        <div
        ref={dropdownRef}
        id="dropdownNotification"
        className="absolute left-1/2 transform -translate-x-1/2 z-20 w-80 bg-white divide-y divide-gray-100 rounded-lg shadow dark:bg-gray-800 dark:divide-gray-700"
        aria-labelledby="dropdownNotificationButton"
        >
        <div className="block px-4 py-2 text-sm font-medium font-sans text-left rounded-t-lg bg-gray-50 flex justify-between items-center">
            Notifications
            <button
            onClick={markAllAsRead}
            className="flex items-center space-x-1 text-gray-500 hover:text-blue-600"
            >
            <CheckCircleIcon className="h-5 w-5" />
            <span className="text-sm">Read all</span>
            </button>
        </div>
        <div className="divide-y divide-gray-100 dark:divide-gray-700">
            {/* รายการ Notification */}
            <a
            href="#"
            className="flex px-4 py-3 hover:bg-gray-100 dark:hover:bg-gray-700"
            >
            <div className="flex-shrink-0">
                <img
                className="rounded-full w-11 h-11"
                src="https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1760&q=80"
                alt="Jese image"
                />
            </div>
            <div className="flex-1 ps-3">
                <div className="text-gray-500 text-sm mb-1.5 dark:text-gray-400">
                New message from{" "}
                <span className="font-semibold text-gray-900 dark:text-white">
                    Jese Leos
                </span>
                : &quot;Hey, what&apos;s up? All set for the
                presentation?&quot;
                </div>
                <div className="text-xs text-blue-600 dark:text-blue-500">
                a few moments ago
                </div>
            </div>
            </a>
            <a
            href="#"
            className="flex px-4 py-3 hover:bg-gray-100 dark:hover:bg-gray-700"
            >
            <div className="flex-shrink-0">
                <img
                className="rounded-full w-11 h-11"
                src="https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?q=80&w=2080&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                alt="Joseph Mcfall"
                />
            </div>
            <div className="flex-1 ps-3">
                <div className="text-gray-500 text-sm mb-1.5 dark:text-gray-400">
                Joseph Mcfall and{" "}
                <span className="font-semibold">5 others</span> started
                following you.
                </div>
                <div className="text-xs text-blue-600 dark:text-blue-500">
                10 minutes ago
                </div>
            </div>
            </a>
            <a
            href="#"
            className="flex px-4 py-3 hover:bg-gray-100 dark:hover:bg-gray-700"
            >
            <div className="flex-shrink-0">
                <img
                className="rounded-full w-11 h-11"
                src="https://images.unsplash.com/photo-1519699047748-de8e457a634e?q=80&w=2080&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                alt="Bonnie Green"
                />
            </div>
            <div className="flex-1 ps-3">
                <div className="text-gray-500 text-sm mb-1.5 dark:text-gray-400">
                Bonnie Green and{" "}
                <span className="font-semibold">141 others</span> love your
                story. See it and view more stories.
                </div>
                <div className="text-xs text-blue-600 dark:text-blue-500">
                44 minutes ago
                </div>
            </div>
            </a>
        </div>
        <a
            href="#"
            className="block py-2 text-sm font-medium text-center text-gray-900 rounded-b-lg bg-gray-50 hover:bg-gray-100 dark:bg-gray-800 dark:hover:bg-gray-700 dark:text-white"
        >
            <div className="inline-flex items-center text-sm font-medium font-sans">
            View all
            </div>
        </a>
        </div>
    )}
    </div>
</div>
);
};

export default Notification;
