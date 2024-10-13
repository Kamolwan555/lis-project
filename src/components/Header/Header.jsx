import React from 'react';
import PropTypes from 'prop-types';
import { Card, Col, Row, Statistic, Tag } from 'antd';
import { CheckCircleOutlined, ClockCircleOutlined, SyncOutlined } from '@ant-design/icons';

const StatisticCard = ({ title, value, icon, color, tagText }) => (
<Col span={8}>
<Card 
    bordered={false} 
    style={{
    outline: '1px solid #e5e7eb', 
    borderRadius: '5px',
    fontWeight: '500',
    }}
>
    <Statistic
    title={title}
    value={value}
    valueStyle={{ color: '#111827' }}
    />
    <Tag
    icon={icon}
    color={color}
    style={{ marginTop: '1px' }}
    >
    {tagText}
    </Tag>
</Card>
</Col>
);

StatisticCard.propTypes = {
title: PropTypes.string.isRequired,
value: PropTypes.number.isRequired,
icon: PropTypes.element.isRequired,
color: PropTypes.string.isRequired,
tagText: PropTypes.string.isRequired,
};

const Header = () => (
<Row gutter={30}>
<StatisticCard
    title="Orders: Unreceived"
    value={128}
    icon={<SyncOutlined spin />}
    color="processing"
    tagText="processing"
/>
<StatisticCard
    title="Orders: Pending"
    value={93}
    icon={<ClockCircleOutlined />}
    color="default"
    tagText="waiting"
/>
<StatisticCard
    title="Orders: Reported"
    value={930}
    icon={<CheckCircleOutlined />}
    color="success"
    tagText="success"
/>
</Row>
);

export default Header;
