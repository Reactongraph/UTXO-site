import React, { useState, useEffect } from "react";
import { Box, Grid } from "@mui/material";
import { HeaderTypography } from "../../components/Common/CommonTypography";
import { ConnectStyledItem } from "./Styled";
import axiosInstance from "../../utils/globals/axiosInstance";

const PopoverContentData = ({ theme }) => {
  const [unisatInstalled, setUnisatInstalled] = useState(false);

  useEffect(() => {
    setUnisatInstalled(!!window.unisat);
  }, []);

  const handleUnisetConnection = async (walletType) => {
    if (!unisatInstalled) {
      window.location.href = "https://unisat.io";
      return;
    }

    try {
      const accounts = await window.unisat.requestAccounts();
      if (accounts.length === 0) {
        alert("You need to create an account first.");
        return;
      }

      const address = accounts[0];
      const nonce = Date.now();
      const messagePayload = `Welcome to UTXO app!\nAddress:${address}\nNonce:${nonce}`;
      const signature = await window.unisat.signMessage(messagePayload);
      const publicKey = await window.unisat.getPublicKey();

      const payload = {
        address,
        message: messagePayload,
        signature,
        publicKey,
        walletType,
      };

      const response = await axiosInstance({
        url: "/auth/signin",
        method: "post",
        payload,
      });

      console.log("uniset response", response);
      // TODO: add login logic to save tokens and error handling.
    } catch (error) {
      console.error("Error requesting accounts:", error);
      alert(`${error?.message}, Please create your account first.`);
    }
  };

  const popData = [
    {
      text: "Unisat",
      icon: "/images/unisat.svg",
      type: "uniset",
      handleOnClick: handleUnisetConnection,
    },
    {
      text: "Leather (hiro)",
      icon: "/images/leather.svg",
      type: "leather",
      handleOnClick: () => {},
    },
    {
      text: "OKX Wallet",
      icon: "/images/okx.svg",
      type: "okx",
      handleOnClick: () => {},
    },
  ];

  return (
    <Box>
      <Grid backgroundColor="" padding="37px 24px 20px 32px" width="561px">
        <Grid display="flex" gap="24px" marginBottom="25px">
          <img src="/images/wallet.svg" alt="img" />
          <Grid>
            <HeaderTypography
              fz="1.75em"
              fw="700"
              fc="#0FAE96"
              sx={{
                "@media screen and (max-width: 626px)": {
                  fontSize: "1.4em",
                },
              }}
            >
              Connect Wallet
            </HeaderTypography>
            <HeaderTypography
              fz="0.938em"
              fc={theme?.secondary?.main}
              sx={{
                "@media screen and (max-width: 626px)": {
                  width: "70%",
                },
              }}
            >
              Choose the wallet you want to connect
            </HeaderTypography>
          </Grid>
        </Grid>
        <Grid
          display="flex"
          flexWrap="wrap"
          columnGap="27px"
          rowGap="27px"
          sx={{
            "@media screen and (max-width: 626px)": {
              flexWrap: "wrap",
              width: "min-content",
            },
          }}
        >
          {popData.map((item, index) => (
            <ConnectStyledItem
              key={index}
              theme={theme}
              onClick={() => item.handleOnClick(item.type)}
            >
              <img width="47px" src={item.icon} alt="img" />
              <HeaderTypography
                fc={theme?.primary?.popoverText}
                fz="1em"
                fw="500"
              >
                {item.text}
              </HeaderTypography>
            </ConnectStyledItem>
          ))}
        </Grid>
      </Grid>
    </Box>
  );
};

export default PopoverContentData;
