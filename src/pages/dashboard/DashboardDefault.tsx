import { useEffect, useState } from 'react';

// material-ui
import {
    Avatar,
    AvatarGroup,
    Box,
    Button,
    Grid,
    List,
    ListItemAvatar,
    ListItemButton,
    ListItemSecondaryAction,
    ListItemText,
    MenuItem,
    Stack,
    TextField,
    Typography,
    useTheme,
} from '@mui/material';

// project import
import { AnalyticTotal, MainCard } from '../../components';
import { useAppDispatch, useAppSelector } from '../../store/index';
import MonthAndQuarterAreaChart from './MonthAndQuarterAreaChart';
import QuarterBarChart from './QuarterBarChart';
import WeekColumnChart from './WeekColumnChart';

// api
import stateApi from '../../api/stateApi';

// assets
import {
    GiftOutlined,
    HighlightOutlined,
    MessageOutlined,
    SettingOutlined,
    WarningOutlined,
} from '@ant-design/icons';
import {
    default as avatar1,
    default as avatar2,
    default as avatar3,
    default as avatar4,
} from '../../assets/images/users/avatar-1.jpg';

// models
import { AMonthState, AQuarterState, AWeekState, AYearState } from '../../models/state';

// avatar style
const avatarSX = {
    width: 36,
    height: 36,
    fontSize: '1rem',
};

// action style
const actionSX = {
    mt: 0.75,
    ml: 1,
    top: 'auto',
    right: 'auto',
    alignSelf: 'flex-start',
    transform: 'none',
};

// sales report status
const status = [
    {
        value: '2021',
        label: '2021',
    },
    {
        value: '2022',
        label: '2022',
    },
];

// Year

interface InfoOfAYear {
    day: string;
    hour: string;
    year: string;
}

const rewriteInfoOfAYear = (res: AYearState[]): InfoOfAYear[] => {
    const newRes: InfoOfAYear[] = res.map((x) => {
        let { runTimeInDay, runTimeInHour, year } = x;
        const day = runTimeInDay.toFixed(0).toString();
        const hour = runTimeInHour.toFixed(0).toString();
        return { day, hour, year };
    });
    return newRes;
};

// Quarter

export interface InfoOfAQuarter {
    year: string;
    hour: number;
    type: string;
}

interface InfoOfRunAndFailTime {
    runTime: InfoOfAQuarter[];
    failTime: InfoOfAQuarter[];
}

const rewriteInfoOfAQuarter = (res: AQuarterState[]): InfoOfRunAndFailTime => {
    const newRes: InfoOfAQuarter[] = res.map((x) => {
        let { year, runTimeInHour, type } = x;
        const hour: number = Number(runTimeInHour.toFixed(0));
        return { year, hour, type };
    });
    const runTime: InfoOfAQuarter[] = newRes.filter((x) => x.type === 'run time');
    const failTime: InfoOfAQuarter[] = newRes.filter((x) => x.type === 'fail time');

    return { runTime, failTime };
};

// Month
const rewriteInfoOfAMonth = (res: AMonthState): number => {
    if (res === null) return 0;
    const { runTimeInHour } = res;
    return Number(runTimeInHour.toFixed(0));
};

const getMonths = async (year: number, quarter: number, month: number | string) => {
    return await stateApi.getAllMonthOfAQuarter(`${year}/${quarter}/${month}`);
};

// Week
interface InfoOfAWeek {
    year: string;
    date: string;
    hour: number;
    type: string;
}

export interface InfoOfTimeOnWeekday {
    runTime: InfoOfAWeek[];
    failTime: InfoOfAWeek[];
}

const rewriteInfoOfAWeek = (res: AWeekState[]): InfoOfTimeOnWeekday => {
    const newRes: InfoOfAWeek[] = res.map((x) => {
        let { year, date, runTimeInHour, type } = x;
        const hour: number = Number(runTimeInHour.toFixed(0));
        return { year, date, hour, type };
    });
    const runTime: InfoOfAWeek[] = newRes.filter((x) => x.type === 'run time');
    const failTime: InfoOfAWeek[] = newRes.filter((x) => x.type === 'fail time');

    return { runTime, failTime };
};

// ==============================|| DASHBOARD - DEFAULT ||============================== //

