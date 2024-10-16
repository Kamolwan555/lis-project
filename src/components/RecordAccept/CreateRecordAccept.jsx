import React from "react";
import { Tabs, theme } from "antd";
import StickyBox from "react-sticky-box";
import RecordTable from "./RecordTable";
import AcceptTable from "./AcceptTable";

const items = [
{
label: "Record Lab",
key: "1",
children: <RecordTable />, 
},
{
label: "Accept Lab",
key: "2",
children: <AcceptTable />, 
},
];

const CreateRecordAccept = () => {
const {
token: { colorBgContainer },
} = theme.useToken();

const renderTabBar = (props, DefaultTabBar) => (
<StickyBox
    offsetTop={0}
    offsetBottom={20}
    style={{
    zIndex: 1,
    }}
>
    <DefaultTabBar
    {...props}
    style={{
        background: colorBgContainer,
    }}
    />
</StickyBox>
);

return (
<Tabs defaultActiveKey="1" renderTabBar={renderTabBar} items={items} />
);
};

export default CreateRecordAccept;
