import { useEffect, useState } from 'react';

// material-ui
import {
    Avatar,
    Box,
    Grid,
    List,
    ListItemAvatar,
    ListItemButton,
    ListItemSecondaryAction,
    ListItemText,
    Stack,
    Typography,
    useTheme,
} from '@mui/material';

// project import
import { MainCard } from '../../components';
import YearBarChart from './YearBarChart';
import YearPieChart from './YearPieChart';

// api
import highlightsApi from '../../api/highlightsApi';
import stateApi from '../../api/stateApi';

// assets
import {
    DownCircleOutlined,
    HighlightOutlined,
    MessageOutlined,
    UpCircleOutlined,
    WarningOutlined,
} from '@ant-design/icons';

// models
import { AverageHighlights, QuarterComparionHighlights } from '../../models/highlights';
import { AWeekState, AYearState, AMonthState } from '../../models/state';

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
    type: string;
}

interface InfoOfAverage {
    dayRuntimeInHour: string;
    monthRuntimeInHour: string;
}

const rewriteInfoOfAYear = (res: AYearState[]): InfoOfAYear[] => {
    const newRes: InfoOfAYear[] = res.map((x) => {
        let { runTimeInDay, runTimeInHour, type } = x;
        const day = runTimeInDay.toFixed(0).toString();
        const hour = runTimeInHour.toFixed(0).toString();
        return { day, hour, type };
    });
    return newRes;
};

const rewriteInfoOfAverage = (res: AverageHighlights): InfoOfAverage => {
    let { month, day } = res;
    const newRes: InfoOfAverage = {
        dayRuntimeInHour: day.totalPerDayInHour.toFixed(0).toString(),
        monthRuntimeInHour: month.totalPerMonthInHour.toFixed(0).toString(),
    };
    return newRes;
};

// Quarter

interface InfoOfAQuarter {
    highestQuarter2021: string;
    highestQuarter2022: string;
    lowestQuarter2021: string;
    lowestQuarter2022: string;
    quarterHighest2021: number;
    quarterLowest2021: number;
    quarterHighest2022: number;
    quarterLowest2022: number;
}

const rewriteInfoOfQuarterComparison = (res: QuarterComparionHighlights): InfoOfAQuarter => {
    const newRes: InfoOfAQuarter = {
        highestQuarter2021: res.highestQuarter2021.time?.toFixed(0).toString(),
        highestQuarter2022: res.highestQuarter2022.time.toFixed(0).toString(),
        lowestQuarter2021: res.lowestQuarter2021.time?.toFixed(0).toString(),
        lowestQuarter2022: res.lowestQuarter2022.time?.toFixed(0).toString(),
        quarterHighest2021: res.highestQuarter2021.quarter,
        quarterLowest2021: res.lowestQuarter2021.quarter,
        quarterHighest2022: res.highestQuarter2022.quarter,
        quarterLowest2022: res.lowestQuarter2022.quarter,
    };
    return newRes;
};

// Month

interface InfoOfAMonth {
    month: number;
    type: string;
    hour: number;
}

export interface TypeOfAMonth {
    runtime: InfoOfAMonth[];
    failtime: InfoOfAMonth[];
}

const rewriteInfoOfAMonth = (res: AMonthState[]): TypeOfAMonth => {
    const rewriteRes: InfoOfAMonth[] = res.map((x) => {
        let { month, type, runTimeInHour } = x;
        const hour: number = Number(runTimeInHour.toFixed(0).toString());
        return { month, type, hour };
    });
    const runtime = rewriteRes.filter((x) => x.type === 'run time');
    const failtime = rewriteRes.filter((x) => x.type === 'fail time');

    const newRes: TypeOfAMonth = {
        runtime,
        failtime,
    };
    return newRes;
};

// Week
export interface InfoOfAWeek {
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
        let { date, runTimeInHour, type } = x;
        const hour: number = Number(runTimeInHour.toFixed(3));
        return { date, hour, type };
    });
    const runTime: InfoOfAWeek[] = newRes.filter((x) => x.type === 'run time');
    const failTime: InfoOfAWeek[] = newRes.filter((x) => x.type === 'fail time');

    return { runTime, failTime };
};

// ==============================|| HIGHLIGHTS ||============================== //

