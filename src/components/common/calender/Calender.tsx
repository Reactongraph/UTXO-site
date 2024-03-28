/* eslint-disable @typescript-eslint/no-explicit-any */
import { Palette } from '@mui/material';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import styled from 'styled-components';
import { Controller } from 'react-hook-form';
import dayjs from 'dayjs';

export const CalenderWrap = styled.div(
  {},
  ({ theme }: { theme: any }) => `
 .MuiFormControl-root {
    width: 100%;
    background: ${theme?.mode === 'light' ? theme?.primary?.light : theme?.accent?.dark1};
 }
`
);

interface ICalender {
  themeType: Palette | any;
  name: string;
  control: any;
}

const Calender = (props: ICalender) => {
  const { themeType, control, name } = props;
  return (
    <Controller
      control={control}
      name={name}
      defaultValue={dayjs()}
      render={({ field: { onChange, value } }) => (
        <CalenderWrap theme={themeType}>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DemoContainer components={['DatePicker']}>
              <DatePicker format="DD-MM-YYYY" value={value} onChange={onChange} />
            </DemoContainer>
          </LocalizationProvider>
        </CalenderWrap>
      )}
    />
  );
};

export default Calender;
