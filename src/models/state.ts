export interface Token {
    token: string;
}

export interface AYearState {
    runTimeInDay: number;
    runTimeInHour: number;
    runTimeInMinute: number;
    type: string;
    year: string;
    __v: number;
    _id: string;
}

export interface AQuarterState {
    runTimeInDay: number;
    runTimeInHour: number;
    runTimeInMinute: number;
    type: string;
    year: string;
    quarter: string;
    __v: number;
    _id: string;
}

export interface AMonthState {
    type: string;
    year: string;
    quarter: number;
    month: number;
    runTimeInMinute: number;
    runTimeInHour: number;
    runTimeInDay: number;
    __v: number;
}

export interface AWeekState {
    year: string;
    date: string;
    type: string;
    runTimeInHour: number;
    __v: number;
    _id: string;
}