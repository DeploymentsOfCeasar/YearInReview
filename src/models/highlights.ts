export interface AverageHighlights {
    month: {
        totalPerMonthInHour: number;
        totalPerMonthInMinute: number;
    };
    day: {
        totalPerDayInHour: number;
        totalPerDayInMinute: number;
    };
}

export interface QuarterComparionHighlights {
    highestQuarter2021: {
        time: number;
        quarter: number;
    };
    highestQuarter2022: {
        time: number;
        quarter: number;
    };
    lowestQuarter2021: {
        time: number;
        quarter: number;
    };
    lowestQuarter2022: {
        time: number;
        quarter: number;
    };
}
