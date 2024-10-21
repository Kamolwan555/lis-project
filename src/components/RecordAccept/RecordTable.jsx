import React, { useState, useEffect } from "react";
import { Table, Drawer } from "antd";
import recordData from "../../assets/RecordLab.json";

const RecordTable = () => {
    const [data, setData] = useState([]);
    const [drawerVisible, setDrawerVisible] = useState(false);
    const [selectedRecord, setSelectedRecord] = useState(null);

    useEffect(() => {
        setData(recordData);
    }, []);

    const columns = [
        {
            title: "Record ID",
            dataIndex: "record_id",
            key: "record_id",
        },
        {
            title: "Patient ID",
            dataIndex: "patient_id",
            key: "patient_id",
        },
        {
            title: "Test ID",
            dataIndex: "test_id",
            key: "test_id",
        },
        {
            title: "Test Name",
            dataIndex: "test_name",
            key: "test_name",
        },
        {
            title: "Result",
            dataIndex: "result",
            key: "result",
        },
        {
            title: "Unit",
            dataIndex: "unit",
            key: "unit",
        },
        {
            title: "Reference Range",
            dataIndex: "reference_range",
            key: "reference_range",
        },
        {
            title: "Date Tested",
            dataIndex: "date_tested",
            key: "date_tested",
        },
        {
            title: "Status",
            dataIndex: "status",
            key: "status",
        },
    ];

    const showDrawer = (record) => {
        setSelectedRecord(record);
        setDrawerVisible(true);
    };

    const onClose = () => {
        setDrawerVisible(false);
        setSelectedRecord(null);
    };

    return (
        <div style={{ padding: "20px" }}>
            {/* Add margin top to the Table */}
            <Table
                style={{ marginTop: "5px" }} 
                columns={columns}
                dataSource={data}
                rowKey="record_id"
                onRow={(record) => ({
                    onClick: () => showDrawer(record), 
                })}
            />

            {/* Drawer for showing record details */}
            <Drawer
                title="Record Details"
                placement="right"
                onClose={onClose}
                visible={drawerVisible}
                width={500}
            >
                {selectedRecord && (
                    <div>
                    <p style={{ marginTop: '10px', marginBottom: '10px' }}><strong>Record ID:</strong> {selectedRecord.record_id}</p>
                    <p style={{ marginTop: '10px', marginBottom: '10px' }}><strong>Patient ID:</strong> {selectedRecord.patient_id}</p>
                    <p style={{ marginTop: '10px', marginBottom: '10px' }}><strong>Test ID:</strong> {selectedRecord.test_id}</p>
                    <p style={{ marginTop: '10px', marginBottom: '10px' }}><strong>Test Name:</strong> {selectedRecord.test_name}</p>
                    <p style={{ marginTop: '10px', marginBottom: '10px' }}><strong>Result:</strong> {selectedRecord.result}</p>
                    <p style={{ marginTop: '10px', marginBottom: '10px' }}><strong>Unit:</strong> {selectedRecord.unit}</p>
                    <p style={{ marginTop: '10px', marginBottom: '10px' }}><strong>Reference Range:</strong> {selectedRecord.reference_range}</p>
                    <p style={{ marginTop: '10px', marginBottom: '10px' }}><strong>Date Tested:</strong> {selectedRecord.date_tested}</p>
                    <p style={{ marginTop: '10px', marginBottom: '10px' }}><strong>Status:</strong> {selectedRecord.status}</p>
                </div>
                )}
            </Drawer>
        </div>
    );
};

export default RecordTable;
