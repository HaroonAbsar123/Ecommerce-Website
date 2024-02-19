import React, { useState } from "react";
import classes from "./ItemTwo.module.css";

import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import { createTheme, ThemeProvider } from "@mui/material/styles";

function ItemTwo({ Products }) {
  const [value, setValue] = useState("1");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const theme = createTheme({
    components: {
      MuiTab: {
        styleOverrides: {
          root: {
            color: "#1e1e1e",
            backgroundColor: "white",
            "&.Mui-selected": {
              color: "white",
              backgroundColor: "#1e1e1e",
            },
          },
        },
      },
    },
  });

  return (
    <div className={classes.mainContainer}>
      <ThemeProvider theme={theme}>
        <Box sx={{ width: "100%", typography: "body1" }}>
          <TabContext value={value}>
            <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
              <TabList
                onChange={handleChange}
                aria-label="lab API tabs example"
                TabIndicatorProps={{ style: { display: "none" } }}
              >
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
  );
}

export default ItemTwo;

function Description({ para }) {
  const paragraphs = para.split("\n");

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

function AdditionalInformation({ Products }) {
  const sizes = new Set();
  let desc=[];

  Products?.tableData?.forEach((data) => {
      if(data.heading && data.content){
        desc=[...desc, data]
      }
    });

  Products?.colors?.forEach((spec) => {
    spec?.sizes?.forEach((size) => {
      sizes.add(size.name);
    });
  });

  return (
    <div style={{ display: "table", width: "100%", marginBottom: "3rem", flex: 1 }}>
  {
    desc.map((item) => 
      <div key={item.heading} style={{ display: "table-row", flex: 1 }}>
        <div
          className="para"
          style={{
            display: "table-cell",
            padding: "1rem",
            borderBottom: "1px solid #ccc",
            flex: 1,
            whiteSpace: 'nowrap'
          }}
        >
          {item.heading}:
        </div>
        <div
          className="para"
          style={{
            display: "table-cell",
            padding: "1rem",
            borderBottom: "1px solid #ccc",
            flex: 8
          }}
        >
          {item.content}
        </div>
      </div>
    )
  }

  <div style={{ display: "table-row" }}>
    <div
      className="para"
      style={{
        display: "table-cell",
        padding: "1rem",
        borderBottom: "1px solid #ccc",
        flex: 1,
        whiteSpace: 'nowrap'
      }}
    >
      Available Sizes:
    </div>
    <div
      className="para"
      style={{
        display: "table-cell",
        padding: "1rem",
        borderBottom: "1px solid #ccc",
        flex: 5,
      }}
    >
      {Array.from(sizes)?.join(", ")}
    </div>
  </div>
  {/* <div style={{ display: "table-row" }}>
    <div className="para" style={{ display: "table-cell", padding: "1rem", borderBottom: "1px solid #ccc", width: "10%" }}>Colors:</div>
    <div className="para" style={{ display: "table-cell", padding: "1rem", borderBottom: "1px solid #ccc", width: "90%" }}>{Products.specs.map((spec) => spec.color).join(", ")}</div>
  </div> */}
  <div style={{ display: "table-row" }}>
    <div
      className="para"
      style={{
        display: "table-cell",
        padding: "1rem",
        borderBottom: "1px solid #ccc",
        width: "10%",
        whiteSpace: 'nowrap'
      }}
    >
      Category:
    </div>
    <div
      className="para"
      style={{
        display: "table-cell",
        padding: "1rem",
        borderBottom: "1px solid #ccc",
        width: "90%",
      }}
    >
      {Products?.category}
    </div>
  </div>
  {/* <div style={{ display: "table-row" }}>
    <div className="para" style={{ display: "table-cell", padding: "1rem", borderBottom: "1px solid #ccc", width: "10%" }}>Pack of:</div>
    <div className="para" style={{ display: "table-cell", padding: "1rem", borderBottom: "1px solid #ccc", width: "90%" }}>{Products.packof}</div>
  </div> */}
</div>

  );
}


