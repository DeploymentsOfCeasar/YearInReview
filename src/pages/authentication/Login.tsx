import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

// material-ui
import { Grid, Stack, Typography } from '@mui/material';
import Link from '@mui/material/Link';

// project import
import LoginForm from './auth-forms/LoginForm';
import AuthWrapper from './AuthWrapper';
import { isAuthenticated } from '../../handlers/tokenHandler';

// ================================|| LOGIN ||================================ //

const Login = () => {
    const navigate = useNavigate();

    useEffect(() => {
        (async () => {
            const res = await isAuthenticated();
            if (res) return navigate('/');
        })();
    }, []);

    return (
        <AuthWrapper>
            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <Stack
                        direction="row"
                        justifyContent="space-between"
                        alignItems="baseline"
                        sx={{ mb: { xs: -0.5, sm: 0.5 } }}
                    >
                        <Typography variant="h3">Login</Typography>
                        <Link
                            href="mailto:vuhoang7398@gmail.com"
                            variant="body1"
                            sx={{ textDecoration: 'none' }}
                            color="primary"
                        >
                            Don&apos;t have an account?
                        </Link>
                    </Stack>
                </Grid>
                <Grid item xs={12}>
                    <LoginForm />
                </Grid>
            </Grid>
        </AuthWrapper>
    );
};

export default Login;
