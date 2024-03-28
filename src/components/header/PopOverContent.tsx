/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useEffect } from 'react';
import { Box, Grid } from '@mui/material';
import { ConnectStyledItem } from './styled';
import { HeaderTypography } from '@/components/common/typography/Typography';
import { UserAction, useUserContext } from '@/store/contexts/userContext';
import { handleLeatherConnection, handleOkxConnection, handleUnisetConnection } from '@/utils/helpers/walletHelpers';

interface PopOverContentProps {
  theme: any;
  setViewPopover: (view: boolean) => void;
  checkLoginStatus: () => void;
}

interface PopOverItem {
  text: string;
  icon: string;
  type: string;
  handleOnClick: (
    type: string,
    isInstalled: boolean,
    setViewPopover: (view: boolean) => void,
    checkLoginStatus: () => void,
    userDispatch: React.Dispatch<UserAction>
  ) => void;
  isInstalled: boolean;
}

declare global {
  interface Window {
    btc: {
      [x: string]: any;
    };
    okxwallet: {
      [x: string]: any;
    };
    unisat: {
      [x: string]: any;
    };
  }
}

const PopOverContent: React.FC<PopOverContentProps> = ({ theme, setViewPopover, checkLoginStatus }) => {
  const [unisatInstalled, setUnisatInstalled] = useState(false);
  const [leatherInstalled, setLeatherInstalled] = useState(false);
  const [okxInstalled, setOkxInstalled] = useState(false);

  const { dispatch: userDispatch } = useUserContext();

  useEffect(() => {
    setUnisatInstalled(!!window.unisat);
    setLeatherInstalled(!!window.btc);
    setOkxInstalled(!!window.okxwallet);
  }, []);

  const popData: PopOverItem[] = [
    {
      text: 'Unisat',
      icon: '/images/unisat.svg',
      type: 'unisat',
      handleOnClick: handleUnisetConnection,
      isInstalled: unisatInstalled
    },
    {
      text: 'Leather (hiro)',
      icon: '/images/leather.svg',
      type: 'leather',
      handleOnClick: handleLeatherConnection,
      isInstalled: leatherInstalled
    },
    {
      text: 'OKX Wallet',
      icon: '/images/okx.svg',
      type: 'okx',
      handleOnClick: handleOkxConnection,
      isInstalled: okxInstalled
    }
  ];

  return (
    <Box>
      <Grid padding="37px 24px 20px 32px" width="561px">
        <Grid display="flex" gap="24px" marginBottom="25px">
          <img src="/images/wallet.svg" alt="img" />
          <Grid>
            <HeaderTypography
              fz="1.75em"
              fw="700"
              fc="#0FAE96"
              sx={{
                '@media screen and (max-width: 626px)': {
                  fontSize: '1.4em'
                }
              }}
            >
              Connect Wallet
            </HeaderTypography>
            <HeaderTypography
              fz="0.938em"
              fc={theme?.secondary?.main}
              sx={{
                '@media screen and (max-width: 626px)': {
                  width: '70%'
                }
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
            '@media screen and (max-width: 626px)': {
              flexWrap: 'wrap',
              width: 'min-content'
            }
          }}
        >
          {popData.map((item, index) => (
            <ConnectStyledItem
              key={index}
              theme={theme}
              onClick={() => item.handleOnClick(item.type, item.isInstalled, setViewPopover, checkLoginStatus, userDispatch)}
            >
              <img width="47px" src={item.icon} alt="img" />
              <HeaderTypography fc={theme?.primary?.popoverText} fz="1em" fw="500">
                {item.text}
              </HeaderTypography>
            </ConnectStyledItem>
          ))}
        </Grid>
      </Grid>
    </Box>
  );
};

export default PopOverContent;
