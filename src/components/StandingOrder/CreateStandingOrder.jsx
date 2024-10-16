import React, { useState } from "react";
import { Button, message, Steps, theme } from "antd";
import OrderLab from "./OrderLab";
import SelectItem from "./SelectItem";
import Labels from "./Labels";
import Labtest from "./LabTest";
const steps = [
{
title: "Select Order",
content: <OrderLab />,
},
{
title: "Lab Test",
content: <Labtest />,
},
{
title: "Select Item",
content: <SelectItem />,
},
{
    title: "Labels",
    content: <Labels />,
    },
];

const CreateStandingOrder = () => {
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
lineHeight: "20px",
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
        display: "flex",
        justifyContent: "flex-end", // Aligns buttons to the right
        marginTop: 24,
    }}
    >
    {current > 0 && (
        <Button
        style={{
            marginRight: 8, // Spacing between buttons
        }}
        onClick={() => prev()}
        >
        Previous
        </Button>
    )}
    {current < steps.length - 1 && (
        <Button
        type="primary"
        onClick={() => next()}
        style={{ backgroundColor: "#2563eb" }}
        >
        Next
        </Button>
    )}
    {current === steps.length - 1 && (
        <Button
        style={{ backgroundColor: "#2563eb" }}
        type="primary"
        onClick={() => message.success("Processing complete!")}
        >
        Done
        </Button>
    )}
    </div>
</>
);
};

export default CreateStandingOrder;
