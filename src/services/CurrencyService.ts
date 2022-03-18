import { ConverterData } from '@/typings'

export default class CurrencyService {
  apiKey: string;

  constructor () {
    this.apiKey = ''
  }

  convert (conversionQuery: ConverterData) {
    return Promise.resolve({
      date: '2021-03-15',
      info: {
        rate: 0.837805,
        timestamp: 1615786266
      },
      query: {
        amount: 750,
        from: 'USD',
        to: 'EUR'
      },
      result: 628.35375,
      success: true
    })
  }

  getSymbols () {
    return Promise.resolve({
      symbols: {
        USD: 'United States Dollar',
        EUR: 'Euro',
        AED: 'United Arab Emirates Dirham',
        AFN: 'Afghan Afghani',
        ALL: 'Albanian Lek',
        AMD: 'Armenian Dram'
      }
    })
  }

  getRecentExchangeRatesByCurrency (currency: string) {
    return Promise.resolve({
      base: 'USD',
      date: '2021-03-02',
      rates: {
        EUR: 0.831885,
        GBP: 0.720615
      },
      success: true,
      timestamp: 1614664926
    })
  }
}
