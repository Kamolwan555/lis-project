import React, { useEffect, useState } from "react";
import { Button, Input, Space, Table, Card, Tabs, Modal, Form } from "antd";
import qs from "qs";
import mockData from "../../assets/mockData.json";
import AddButton from "./AddCustomers";
import axios from "axios";

const { TabPane } = Tabs;

const getRandomuserParams = (params) => ({
results: params.pagination?.pageSize,
page: params.pagination?.current,
...params,
});

const CustomersDefault = () => {
const [data, setData] = useState([]);
const [testData, setTestData] = useState([]);
const [loading, setLoading] = useState(false);
const [searchText, setSearchText] = useState("");
const [tableParams, setTableParams] = useState({
pagination: {
    current: 1,
    pageSize: 10,
},
});
const [isEditing, setIsEditing] = useState(false);
const [editRecord, setEditRecord] = useState(null);
const [form] = Form.useForm();
const [activeTab, setActiveTab] = useState("1");

const fetchData = () => {
    setLoading(true);
    const useMockData = false; // ปิดการใช้ mock data

    if (useMockData) {
        setData(mockData);
        setLoading(false);
        setTableParams({
            ...tableParams,
            pagination: {
                ...tableParams.pagination,
                total: mockData.length,
            },
        });
    } else {
        axios.get('http://localhost:3000/TechMedi/getUser')
        .then((response) => {
            const result = response.data;
    
            // ตรวจสอบว่า result มีข้อมูลที่ต้องการ
            if (result && result.card_id && result.card_id.length > 0) {
                const apiData = result.card_id.map((id, index) => ({
                    'Customer ID': id,
                    'Name': result.name[index],
                    'Date of Birth': result.birthday[index],
                    'Gender': result.gender[index],
                    'Contact Information': result.contact_infromation[index], // แก้คำผิดจาก contact_information
                }));
    
                setData(apiData); // ตั้งค่าให้กับ state
                setLoading(false);
                setTableParams({
                    ...tableParams,
                    pagination: {
                        ...tableParams.pagination,
                        total: apiData.length, // ใช้จำนวนข้อมูลจาก API
                    },
                });
            } else {
                console.error("No valid data found in the response:", result);
                setData([]); // ตั้งค่าให้เป็นอาร์เรย์ว่างถ้าไม่มีข้อมูล
                setLoading(false);
            }
        })
        .catch((error) => {
            console.error("Error fetching data from API:", error);
            setLoading(false);
        });
    }
};

const fetchTestData = (pagination) => {
    setLoading(true);
    const { current, pageSize } = pagination || tableParams.pagination;

    axios.get('http://localhost:3000/TechMedi/getTest', {
        params: { page: current, pageSize }, // ส่งพารามิเตอร์การแบ่งหน้าไปกับ API request
    })
    .then((response) => {
        const result = response.data;

        if (result && result.TESTID && result.TESTID.length > 0) {
            const apiTestData = result.TESTID.map((id, index) => ({
                'Requested Test': result.TestName[index],
                'Sample Type': result.TestType[index] || 'ไม่ระบุ',
                'Test Costs': result.TestPrice[index] !== undefined ? result.TestPrice[index] : 0,
                'Test ID': id
            }));

            setTestData(apiTestData);
            setLoading(false);
            setTableParams({
                ...tableParams,
                pagination: {
                    ...tableParams.pagination,
                    total: result.totalItems || apiTestData.length, // ตั้งค่าจำนวนข้อมูลทั้งหมด
                },
            });
        } else {
            console.error("No valid test data found in the response:", result);
            setTestData([]);
            setLoading(false);
        }
    })
    .catch((error) => {
        console.error("Error fetching test data from API:", error);
        setLoading(false);
    });
};

const handleSearch = (value) => {
setSearchText(value);
};

const handleReset = () => {
setSearchText("");
};

const filteredData = data.filter((record) =>
Object.values(record).some((field) =>
    String(field).toLowerCase().includes(searchText.toLowerCase())
)
);

const handleTableChange = (pagination, filters, sorter) => {
    setTableParams({
        pagination,
        filters,
        sortOrder: Array.isArray(sorter) ? undefined : sorter.order,
        sortField: Array.isArray(sorter) ? undefined : sorter.field,
    });

    if (activeTab === "1") {
        fetchData(pagination); // Fetch customer data
    } else if (activeTab === "2") {
        fetchTestData(pagination); // Fetch test data
    }
};

useEffect(() => {
    if (activeTab === "1") {
        fetchData(); // Fetch customer data when tab changes
    } else if (activeTab === "2") {
        fetchTestData(); // Fetch test data when tab changes
    }
}, [tableParams.pagination?.current, tableParams.pagination?.pageSize]);

const handleAddCustomer = (customer) => {
setData((prevData) => [...prevData, customer]);
};

const handleEdit = (record) => {
setEditRecord(record);
form.setFieldsValue(record);
setIsEditing(true);
};

const handleEditSave = () => {
    form.validateFields().then((values) => {
        // ดึง member ID จาก record ที่แก้ไข
        const memberId = editRecord["Customer ID"]; // เปลี่ยนหากคุณมีคีย์อื่นสำหรับ member_id
        console.log(memberId)
        // ส่งค่าที่อัปเดตไปยัง API โดยใช้คำสั่ง PUT
        axios.put(`http://localhost:3000/TechMedi/updateMember/${memberId}`, values)
        .then((response) => {
            // ตรวจสอบว่าการอัปเดตสำเร็จ
            if (response.status === 200) {
                const updatedData = data.map((item) =>
                    item["Customer ID"] === memberId
                        ? { ...item, ...values }
                        : item
                );
                setData(updatedData);
                setIsEditing(false);
                setEditRecord(null);
            } else {
                console.error("การอัปเดตล้มเหลว:", response.data);
            }
        })
        .catch((error) => {
            console.error("เกิดข้อผิดพลาดในการอัปเดตข้อมูล:", error);
        });
    });
};

const operationColumn = {
title: "Operation",
key: "operation",
width: "20%",
render: (record) => (
    <Space>
    <Button onClick={() => handleEdit(record)}>Edit</Button>
    </Space>
),
};

// Define your columns here
const customerColumns = [
{
    title: "Card ID",
    dataIndex: "Customer ID",
    key: "Customer ID",
    width: "10%",
},
{ title: "Name", dataIndex: "Name", key: "Name", width: "20%" },
{
    title: "Date of Birth",
    dataIndex: "Date of Birth",
    key: "Date of Birth",
    width: "15%",
},
{
    title: "Gender",
    dataIndex: "Gender",
    key: "Gender",
    width: "20%",
    filters: [
    { text: "Male", value: "Male" },
    { text: "Female", value: "Female" },
    ],
    onFilter: (value, record) => record.Gender === value,
},
{
    title: "Contact Information",
    dataIndex: "Contact Information",
    key: "Contact Information",
    width: "20%",
},
operationColumn,
];

const testColumns = [
{
    title: "Test ID", // เพิ่มชื่อคอลัมน์
    dataIndex: "Test ID", // ตั้งค่า dataIndex เป็น Test ID
    key: "Test ID", // ตั้งค่า key เป็น Test ID
    width: "10%", // ขนาดของคอลัมน์
},
{
    title: "Requested Test",
    dataIndex: "Requested Test",
    key: "Requested Test",
    width: "30%",
},
{
    title: "Sample Type",
    dataIndex: "Sample Type",
    key: "Sample Type",
    width: "30%",

},
operationColumn, // Add operation column
];

const handleTabChange = (key) => {
setActiveTab(key);
setEditRecord(null);
};

return (
<>
    <Card
    title={
        <div
        style={{
            display: "flex",
            justifyContent: "space-between",
            outline: "1px solid #e5e7eb",
            borderRadius: "5px",
            color: "blue",
        }}
        >
        <Space>
            <Input
            placeholder="Search..."
            value={searchText}
            onChange={(e) => handleSearch(e.target.value)}
            style={{ width: 200 }}
            />
            <Button onClick={handleReset}>Reset</Button>
        </Space>
        <AddButton onAddCustomer={handleAddCustomer} />{" "}
        </div>
    }
    bordered={true}
    >
    <Tabs defaultActiveKey="1" onChange={handleTabChange}>
        <TabPane tab="Customer Info" key="1">
        <Table
            columns={customerColumns}
            rowKey={(record) => record["Customer ID"]}
            dataSource={filteredData}
            pagination={tableParams.pagination}
            loading={loading}
            onChange={handleTableChange}
            scroll={{ x: 800 }}
        />
        </TabPane>
        <TabPane tab="Test Info" key="2">
        <Table
            columns={testColumns}
            rowKey={(record) => record["Requested Test"]}
            dataSource={testData}
            pagination={tableParams.pagination}
            loading={loading}
            onChange={handleTableChange}
            scroll={{ x: 1000 }}
        />
        </TabPane>
    </Tabs>

    <Modal
        title="Edit Record"
        visible={isEditing}
        onCancel={() => setIsEditing(false)}
        footer={[
        <Button key="cancel" onClick={() => setIsEditing(false)}>
            Cancel
        </Button>,
        <Button key="submit" type="primary" onClick={handleEditSave}>
            Save
        </Button>,
        ]}
    >
        <Form form={form} layout="vertical">
        {activeTab === "1" && (
            <>
            <Form.Item
                name="Customer ID"
                label="Card ID"
                rules={[{ required: true }]}
            >
                <Input />
            </Form.Item>
            <Form.Item
                name="Name"
                label="Name"
                rules={[{ required: true }]}
            >
                <Input />
            </Form.Item>
            <Form.Item
                name="Date of Birth"
                label="Date of Birth"
                rules={[{ required: true }]}
            >
                <Input />
            </Form.Item>
            <Form.Item
                name="Gender"
                label="Gender"
                rules={[{ required: true }]}
            >
                <Input />
            </Form.Item>
            <Form.Item
                name="Contact Information"
                label="Contact Information"
                rules={[{ required: true }]}
            >
                <Input />
            </Form.Item>
            </>
        )}
        {activeTab === "2" && (
            <>
            <Form.Item
                name="Requested Test"
                label="Requested Test"
                rules={[{ required: true }]}
            >
                <Input />
            </Form.Item>
            <Form.Item
                name="Sample Type"
                label="Sample Type"
                rules={[{ required: true }]}
            >
                <Input />
            </Form.Item>
            <Form.Item
                name="Test Costs"
                label="Price"
                rules={[{ required: true }]}
            >
                <Input type="number" />
            </Form.Item>
            </>
        )}
        </Form>
    </Modal>
    </Card>
</>
);
};

export default CustomersDefault;
