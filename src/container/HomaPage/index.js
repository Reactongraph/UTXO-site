import { Box } from "@mui/material";
import React from "react";
import Header from "../Header";
import Footer from "../Footer";
import ContentBox from "./ContentBox";
import { HomeCardsData } from "./content";
import { StyledBox } from "./styled";

const HomePage = () => {
  return (
    <Box>
      <Header />
      <Box display={"flex"} flexDirection={"column"} gap={"72px"}>
        {HomeCardsData?.map((item) => (
          <StyledBox
            display={"flex"}
            gap={"77px"}
            padding={"72px 112px"}
            alignItems={"center"}
          >
            <img src={item?.imageUrl} alt="UTXO" height={"375px"} />
            <ContentBox data={item} />
          </StyledBox>
        ))}
      </Box>
      <Footer />
    </Box>
  );
};

export default HomePage;
