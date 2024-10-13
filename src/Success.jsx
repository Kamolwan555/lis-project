import React from "react";
import { SmileOutlined } from "@ant-design/icons";
import { Button, Result } from "antd";
import { useNavigate } from "react-router-dom"; 

const App = () => {
    const navigate = useNavigate(); 

    const handleLoginRedirect = () => {
        navigate("/login"); 
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
                icon={<SmileOutlined />}
                title="Great, you have done all the register!"
                extra={
                    <Button type="primary" onClick={handleLoginRedirect}> 
                        Go to Login
                    </Button>
                }
            />
        </div>
    );
};

export default App;
