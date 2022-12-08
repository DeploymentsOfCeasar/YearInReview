import { MouseEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';

// material-ui
import {
    Box,
    Button, FormHelperText,
    Grid,
    IconButton,
    InputAdornment,
    InputLabel,
    Link,
    OutlinedInput,
    Stack
} from '@mui/material';

// third party
import { Formik } from 'formik';
import * as Yup from 'yup';

// project import
import { AnimateButton } from '../../../components';

// Model
import Admin from '../../../models/admin';

// API
import authApi from '../../../api/authApi';

// assets
import { EyeInvisibleOutlined, EyeOutlined } from '@ant-design/icons';

// ============================|| FIREBASE - LOGIN ||============================ //

const LoginForm = () => {
    const navigate = useNavigate();

    // const [checked, setChecked] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    const handleClickShowPassword = () => {
        setShowPassword(!showPassword);
    };

    const handleMouseDownPassword = (event: MouseEvent) => {
        event.preventDefault();
    };

    return (
        <>
            <Formik
                initialValues={{
                    username: 'Username',
                    password: 'Username2022',
                    submit: null,
                }}
                validationSchema={Yup.object().shape({
                    username: Yup.string().max(255).required('Username is required'),
                    password: Yup.string().max(255).required('Password is required'),
                })}
                onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
                    try {
                        setStatus({ success: false });
                        setSubmitting(false);
                        const admin: Admin = {
                            username: values.username,
                            password: values.password,
                        };
                        const res = await authApi.login(admin);
                        localStorage.setItem('token', res.token)
                        navigate('/')
                    } catch (err) {
                        console.log(err)
                        setStatus({ success: false });
                        setErrors({ submit: 'Wrong username or password!' });
                        setSubmitting(false);
                    }
                }}
            >
                {({
                    errors,
                    handleBlur,
                    handleChange,
                    handleSubmit,
                    isSubmitting,
                    touched,
                    values,
                }) => (
                    <form noValidate onSubmit={handleSubmit}>
                        <Grid container spacing={3}>
                            <Grid item xs={12}>
                                <Stack spacing={1}>
                                    <InputLabel htmlFor="username">Username</InputLabel>
                                    <OutlinedInput
                                        id="username"
                                        type="text"
                                        value={values.username}
                                        name="username"
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        placeholder="Enter username"
                                        fullWidth
                                        error={Boolean(touched.username && errors.username)}
                                    />
                                    {touched.username && errors.username && (
                                        <FormHelperText
                                            error
                                            id="standard-weight-helper-text-email-login"
                                        >
                                            {errors.username}
                                        </FormHelperText>
                                    )}
                                </Stack>
                            </Grid>
                            <Grid item xs={12}>
                                <Stack spacing={1}>
                                    <InputLabel htmlFor="password-login">Password</InputLabel>
                                    <OutlinedInput
                                        fullWidth
                                        error={Boolean(touched.password && errors.password)}
                                        id="-password-login"
                                        type={showPassword ? 'text' : 'password'}
                                        value={values.password}
                                        name="password"
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        endAdornment={
                                            <InputAdornment position="end">
                                                <IconButton
                                                    aria-label="toggle password visibility"
                                                    onClick={handleClickShowPassword}
                                                    onMouseDown={handleMouseDownPassword}
                                                    edge="end"
                                                    size="large"
                                                >
                                                    {showPassword ? (
                                                        <EyeOutlined />
                                                    ) : (
                                                        <EyeInvisibleOutlined />
                                                    )}
                                                </IconButton>
                                            </InputAdornment>
                                        }
                                        placeholder="Enter password"
                                    />
                                    {touched.password && errors.password && (
                                        <FormHelperText
                                            error
                                            id="standard-weight-helper-text-password-login"
                                        >
                                            {errors.password}
                                        </FormHelperText>
                                    )}
                                </Stack>
                            </Grid>

                            <Grid item xs={12} sx={{ mt: -1 }}>
                                <Stack
                                    direction="row"
                                    justifyContent="space-between"
                                    alignItems="center"
                                    spacing={2}
                                >
                                    {/* <FormControlLabel
                                        control={
                                            <Checkbox
                                                checked={checked}
                                                onChange={(event) =>
                                                    setChecked(event.target.checked)
                                                }
                                                name="checked"
                                                color="primary"
                                                size="small"
                                            />
                                        }
                                        label={
                                            <Typography variant="h6">Keep me sign in</Typography>
                                        }
                                    /> */}
                                    {errors.submit ? (
                                        <FormHelperText error>{errors.submit}</FormHelperText>
                                    ) : (
                                        <Box />
                                    )}
                                    <Link
                                        variant="h6"
                                        href="mailto:vuhoang7398@gmail.com"
                                        color="text.primary"
                                    >
                                        Forgot Password?
                                    </Link>
                                </Stack>
                            </Grid>
                            <Grid item xs={12}>
                                <AnimateButton>
                                    <Button
                                        disableElevation
                                        disabled={isSubmitting}
                                        fullWidth
                                        size="large"
                                        type="submit"
                                        variant="contained"
                                        color="primary"
                                    >
                                        Login
                                    </Button>
                                </AnimateButton>
                            </Grid>
                        </Grid>
                    </form>
                )}
            </Formik>
        </>
    );
};

export default LoginForm;
