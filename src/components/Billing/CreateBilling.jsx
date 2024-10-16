import React, { useState, useEffect, useRef } from "react";
import PropTypes from "prop-types"; // Import PropTypes
import { Table, Drawer, Divider, Input, Button, Space } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import Highlighter from "react-highlight-words";
import billingData from "../../assets/ฺBilling.json"; // Import JSON data

// Helper component for showing field name and value
const DescriptionItem = ({ title, content }) => (
    <div className="site-description-item-profile-wrapper">
        <p className="site-description-item-profile-p-label">{title}:</p>
        {content}
    </div>
);

DescriptionItem.propTypes = {
    title: PropTypes.string.isRequired,
    content: PropTypes.node.isRequired,
};

const CreateBilling = () => {
    const [dataSource, setDataSource] = useState([]);
    const [drawerVisible, setVisible] = useState(false);
    const [selectedBill, setSelectedBill] = useState(null);
    const [searchText, setSearchText] = useState("");
    const [searchedColumn, setSearchedColumn] = useState("");
    const searchInput = useRef(null);

    // State for input fields
    const [formValues, setFormValues] = useState({});

    useEffect(() => {
        setDataSource(billingData);
    }, []);

    const showDrawer = (record) => {
        setSelectedBill(record);
        setFormValues(record); // Populate form values with selected record
        setVisible(true);
    };

    const onClose = () => {
        setVisible(false);
        setSelectedBill(null);
        setFormValues({}); // Clear form values
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormValues({ ...formValues, [name]: value });
    };

    const handleSave = () => {
        // Here you can implement the logic to save updated values
        console.log('Updated Values:', formValues);
        setDataSource(prevData =>
            prevData.map(item => (item.bill_id === selectedBill.bill_id ? formValues : item))
        );
        onClose(); // Close drawer after saving
    };

    const handleSearch = (selectedKeys, confirm, dataIndex) => {
        confirm();
        setSearchText(selectedKeys[0]);
        setSearchedColumn(dataIndex);
    };

    const handleReset = (clearFilters) => {
        clearFilters();
        setSearchText("");
    };

    const getColumnSearchProps = (dataIndex) => ({
        filterDropdown: ({
            setSelectedKeys,
            selectedKeys,
            confirm,
            clearFilters,
        }) => (
            <div
                style={{
                    padding: 8,
                }}
                onKeyDown={(e) => e.stopPropagation()}
            >
                <Input
                    ref={searchInput}
                    placeholder={`Search ${dataIndex}`}
                    value={selectedKeys[0]}
                    onChange={(e) =>
                        setSelectedKeys(e.target.value ? [e.target.value] : [])
                    }
                    onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
                    style={{
                        marginBottom: 8,
                        display: "block",
                    }}
                />
                <Space>
                    <Button
                        type="primary"
                        onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
                        icon={<SearchOutlined />}
                        size="small"
                        style={{
                            width: 90,
                        }}
                    >
                        Search
                    </Button>
                    <Button
                        onClick={() => clearFilters && handleReset(clearFilters)}
                        size="small"
                        style={{
                            width: 90,
                        }}
                    >
                        Reset
                    </Button>
                </Space>
            </div>
        ),
        filterIcon: (filtered) => (
            <SearchOutlined
                style={{
                    color: filtered ? "#1677ff" : undefined,
                }}
            />
        ),
        onFilter: (value, record) =>
            record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
        onFilterDropdownOpenChange: (visible) => {
            if (visible) {
                setTimeout(() => searchInput.current?.select(), 100);
            }
        },
        render: (text) =>
            searchedColumn === dataIndex ? (
                <Highlighter
                    highlightStyle={{
                        backgroundColor: "#ffc069",
                        padding: 0,
                    }}
                    searchWords={[searchText]}
                    autoEscape
                    textToHighlight={text ? text.toString() : ""}
                />
            ) : (
                text
            ),
    });

    const columns = [
        {
            title: "Bill ID",
            dataIndex: "bill_id",
            key: "bill_id",
            ...getColumnSearchProps("bill_id"),
        },
        {
            title: "Accept ID",
            dataIndex: "accept_id",
            key: "accept_id",
            ...getColumnSearchProps("accept_id"), // Add search for Accept ID
        },
        {
            title: "Select Item ID",
            dataIndex: "selectitem_id",
            key: "selectitem_id",
            ...getColumnSearchProps("selectitem_id"), // Add search for Select Item ID
        },
        {
            title: "Item Name",
            dataIndex: "item_name",
            key: "item_name",
        },
        {
            title: "Item Price",
            dataIndex: "item_price",
            key: "item_price",
            render: (price) => `฿${price}`,
        },
    ];

    return (
        <div style={{ padding: "20px" }}>
            <Table
                dataSource={dataSource}
                columns={columns}
                pagination={{ pageSize: 10 }}
                bordered
                rowKey="bill_id"
                onRow={(record) => ({
                    onClick: () => showDrawer(record),
                })}
            />

            <Drawer
                title={`Bill Details - ${selectedBill?.bill_id}`}
                width={500}
                onClose={onClose}
                visible={drawerVisible}
                bodyStyle={{ paddingBottom: 24 }}
                placement="right"
            >
                {selectedBill && (
                    <div>
                        {/* Billing Information */}
                        <h3
                            style={{
                                fontSize: "16px",
                                fontWeight: "500",
                                color: "#000000FF",
                            }}
                        >
                            Billing Information
                        </h3>
                        <br />
                        <p>
                            <strong>Bill ID</strong>
                            <Input
                                name="bill_id"
                                value={formValues.bill_id}
                                onChange={handleInputChange}
                                style={{
                                    marginTop: "10px",
                                    marginBottom: "10px"
                                }}
                            />
                        </p>
                        <p>
                            <strong>Bill Channel</strong>
                            <Input
                                name="bill_channel"
                                value={formValues.bill_channel}
                                onChange={handleInputChange}
                                style={{
                                    marginTop: "10px",
                                    marginBottom: "10px"
                                }}
                            />
                        </p>
                        <p>
                            <strong>Bill Evidence</strong>
                            <Input
                                name="bill_evidence"
                                value={formValues.bill_evidence}
                                onChange={handleInputChange}
                                style={{
                                    marginTop: "10px",
                                    marginBottom: "10px"
                                }}
                            />
                        </p>
                        <p>
                            <strong>Cost</strong>
                            <Input
                                name="bill_cost"
                                value={formValues.bill_cost}
                                onChange={handleInputChange}
                                style={{
                                    marginTop: "10px",
                                    marginBottom: "10px"
                                }}
                            />
                        </p>
                        <p>
                            <strong>Price</strong>
                            <Input
                                name="bill_price"
                                value={formValues.bill_price}
                                onChange={handleInputChange}
                                style={{
                                    marginTop: "10px",
                                    marginBottom: "10px"
                                }}
                            />
                        </p>
                        <p>
                            <strong>Status</strong>
                            <Input
                                name="bill_status"
                                value={formValues.bill_status}
                                onChange={handleInputChange}
                                style={{
                                    marginTop: "10px",
                                    marginBottom: "10px"
                                }}
                            />
                        </p>
                        <p>
                            <strong>Date</strong>
                            <Input
                                name="bill_date"
                                value={formValues.bill_date}
                                onChange={handleInputChange}
                                style={{
                                    marginTop: "10px",
                                    marginBottom: "10px"
                                }}
                            />
                        </p>

                        <Divider />

                        {/* Others */}
                        <h3
                            style={{
                                fontSize: "16px",
                                fontWeight: "500",
                                color: "#000000FF",
                            }}
                        >
                            Others
                        </h3>
                        <br />
                        <p>
                            <strong>Accept ID</strong>
                            <Input
                                name="accept_id"
                                value={formValues.accept_id}
                                onChange={handleInputChange}
                                style={{
                                    marginTop: "10px",
                                    marginBottom: "10px"
                                }}
                            />
                        </p>
                        <p>
                            <strong>Payment Method</strong>
                            <Input
                                name="payment_method"
                                value={formValues.payment_method}
                                onChange={handleInputChange}
                                style={{
                                    marginTop: "10px",
                                    marginBottom: "10px"
                                }}
                            />
                        </p>

                        <Button type="primary" onClick={handleSave}>
                            Save
                        </Button>
                    </div>
                )}
            </Drawer>
        </div>
    );
};

export default CreateBilling;
