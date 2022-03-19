import { API_ENDPOINTS } from '@/utils/constants'
import { ConversionQuery, CurrencyApi } from '@/typings'
import axios, { AxiosInstance } from 'axios'

export default class CurrencyService implements CurrencyApi.IServiceInstance {
  axiosInstance: AxiosInstance;

  constructor () {
    this.axiosInstance = axios.create({
      baseURL: process.env.VUE_APP_API_BASE_URL,
      headers: {
        'x-rapidapi-host': process.env.VUE_APP_API_HOST,
        'x-rapidapi-key': process.env.VUE_APP_API_KEY
      }
    })
  }

  convert (conversionQuery: ConversionQuery) {
    return this.axiosInstance.get(API_ENDPOINTS.CONVERT, { params: conversionQuery }).then(({ data }) => data as CurrencyApi.Response.Conversion)
  }

  getSymbols () {
    return this.axiosInstance.get(API_ENDPOINTS.SYMBOLS).then(({ data }) => data as CurrencyApi.Response.Symbols)
  }

  getRecentExchangeRatesByCurrency (currencyCode: string) {
    return this.axiosInstance.get(API_ENDPOINTS.RATES, { params: { from: currencyCode } }).then(({ data }) => data as CurrencyApi.Response.Rates)
  }
}
