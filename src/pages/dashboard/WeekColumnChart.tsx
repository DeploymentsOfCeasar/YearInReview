import { useEffect, useState, memo } from 'react';

// material-ui
import { useTheme } from '@mui/material/styles';

// third-party
import ReactApexChart from 'react-apexcharts';

// project import
import { InfoOfTimeOnWeekday } from './DashboardDefault';

// chart options
const columnChartOptions = {
    chart: {
        type: 'bar',
        height: 430,
        toolbar: {
            show: false,
        },
    },
    plotOptions: {
        bar: {
            columnWidth: '30%',
            borderRadius: 4,
        },
    },
    dataLabels: {
        enabled: false,
    },
    stroke: {
        show: true,
        width: 8,
        colors: ['transparent'],
    },
    yaxis: {
        title: {
            text: '$ (thousands)',
        },
    },
    fill: {
        opacity: 1,
    },
    tooltip: {
        y: {
            formatter(val: any) {
                return `${val} hours`;
            },
        },
    },
    legend: {
        show: true,
        fontFamily: `'Public Sans', sans-serif`,
        offsetX: 10,
        offsetY: 10,
        labels: {
            useSeriesColors: false,
        },
        markers: {
            width: 16,
            height: 16,
            radius: '50%',
            offsexX: 2,
            offsexY: 2,
        },
        itemMargin: {
            horizontal: 15,
            vertical: 50,
        },
    },
    responsive: [
        {
            breakpoint: 600,
            options: {
                yaxis: {
                    show: false,
                },
            },
        },
    ],
};

// ==============================|| SALES COLUMN CHART ||============================== //

interface WeekColumnChartProps {
    year: string;
    day2021: InfoOfTimeOnWeekday;
    day2022: InfoOfTimeOnWeekday;
}

const WeekColumnChart = ({ year, day2021, day2022 }: WeekColumnChartProps) => {
    const theme = useTheme();

    const { primary, secondary } = theme.palette.text;
    const line = theme.palette.divider;

    const warning = theme.palette.warning.main;
    const primaryMain = theme.palette.primary.main;
    const successDark = theme.palette.success.dark;

    const [series, setSeries] = useState<any>([]);

    useEffect(() => {
        setSeries(
            year === '2021'
                ? [
                      {
                          name: 'Run Time',
                          data: [
                              day2021.runTime[1].hour,
                              day2021.runTime[5].hour,
                              day2021.runTime[6].hour,
                              day2021.runTime[4].hour,
                              day2021.runTime[0].hour,
                              day2021.runTime[2].hour,
                              day2021.runTime[3].hour,
                          ],
                      },
                      {
                          name: 'Fail Time',
                          data: [
                              day2021.failTime[1].hour,
                              day2021.failTime[5].hour,
                              day2021.failTime[6].hour,
                              day2021.failTime[4].hour,
                              day2021.failTime[0].hour,
                              day2021.failTime[2].hour,
                              day2021.failTime[3].hour,
                          ],
                      },
                  ]
                : [
                      {
                          name: 'Run Time',
                          data: [
                              day2022.runTime[1].hour,
                              day2022.runTime[5].hour,
                              day2022.runTime[6].hour,
                              day2022.runTime[4].hour,
                              day2022.runTime[0].hour,
                              day2022.runTime[2].hour,
                              day2022.runTime[3].hour,
                          ],
                      },
                      {
                          name: 'Fail Time',
                          data: [
                              day2022.failTime[1].hour,
                              day2022.failTime[5].hour,
                              day2022.failTime[6].hour,
                              day2022.failTime[4].hour,
                              day2022.failTime[0].hour,
                              day2022.failTime[2].hour,
                              day2022.failTime[3].hour,
                          ],
                      },
                  ]
        );
    }, [year]);

    const [options, setOptions] = useState(columnChartOptions);

    useEffect(() => {
        setOptions((prevState: any) => ({
            ...prevState,
            colors: [primaryMain, warning],
            xaxis: {
                labels: {
                    style: {
                        colors: [secondary, secondary, secondary, secondary, secondary, secondary],
                    },
                },
                categories: [
                    day2021.runTime[1].date,
                    day2021.runTime[5].date,
                    day2021.runTime[6].date,
                    day2021.runTime[4].date,
                    day2021.runTime[0].date,
                    day2021.runTime[2].date,
                    day2021.runTime[3].date,
                ],
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
            legend: {
                position: 'top',
                horizontalAlign: 'right',
                labels: {
                    colors: 'grey.500',
                },
            },
        }));
    }, [primary, secondary, line, warning, primaryMain, successDark]);

    return (
        <div id="chart">
            <ReactApexChart options={options as any} series={series} type="bar" height={430} />
        </div>
    );
};

export default memo(WeekColumnChart);
