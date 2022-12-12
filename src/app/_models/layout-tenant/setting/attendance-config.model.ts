export interface AttendanceConfig {
    timeAlowUpdateAttendance: number;
    data: DataAttendanceConfig[];
}

export interface DataAttendanceConfig {
    code: string | number;
    isDefault: number;
    isActive: number;
}

export interface DataAttendanceDeviceConfig {
    from: string;
    to: string;
    typeAttendance: number;
    typeStatus: number;
}