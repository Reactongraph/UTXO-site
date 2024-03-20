import React, { useEffect, useRef, useState } from "react";
import { Box, Grid } from "@mui/material";
import { HeaderTypography } from "../../components/Common/CommonTypography";
import { ConnectStyledItem } from "./Styled";
import axios from "axios";

function PopoverContentData({ theme }) {
  const [walletType, setWalletType] = useState("");
  const [message, setMessage] = useState('Welcome to utxo!');
  const [signature, setSignature] = useState("");
  const [unisatInstalled, setUnisatInstalled] = useState(false);
  const [connected, setConnected] = useState(false);
  const [accounts, setAccounts] = useState([]);
  const [publicKey, setPublicKey] = useState("");
  const [address, setAddress] = useState("");
  const [balance, setBalance] = useState({
    confirmed: 0,
    unconfirmed: 0,
    total: 0,
  });
  const [network, setNetwork] = useState("livenet");
  const unisetRef = useRef({ accounts: [] });

  // Check if UniSet extension is installed
  useEffect(() => {
    if (window.unisat) {
      setUnisatInstalled(true);
    }
  }, []);

  const getBasicInfo = async () => {
    const unisat = window.unisat;
    const [address] = await unisat.getAccounts();
    setAddress(address);

    const publicKey = await unisat.getPublicKey();
    setPublicKey(publicKey);

    const balance = await unisat.getBalance();
    setBalance(balance);

    const network = await unisat.getNetwork();
    setNetwork(network);
  };

  const handleAccountsChanged = async () => {
    if (unisatInstalled) {
      try {
        const result = await window.unisat.requestAccounts();
        if (unisetRef.current.accounts[0] === result[0]) {
          // prevent from triggering twice
          return;
        }

        unisetRef.current.accounts = result;
        if (result.length > 0) {
          setAccounts(result);
          setConnected(true);
          const address = result[0];
          setAddress(result[0]);
          // setMessage(`message\nAddress:${address}\nNonce:${Date.now()}`)
          getBasicInfo();
          handleSignMessage(address);
        } else {
          setConnected(false);
        }
      } catch (error) {
        console.error("Error requesting accounts:", error);
        alert(`${error?.message}, Please create your account first.`);
        // Handle error as needed
      }
    } else {
      window.location.href = "https://unisat.io";
    }
  };
  const handleNetworkChanged = (network) => {
    setNetwork(network);
    getBasicInfo();
  };

  const handleSignMessage = async (address) => {
    try {
      const signature = await window.unisat.signMessage(`${message}\nAddress:${address}`);
      setSignature(signature);
    } catch (error) {
      console.error("Error in Sign Message:", error);
      // alert(`${error?.message}, Please create your account first.`);
      // Handle error as needed
    }
  };
  

  useEffect(() => {
    async function checkUnisat() {
      let unisat = window.unisat;

      for (let i = 1; i < 10 && !unisat; i += 1) {
        await new Promise((resolve) => setTimeout(resolve, 100 * i));
        unisat = window.unisat;
      }

      if (unisat) {
        setUnisatInstalled(true);
      } else if (!unisat) return;

      if (accounts?.length > 0) {
        unisat.getAccounts().then((accounts) => {
          handleAccountsChanged(accounts);
        });
      }

      unisat.on("accountsChanged", handleAccountsChanged);
      unisat.on("networkChanged", handleNetworkChanged);

      return () => {
        unisat.removeListener("accountsChanged", handleAccountsChanged);
        unisat.removeListener("networkChanged", handleNetworkChanged);
      };
    }

    checkUnisat().then();
  }, []);

  const popData = [
    {
      text: "Unisat",
      icon: "/images/unisat.svg",
      handleOnClick: handleAccountsChanged,
      type: "uniset",
    },
    {
      text: "Leather (hiro)",
      icon: "/images/leather.svg",
      handleOnClick: () => {},
      type: "leather (hiro)",
    },
    {
      text: "OKX Wallet",
      icon: "/images/okx.svg",
      handleOnClick: () => {},
      type: "okx wallet",
    },
  ];

  const payload = {
    address: address,
    message: `${message}\nAddress:${address}`,
    signature: signature,
    publicKey: publicKey,
    walletType: walletType,
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.post("http://localhost:5000/api/v1/auth/signin", payload);

        console.log("Response:", response.data);
        // Handle the response data as needed
      } catch (error) {
        console.error("Error fetching data:", error);
        // Handle error
      }
    };

    if (signature) {
      fetchData();
    }
  }, [payload]);

  return (
    <Box>
      <Grid
        backgroundColor={""}
        padding={"37px 24px 20px 32px"}
        width={"561px"}
      >
        <Grid display={"flex"} gap={"24px"} marginBottom={"25px"}>
          <img src={"/images/wallet.svg"} alt="img" />
          <Grid>
            <HeaderTypography
              fz={"1.75em"}
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
              fz={"0.938em"}
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
          display={"flex"}
          flexWrap={"wrap"}
          columnGap={"27px"}
          rowGap={"27px"}
          sx={{
            "@media screen and (max-width: 626px)": {
              flexWrap: "wrap",
              width: "min-content",
            },
          }}
        >
          {popData?.map((item, index) => (
            <ConnectStyledItem
              key={index}
              theme={theme}
              onClick={() => {
                item.handleOnClick();
                setWalletType(item.type);
              }}
            >
              <img width={"47px"} src={item?.icon} alt="img" />
              <HeaderTypography
                fc={theme?.primary?.popoverText}
                fz="1em"
                fw="500"
              >
                {item?.text}
              </HeaderTypography>
            </ConnectStyledItem>
          ))}
        </Grid>
      </Grid>
    </Box>
  );
}

export default PopoverContentData;
