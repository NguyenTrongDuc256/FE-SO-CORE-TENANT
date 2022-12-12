export interface DailyComment {
    sendNotificationStatus: number;
    sendNotificationAt: number;
    students: DataDailyCommentStudent[];
}

export interface DataDailyCommentStudent {
    id: string;
    avatar: string;
    name: string;
    code: string;
    gender: number;
    comment: string;
    feedbackNumber: number;
    statusNotification?: string | number;
    fileAttach: string;
}