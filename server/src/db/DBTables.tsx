const CURRENT_MONTH = new Date().getMonth() + 1

const DBTables = {
  MEMBER_LIST: "DGmembers",
  USAGE_LIST: "card_usage_statement",
  USE_DATA: `DGcard_use_data_220${CURRENT_MONTH}`,
}

export default DBTables
