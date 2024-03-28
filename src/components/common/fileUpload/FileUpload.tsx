/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import { Controller } from 'react-hook-form';
import { Box, IconButton } from '@mui/material';
import styled from 'styled-components';
import { HeaderTypography } from '../typography/Typography';

export const ImageWrapper = styled.img`
  width: 100%;
  margin: 44px 0px 32px;
`;

export const FormContainer = styled.div(
  {},
  ({ theme }: { theme: any }) => `
  display: flex;
  align-items: center;
  margin: 12px 0px 20px;
  width: fit-content;
  border: 1px solid ${theme?.mode === 'light' ? theme?.accent?.lightGrey : theme?.accent?.dark2};
  border-radius: 8px;
  padding: 15px;
  background: ${theme?.mode === 'light' ? theme?.primary?.light : theme?.accent?.dark1};
`
);

export const ImageWrapperFile = styled.img`
  width: 156px;
  object-fit: cover;
  border-radius: 8px;
`;

export const Imagecross = styled.img`
  position: absolute;
  right: 6px;
  top: 6px;
  cursor: pointer;
`;

interface FileUploadProps {
  name: string;
  control: any;
  type: string;
  selectedImage: string | null;
  setSelectedImage: React.Dispatch<React.SetStateAction<string | null>>;
  selectedFile: string | null;
  setSelectedFile: React.Dispatch<React.SetStateAction<string | null>>;
  themeType: any;
}

const FileUpload: React.FC<FileUploadProps> = ({
  name,
  control,
  type,
  selectedImage,
  setSelectedImage,
  selectedFile,
  setSelectedFile,
  themeType
}) => {
  const isUploadImage = type === 'Upload Image';
  const isUploadFile = type === 'Upload File';

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

  const handleImageChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const img = await fileToBlob(file);
      if (isUploadImage) {
        setSelectedImage(img);
      } else {
        setSelectedFile(img);
      }
    }
  };

  const handleRemoveImageChange = () => {
    if (isUploadImage) {
      setSelectedImage(null);
    } else {
      setSelectedFile(null);
    }
  };

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
        <label htmlFor={`upload-photo`}>
          <IconButton color="primary" aria-label="upload picture" component="span">
            <img src={`${isUploadImage ? '/images/add.svg' : '/images/attach.svg'}`} alt="img" />
          </IconButton>
        </label>
        <Box>
          <Controller
            name={name}
            control={control}
            render={({ field }) => (
              <input
                type="file"
                id={`upload-photo`}
                name={type}
                accept={isUploadImage ? 'image/*' : '*'}
                onChange={(event) => {
                  handleImageChange(event);
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
          <Imagecross src={'/images/cross.svg'} alt="Uploaded" onClick={handleRemoveImageChange} />
        </Box>
      )}
      {isUploadFile && selectedFile && (
        <Box position={'relative'} width={'fit-content'}>
          <ImageWrapperFile src={selectedFile} alt="Uploaded" />
          <Imagecross src={'/images/cross.svg'} alt="Uploaded" onClick={handleRemoveImageChange} />
        </Box>
      )}
    </Box>
  );
};

export default FileUpload;