const DashboardDefault = () => {
    const theme = useTheme();
    const error = theme.palette.error.main;
    const warning = theme.palette.warning.main;

    // const dispatch = useAppDispatch();
    // const highlights = useAppSelector((state) => state.drawer.menu);

    const [value, setValue] = useState('2021');
    const [slot, setSlot] = useState('quarter');

    const [allYear, setAllYear] = useState<InfoOfAYear[]>([]);

    const [quarter2021, setQuarter2021] = useState<InfoOfRunAndFailTime>();
    const [quarter2022, setQuarter2022] = useState<InfoOfRunAndFailTime>();

    const [month2021, setMonth2021] = useState<number[]>(() => {
        const initArr: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
        return initArr;
    });
    const [month2022, setMonth2022] = useState<number[]>(() => {
        const initArr: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
        return initArr;
    });

    const [day2021, setDay2021] = useState<InfoOfTimeOnWeekday>();
    const [day2022, setDay2022] = useState<InfoOfTimeOnWeekday>();

    // Year

    useEffect(() => {
        try {
            (async () => {
                const res: AYearState[] = await stateApi.getAllYear();
                const newRes = rewriteInfoOfAYear(res);
                setAllYear(newRes);
            })();
        } catch (err) {
            console.log(err);
        }
    }, []);

    // Quarter

    useEffect(() => {
        try {
            (async () => {
                const res2021: AQuarterState[] = await stateApi.getAllQuarterOfAYear(2021);
                const newRes2021 = rewriteInfoOfAQuarter(res2021);
                setQuarter2021(newRes2021);
                const res2022 = await stateApi.getAllQuarterOfAYear(2022);
                const newRes2022 = rewriteInfoOfAQuarter(res2022);
                setQuarter2022(newRes2022);
            })();
        } catch (err) {
            console.log(err);
        }
    }, []);

    // Month

    useEffect(() => {
        try {
            // 2021
            const getMonths2021 = () => {
                return Promise.all(
                    month2021.map((month, i) => {
                        let quarter = Math.ceil((i + 1) / 3);
                        if (month < 10) {
                            return getMonths(2021, quarter, `0${month}`);
                        }
                        return getMonths(2021, quarter, month);
                    })
                );
            };
            getMonths2021().then((list) => {
                const newMonthList = list.map((month, i) => {
                    const newMonth = rewriteInfoOfAMonth(month);
                    return newMonth;
                });
                setMonth2021(newMonthList);
            });
            // 2022
            const getMonths2022 = () => {
                return Promise.all(
                    month2022.map((month, i) => {
                        let quarter = Math.ceil((i + 1) / 3);
                        if (month < 10) {
                            return getMonths(2022, quarter, `0${month}`);
                        }
                        return getMonths(2022, quarter, month);
                    })
                );
            };
            getMonths2022().then((list) => {
                const newMonthList = list.map((month, i) => {
                    let newMonth = 0;
                    if (month === null) return newMonth;
                    newMonth = rewriteInfoOfAMonth(month);
                    return newMonth;
                });
                setMonth2022(newMonthList);
            });
        } catch (err) {
            console.log(err);
        }
    }, []);

    // Week
    useEffect(() => {
        try {
            (async () => {
                const res2021: AWeekState[] = await stateApi.getAllWeekdayOfAYear('2021');
                const newRes2021 = rewriteInfoOfAWeek(res2021);
                setDay2021(newRes2021);
                const res2022: AWeekState[] = await stateApi.getAllWeekdayOfAYear('2022');
                const newRes2022 = rewriteInfoOfAWeek(res2022);
                setDay2022(newRes2022);
            })();
        } catch (err) {
            console.log(err);
        }
    }, []);

    return (
        <Grid container rowSpacing={4.5} columnSpacing={2.75}>
            {/* row 1 */}
            <Grid item xs={12} sx={{ mb: -2.25 }}>
                <Typography variant="h5">Dashboard</Typography>
            </Grid>
            <Grid item xs={12} sm={6} md={4} lg={3}>
                <AnalyticTotal
                    title={`Total RunTime In ${allYear[2]?.year} (hour)`}
                    count={allYear[2]?.hour}
                    days={allYear[2]?.day}
                    color="success"
                />
            </Grid>
            <Grid item xs={12} sm={6} md={4} lg={3}>
                <AnalyticTotal
                    title={`Total RunTime In ${allYear[0]?.year} (hour)`}
                    count={allYear[0]?.hour}
                    days={allYear[0]?.day}
                />
            </Grid>
            <Grid item xs={12} sm={6} md={4} lg={3}>
                <AnalyticTotal
                    title={`Total FailTime In ${allYear[3]?.year} (hour)`}
                    count={allYear[3]?.hour}
                    days={allYear[3]?.day}
                    color="error"
                />
            </Grid>
            <Grid item xs={12} sm={6} md={4} lg={3}>
                <AnalyticTotal
                    title={`Total FailTime In ${allYear[1]?.year} (hour)`}
                    count={allYear[1]?.hour}
                    days={allYear[1]?.day}
                    color="warning"
                />
            </Grid>

            <Grid item md={8} sx={{ display: { sm: 'none', md: 'block', lg: 'none' } }} />

            {/* row 2 */}
            <Grid item xs={12} md={7} lg={8}>
                <Grid container alignItems="center" justifyContent="space-between">
                    <Grid item>
                        <Typography variant="h5">Running Time Overview (hour)</Typography>
                    </Grid>
                    <Grid item>
                        <Stack direction="row" alignItems="center" spacing={0}>
                            <Button
                                size="small"
                                onClick={() => setSlot('month')}
                                color={slot === 'month' ? 'primary' : 'secondary'}
                                variant={slot === 'month' ? 'outlined' : 'text'}
                            >
                                Month
                            </Button>
                            <Button
                                size="small"
                                onClick={() => setSlot('quarter')}
                                color={slot === 'quarter' ? 'primary' : 'secondary'}
                                variant={slot === 'quarter' ? 'outlined' : 'text'}
                            >
                                Quarter
                            </Button>
                        </Stack>
                    </Grid>
                </Grid>
                <MainCard content={false} sx={{ mt: 1.5 }}>
                    <Box sx={{ pt: 1, pr: 2 }}>
                        {quarter2021?.runTime && quarter2022?.runTime && (
                            <MonthAndQuarterAreaChart
                                slot={slot}
                                quarter2021={quarter2021.runTime}
                                quarter2022={quarter2022.runTime}
                                month2021={month2021}
                                month2022={month2022}
                            />
                        )}
                    </Box>
                </MainCard>
            </Grid>
            <Grid item xs={12} md={5} lg={4}>
                <Grid container alignItems="center" justifyContent="space-between">
                    <Grid item>
                        <Typography variant="h5">Fail Time Overview (hour)</Typography>
                    </Grid>
                    <Grid item />
                </Grid>
                <MainCard sx={{ mt: 2 }} content={false}>
                    <Box sx={{ p: 3, pb: 0 }}>
                        <Stack spacing={2}>
                            <Typography variant="h6" color="textSecondary">
                                The interval between 2 states
                                <Typography sx={{ display: 'inline' }} color={error}>
                                    {' '}
                                    failure
                                </Typography>{' '}
                                and{' '}
                                <Typography sx={{ display: 'inline' }} color={warning}>
                                    idle
                                </Typography>
                            </Typography>
                            <Typography variant="h3">Quarter 1-4</Typography>
                        </Stack>
                    </Box>
                    {quarter2021?.failTime && quarter2022?.failTime && (
                        <QuarterBarChart
                            quarter2021={quarter2021.failTime}
                            quarter2022={quarter2022.failTime}
                        />
                    )}
                </MainCard>
            </Grid>

            {/* row 3 */}
            <Grid item xs={12} md={7} lg={8}>
                <Grid container alignItems="center" justifyContent="space-between">
                    <Grid item>
                        <Typography variant="h5">Week Overview</Typography>
                    </Grid>
                    <Grid item>
                        <TextField
                            id="standard-select-currency"
                            size="small"
                            select
                            value={value}
                            onChange={(e) => setValue(e.target.value)}
                            sx={{ '& .MuiInputBase-input': { py: 0.5, fontSize: '0.875rem' } }}
                        >
                            {status.map((option) => (
                                <MenuItem key={option.value} value={option.value}>
                                    {option.label}
                                </MenuItem>
                            ))}
                        </TextField>
                    </Grid>
                </Grid>
                <MainCard sx={{ mt: 1.75 }}>
                    <Stack spacing={1.5} sx={{ mb: -12 }}>
                        <Typography variant="h6" color="secondary">
                            Compare run time and fail time on every weekday
                        </Typography>
                        <Typography variant="h4">Hour</Typography>
                    </Stack>
                    {day2021?.runTime && day2022?.runTime && (
                        <WeekColumnChart year={value} day2021={day2021} day2022={day2022} />
                    )}
                </MainCard>
            </Grid>
            <Grid item xs={12} md={5} lg={4}>
                <Grid container alignItems="center" justifyContent="space-between">
                    <Grid item>
                        <Typography variant="h5">Highlights</Typography>
                    </Grid>
                    <Grid item />
                </Grid>
                <MainCard sx={{ mt: 2 }} content={false}>
                    <List
                        component="nav"
                        sx={{
                            px: 0,
                            py: 0,
                            '& .MuiListItemButton-root': {
                                py: 1.5,
                                '& .MuiAvatar-root': avatarSX,
                                '& .MuiListItemSecondaryAction-root': {
                                    ...actionSX,
                                    position: 'relative',
                                },
                            },
                        }}
                    >
                        <ListItemButton divider>
                            <ListItemAvatar>
                                <Avatar
                                    sx={{
                                        color: 'success.main',
                                        bgcolor: 'success.lighter',
                                    }}
                                >
                                    <HighlightOutlined />
                                </Avatar>
                            </ListItemAvatar>
                            <ListItemText
                                primary={
                                    <Typography variant="subtitle1">
                                        Highest Runtime Month
                                    </Typography>
                                }
                                secondary="July 2022"
                            />
                            <ListItemSecondaryAction>
                                <Stack alignItems="flex-end">
                                    <Typography variant="subtitle1" noWrap>
                                        253
                                    </Typography>
                                    <Typography variant="h6" color="secondary" noWrap>
                                        hours
                                    </Typography>
                                </Stack>
                            </ListItemSecondaryAction>
                        </ListItemButton>
                        <ListItemButton divider>
                            <ListItemAvatar>
                                <Avatar
                                    sx={{
                                        color: 'primary.main',
                                        bgcolor: 'primary.lighter',
                                    }}
                                >
                                    <MessageOutlined />
                                </Avatar>
                            </ListItemAvatar>
                            <ListItemText
                                primary={<Typography variant="subtitle1">No Running</Typography>}
                                secondary="Every Sunday"
                            />
                            <ListItemSecondaryAction>
                                <Stack alignItems="flex-end">
                                    <Typography variant="subtitle1" noWrap>
                                        0
                                    </Typography>
                                    <Typography variant="h6" color="secondary" noWrap>
                                        hour
                                    </Typography>
                                </Stack>
                            </ListItemSecondaryAction>
                        </ListItemButton>
                        <ListItemButton>
                            <ListItemAvatar>
                                <Avatar
                                    sx={{
                                        color: 'error.main',
                                        bgcolor: 'error.lighter',
                                    }}
                                >
                                    <WarningOutlined />
                                </Avatar>
                            </ListItemAvatar>
                            <ListItemText
                                primary={
                                    <Typography variant="subtitle1">
                                        Highest Fail Time Quarter
                                    </Typography>
                                }
                                secondary="Quater 2 of 2021"
                            />
                            <ListItemSecondaryAction>
                                <Stack alignItems="flex-end">
                                    <Typography variant="subtitle1" noWrap>
                                        183
                                    </Typography>
                                    <Typography variant="h6" color="secondary" noWrap>
                                        hours
                                    </Typography>
                                </Stack>
                            </ListItemSecondaryAction>
                        </ListItemButton>
                    </List>
                </MainCard>
                <MainCard sx={{ mt: 2 }}>
                    <Stack spacing={3}>
                        <Grid container justifyContent="space-between" alignItems="center">
                            <Grid item>
                                <Stack>
                                    <Typography variant="h5" noWrap>
                                        Help & Support
                                    </Typography>
                                    <Typography variant="caption" color="secondary" noWrap>
                                        Typical replay within days
                                    </Typography>
                                </Stack>
                            </Grid>
                            <Grid item>
                                <AvatarGroup
                                    sx={{ '& .MuiAvatar-root': { width: 32, height: 32 } }}
                                >
                                    <Avatar alt="Caesar" src={avatar1} />
                                    <Avatar alt="Caesar" src={avatar2} />
                                    <Avatar alt="Caesar" src={avatar3} />
                                    <Avatar alt="Caesar" src={avatar4} />
                                </AvatarGroup>
                            </Grid>
                        </Grid>
                        <Button
                            size="small"
                            variant="contained"
                            sx={{ textTransform: 'capitalize' }}    
                        >
                            <a
                                href="https://www.linkedin.com/in/vuhoangnguyen58/"
                                target="_blank"
                                style={{ textDecoration: 'none', color: 'inherit' }}
                            >
                                Need Help?
                            </a>
                        </Button>
                    </Stack>
                </MainCard>
            </Grid>
        </Grid>
    );
};

export default DashboardDefault;
