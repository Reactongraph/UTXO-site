import styled from '@emotion/styled';
import { Typography } from '@mui/material';

// Define the type for the props of HeaderTypography
interface HeaderTypographyProps {
  fc?: string;
  fz?: string;
  fw?: string | number;
}

export const HeaderTypography = styled(Typography)<HeaderTypographyProps>({}, ({ fc, fz, fw }) => ({
  fontFamily: 'Rubik, sans-serif',
  fontSize: fz || '1em',
  fontStyle: 'normal',
  fontWeight: fw || '400',
  lineHeight: 'normal',
  alignItems: 'center',
  display: 'flex',
  color: fc || '#2B2B2B'
}));
