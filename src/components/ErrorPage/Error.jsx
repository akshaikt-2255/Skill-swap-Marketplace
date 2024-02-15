import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';

const ErrorPage = () => {
  return (
    <Container>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: 'calc(100vh - 100px)',
        }}
      >
        <Typography variant="h4" gutterBottom>
          404 - Page Not Found
        </Typography>
        <Typography variant="body1">
          The page you are looking for does not exist.
        </Typography>
      </div>
    </Container>
  );
};

export default ErrorPage;
