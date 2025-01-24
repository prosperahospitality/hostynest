'use client'
import React, { useEffect, useState } from "react"

const DashboardPage = () => {

    useEffect(() => {
        try {
            const deleteolddates = async () => {
                let payload = {
                    action: "deleteOldDates"
                };

                const response = await fetch(
                    `/api/pms/rates_and_inventory/managerateandinventory`,
                    {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify(payload),
                    }
                );
                const result = await response.json();

            }
            deleteolddates()
        } catch (error) {

        }
    }, [])

    return (
        <main className="">
            <h4 className="text-red-500">dashboard 1111</h4>
            <div className="flex overflow-hidden w-screen">
                <div className="w-[267px] h-[130px] top-[153px] left-[34px] bg-red-500 rounded-[16px]" />
                <div className="w-[267px] h-[130px] top-[153px] left-[34px] bg-red-500 rounded-[16px]" />
                <div className="w-[267px] h-[130px] top-[153px] left-[34px] bg-red-500 rounded-[16px]" />
                <div className="w-[267px] h-[130px] top-[153px] left-[34px] bg-red-500 rounded-[16px]" />
                <div className="w-[267px] h-[130px] top-[153px] left-[34px] bg-red-500 rounded-[16px]" />
                <div className="w-[267px] h-[130px] top-[153px] left-[34px] bg-red-500 rounded-[16px]" />
                <div className="w-[267px] h-[130px] top-[153px] left-[34px] bg-red-500 rounded-[16px]" />
                <div className="w-[267px] h-[130px] top-[153px] left-[34px] bg-red-500 rounded-[16px]" />
                <div className="w-[267px] h-[130px] top-[153px] left-[34px] bg-red-500 rounded-[16px]" />
                <div className="w-[267px] h-[130px] top-[153px] left-[34px] bg-red-500 rounded-[16px]" />
                <div className="w-[267px] h-[130px] top-[153px] left-[34px] bg-red-500 rounded-[16px]" />
                <div className="w-[267px] h-[130px] top-[153px] left-[34px] bg-red-500 rounded-[16px]" />

            </div>
            <div className="w-[267px] h-[130px] top-[153px] left-[34px] bg-white rounded-[16px] border-2 border-gray-500" />
            <div className="w-[267px] h-[130px] top-[153px] left-[34px] bg-red-500 rounded-[16px]" />
            <div className="w-[267px] h-[130px] top-[153px] left-[34px] bg-red-500 rounded-[16px]" />
            <div className="w-[267px] h-[130px] top-[153px] left-[34px] bg-red-500 rounded-[16px]" />
            <div className="w-[267px] h-[130px] top-[153px] left-[34px] bg-red-500 rounded-[16px]" />
            <div className="w-[267px] h-[130px] top-[153px] left-[34px] bg-red-500 rounded-[16px]" />
            <div className="w-[267px] h-[130px] top-[153px] left-[34px] bg-red-500 rounded-[16px]" />

        </main>
    )
}

export default DashboardPage;