import { DATA_SOURCE, DATA_SOURCE_TMP, KEYWORD } from "../actions/actionTypes";

const initialState = {
  dataSource: [
    {
      key: 1,
      name: "Adi Hastanto",
      address: "Kali Bawang",
      phone: "082242703011"
    },
    {
      key: 2,
      name: "Erland Nafid",
      address: "Wonosobo",
      phone: "082242703012"
    },
    {
      key: 3,
      name: "Widayat",
      address: "Sukoharjo",
      phone: "082242703013"
    },
    {
      key: 4,
      name: "Yunus Hayat",
      address: "Watumalang",
      phone: "082242703014"
    },
    {
      key: 5,
      name: "Nur Sofyan",
      address: "Dieng",
      phone: "082242703015"
    },
    {
      key: 6,
      name: "Ismail",
      address: "Pandansari",
      phone: "082242703016"
    },
    {
      key: 7,
      name: "Aditya Ganjar",
      address: "Andongsili",
      phone: "082242703017"
    },
    {
      key: 8,
      name: "Saeful Afgan",
      address: "Keseneng",
      phone: "082242703018"
    }
  ],
  dataSourceTmp: [],
  keyword: ""
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case DATA_SOURCE:
      return {
        ...state,
        dataSource: action.dataSource
      };

    case DATA_SOURCE_TMP:
      return {
        ...state,
        dataSourceTmp: action.dataSourceTmp
      };

    case KEYWORD:
      return {
        ...state,
        keyword: action.keyword
      };

    default:
      return state;
  }
};

export default reducer;
