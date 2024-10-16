import React, { useState } from "react";
import { Segmented } from "antd"; 
import { AppstoreOutlined, BarsOutlined } from "@ant-design/icons";
import HealthCheck from "./Promotion"; 
import ListPackage from "./ListPackage";

const App = () => {
    const [selectedValue, setSelectedValue] = useState("List");

    return (
        <div>
            <Segmented
                options={[
                    {
                        value: "List",
                        icon: <BarsOutlined />,
                    },
                    {
                        value: "Kanban",
                        icon: <AppstoreOutlined />,
                    },
                ]}
                value={selectedValue}
                onChange={setSelectedValue}
                style={{ marginBottom: "20px" }} 
            />
            {selectedValue === "Kanban" && <HealthCheck />}
            {selectedValue === "List" && <ListPackage />}
        </div>
    );
};

export default App;
