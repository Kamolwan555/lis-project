import React, { useState } from 'react';
import { Input, List, Typography, Button } from 'antd';
import labTestsData from '../../assets/LabTests.json'; 

const { Title } = Typography;

const ListPackage = () => {
    const [inputValue, setInputValue] = useState('');
    const [selectedTests, setSelectedTests] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState('');

    const handleInputChange = (e) => {
        setInputValue(e.target.value);
    };

    const handleSelectTest = (test) => {
        setSelectedTests((prev) => [...prev, test]);
        setInputValue('');
    };

    const handleCategorySelect = (category) => {
        setSelectedCategory(category); 
    };

    const handleRemoveTest = (testToRemove) => {
        setSelectedTests((prev) => prev.filter(test => test.id !== testToRemove.id));
    };

    const categories = Object.keys(labTestsData);

    const allTests = selectedCategory ? labTestsData[selectedCategory] : [];
    const filteredTests = allTests.filter((test) =>
        test.name.toLowerCase().includes(inputValue.toLowerCase())
    );

    return (
        <div style={{ padding: '20px' }}>
            <div style={{ marginBottom: '20px' }}>
                {categories.map((category) => (
                    <Button
                        key={category}
                        onClick={() => handleCategorySelect(category)}
                        style={{ marginRight: '10px', marginBottom: '10px' }}
                    >
                        {category}
                    </Button>
                ))}
            </div>

            <Input
                placeholder="Search for lab tests..."
                value={inputValue}
                onChange={handleInputChange}
                style={{ marginBottom: '20px' }}
            />
            <List
                bordered
                dataSource={filteredTests}
                renderItem={(test) => (
                    <List.Item onClick={() => handleSelectTest(test)} style={{ cursor: 'pointer' }}>
                        {test.name}
                    </List.Item>
                )}
                style={{ maxHeight: '200px', overflowY: 'auto', marginBottom: '20px' }}
            />
            <Title level={3} style={{ fontSize: '12px', fontWeight: 'bold' }}>Selected Tests</Title>
            
            <List
                style={{ marginTop: '20px' }}
                bordered
                dataSource={selectedTests}
                renderItem={(test) => (
                    <List.Item key={test.id} style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <span>
                            {test.id} - {test.name} - Price: {test.price} THB
                        </span>
                        <Button
                            type="link"
                            onClick={() => handleRemoveTest(test)}
                            style={{ color: 'red' }}
                        >
                            Remove
                        </Button>
                    </List.Item>
                )}
            />
        </div>
    );
};

export default ListPackage;
