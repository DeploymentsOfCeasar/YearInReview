import PropTypes from 'prop-types';
import { useEffect, useState, memo } from 'react';

// material-ui
import { useTheme } from '@mui/material/styles';

// third-party
import ReactApexChart from 'react-apexcharts';

// project import
import { InfoOfAQuarter } from './DashboardDefault';

// chart options
const areaChartOptions = {
    chart: {
        height: 450,
        type: 'area',
        toolbar: {
            show: false,
        },
    },
    dataLabels: {
        enabled: false,
    },
    stroke: {
        curve: 'smooth',
        width: 2,
    },
    grid: {
        strokeDashArray: 0,
    },
};

// ==============================|| INCOME AREA CHART ||============================== //

interface IncomeAreaChartProps {
    slot: string;
    quarter2021: InfoOfAQuarter[];
    quarter2022: InfoOfAQuarter[];
    month2021: number[];
    month2022: number[];
}

const IncomeAreaChart = ({
    slot,
    quarter2021,
    quarter2022,
    month2021,
    month2022,
}: IncomeAreaChartProps) => {
    const theme: any = useTheme();

    const { primary, secondary } = theme.palette.text;
    const line = theme.palette.divider;
    const [options, setOptions] = useState<any>(areaChartOptions);

    useEffect(() => {
        setOptions((prevState: any) => ({
            ...prevState,
            colors: [theme.palette.success.main, theme.palette.primary.main],
            xaxis: {
                categories:
                    slot === 'month'
                        ? [
                              'Jan',
                              'Feb',
                              'Mar',
                              'Apr',
                              'May',
                              'Jun',
                              'Jul',
                              'Aug',
                              'Sep',
                              'Oct',
                              'Nov',
                              'Dec',
                          ]
                        : ['Quarter 1', 'Quarter 2', 'Quarter 3', 'Quarter 4'],
                labels: {
                    style: {
                        colors: [
                            secondary,
                            secondary,
                            secondary,
                            secondary,
                            secondary,
                            secondary,
                            secondary,
                            secondary,
                            secondary,
                            secondary,
                            secondary,
                            secondary,
                        ],
                    },
                },
                axisBorder: {
                    show: true,
                    color: line,
                },
                tickAmount: slot === 'month' ? 11 : 4,
            },
            yaxis: {
                labels: {
                    style: {
                        colors: [secondary],
                    },
                },
            },
            grid: {
                borderColor: line,
            },
            tooltip: {
                theme: 'light',
            },
        }));
    }, [primary, secondary, line, theme, slot]);

    const [series, setSeries] = useState([
        {
            name: '2021',
            data: [0, 86, 28, 115],
        },
        {
            name: '2022',
            data: [0, 43, 14, 56],
        },
    ]);

    useEffect(() => {
        setSeries([
            {
                name: '2021',
                data:
                    slot === 'month'
                        ? month2021
                        : [
                              quarter2021[0]?.hour || 0,
                              quarter2021[1]?.hour || 0,
                              quarter2021[2]?.hour || 0,
                              quarter2021[3]?.hour || 0,
                          ],
            },
            {
                name: '2022',
                data:
                    slot === 'month'
                        ? month2022
                        : [
                              quarter2022[0]?.hour || 0,
                              quarter2022[1]?.hour || 0,
                              quarter2022[2]?.hour || 0,
                              quarter2022[3]?.hour || 0,
                          ],
            },
        ]);
    }, [slot]);

    return <ReactApexChart options={options} series={series} type="area" height={450} />;
};

IncomeAreaChart.propTypes = {
    slot: PropTypes.string,
};

export default memo(IncomeAreaChart);
