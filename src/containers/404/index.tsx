import { Container, Description, StyledLink, Title } from './styled';

const NotFoundPage: React.FC = () => {
  return (
    <Container>
      <Title>404 - Page Not Found</Title>
      <Description>The page you are looking for does not exist.</Description>
      <StyledLink to="/">Go back to home</StyledLink>
    </Container>
  );
};

export default NotFoundPage;
