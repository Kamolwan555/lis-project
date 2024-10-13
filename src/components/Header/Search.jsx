import React, { useState } from "react";
// material-ui components 
import FormControl from "@mui/material/FormControl";
import InputAdornment from "@mui/material/InputAdornment";
import OutlinedInput from "@mui/material/OutlinedInput";
import Box from "@mui/material/Box";


import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";

export default function Search() {
// create state 'searchTerm' 
const [searchTerm, setSearchTerm] = useState("");

// call api for search
const handleSearch = async (query) => {
try {
    // เรียก API ที่ต้องการ โดยส่งคำค้นหาไปใน query string
    const response = await fetch(
    `https://your-api-url.com/search?q=${query}`
    );
    const data = await response.json(); 
    console.log(data); 
} catch (error) {
    
    console.error("Error fetching search results:", error);
}
};


const handleInputChange = (event) => {
const value = event.target.value;
setSearchTerm(value); // update state 'searchTerm'

// 
if (value.length > 2) {
    handleSearch(value); 
}
};

return (

<Box sx={{ width: "100%", ml: { xs: 0, md: 1 } }}>
    
    <FormControl sx={{ width: { xs: "100%", md: 300 } }}>
    
    <OutlinedInput
        size="small" 
        id="header-search" 
        value={searchTerm} 
        onChange={handleInputChange} 
        startAdornment={
        // InputAdornment สำหรับใส่ไอคอนที่ด้านซ้ายของ input
        <InputAdornment position="start" sx={{ mr: 2 }}>
            
            <MagnifyingGlassIcon style={{ width: 20, height: 20 }} />
        </InputAdornment>
        }
        aria-describedby="header-search-text" 
        inputProps={{
        "aria-label": "search",
        }}
        placeholder="Search" 
        sx={{  borderRadius: '8px', boxShadow: '0 0 0 5px blue-600',  }} 
    />
    </FormControl>
</Box>
);
}
