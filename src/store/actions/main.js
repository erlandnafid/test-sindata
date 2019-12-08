import { DATA_SOURCE, DATA_SOURCE_TMP } from './actionTypes'

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