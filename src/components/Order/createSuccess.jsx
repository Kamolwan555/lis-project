import React from "react";
import { Button, Result } from "antd";
import { useNavigate } from "react-router-dom";

const CreateSuccess = () => {
    const navigate = useNavigate(); 

    const handleDashboardRedirect = () => {
        navigate("/dashboard");
    };

    return (
        <div
            style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "100vh",
            }}
        >
            <Result
                status="success"
                title= "Order created successfully!"
                extra={[
                    <Button type="primary" key="console" onClick={handleDashboardRedirect}>
                        Go to Main Dashboard
                    </Button>,
                ]}
            />
        </div>
    );
};

export default CreateSuccess;
