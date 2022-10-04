const CURRENT_MONTH = new Date().getMonth() + 1

const DBTables = {
  MEMBER_LIST: "DGmembers",
  USAGE_LIST: "card_usage_statement",
  USE_DATA: `DGcard_use_data_22${("00" + CURRENT_MONTH.toString()).slice(-2)}`,
}

export default DBTables
