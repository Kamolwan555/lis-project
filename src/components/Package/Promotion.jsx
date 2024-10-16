import React from "react";
import { Card, Button } from "antd";
import { CheckCircleFilled } from "@ant-design/icons";

const HealthCheck = () => (
<div
style={{
    display: "flex",
    justifyContent: "center",
    flexWrap: "wrap",
    gap: "20px",
    marginBottom: "100px",
}}
>
<Card
    style={{
    width: 300,
    display: "flex",
    flexDirection: "column",
    flex: 1, 
    }}
    bodyStyle={{ display: "flex", flexDirection: "column", flexGrow: 1 }}
>
    <div style={{ flexGrow: 1 }}>
    <h3
        style={{
        textAlign: "center",
        fontSize: "16px",
        fontWeight: "500",
        marginTop: "10px",
        }}
    >
        Basic Health Check
    </h3>
    <p
        style={{
        fontSize: "28px",
        fontWeight: "bold",
        textAlign: "center",
        marginTop: "20px",
        }}
    >
        2,000 THB
    </p>
    <ul style={{ listStyleType: "none", padding: 0, margin: "50px 0" }}>
        <li style={{ display: "flex", alignItems: "center" }}>
        <CheckCircleFilled
            style={{ marginRight: "20px", color: "#2563eb" }}
        />
        General health check (CBC, BMP)
        </li>
        <li
        style={{ display: "flex", alignItems: "center", marginTop: "10px" }}
        >
        <CheckCircleFilled
            style={{ marginRight: "20px", color: "#2563eb" }}
        />
        Blood sugar test
        </li>
        <li
        style={{ display: "flex", alignItems: "center", marginTop: "10px" }}
        >
        <CheckCircleFilled
            style={{ marginRight: "20px", color: "#2563eb" }}
        />
        Lipid profile test
        </li>
        <li
        style={{ display: "flex", alignItems: "center", marginTop: "10px" }}
        >
        <CheckCircleFilled
            style={{ marginRight: "20px", color: "#2563eb" }}
        />
        Consultation with a physician
        </li>
        <li
        style={{ display: "flex", alignItems: "center", marginTop: "10px" }}
        >
        <CheckCircleFilled
            style={{ marginRight: "20px", color: "#2563eb" }}
        />
        Results available within 3 working days
        </li>
    </ul>
    </div>
    <div style={{ textAlign: "center" }}>
    <Button
        type="primary"
        style={{ width: "70%", backgroundColor: "#2563eb" }}
    >
        Select Package
    </Button>
    </div>
</Card>

<Card
    style={{
    width: 300,
    display: "flex",
    flexDirection: "column",
    flex: 1, // ทำให้ card ขยายเต็มที่
    backgroundColor: "#2563eb",
    color: "white",
    }}
    bodyStyle={{ display: "flex", flexDirection: "column", flexGrow: 1 }}
>
    <div style={{ flexGrow: 1 }}>
    <h3
        style={{
        textAlign: "center",
        fontSize: "16px",
        fontWeight: "500",
        marginTop: "10px",
        }}
    >
        Specialized Testing
    </h3>
    <p
        style={{
        fontSize: "28px",
        fontWeight: "bold",
        textAlign: "center",
        marginTop: "20px",
        }}
    >
        4,500 THB
    </p>
    <ul
        style={{
        listStyleType: "none",
        padding: 0,
        margin: "50px 0",
        color: "white",
        }}
    >
        <li style={{ display: "flex", alignItems: "center" }}>
        <CheckCircleFilled
            style={{ marginRight: "20px", color: "white" }}
        />
        Blood tests for chemical substances (Liver Function Test, Kidney
        Function Test)
        </li>
        <li
        style={{ display: "flex", alignItems: "center", marginTop: "10px" }}
        >
        <CheckCircleFilled
            style={{ marginRight: "20px", color: "white" }}
        />
        Immunology testing
        </li>
        <li
        style={{ display: "flex", alignItems: "center", marginTop: "10px" }}
        >
        <CheckCircleFilled
            style={{ marginRight: "20px", color: "white" }}
        />
        Infectious disease testing
        </li>
        <li
        style={{ display: "flex", alignItems: "center", marginTop: "10px" }}
        >
        <CheckCircleFilled
            style={{ marginRight: "20px", color: "white" }}
        />
        Consultation with a specialist
        </li>
        <li
        style={{ display: "flex", alignItems: "center", marginTop: "10px" }}
        >
        <CheckCircleFilled
            style={{ marginRight: "20px", color: "white" }}
        />
        Results available within 2 working days
        </li>
    </ul>
    </div>
    <div style={{ textAlign: "center" }}>
    <Button style={{ width: "70%" }}>Select Package</Button>
    </div>
</Card>

<Card
    style={{
    width: 300,
    display: "flex",
    flexDirection: "column",
    flex: 1, 
    }}
    bodyStyle={{ display: "flex", flexDirection: "column", flexGrow: 1 }}
>
    <div style={{ flexGrow: 1 }}>
    <h3
        style={{
        textAlign: "center",
        fontSize: "16px",
        fontWeight: "500",
        marginTop: "10px",
        }}
    >
        Comprehensive Health Check
    </h3>
    <p
        style={{
        fontSize: "28px",
        fontWeight: "bold",
        textAlign: "center",
        marginTop: "20px",
        }}
    >
        7,000 THB
    </p>
    <ul style={{ listStyleType: "none", padding: 0, margin: "50px 0" }}>
        <li style={{ display: "flex", alignItems: "center" }}>
        <CheckCircleFilled
            style={{ marginRight: "20px", color: "#2563eb" }}
        />
        Includes all tests from the Basic and Specialized packages
        </li>
        <li
        style={{ display: "flex", alignItems: "center", marginTop: "10px" }}
        >
        <CheckCircleFilled
            style={{ marginRight: "20px", color: "#2563eb" }}
        />
        Additional tests (Hormone Testing, Thyroid Function Test)
        </li>
        <li
        style={{ display: "flex", alignItems: "center", marginTop: "10px" }}
        >
        <CheckCircleFilled
            style={{ marginRight: "20px", color: "#2563eb" }}
        />
        Cardiac health check (Cardiac Markers)
        </li>
        <li
        style={{ display: "flex", alignItems: "center", marginTop: "10px" }}
        >
        <CheckCircleFilled
            style={{ marginRight: "20px", color: "#2563eb" }}
        />
        Consultation with a specialized physician
        </li>
        <li
        style={{ display: "flex", alignItems: "center", marginTop: "10px" }}
        >
        <CheckCircleFilled
            style={{ marginRight: "20px", color: "#2563eb" }}
        />
        Results available within 1 working day
        </li>
    </ul>
    </div>
    <div style={{ textAlign: "center" }}>
    <Button
        type="primary"
        style={{ width: "70%", backgroundColor: "#2563eb" }}
    >
        Select Package
    </Button>
    </div>
</Card>
</div>
);

export default HealthCheck;
