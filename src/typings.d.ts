export type RatesDataTableItem = {
    currency: string;
    amount: string | number;
}

export type NavigationMenuOption = {
    name: string,
    label: string
}
export type ConverterData = {
    from: string;
    to: string;
    amount: number | undefined;
}

export type ConverterResultData = {
    selectedAmount: string;
    convertedAmount: string;
    selectedCurrencyFullName: string;
    convertedCurrencyFullName: string;
    convertedCurrencyCode: string;
    selectedCurrencyCode: string;
    rate: number;
    lastUpdateDate: string;
}
