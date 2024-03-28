/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { Fragment, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, IconButton } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { FormFields } from '@/utils/constants/formConstants';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { CommonButton } from '@/components/common/button/Button';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { HeaderTypography } from '@/components/common/typography/Typography';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { CalenderWrap, FormContainer, ImageWrapperFile, Imagecross, MainWrapper, TextAreaWrap, Wrapper } from './styled';

const ApplyForm: React.FC = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<string | null>(null);
  const theme = useTheme();
  const themeType: any = theme?.palette;
  const navigate = useNavigate();

  const handleImageChange = async (event: React.ChangeEvent<HTMLInputElement>, type: number) => {
    const file = event.target.files?.[0];

    if (file) {
      const img = await fileToBlob(file);
      if (type === 0) {
        setSelectedImage(img);
      } else {
        setSelectedFile(img);
      }
    }
  };

  const handleRemoveImageChange = (type: string) => {
    type === 'Upload Image' ? setSelectedImage(null) : setSelectedFile(null);
  };

  const fileToBlob = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => {
        const blob = new Blob([reader.result as ArrayBuffer], { type: file.type });
        const blobUrl = URL.createObjectURL(blob);
        resolve(blobUrl);
      };
      reader.onerror = reject;
      reader.readAsArrayBuffer(file);
    });
  };

  const content = (item: any, index: number) => {
    if (item?.text === 'Upload Image' || item?.text === 'Upload File') {
      const isUploadImage = item?.text === 'Upload Image';
      const isUploadFile = item?.text === 'Upload File';
      return (
        <Box
          display={'flex'}
          key={index}
          alignItems={'center'}
          columnGap={'32px'}
          sx={{
            '@media screen and (max-width: 450px)': {
              flexDirection: 'column',
              alignItems: 'start'
            }
          }}
        >
          <FormContainer theme={themeType}>
            <label htmlFor={`upload-photo${index}`}>
              <IconButton color="primary" aria-label="upload picture" component="span">
                <img src={`${isUploadImage ? '/images/add.svg' : '/images/attach.svg'}`} alt="img" />
              </IconButton>
            </label>
            <Box>
              <input
                type="file"
                id={`upload-photo${index}`}
                name={item?.text}
                accept={isUploadImage ? 'image/*' : '*'}
                onChange={(event) => handleImageChange(event, index as number)}
                style={{ display: 'none' }}
              />
              <HeaderTypography fz="1em" fc="#0FAE96" fw="500">
                Add
              </HeaderTypography>
            </Box>
          </FormContainer>
          {isUploadImage && selectedImage && (
            <Box position={'relative'} width={'fit-content'}>
              <ImageWrapperFile src={selectedImage} alt="Uploaded" />
              <Imagecross src={'/images/cross.svg'} alt="Uploaded" onClick={() => handleRemoveImageChange(item?.text as string)} />
            </Box>
          )}
          {isUploadFile && selectedFile && (
            <Box position={'relative'} width={'fit-content'}>
              <ImageWrapperFile src={selectedFile} alt="Uploaded" />
              <Imagecross src={'/images/cross.svg'} alt="Uploaded" onClick={() => handleRemoveImageChange(item?.text as string)} />
            </Box>
          )}
        </Box>
      );
    } else if (item?.text === 'Target Date') {
      return (
        <CalenderWrap theme={themeType}>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DemoContainer components={['DatePicker']}>
              <DatePicker format="DD-MM-YYYY" />
            </DemoContainer>
          </LocalizationProvider>
        </CalenderWrap>
      );
    } else {
      return (
        <>
          <TextAreaWrap theme={themeType} maxRows={6} minRows={item && item?.inputLine} placeholder={item?.placeholder} id="fullWidth" />
        </>
      );
    }
  };

  return (
    <Box position={'relative'} zIndex={'2'}>
      <Wrapper>
        {/* <ImageWrapper src="/images/edit-screen.svg" /> */}
        <Box
          border={themeType?.mode === 'light' ? `1px solid ${themeType?.primary?.dark}` : `1px solid ${themeType?.accent?.dark2}`}
          padding={'25px'}
          borderRadius={'27px'}
          boxShadow={'1px 5px 6px 0px #34333329'}
          marginBottom={'60px'}
          // maxWidth={"830px"}
          bgcolor={themeType?.mode === 'dark' ? themeType?.accent?.dark4 : themeType?.primary?.light}
        >
          <HeaderTypography fz="1.5em" fw="700" marginBottom={'4px'} fc={themeType?.primary?.main}>
            Apply Proposals
          </HeaderTypography>

          <MainWrapper>
            {FormFields?.map((item: { text: string }, index: number) => {
              return (
                <Fragment key={index}>
                  <HeaderTypography
                    fz="1em"
                    marginTop={'20px'}
                    fc={`${
                      item?.text === 'Upload Image'
                        ? themeType?.mode === 'light'
                          ? themeType?.primary?.main
                          : '#ECF1F0'
                        : themeType?.mode === 'light'
                          ? themeType?.secondary?.main
                          : themeType?.accent?.dark3
                    }`}
                    marginBottom={'8px'}
                  >
                    {item?.text}
                  </HeaderTypography>
                  {content(item, index)}
                </Fragment>
              );
            })}
          </MainWrapper>
          <Box justifyContent={'end'} display={'flex'} columnGap={'33px'}>
            <CommonButton
              fc="#929292"
              bg={themeType?.mode === 'light' ? themeType?.accent?.grey : themeType?.accent?.dark1}
              fw="600"
              fz="1.25em"
              pd="14px 45px"
              mr="0"
              onClick={() => navigate('/')}
            >
              Back
            </CommonButton>
            <CommonButton bg="#0FAE96" fw="600" fz="1.25em" pd="14px 54px" mr="0">
              Upload
            </CommonButton>
          </Box>
        </Box>
      </Wrapper>
    </Box>
  );
};

export default ApplyForm;
