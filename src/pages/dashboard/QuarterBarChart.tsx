import { useEffect, useState, memo } from 'react';

// material-ui
import { useTheme } from '@mui/material/styles';

// third-party
import ReactApexChart from 'react-apexcharts';

// project import
import { InfoOfAQuarter } from './DashboardDefault';

// chart options
const barChartOptions = {
    chart: {
        type: 'bar',
        height: 365,
        toolbar: {
            show: false,
        },
    },
    plotOptions: {
        bar: {
            distributed: true,
            columnWidth: '45%',
            borderRadius: 4,
        },
    },
    tooltip: {
        y: {
            formatter(val: any) {
                return `${val} hours`;
            },
        },
    },
    dataLabels: {
        enabled: false,
    },
    xaxis: {
        categories: ['2021', '2022'],
        axisBorder: {
            show: false,
        },
        axisTicks: {
            show: false,
        },
    },
    yaxis: {
        show: false,
    },
    grid: {
        show: false,
    },
};

// ==============================|| MONTHLY BAR CHART ||============================== //

interface MonthlyBarChartProps {
    quarter2021: InfoOfAQuarter[];
    quarter2022: InfoOfAQuarter[];
}

const MonthlyBarChart = ({ quarter2021, quarter2022 }: MonthlyBarChartProps) => {
    const theme = useTheme();

    const { primary, secondary } = theme.palette.text;
    const error = theme.palette.error.light;
    const warning = theme.palette.warning.light;

    const [series] = useState([
        {
            data: [
                quarter2021[0]?.hour || 0,
                quarter2022[0]?.hour || 0,
                quarter2021[1]?.hour || 0,
                quarter2022[1]?.hour || 0,
                quarter2021[2]?.hour || 0,
                quarter2022[2]?.hour || 0,
                quarter2021[3]?.hour || 0,
                quarter2022[3]?.hour || 0,
            ],
        },
    ]);

    const [options, setOptions] = useState<any>(barChartOptions);

    useEffect(() => {
        setOptions((prevState: any) => ({
            ...prevState,
            colors: [
                error,
                warning,
                error,
                warning,
                error,
                warning,
                error,
                warning,
                error,
                warning,
            ],
            xaxis: {
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
                        ],
                    },
                },
            },
            tooltip: {
                theme: 'light',
            },
        }));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [error, warning, secondary]);

    return (
        <div id="chart">
            <ReactApexChart options={options} series={series} type="bar" height={365} />
        </div>
    );
};

export default memo(MonthlyBarChart);
