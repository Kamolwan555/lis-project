import React, { useState } from "react";
import { Button, message, Steps, theme } from "antd";
const steps = [
{
title: "Doctor",
content: "First-content",
},
{
title: "Date & Time",
content: "Second-content",
},
{
title: "Patient info",
content: "Last-content",
},
];
const App = () => {
const { token } = theme.useToken();
const [current, setCurrent] = useState(0);
const next = () => {
setCurrent(current + 1);
};
const prev = () => {
setCurrent(current - 1);
};
const items = steps.map((item) => ({
key: item.title,
title: item.title,
}));
const contentStyle = {
lineHeight: "260px",
textAlign: "center",
color: token.colorTextTertiary,
backgroundColor: token.colorFillAlter,
borderRadius: token.borderRadiusLG,
border: `1px dashed ${token.colorBorder}`,
marginTop: 16,
};
return (
<>
    <Steps current={current} items={items} />
    <div style={contentStyle}>{steps[current].content}</div>
    <div
    style={{
        marginTop: 24,
    }}
    >
    {current < steps.length - 1 && (
        <Button
        type="primary"
        onClick={() => next()}
        style={{
            padding: "5px 30px",
            backgroundColor: "#2563eb",
            color: "white",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
            marginBottom: "30px",
            marginTop: "30px",
            marginRight: "5px",
        }}
        >
        Next
        </Button>
    )}
    {current === steps.length - 1 && (
        <Button
        style={{
            padding: "5px 30px",
            backgroundColor: "#2563eb",
            color: "white",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
            marginBottom: "30px",
            marginTop: "30px",
            marginRight: "5px",
        }}
        type="primary"
        onClick={() => message.success("Processing complete!")}
        >
        Done
        </Button>
    )}
    {current > 0 && (
        <Button
        style={{
            margin: "0 8px",
            cursor: "pointer",
            marginBottom: "30px",
            marginTop: "30px",
            marginRight: "5px",
        }}
        onClick={() => prev()}
        >
        Previous
        </Button>
    )}
    </div>
</>
);
};
export default App;
