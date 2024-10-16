import React from 'react';
import CreateReport from "../components/Report/CreateReport";


const ReportContent = () => {
    return (
        <>
            {/*  Report */}
            <header>
                <div className="mx-auto max-w-8xl px-4 py-6 sm:px-6 lg:px-8">
                    <h1 className="text-base font-semibold tracking-tight text-gray-800 flex justify-between items-center">
                        Report
                    </h1>
                </div>
            </header>

            <main>
                <div className="mx-auto max-w-full max-w-3xl py-1 sm:px-6 lg:px-2 ml-5 mr-5">
                    <CreateReport />
                </div>
            </main>
        </>
    );
}

export default ReportContent;
