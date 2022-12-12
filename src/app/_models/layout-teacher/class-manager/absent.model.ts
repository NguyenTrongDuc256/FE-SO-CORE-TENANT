export interface ListAbsent {
    id: string;
    studentId: string;
    studentName: string;
    status: number;
    createdAt: number;
    sendBy: string;
    fromDate: string;
    toDate: string;
    attachedFile: string;
    reason: string;
    absentBus: AbsentBus[] | null;
    absentPeriod: AbsentPeriod[] | null
    absentMeal: AbsentMeal[] | null
}

export interface AbsentBus {
    date: number;
    busType: number;
}

export interface AbsentPeriod {
    date: number;
    period: Array<string | number>;
}

export interface AbsentMeal {
    date: number;
    mealId: Array<string | number>;
}