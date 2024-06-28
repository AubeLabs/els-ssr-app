// src/types/index.ts
export interface TimetableEntry {
    ALL_TI_YMD: Date
    SCHUL_NM: string
    GRADE: string
    CLASS_NM: string
    PERIO: string
    ITRT_CNTNT: string
}

export interface MealServiceEntry {
    SCHUL_NM: string
    MLSV_YMD: Date
    MLSV_FGR: number
    MMEAL_SC_NM: string
    DDISH_NM: string
    ORPLC_INFO: string
    CAL_INFO: string
    NTR_INFO: string
}
