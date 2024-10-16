import React from 'react';
import CreateBilling from "../components/Billing/CreateBilling";


const BillingContent = () => {
    return (
        <>
            {/*  Billing */}
            <header>
                <div className="mx-auto max-w-8xl px-4 py-6 sm:px-6 lg:px-8">
                    <h1 className="text-base font-semibold tracking-tight text-gray-800 flex justify-between items-center">
                        Billing
                    </h1>
                </div>
            </header>

            <main>
                <div className="mx-auto max-w-full max-w-3xl py-1 sm:px-6 lg:px-2 ml-5 mr-5">
                    <CreateBilling />
                </div>
            </main>
        </>
    );
}

export default BillingContent;
