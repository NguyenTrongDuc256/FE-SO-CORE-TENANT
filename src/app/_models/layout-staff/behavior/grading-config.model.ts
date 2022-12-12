export interface GradingConfig {
    gradingBackdate: number,
    cancellingBackdate: number,
    resetTimeNumberType: number,
    warningPoint?: number | null,
    isApplyTimeNumber?: number,
    canEditIsApplyTimeNumber?: number

  }

  export interface LockGradingWeeks {
    week: number,
    startDate: number,
    endDate: number,
    isLocked: number
  }

  export interface UpdateLockGradingWeeks {
    week: number,
    isLocked: number
  }