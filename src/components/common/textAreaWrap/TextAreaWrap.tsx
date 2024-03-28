/* eslint-disable @typescript-eslint/no-explicit-any */
import { Controller } from 'react-hook-form';
import { Palette, TextareaAutosize } from '@mui/material';
import styled from 'styled-components';

const TextArea = styled(TextareaAutosize)(
  {},
  ({ theme }: { theme: any }) => `
 border-radius: 8px;
 padding: 19px 16px;
 overflow: hidden;
 width: 100%;
 resize: none;
 font-size: 1em;

 border:${theme?.mode === 'light' ? `1px solid ${theme?.accent?.lightGrey}` : `1px solid ${theme?.accent?.dark2}`};
 color: ${theme?.mode === 'light' ? theme?.secondary?.main : theme?.accent?.dark3};
 background: ${theme?.mode === 'light' ? theme?.primary?.light : theme?.accent?.dark1};
 font-family: Rubik, sans-serif;
 &::placeholder {
    color: ${theme?.accent?.placeholder};
 }
`
);

interface ITextAreaWrap {
  themeType: Palette | any;
  minRows: number;
  placeholder: string;
  name: string;
  control: any;
}

const TextAreaWrap = ({ themeType, minRows = 1, placeholder = '', name, control }: ITextAreaWrap) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <TextArea theme={themeType} maxRows={6} minRows={minRows} placeholder={placeholder} id="fullWidth" {...field} />
      )}
    />
  );
};

export default TextAreaWrap;
