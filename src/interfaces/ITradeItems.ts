export interface ITradeItems extends Array<ITradeItem>{

}

export interface ITradeItem {
    appid: number;
    contextid: number;
    assetid: number;
    amount: number;
}