const Highlights = ({ year }: { year: string }) => {
    const theme = useTheme();

    const [yearInfo, setYearInfo] = useState<InfoOfAYear[]>([]);
    const [yearAverage, setYearAverage] = useState<InfoOfAverage>();
    const [quarterComparison, setQuarterComparison] = useState<InfoOfAQuarter>();
    const [monthList, setMonthList] = useState<TypeOfAMonth>();
    const [day, setDay] = useState<InfoOfTimeOnWeekday>();

    // Year

    useEffect(() => {
        try {
            (async () => {
                const res: AYearState[] = await stateApi.getOneYear(year);
                const newRes = rewriteInfoOfAYear(res);
                setYearInfo(newRes);
            })();
        } catch (err) {
            console.log(err);
        }
    }, [year]);

    useEffect(() => {
        try {
            (async () => {
                const res: AverageHighlights = await highlightsApi.getAverageOfYear(year);
                const newRes = rewriteInfoOfAverage(res);
                setYearAverage(newRes);
            })();
        } catch (err) {
            console.log(err);
        }
    }, [year]);

    // Quarter
    useEffect(() => {
        try {
            (async () => {
                const res: QuarterComparionHighlights =
                    await highlightsApi.getComparisonInQuarters();
                const newRes = rewriteInfoOfQuarterComparison(res);
                setQuarterComparison(newRes);
            })();
        } catch (err) {
            console.log(err);
        }
    }, [year]);

    // Month
    useEffect(() => {
        try {
            (async () => {
                const res: AMonthState[] = await stateApi.getAllMonthOfAYear(year);
                const newRes = rewriteInfoOfAMonth(res);
                setMonthList(newRes);
            })();
        } catch (err) {
            console.log(err);
        }
    }, [year]);

    // Week
    useEffect(() => {
        try {
            (async () => {
                const res: AWeekState[] = await stateApi.getAllWeekdayOfAYear(year);
                const newRes = rewriteInfoOfAWeek(res);
                setDay(newRes);
            })();
        } catch (err) {
            console.log(err);
        }
    }, [year]);

    return (
        <Grid container rowSpacing={4.5} columnSpacing={2.75}>
            {/* row 1 - col 1*/}
            <Grid item xs={12} md={6} lg={6}>
                <Grid container alignItems="center" justifyContent="space-between">
                    <Grid item>
                        <Typography variant="h5">Total Run Time Every Weekday (hour)</Typography>
                    </Grid>
                </Grid>
                <MainCard content={false} sx={{ mt: 1.5 }}>
                    <Box sx={{ pt: 1, pr: 2 }}>{day?.runTime && <YearPieChart day={day} />}</Box>
                </MainCard>
            </Grid>
            {/* row 1 - col 2*/}
            <Grid item xs={12} md={6} lg={6}>
                <Grid container alignItems="center" justifyContent="space-between">
                    <Grid item>
                        <Typography variant="h5">{`Figures Of ${year}`}</Typography>
                    </Grid>
                    <Grid item />
                </Grid>
                <MainCard sx={{ mt: 1.5 }} content={false}>
                    <List
                        component="nav"
                        sx={{
                            px: 0,
                            py: 0,
                            '& .MuiListItemButton-root': {
                                py: 1.3,
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
                                    <Typography variant="subtitle1">Total Run Time</Typography>
                                }
                                secondary={year}
                            />
                            <ListItemSecondaryAction>
                                <Stack alignItems="flex-end">
                                    <Typography variant="subtitle1" noWrap>
                                        {yearInfo[0]?.hour}
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
                                        color: 'error.main',
                                        bgcolor: 'error.lighter',
                                    }}
                                >
                                    <WarningOutlined />
                                </Avatar>
                            </ListItemAvatar>
                            <ListItemText
                                primary={
                                    <Typography variant="subtitle1">Total Fail Time</Typography>
                                }
                                secondary={year}
                            />
                            <ListItemSecondaryAction>
                                <Stack alignItems="flex-end">
                                    <Typography variant="subtitle1" noWrap>
                                        {yearInfo[1]?.hour}
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
                                primary={
                                    <Typography variant="subtitle1">
                                        Average Runtime Per Month
                                    </Typography>
                                }
                                secondary={year}
                            />
                            <ListItemSecondaryAction>
                                <Stack alignItems="flex-end">
                                    <Typography variant="subtitle1" noWrap>
                                        {yearAverage?.monthRuntimeInHour}
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
                                primary={
                                    <Typography variant="subtitle1">
                                        Average Runtime Per Day
                                    </Typography>
                                }
                                secondary={year}
                            />
                            <ListItemSecondaryAction>
                                <Stack alignItems="flex-end">
                                    <Typography variant="subtitle1" noWrap>
                                        {yearAverage?.dayRuntimeInHour}
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
                                        color: 'success.main',
                                        bgcolor: 'success.lighter',
                                    }}
                                >
                                    <UpCircleOutlined />
                                </Avatar>
                            </ListItemAvatar>
                            <ListItemText
                                primary={
                                    <Typography variant="subtitle1">
                                        Highest Run Time Quarter
                                    </Typography>
                                }
                                secondary={
                                    year === '2021'
                                        ? `Quarter ${quarterComparison?.quarterHighest2021} ${year}`
                                        : `Quarter ${quarterComparison?.quarterHighest2022} ${year}`
                                }
                            />
                            <ListItemSecondaryAction>
                                <Stack alignItems="flex-end">
                                    <Typography variant="subtitle1" noWrap>
                                        {year === '2021'
                                            ? `${quarterComparison?.highestQuarter2021}`
                                            : `${quarterComparison?.highestQuarter2022}`}
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
                                        color: 'warning.main',
                                        bgcolor: 'warning.lighter',
                                    }}
                                >
                                    <DownCircleOutlined />
                                </Avatar>
                            </ListItemAvatar>
                            <ListItemText
                                primary={
                                    <Typography variant="subtitle1">
                                        Lowest Run Time Quarter
                                    </Typography>
                                }
                                secondary={
                                    year === '2021'
                                        ? `Quarter ${quarterComparison?.quarterLowest2021} ${year}`
                                        : `Quarter ${quarterComparison?.quarterLowest2022} ${year}`
                                }
                            />
                            <ListItemSecondaryAction>
                                <Stack alignItems="flex-end">
                                    <Typography variant="subtitle1" noWrap>
                                        {year === '2021'
                                            ? `${quarterComparison?.lowestQuarter2021}`
                                            : `${quarterComparison?.lowestQuarter2022}`}
                                    </Typography>
                                    <Typography variant="h6" color="secondary" noWrap>
                                        hours
                                    </Typography>
                                </Stack>
                            </ListItemSecondaryAction>
                        </ListItemButton>
                    </List>
                </MainCard>
            </Grid>

            {/* row 2 */}
            <Grid item xs={12} md={12} lg={12}>
                <Grid container alignItems="center" justifyContent="space-between">
                    <Grid item>
                        <Typography variant="h5">Month Overview</Typography>
                    </Grid>
                </Grid>
                <MainCard sx={{ mt: 1.75 }}>
                    <YearBarChart monthList={monthList} />
                </MainCard>
            </Grid>
        </Grid>
    );
};

export default Highlights;
