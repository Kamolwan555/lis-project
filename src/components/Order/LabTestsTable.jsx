import React, { useState, useEffect } from "react";
import PropTypes from 'prop-types'; 
import { Table, Select, AutoComplete } from "antd";
import LabTestsData from "../../assets/LabTests.json"

const { Option } = Select;

const columns = [
    {
        title: "Name",
        dataIndex: "name",
    },
    {
        title: "Sample Type",
        dataIndex: "sample_type",
    },
    {
        title: "Price",
        dataIndex: "price",
    },
];

const LabTestsTable = ({ onTestSelect }) => {
    const [selectedRowKeys, setSelectedRowKeys] = useState([]);
    const [dataSource, setDataSource] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState("All");
    const [searchOptions, setSearchOptions] = useState([]);

    useEffect(() => {
        const allTests = Object.values(LabTestsData).flat();
        const formattedData = allTests.map((test) => ({
            key: test.id,
            name: test.name,
            sample_type: test.sample_type,
            price: test.price,
        }));
        setDataSource(formattedData); 
        setFilteredData(formattedData); 
    }, []);

    const handleCategoryChange = (value) => {
        setSelectedCategory(value);
        filterData(value, "");
    };

    const handleSearch = (value) => {
        setSearchOptions(
            dataSource
                .filter((test) => test.name.toLowerCase().includes(value.toLowerCase()))
                .map((test) => ({ value: test.name }))
        );
        filterData(selectedCategory, value);
    };

    const filterData = (category, search) => {
        let filtered = dataSource;

        if (category !== "All") {
            filtered = filtered.filter((test) =>
                LabTestsData[category].some((item) => item.name === test.name)
            );
        }

        if (search) {
            filtered = filtered.filter((test) =>
                test.name.toLowerCase().includes(search.toLowerCase())
            );
        }

        setFilteredData(filtered);
    };

    const onSelectChange = (newSelectedRowKeys) => {
        setSelectedRowKeys(newSelectedRowKeys);
        
        const selectedTests = newSelectedRowKeys.map(key => {
            const test = dataSource.find(item => item.key === key);
            return test ? test.name : null; 
        }).filter(name => name !== null); 

        
        onTestSelect(selectedTests);
    };

    const rowSelection = {
        selectedRowKeys,
        onChange: onSelectChange,
    };

    return (
        <div>
            <div style={{ marginBottom: 16 }}>
                <Select
                    value={selectedCategory}
                    onChange={handleCategoryChange}
                    style={{ width: 200, marginRight: 16 }}
                >
                    <Option value="All">All Categories</Option>
                    {Object.keys(LabTestsData).map((category) => (
                        <Option key={category} value={category}>
                            {category}
                        </Option>
                    ))}
                </Select>

                <AutoComplete
                    style={{ width: 200 }}
                    options={searchOptions}
                    onSearch={handleSearch}
                    placeholder="Search by name"
                    allowClear
                />
            </div>

            <Table
                rowSelection={rowSelection}
                columns={columns}
                dataSource={filteredData}
            />
        </div>
    );
};


LabTestsTable.propTypes = {
    onTestSelect: PropTypes.func.isRequired, 
};

export default LabTestsTable;
