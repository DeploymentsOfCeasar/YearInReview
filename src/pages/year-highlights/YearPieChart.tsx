import PropTypes from 'prop-types';
import { useEffect, useState, memo, useMemo } from 'react';

// material-ui
import { useTheme } from '@mui/material/styles';

// third-party
import ReactApexChart from 'react-apexcharts';

// project import
import { InfoOfAWeek, InfoOfTimeOnWeekday } from './Highlights';

// project import
// import { InfoOfAQuarter } from './DashboardDefault';

// chart options
const areaChartOptions: any = {
    chart: {
        type: 'donut',
    },
    labels: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
    responsive: [
        {
            breakpoint: 480,
            options: {
                chart: {
                    width: 200,
                },
                legend: {
                    position: 'bottom',
                },
            },
        },
    ],
};

// ==============================|| INCOME AREA CHART ||============================== //

interface YearPieChartProps {
    day: InfoOfTimeOnWeekday;
}

const YearPieChart = ({ day }: YearPieChartProps) => {
    const theme: any = useTheme();

    const { primary, secondary } = theme.palette.text;
    const line = theme.palette.divider;
    // const [options, setOptions] = useState<any>(areaChartOptions);

    const [series, setSeries] = useState([44, 55, 41, 17, 15, 18, 20]);

    useEffect(() => {
        setSeries([
            day.runTime[1]?.hour,
            day.runTime[5]?.hour,
            day.runTime[6]?.hour,
            day.runTime[4]?.hour,
            day.runTime[0]?.hour,
            day.runTime[2]?.hour,
            day.runTime[3]?.hour,
        ]);
    }, [day]);

    return <ReactApexChart options={areaChartOptions} series={series} type="donut" />;
};

YearPieChart.propTypes = {
    slot: PropTypes.string,
};

export default memo(YearPieChart);
