import { DATA_SOURCE, DATA_SOURCE_TMP, KEYWORD } from './actionTypes'

export const dataSource = (item) => {
    return {
        type: DATA_SOURCE,
        dataSource: item
    }
}

export const dataSourceTmp = (item) => {
    return {
        type: DATA_SOURCE_TMP,
        dataSourceTmp: item
    }
}

export const keyword = (item) => {
    return {
        type: KEYWORD,
        keyword: item
    }
}