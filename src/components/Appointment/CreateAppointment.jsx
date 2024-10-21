import React, { useEffect, useState } from "react";
import {
Card,
Form,
Select,
DatePicker,
TimePicker,
Divider,
Button,
Input,
message,
Radio,
List,
} from "antd";
import { useNavigate } from "react-router-dom"; 

// Database
import LabTestsData from "../../assets/LabTests.json";

const CreateAppointment = () => {
const navigate = useNavigate(); 
const [categories, setCategories] = useState([]);
const [newOption, setNewOption] = useState(""); 
const [dateSelection, setDateSelection] = useState("individual"); 
const [selectedTests, setSelectedTests] = useState([]); 

const addNewOption = () => {
if (newOption) {
    const newTest = {
    id: new Date().getTime(),
    name: newOption,
    price: "Free",
    };
    setCategories((prevCategories) => {
    const customCategoryExists = prevCategories.some(
        (category) => category[0] === "Custom Category"
    );
    if (customCategoryExists) {
        return prevCategories.map((category) =>
        category[0] === "Custom Category"
            ? [category[0], [...category[1], newTest]]
            : category
        );
    } else {
        return [...prevCategories, ["Custom Category", [newTest]]];
    }
    });
    setNewOption(""); 
} else {
    message.error("Please enter a valid option!");
}
};

const handleAddTest = (value) => {
const selectedTest = categories
    .flatMap(([, tests]) => tests)
    .find((test) => test.name === value);
if (
    selectedTest &&
    !selectedTests.some((test) => test.id === selectedTest.id)
) {
    setSelectedTests((prevSelected) => [...prevSelected, selectedTest]);
}
};

const removeTest = (test) => {
setSelectedTests((prevSelected) =>
    prevSelected.filter((item) => item.id !== test.id)
);
};

useEffect(() => {
const fetchData = () => {
    try {
    const categoriesArray = Object.entries(LabTestsData);
    setCategories(categoriesArray);
    } catch (error) {
    console.error("Error fetching data:", error);
    }
};

fetchData();
}, []);

const handleDateSelectionChange = (e) => {
setDateSelection(e.target.value);
};

const onFinish = (values) => {
console.log("Success:", values);
message.success("Appointment successfully!");
navigate("/dashboard"); 
};

const onFinishFailed = (errorInfo) => {
console.log("Failed:", errorInfo);
message.error("Please fill out all required fields.");
};

return (
<Card style={{ width: "100%" }}>
    <Form
    layout="horizontal"
    onFinish={onFinish}
    onFinishFailed={onFinishFailed}
    >
    <Form.Item>
        <Radio.Group
        value={dateSelection}
        onChange={handleDateSelectionChange}
        size="large"
        >
        <Radio.Button value="individual">
            Earliest date available
        </Radio.Button>
        <Radio.Button value="team">Choose preferred date</Radio.Button>
        </Radio.Group>
    </Form.Item>

    {dateSelection === "team" && (
        <Form.Item
        label="Preferred Date"
        name="preferredDate"
        rules={[{ required: true, message: "Please select a date!" }]}
        >
        <DatePicker style={{ width: "100%" }} />
        </Form.Item>
    )}

    <Divider />

    <Form.Item
        label="Preferred Time"
        name="time"
        rules={[{ required: true, message: "Please select a time!" }]}
    >
        <TimePicker style={{ width: "100%" }} />
    </Form.Item>

    <Divider />

    <Form.Item
        label="Preferred Test"
        name="test"
        rules={[{ required: true, message: "Please select a test!" }]}
    >
        <Select
        placeholder="Select a test"
        style={{ width: "100%" }}
        dropdownRender={(menu) => (
            <>
            {menu}
            <Divider style={{ margin: "8px 0" }} />
            <div
                style={{ display: "flex", flexWrap: "nowrap", padding: 8 }}
            >
                <Input
                style={{ flex: "auto" }}
                value={newOption}
                onChange={(e) => setNewOption(e.target.value)}
                placeholder="Add new option"
                />
                <Button
                type="primary"
                onClick={addNewOption}
                style={{ marginLeft: "8px" }}
                >
                Add
                </Button>
            </div>
            </>
        )}
        onChange={handleAddTest}
        >
        {categories.map(([category, tests], index) => (
            <Select.OptGroup key={`${category}-${index}`} label={category}>
            {tests.map((test) => (
                <Select.Option key={test.id} value={test.name}>
                <div
                    style={{
                    display: "flex",
                    justifyContent: "space-between",
                    }}
                >
                    <span>{test.name}</span>
                    <span style={{ color: "#888" }}>Price: {test.price}</span>
                </div>
                </Select.Option>
            ))}
            </Select.OptGroup>
        ))}
        </Select>
    </Form.Item>

    <Divider />

    <h3>Selected Preferred Tests</h3>
    <List
        style={{ marginTop: "20px" }}
        bordered
        dataSource={selectedTests}
        renderItem={(test) => (
        <List.Item
            key={test.id}
            actions={[
            <Button
                key={test.id}
                type="link"
                onClick={() => removeTest(test)}
            >
                Remove
            </Button>,
            ]}
        >
            {test.name}
        </List.Item>
        )}
    />

    <div
        style={{
        display: "flex",
        justifyContent: "flex-end",
        marginTop: "30px",
        }}
    >
        <Form.Item>
        <Button
            type="primary"
            htmlType="submit"
            style={{ backgroundColor: "#2563eb" }}
        >
            Save
        </Button>
        </Form.Item>
    </div>
    </Form>
</Card>
);
};

export default CreateAppointment;
