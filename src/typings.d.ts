import { AxiosInstance } from 'axios'
import { MessageApiInjection } from 'naive-ui/lib/message/src/MessageProvider'

export type RatesDataTableItem = {
  currency: string;
  amount: string | number;
}

export type NavigationMenuOption = {
  name: string,
  label: string
}
export type ConversionQuery = {
  from: string;
  to: string;
  amount: number;
}

export type ConversionResult = {
  baseAmount: string;
  targetAmount: string;
  baseCurrency: string;
  targetCurrency: string;
  baseCurrencyCode: string;
  targetCurrencyCode: string;
  rate: number;
  updatedOn: string;
}

export declare namespace CurrencyApi {
  interface IServiceInstance {
    axiosInstance: AxiosInstance;
    convert: (conversionQuery: CurrencyApi.Request.ConvertQueryParam) => Promise<CurrencyApi.Response.Conversion>;
    getSymbols: () => Promise<CurrencyApi.Response.Symbols>;
    getRecentExchangeRatesByCurrency: (currencyCode: string) => Promise<CurrencyApi.Response.Rates>;
  }

  namespace Request {
    type ConvertQueryParam = ConversionQuery

    type RatesQueryParam = {
      from: string;
      to: string;
    }
  }

  namespace Response {
    type Symbols = {
      symbols: { [key: string]: string }
    }

    type Conversion = {
      date: string,
      info: {
        rate: number,
        timestamp: number
      },
      query: {
        amount: number,
        from: string,
        to: string
      },
      result: number,
      success: boolean
    }

    type Rates = {
      base: string;
      date: string;
      rates: { [key: string]: number };
      success: boolean;
      timestamp: number;
    }
  }
}

export type WindowWithMessage = Window & globalThis & {
  $message: MessageApiInjection
}
