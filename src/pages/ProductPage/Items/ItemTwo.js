import React, {useState} from "react";
import classes from './ItemTwo.module.css';

import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import { createTheme, ThemeProvider } from '@mui/material/styles';




function ItemTwo({Products}){

    const [value, setValue] = useState('1');

    const handleChange = (event, newValue) => {
        setValue(newValue);
    }


    const theme = createTheme({
        components: {
          MuiTab: {
            styleOverrides: {
              root: {
                color: 'black',
                backgroundColor: 'white',
                '&.Mui-selected': {
                  color: 'white',
                  backgroundColor: 'black',
                },
              },
            },
          },
        },
      });

    return(
        <div className={classes.mainContainer}>
        <ThemeProvider theme={theme}>
    <Box sx={{ width: '100%', typography: 'body1' }}>
      <TabContext value={value}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <TabList onChange={handleChange} aria-label="lab API tabs example" TabIndicatorProps={{ style: { display: 'none' } }}>
            <Tab label="Description" value="1" />
            <Tab label="Additional Information" value="2" />
          </TabList>
        </Box>
        <TabPanel value="1">
            <Description para={Products.description} />
        </TabPanel>
        <TabPanel value="2">
            <AdditionalInformation Products={Products} />
        </TabPanel>
      </TabContext>
    </Box>
  </ThemeProvider>
  </div>
    )
};

export default ItemTwo;



function Description({ para }) {
    const paragraphs = para.split('\n');
  
    return (
      <div>
        <h2 className="title">Product Details</h2>
        {paragraphs.map((paragraph, index) => (
          <p key={index} className="para">
            {paragraph}
          </p>
        ))}
      </div>
    );
  }
  



  function AdditionalInformation({Products}) {


    const sizes = new Set();

Products.specs.forEach((spec) => {
  spec.available.forEach((size) => {
    sizes.add(size.size);
  });
});

  
return (
    <div style={{ display: "table", width: "100%", marginBottom: '3rem' }}>
      <div style={{ display: "table-row" }}>
        <div className="para" style={{ display: "table-cell", padding: "1rem", borderBottom: "1px solid #ccc", width: "10%" }}>Sizes:</div>
        <div className="para" style={{ display: "table-cell", padding: "1rem", borderBottom: "1px solid #ccc", width: "90%" }}>{Array.from(sizes).join(", ")}</div>
      </div>
      {/* <div style={{ display: "table-row" }}>
        <div className="para" style={{ display: "table-cell", padding: "1rem", borderBottom: "1px solid #ccc", width: "10%" }}>Colors:</div>
        <div className="para" style={{ display: "table-cell", padding: "1rem", borderBottom: "1px solid #ccc", width: "90%" }}>{Products.specs.map((spec) => spec.color).join(", ")}</div>
      </div> */}
      <div style={{ display: "table-row" }}>
        <div className="para" style={{ display: "table-cell", padding: "1rem", borderBottom: "1px solid #ccc", width: "10%" }}>Type:</div>
        <div className="para" style={{ display: "table-cell", padding: "1rem", borderBottom: "1px solid #ccc", width: "90%" }}>{Products.category}</div>
      </div>
      {/* <div style={{ display: "table-row" }}>
        <div className="para" style={{ display: "table-cell", padding: "1rem", borderBottom: "1px solid #ccc", width: "10%" }}>Pack of:</div>
        <div className="para" style={{ display: "table-cell", padding: "1rem", borderBottom: "1px solid #ccc", width: "90%" }}>{Products.packof}</div>
      </div> */}
    </div>
  );
  
  
  
  
      
  }
  
  
