import React, { useState, useEffect } from "react";
import { Grid } from "@mui/material";
import { HeaderTypography } from "../../components/Common/CommonTypography";
import { ConnectStyledItem } from "./Styled";
import axiosInstance from "../../utils/globals/axiosInstance";
import { handleLogin } from "../../utils/auth/helperLogin";
import { openSignatureRequestPopup } from "@stacks/connect";
import { StacksTestnet, StacksMainnet } from "@stacks/network";
import { AppConfig, UserSession, showConnect } from "@stacks/connect";

const PopoverContentData = ({ theme, setLogin, handleLogout }) => {
  const [unisatInstalled, setUnisatInstalled] = useState(false);
  const [leatherInstalled, setLeatherInstalled] = useState(false);
  const [okxInstalled, setOkxInstalled] = useState(false);

  useEffect(() => {
    setUnisatInstalled(!!window.unisat);
    setLeatherInstalled(!!window?.btc);
    setOkxInstalled(!!window.okxwallet);
  }, []);

  const handleUnisetConnection = async (walletType) => {
    if (!unisatInstalled) {
      window.location.href = "https://unisat.io";
      return;
    }

    try {
      const network = await window.unisat.getNetwork();
      if (network !== "livenet") {
        alert("Please switch to the live network to proceed.");
        return;
      }

      const accounts = await window.unisat.requestAccounts();
      if (accounts.length === 0) {
        alert("You need to create an account first.");
        return;
      }
      const address = accounts[0];
      const messagePayload = await axiosInstance({
        url: "/auth/message",
        params: { address },
      });
      console.log("message", messagePayload);
      const signature = await window.unisat.signMessage(
        messagePayload?.message
      );
      const publicKey = await window.unisat.getPublicKey();

      const payload = {
        address,
        message: messagePayload?.message,
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
      if (response) {
        setLogin(true);
      }
      handleLogin(response);
    } catch (error) {
      console.error("Error requesting accounts:", error);
      alert(`${error?.message}, Please create your account first.`);
    }
  };

  const handleLeatherConnection = async (walletType) => {
    if (!leatherInstalled) {
      window.location.href = "https://leather.io/install-extension";
      return;
    }

    try {
      const appConfig = new AppConfig(["store_write", "publish_data"]);
      const userSession = new UserSession({ appConfig });
      // const userAddresses = await window.btc?.request("getAddresses");

      // const matchingAddress = userAddresses.result.addresses.find(
      //   (address) => address.type === "p2tr"
      // );

      // const messagePayload = await axiosInstance({
      //   url: "/auth/message",
      //   params: {
      //     address: matchingAddress.address,
      //   },
      // });
      // console.log('leather', userAddresses, matchingAddress, messagePayload);

      // const wallet = await window.btc.request("signMessage", {
      //   message: messagePayload?.message,
      //   paymentType: "p2tr",
      // });

      // const payload = {
      //   address: wallet.result?.address,
      //   message: messagePayload?.message,
      //   signature: wallet.result?.signature,
      //   publicKey: matchingAddress?.publicKey,
      //   walletType,
      // };

      // const response = await axiosInstance({
      //   url: "/auth/signin",
      //   method: "post",
      //   payload,
      // });

      // console.log("leather response", response);

      // console.log("response", response, userAddresses, matchingAddress);
      // return;
      function authenticate() {
        showConnect({
          appDetails: {
            name: "My App",
            icon: window.location.origin + "/my-app-logo.svg",
          },
          redirectTo: "/",
          onFinish: async () => {
            let userData = userSession.loadUserData();
            console.log("userData", userData);
            const messagePayload = await axiosInstance({
              url: "/auth/message",
              params: {
                address: userData?.profile?.btcAddress?.p2wpkh?.mainnet,
              },
            });
            await openSignatureRequestPopup({
              message: messagePayload?.message,
              network: new StacksMainnet(),
              appDetails: {
                name: "utxo",
                icon: window.location.origin + "/images/logo-dark-header.svg",
              },
              async onFinish(data) {
                console.log("Signature of the message", data);
                console.log("Use public key:", data.publicKey);
                const payload = {
                  address: userData?.profile?.btcAddress?.p2wpkh?.mainnet,
                  message: messagePayload?.message,
                  signature: data?.signature,
                  publicKey: data?.publicKey,
                  walletType,
                };
                const response = await axiosInstance({
                  url: "/auth/signin",
                  method: "post",
                  payload,
                });

                console.log("leather response", response);
                if (response) {
                  setLogin(true);
                }
                handleLogin(response);
              },
              userSession: userSession,
            });
          },
          userSession: userSession,
        });
      }
      authenticate();
    } catch (error) {
      console.error("Error requesting accounts:", error);
      alert(`${error?.error?.message}, Please create your account first.`);
    }
  };

  const handleOkxConnection = async (walletType) => {
    if (!okxInstalled) {
      window.location.href = "https://okx.com/web3";
    }
    try {
      // Attempt to connect to the OKX Wallet
      const okxConnect = await window.okxwallet.bitcoin.connect();
      console.log("Connected to OKX Wallet", okxConnect);

      // Attempt to get okx acconts
      const accounts = await window.okxwallet.bitcoin.getAccounts();
      console.log("Connected to OKX Wallet", accounts);

      // Attempt to get public key
      const publicKey = await window.okxwallet.bitcoin.getPublicKey();
      console.log("public key for okx wallet", publicKey);

      let res = await window.okxwallet.bitcoin.getNetwork();
      console.log("okx wallet network type", res);

      // Get message from backend
      const messagePayload = await axiosInstance({
        url: "/auth/message",
        params: { address: accounts[0] },
      });

      // Get message signed by okx wallet
      const signedMessage = await window.okxwallet.bitcoin.signMessage(
        messagePayload?.message
      );
      console.log("Signed message:", signedMessage);

      // Construct the payload
      const payload = {
        address: accounts[0],
        message: messagePayload?.message,
        signature: signedMessage,
        publicKey,
        walletType,
      };
      console.log("payload", payload);

      // Send the payload to your backend for verification
      const response = await axiosInstance({
        url: "/auth/signin",
        method: "post",
        payload,
      });

      console.log("OKX Wallet response:", response);
      if (response) {
        setLogin(true);
      }
      handleLogin(response);
    } catch (error) {
      console.error("Failed to connect to OKX Wallet", error);
      // Handle connection error, e.g., show an error message to the user
    }
  };

  const popData = [
    {
      text: "Unisat",
      icon: "/images/unisat.svg",
      type: "unisat",
      handleOnClick: handleUnisetConnection,
    },
    {
      text: "Leather (hiro)",
      icon: "/images/leather.svg",
      type: "leather",
      handleOnClick: handleLeatherConnection,
    },
    {
      text: "OKX Wallet",
      icon: "/images/okx.svg",
      type: "okx",
      handleOnClick: handleOkxConnection,
    },
  ];

  return (
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
  );
};

export default PopoverContentData;
