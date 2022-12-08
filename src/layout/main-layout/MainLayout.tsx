import { useState, useEffect } from 'react';
import { useNavigate, Outlet } from 'react-router-dom';

// material-ui
import { useTheme } from '@mui/material/styles';
import { Box, Toolbar, useMediaQuery } from '@mui/material';

// Project import
import { useAppDispatch, useAppSelector } from '../../store';
import { isAuthenticated } from '../../handlers/tokenHandler';
import Header from './header/Header';
import Drawer from './Drawer/Drawer';
import { Breadcrumbs } from '../../components';
import navigation from '../../menu-items';

// actions
import { openDrawer } from '../../store/reducers/menu';

const MainLayout = () => {
    const theme: any = useTheme();
    const navigate = useNavigate();

    useEffect(() => {
        const checkToken = async () => {
            const res = await isAuthenticated();
            if (!res) navigate('/login');
        };
        checkToken();
    }, []);

    const matchDownLG = useMediaQuery(theme.breakpoints.down('xl'));
    const dispatch = useAppDispatch();

    const { drawerOpen } = useAppSelector((state) => state.drawer.menu);

    // drawer toggler
    const [open, setOpen] = useState(drawerOpen);
    const handleDrawerToggle = () => {
        setOpen(!open);
        dispatch(openDrawer({ drawerOpen: !open }));
    };

    // set media wise responsive drawer
    useEffect(() => {
        setOpen(!matchDownLG);
        dispatch(openDrawer({ drawerOpen: !matchDownLG }));

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [matchDownLG]);

    useEffect(() => {
        if (open !== drawerOpen) setOpen(drawerOpen);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [drawerOpen]);
    return (
        <Box sx={{ display: 'flex', width: '100%' }}>
            <Header open={open} handleDrawerToggle={handleDrawerToggle} />
            <Drawer open={open} handleDrawerToggle={handleDrawerToggle} />
            <Box component="main" sx={{ width: '100%', flexGrow: 1, p: { xs: 2, sm: 3 } }}>
                <Toolbar />
                <Breadcrumbs
                    navigation={navigation}
                    title
                    // titleBottom
                    // card={false}
                    // divider={false}
                />
                <Outlet />
            </Box>
        </Box>
    );
};

export default MainLayout;
