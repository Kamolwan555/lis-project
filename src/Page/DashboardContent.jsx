// DashboardContent.jsx
import React from 'react';
import Header from "../components/Header/Header"
import DataTable from "../components/OrdersTable";

const DashboardContent = () => {
    return (
        <>
            {/* ส่วนหัวของหน้า Dashboard */}
            <header>
                <div className="mx-auto max-w-8xl px-4 py-6 sm:px-6 lg:px-8">
                    <h1 className="text-base font-semibold tracking-tight text-gray-800">
                        Dashboard
                    </h1>
                </div>
            </header>

            <main>
                <div className="mx-auto max-w-full max-w-3xl py-1 sm:px-6 lg:px-2 ml-5 mr-5">
                    <Header />
                </div>

                <header>
                    <div className="mx-auto max-w-8xl px-4 py-6 sm:px-6 lg:px-8">
                        <h1 className="text-base font-semibold tracking-tight text-gray-800">
                            Orders
                        </h1>
                    </div>
                </header>

                <div className="mx-auto max-w-full m-h-screen py-1 sm:px-6 lg:px-2 ml-5 mr-5">
                    <DataTable />
                </div>
            </main>
        </>
    );
}

export default DashboardContent;
