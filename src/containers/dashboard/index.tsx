/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from 'react';
import { Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '@mui/material/styles';
import { CommonButton } from '@/components/common/button/Button';
import { HeaderTypography } from '@/components/common/typography/Typography';
import { DisplayGrid, MainWrapper, ProposalWrapper, ProposalWrapperFilter, TableWrapper, TableWrapperFilter } from './styled';
import TableComponent from './DahboardTable';
import Footer from '@/components/footer/Footer';
import Header from '@/components/header/Header';
import CommonSlider from '@/components/common/slider/Slider';

const titles = [
  { text: 'Running', color: '#0FAE96' },
  { text: 'Ended', color: '#FF0000' }
];

const titleDates = ['6H', '24H', '7D', 'All'];

const Filter = ['Final proposals', 'Activity', 'Leaderboard', 'My voting Power  '];

const DashboardPage = () => {
  const navigate = useNavigate();
  const theme: any = useTheme();
  const [selects, setSelects] = useState([true, false, false, false]);
  const handleApplyClick = () => {
    navigate('/proposal/add');
  };

  const handleTableRowClick = () => {
    navigate(`/proposal/edit`);
  };

  const handleClick = (index: number) => {
    setSelects((prevSelects) => {
      const newSelects = prevSelects.map(() => false);
      newSelects[index] = true;
      return newSelects;
    });
  };
  return (
    <Box>
      <Header />
      <Box padding="20px">
        <Box position={'relative'} zIndex={'1'}>
          <DisplayGrid theme={theme}></DisplayGrid>
          <HeaderTypography
            maxWidth={'1446px'}
            margin={'auto'}
            fw="600"
            fz="2em"
            fc={theme?.palette?.primary?.main}
            marginTop={'38px'}
            marginBottom={'38px'}
            paddingLeft={'20px'}
            position={'relative'}
            sx={{
              '@media screen and (max-width: 626px)': {
                marginTop: '39px',
                marginBottom: '60px'
              }
            }}
          >
            Grand Proposals
          </HeaderTypography>
          <CommonSlider />
        </Box>
        <Box maxWidth={'1446px'} margin={'auto'}>
          <Box
            display={'flex'}
            flexDirection={'column'}
            rowGap="32px"
            alignItems="center"
            marginTop={'59px'}
            position={'relative'}
            zIndex="1"
            padding="19px"
            border={`1px solid ${theme?.palette?.primary?.borderColor}`}
            borderRadius="12px"
          >
            <HeaderTypography fz="2em" fw="700" fc={theme?.palette?.primary?.main} textAlign={'center'}>
              Create your UTXO proposal and build on UTXO today!
            </HeaderTypography>
            <HeaderTypography fc={theme?.palette?.secondary?.subHeading} fz=" 1.125rem" textAlign={'center'} marginTop={'-20px'}>
              Let's help the UTXO community together by providing an application as
              <br></br>
              additional value.
            </HeaderTypography>
            <CommonButton fz="1.25em" pd="14px 64px" onClick={handleApplyClick}>
              Apply
            </CommonButton>
          </Box>
          <Box
            marginTop={'39px'}
            boxShadow="1px 5px 20px 0px #00000029"
            padding={'44px 25px 22px'}
            borderRadius={'27px'}
            marginBottom={'94px'}
            backgroundColor={theme.palette.mode === 'dark' ? '#161515' : ''}
          >
            <MainWrapper>
              <TableWrapper alignItems="center" display="flex" columnGap={'30px'} justifyContent={'space-between'}>
                <HeaderTypography fz="1.5em" fw="500" minWidth={'fit-content'} fc={theme?.palette?.primary?.main}>
                  Running Proposals{' '}
                </HeaderTypography>
                <ProposalWrapper theme={theme?.palette}>
                  {titles?.map((item, i) => {
                    return (
                      <Box key={i} color={`${item.color}`} fontSize={'1em'} fontWeight={500}>
                        {item.text}
                      </Box>
                    );
                  })}
                </ProposalWrapper>
              </TableWrapper>
              <TableWrapperFilter alignItems="center" display="flex" columnGap={'30px'} justifyContent={'space-between'}>
                <ProposalWrapperFilter theme={theme?.palette}>
                  {Filter?.map((item, i) => {
                    return (
                      <Box
                        key={i}
                        minWidth={'fit-content'}
                        fontSize={'1em'}
                        // minWidth={`${index === 0 ? "112px" : ""} `}
                      >
                        {item}
                      </Box>
                    );
                  })}
                </ProposalWrapperFilter>
                <Box display="flex" columnGap={'20px'}>
                  {titleDates?.map((item, index) => {
                    return (
                      <Box
                        key={index}
                        style={{
                          padding: '10px 12px',
                          borderRadius: '6px',
                          color: selects[index] ? '#fff' : '#808080',
                          cursor: 'pointer',
                          backgroundColor: selects[index] ? '#0FAE96' : theme?.palette?.secondary?.light
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
      </Box>
      <Footer />
    </Box>
  );
};

export default DashboardPage;
