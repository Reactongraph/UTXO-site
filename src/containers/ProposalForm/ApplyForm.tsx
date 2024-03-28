import React, { Fragment, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { Box, IconButton } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { FormFields } from '@/utils/constants/formConstants';
import { CommonButton } from '@/components/common/button/Button';
import { HeaderTypography } from '@/components/common/typography/Typography';
import { FormContainer, ImageWrapperFile, Imagecross } from '@/components/common/fileUpload/FileUpload';
import TextAreaWrap from '@/components/common/textAreaWrap/TextAreaWrap';
import Calender from '@/components/common/calender/Calender';
import { MainWrapper, Wrapper } from './styled';
import dayjs from 'dayjs';

interface FormItem {
  text: string;
  name: string;
  minRows?: number;
  placeholder?: string;
}

const ApplyForm: React.FC = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<string | null>(null);

  const theme = useTheme();
  const themeType: any = theme?.palette;

  const navigate = useNavigate();
  const { handleSubmit, control } = useForm({});

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

  const handleImageChange = async (event: React.ChangeEvent<HTMLInputElement>, type: number) => {
    const file = event.target.files?.[0];
    if (file) {
      const img = await fileToBlob(file);
      type === 0 ? setSelectedImage(img) : setSelectedFile(img);
    }
  };

  const handleRemoveImageChange = (type: string) => {
    type === 'Upload Image' ? setSelectedImage(null) : setSelectedFile(null);
  };

  const content = (item: FormItem, index: number) => {
    if (item.text === 'Upload Image' || item.text === 'Upload File') {
      const isUploadImage = item.text === 'Upload Image';
      const isUploadFile = item.text === 'Upload File';
      return (
        <Box
          display={'flex'}
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
              <Controller
                name={item.name}
                control={control}
                render={({ field }) => (
                  <input
                    type="file"
                    id={`upload-photo${index}`}
                    name={item?.text}
                    accept={isUploadImage ? 'image/*' : '*'}
                    onChange={(event) => {
                      handleImageChange(event, index);
                      field.onChange(event.target.files);
                    }}
                    style={{ display: 'none' }}
                  />
                )}
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
    } else if (item.text === 'Target Date') {
      return <Calender control={control} name={item.name} themeType={themeType} />;
    } else {
      return (
        <TextAreaWrap
          control={control}
          name={item.name}
          themeType={themeType}
          minRows={item.minRows ?? 1}
          placeholder={item.placeholder ?? ''}
        />
      );
    }
  };

  const onSubmit = (data: any) => {
    data.targetDate = dayjs(data.targetDate).locale('en').format('DD-MM-YYYY');
    console.log(data);
  };

  return (
    <Box position={'relative'} zIndex={'2'}>
      <Wrapper>
        <Box
          border={themeType?.mode === 'light' ? `1px solid ${themeType?.primary?.dark}` : `1px solid ${themeType?.accent?.dark2}`}
          padding={'25px'}
          borderRadius={'27px'}
          boxShadow={'1px 5px 6px 0px #34333329'}
          marginBottom={'60px'}
          bgcolor={themeType?.mode === 'dark' ? themeType?.accent?.dark4 : themeType?.primary?.light}
        >
          <HeaderTypography fz="1.5em" fw="700" marginBottom={'4px'} fc={themeType?.primary?.main}>
            Apply Proposals
          </HeaderTypography>

          <form onSubmit={handleSubmit(onSubmit)}>
            <MainWrapper>
              {FormFields?.map((item: FormItem, index: number) => {
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
              <CommonButton bg="#0FAE96" fw="600" fz="1.25em" pd="14px 54px" mr="0" type="submit">
                Upload
              </CommonButton>
            </Box>
          </form>
        </Box>
      </Wrapper>
    </Box>
  );
};

export default ApplyForm;
