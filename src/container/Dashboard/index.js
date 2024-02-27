import React, { useState } from "react";
import Header from "../Header";
import { Box } from "@mui/material";
import { HeaderTypography } from "../../components/Common/CommonTypography";
import { CommonButton } from "../../components/Common/CommonButton";
import {
  MainWrapper,
  ProposalWrapper,
  ProposalWrapperFilter,
  TableWrapper,
  TableWrapperFilter,
} from "./Styled";
import TableComponent from "./tableComponent";
import { useNavigate } from "react-router-dom";
import Footer from "../Footer";
import CommonSlider from "../../components/Common/CommonSlider";

const titles = [
  { text: "Running", color: "#FF8A00" },
  { text: "Ended", color: "#FF0000" },
];

const titleDates = ["6H", "24H", "7D", "All"];

const Filter = ["Final proposals", "Activity", "Leaderboard"];

const DashboardPage = () => {
  const navigate = useNavigate();
  const [selects, setSelects] = useState([true, false, false, false]);
  const handleApplyClick = () => {
    navigate("/proposal/add");
  };

  const handleTableRowClick = (id) => {
    navigate(`/proposal/edit`);
  };

  const handleClick = (index) => {
    setSelects((prevSelects) => {
      const newSelects = prevSelects.map(() => false);
      newSelects[index] = true;
      return newSelects;
    });
  };
  return (
    <Box>
      <Header />
      <Box maxWidth={"1446px"} margin={"auto"} padding="20px">
        <HeaderTypography
          fw="600"
          fz="2em"
          marginTop={"38px"}
          marginBottom={"38px"}
          paddingLeft={"20px"}
          sx={{
            "@media screen and (max-width: 626px)": {
              marginTop: "39px",
              marginBottom: "60px"
            },
          }}
        >
          Grand Proposals
        </HeaderTypography>
        <CommonSlider />
        <Box
          display={"flex"}
          flexDirection={"column"}
          rowGap="32px"
          alignItems="center"
          marginTop={"76px"}
        >
          <HeaderTypography fz="2em" fw="700" textAlign={"center"}>
            Start and Build Your Crypto Apply Proposals
          </HeaderTypography>
          <HeaderTypography
            fc="#808080"
            fz=" 1.125rem"
            textAlign={"center"}
            marginTop={"-20px"}
          >
            Only at CryptoCap, you can build a good portfolio and learn{" "}
            <br></br>
            best practices about cryptocurrency.
          </HeaderTypography>
          <CommonButton fz="1.25em" pd="14px 64px" onClick={handleApplyClick}>
            Apply
          </CommonButton>
        </Box>
        <Box
          marginTop={"59px"}
          boxShadow="1px 5px 20px 0px #00000029"
          padding={"44px 25px 22px"}
          borderRadius={"27px"}
          marginBottom={"94px"}
        >
          <MainWrapper
          >
            <TableWrapper
              alignItems="center"
              display="flex"
              columnGap={"30px"}
              justifyContent={"space-between"}
            >
              <HeaderTypography fz="1.5em" fw="500">
                Running Proposals{" "}
              </HeaderTypography>
              <ProposalWrapper>
                {titles?.map((item) => {
                  return (
                    <Box
                      color={`${item.color}`}
                      fontSize={"1em"}
                      fontWeight={500}
                    >
                      {item.text}
                    </Box>
                  );
                })}
              </ProposalWrapper>
            </TableWrapper>
            <TableWrapperFilter
              alignItems="center"
              display="flex"
              columnGap={"30px"}
              justifyContent={"space-between"}
            >
              <ProposalWrapperFilter
              >
                {Filter?.map((item, index) => {
                  return (
                    <Box
                      fontSize={"1em"}
                      minWidth={`${index === 0 ? "112px" : ""} `}
                    >
                      {item}
                    </Box>
                  );
                })}
              </ProposalWrapperFilter>
              <Box display="flex" columnGap={"20px"}>
                {titleDates?.map((item, index) => {
                  return (
                    <Box
                      key={index}
                      style={{
                        padding: "10px 12px",
                        borderRadius: "6px",
                        color: selects[index] ? "#fff" : "#808080",
                        cursor: "pointer",
                        backgroundColor: selects[index] ? "#0FAE96" : "#ECF1F0",
                      }}
                      onClick={() => handleClick(index)}
                    >
                      {item}
                    </Box>
                  );
                })}
              </Box>
            </TableWrapperFilter>
          </MainWrapper>
          <TableComponent onRowClick={handleTableRowClick} />
        </Box>
      </Box>
      <Footer />
    </Box>
  );
};

export default DashboardPage;
