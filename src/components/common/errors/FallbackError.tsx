import React from 'react';

interface FallbackErrorProps {
  errorText: string;
}

const FallbackError: React.FC<FallbackErrorProps> = ({ errorText }) => {
  return <div>{errorText}</div>;
};

export default FallbackError;
