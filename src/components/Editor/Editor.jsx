import React, { useState } from "react";
import { Box, Tabs, Tab, SvgIcon ,useMediaQuery, useTheme} from "@mui/material";
import { useSelector } from "react-redux";
import LeftIcons from "./components/LeftIcons";
import CodeEditor from "./components/CodeEditor";
import Input from "./components/Input";
import Output from "./components/Output";
import Run from "./components/Run";
// import "../../utils/Webcontainer";
import Terminals from "./components/Terminal";
import Filetree from "./components/Filetree";

const Editor = () => {
  const selectedLanguage = useSelector(
    (state) => state.languageSelector.langSelected
  );
  const [activeTab, setActiveTab] = useState("input");

  const [isFiletreeVisible, setIsFiletreeVisible] = useState(false); // Define isFiletreeVisible here

  const openFiletree = () => {
    setIsFiletreeVisible(true); // Set isFiletreeVisible to true when opening
  };

  const closeFiletree = () => {
    setIsFiletreeVisible(false); // Set isFiletreeVisible to false when closing
  };

  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm")); // Adjust the breakpoint as needed
  const isJavaScriptLanguage = selectedLanguage === "javascript";
  const flexDirection =
    isSmallScreen || (isJavaScriptLanguage || window.innerWidth < 780)
      ? "column"
      : "row";

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  const switchToOutputTab = () => {
    setActiveTab("output");
  };
  return (
    <Box display="flex" flexDirection="column" height="100%">
      {/* Main Content */}
      <Box flex="1" marginTop="" display="flex" alignItems="flex-start">
        {/* Left Section */}
        <Box>
          <LeftIcons openFiletree={openFiletree} closeFiletree={closeFiletree} />
        </Box>

        <Box display="flex" flexDirection={flexDirection}>
          {/* Middle Section */}
          <Box
            flex="1"
            display="flex"
           
          >
            {/* File Tree */}
            <Box>
            { isFiletreeVisible ? <Filetree display={'block'} /> : <Filetree display={'none'} />}
            </Box>
            

            {/* Code Editor */}
            <Box>
              <CodeEditor />
            </Box>
          </Box>

          {/* Right Section */}
          <Box
            display="flex"
            flexDirection="column"
            justifyContent={"space-between"}
            height="100%"
            marginLeft={".5rem"}  
          >
            {/* Input */}
            {/*   <Box>
            <Input />
          </Box> */}

            {/* Output */}
            {/* <Box>
            <Output />
          </Box> */}

            {selectedLanguage === "javascript" ? (
              <>
              <Terminals />
              </>
            ) : (
              <>
                <Box>
                  <Tabs
                    value={activeTab}
                    onChange={handleTabChange}
                    textColor="primary"
                    indicatorColor="primary"
                    variant="fullWidth"
                    style={{ marginBottom: "10px" }}
                  >
                    <Tab label="Input" value="input" />
                    <Tab label="Output" value="output" />
                  </Tabs>
                </Box>

                {/* Tab Content */}
                <Box>
                  {activeTab === "input" && <Input />}
                  {activeTab === "output" && <Output />}
                </Box>
                <Box>
                  <Run switchToOutputTab={switchToOutputTab} />
                </Box>
              </>
            )}
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Editor;
