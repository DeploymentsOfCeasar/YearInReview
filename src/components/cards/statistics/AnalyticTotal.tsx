import PropTypes from 'prop-types';

// material-ui
import { Box, Chip, Grid, Stack, Typography } from '@mui/material';

// project import
import MainCard from '../../MainCard';

// assets
import { SyncOutlined } from '@ant-design/icons';

// ==============================|| STATISTICS - ECOMMERCE CARD  ||============================== //

interface AnalyticEcommerceProps {
    color?: 'secondary' | 'default' | 'primary' | 'error' | 'info' | 'success' | 'warning';
    title?: string;
    count?: string;
    days?: string;
}

const AnalyticEcommerce = ({
    color,
    title,
    count,
    days,
}: AnalyticEcommerceProps) => (
    <MainCard contentSX={{ p: 2.25 }}>
        <Stack spacing={0.5}>
            <Typography variant="h6" color="textSecondary">
                {title}
            </Typography>
            <Grid container alignItems="center">
                <Grid item>
                    <Typography variant="h4" color="inherit">
                        {count}
                    </Typography>
                </Grid>
                {days && (
                    <Grid item>
                        <Chip
                            variant="filled"
                            color={color}
                            icon={
                                <>
                                    {/* {!isLoss && (
                                        <SyncOutlined
                                            style={{ fontSize: '0.75rem', color: 'inherit' }}
                                        />
                                    )} */}
                                    {(
                                        <SyncOutlined
                                            style={{ fontSize: '0.75rem', color: 'inherit' }}
                                        />
                                    )}
                                </>
                            }
                            label={`${days} days`}
                            sx={{ ml: 1.25, pl: 1 }}
                            size="small"
                        />
                    </Grid>
                )}
            </Grid>
        </Stack>
    </MainCard>
);

AnalyticEcommerce.propTypes = {
    color: PropTypes.string,
    title: PropTypes.string,
    count: PropTypes.string,
    percentage: PropTypes.number,
    isLoss: PropTypes.bool,
    extra: PropTypes.oneOfType([PropTypes.node, PropTypes.string]),
};

AnalyticEcommerce.defaultProps = {
    color: 'primary',
};

export default AnalyticEcommerce;
