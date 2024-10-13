import React, { useState } from "react";
import PropTypes from "prop-types"; 
import LabTestsTable from "./LabTestsTable";
import { Card } from "antd";

const SelectionTab = ({ onSelectionSubmit }) => {
const [selectedTests, setSelectedTests] = useState([]);

const handleTestSelection = (tests) => {
setSelectedTests(tests);
onSelectionSubmit(tests); 
};

return (
<Card
    title={
    <span style={{ fontSize: "large", fontWeight: "500" }}>
        Test Selection
    </span>
    }
    bordered={false}
    style={{ width: "100%", maxWidth: "100%", margin: "1px" }}
>
    <LabTestsTable onTestSelect={handleTestSelection} />

    <div>
    <h4>Selected Tests:</h4>
    <ul>
        {selectedTests.map((test, index) => (
        <li key={index}>{test}</li>
        ))}
    </ul>
    </div>
</Card>
);
};


SelectionTab.propTypes = {
onSelectionSubmit: PropTypes.func.isRequired, 
};

export default SelectionTab;
