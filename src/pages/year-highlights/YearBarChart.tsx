import PropTypes from 'prop-types';
import { useEffect, useState, memo } from 'react';

// material-ui
import { useTheme } from '@mui/material/styles';

// third-party
import ReactApexChart from 'react-apexcharts';

// project import
import { TypeOfAMonth } from './Highlights';

// chart options
const areaChartOptions: any = {
    chart: {
        type: 'bar',
        height: 440,
        stacked: true,
    },
    colors: ['#008FFB', '#FF4560'],
    plotOptions: {
        bar: {
            horizontal: true,
            barHeight: '80%',
        },
    },
    dataLabels: {
        enabled: false,
    },
    stroke: {
        width: 1,
        colors: ['#fff'],
    },

    grid: {
        xaxis: {
            lines: {
                show: false,
            },
        },
    },
    yaxis: {
        min: -20,
        max: 20,
        title: {
            // text: 'Age',
        },
    },
    tooltip: {
        shared: false,
        x: {
            formatter: function (val: any) {
                return val;
            },
        },
        y: {
            formatter: function (val: any) {
                return Math.abs(val) + '%';
            },
        },
    },
    title: {
        text: 'Runtime/Failtime per month over total Runtime/Failtime of a year',
    },
    xaxis: {
        categories: [
            'December',
            'November',
            'October',
            'September',
            'August',
            'July',
            'June',
            'May',
            'April',
            'March',
            'February',
            'Januray',
        ],
        title: {
            text: 'Percent',
        },
        labels: {
            formatter: function (val: any) {
                return Math.abs(Math.round(val)) + '%';
            },
        },
    },
};

// ==============================|| INCOME AREA CHART ||============================== //

interface YearPieChartProps {
    monthList?: TypeOfAMonth;
}

const YearPieChart = ({ monthList }: YearPieChartProps) => {
    const theme: any = useTheme();

    const [series, setSeries] = useState<any>([]);
    const { primary, secondary } = theme.palette.text;
    const line = theme.palette.divider;
    useEffect(() => {
        let runtimeTotal = 0,
            failtimeTotal = 0;

        if (monthList) {
            runtimeTotal = monthList?.runtime.reduce((acc, x) => acc + (x?.hour || 0), 0);
            failtimeTotal = monthList?.failtime.reduce((acc, x) => acc + (x?.hour || 0), 0);
        }

        setSeries([
            {
                name: 'Runtime',
                data: [
                    Number(
                        (((monthList?.runtime[0]?.hour || 0) / runtimeTotal) * 100)
                            .toFixed(0)
                            .toString()
                    ),
                    Number(
                        (((monthList?.runtime[1]?.hour || 0) / runtimeTotal) * 100)
                            .toFixed(0)
                            .toString()
                    ),
                    Number(
                        (((monthList?.runtime[2]?.hour || 0) / runtimeTotal) * 100)
                            .toFixed(0)
                            .toString()
                    ),
                    Number(
                        (((monthList?.runtime[3]?.hour || 0) / runtimeTotal) * 100)
                            .toFixed(0)
                            .toString()
                    ),
                    Number(
                        (((monthList?.runtime[4]?.hour || 0) / runtimeTotal) * 100)
                            .toFixed(0)
                            .toString()
                    ),
                    Number(
                        (((monthList?.runtime[5]?.hour || 0) / runtimeTotal) * 100)
                            .toFixed(0)
                            .toString()
                    ),
                    Number(
                        (((monthList?.runtime[6]?.hour || 0) / runtimeTotal) * 100)
                            .toFixed(0)
                            .toString()
                    ),
                    Number(
                        (((monthList?.runtime[7]?.hour || 0) / runtimeTotal) * 100)
                            .toFixed(0)
                            .toString()
                    ),
                    Number(
                        (((monthList?.runtime[8]?.hour || 0) / runtimeTotal) * 100)
                            .toFixed(0)
                            .toString()
                    ),
                    Number(
                        (((monthList?.runtime[9]?.hour || 0) / runtimeTotal) * 100)
                            .toFixed(0)
                            .toString()
                    ),
                    Number(
                        (((monthList?.runtime[10]?.hour || 0) / runtimeTotal) * 100)
                            .toFixed(0)
                            .toString()
                    ),
                    Number(
                        (((monthList?.runtime[11]?.hour || 0) / runtimeTotal) * 100)
                            .toFixed(0)
                            .toString()
                    ),
                ],
            },
            {
                name: 'Failtime',
                data: [
                    -Number(
                        (((monthList?.failtime[0]?.hour || 0) / failtimeTotal) * 100)
                            .toFixed(0)
                            .toString()
                    ),
                    -Number(
                        (((monthList?.failtime[1]?.hour || 0) / failtimeTotal) * 100)
                            .toFixed(0)
                            .toString()
                    ),
                    -Number(
                        (((monthList?.failtime[2]?.hour || 0) / failtimeTotal) * 100)
                            .toFixed(0)
                            .toString()
                    ),
                    -Number(
                        (((monthList?.failtime[3]?.hour || 0) / failtimeTotal) * 100)
                            .toFixed(0)
                            .toString()
                    ),
                    -Number(
                        (((monthList?.failtime[4]?.hour || 0) / failtimeTotal) * 100)
                            .toFixed(0)
                            .toString()
                    ),
                    -Number(
                        (((monthList?.failtime[5]?.hour || 0) / failtimeTotal) * 100)
                            .toFixed(0)
                            .toString()
                    ),
                    -Number(
                        (((monthList?.failtime[6]?.hour || 0) / failtimeTotal) * 100)
                            .toFixed(0)
                            .toString()
                    ),
                    -Number(
                        (((monthList?.failtime[7]?.hour || 0) / failtimeTotal) * 100)
                            .toFixed(0)
                            .toString()
                    ),
                    -Number(
                        (((monthList?.failtime[8]?.hour || 0) / failtimeTotal) * 100)
                            .toFixed(0)
                            .toString()
                    ),
                    -Number(
                        (((monthList?.failtime[9]?.hour || 0) / failtimeTotal) * 100)
                            .toFixed(0)
                            .toString()
                    ),
                    -Number(
                        (((monthList?.failtime[10]?.hour || 0) / failtimeTotal) * 100)
                            .toFixed(0)
                            .toString()
                    ),
                    -Number(
                        (((monthList?.failtime[11]?.hour || 0) / failtimeTotal) * 100)
                            .toFixed(0)
                            .toString()
                    ),
                ],
            },
        ]);
    }, [monthList]);

    return <ReactApexChart options={areaChartOptions} series={series} type="bar" height={450} />;
};

YearPieChart.propTypes = {
    slot: PropTypes.string,
};

export default memo(YearPieChart);
