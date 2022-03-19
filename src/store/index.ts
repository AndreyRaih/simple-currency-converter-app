import CurrencyService from '@/services/CurrencyService'
import { ConversionQuery, ConversionResult } from '@/typings'
import { createStore } from 'vuex'
const CurrencyServiceInstance = new CurrencyService()

export interface CurrencyState {
  symbols: { [key: string]: string };
  conversionQuery: ConversionQuery;
  conversionResult: ConversionResult | null;
  rates: { [key: string]: number }
}

export default createStore<CurrencyState>({
  state: {
    symbols: {},
    conversionQuery: {
      from: 'AED',
      to: 'AFN',
      amount: 5
    },
    conversionResult: null,
    rates: {}
  },
  getters: {
    baseCurrency: (state) => state.conversionQuery.from,
    symbolsList: (state) => Object.entries(state.symbols).map(([key, value]) => ({ key, value })),
    ratesList: (state) => Object.entries(state.rates).map(([key, value]) => ({ key, value }))
  },
  mutations: {
    SET_SYMBOLS (state, symbols: { [key: string]: string }): void {
      state.symbols = symbols
    },
    CHANGE_CONVERSION_FROM (state, value: string): void {
      state.conversionQuery.from = value
    },
    SET_CONVERSION_QUERY (state, queryObj: ConversionQuery): void {
      state.conversionQuery = queryObj
    },
    SET_CONVERSION_RESULT (state, result: ConversionResult | null): void {
      state.conversionResult = result
    },
    SET_RATES (state, rates: { [key: string]: number }): void {
      state.rates = rates
    }
  },
  actions: {
    getSymbols ({ commit }) {
      return CurrencyServiceInstance.getSymbols().then(({ symbols }) => commit('SET_SYMBOLS', symbols))
    },
    getRatesByCurrency ({ commit }, currency) {
      return CurrencyServiceInstance.getRecentExchangeRatesByCurrency(currency).then(({ rates }) => commit('SET_RATES', rates))
    },
    convertByConversionQuery ({ commit, state }, converterFormData) {
      commit('SET_CONVERSION_QUERY', converterFormData)
      return CurrencyServiceInstance.convert(state.conversionQuery).then(conversion => commit('SET_CONVERSION_RESULT', {
        baseAmount: conversion.query.amount.toString(),
        baseCurrencyCode: conversion.query.from,
        baseCurrency: state.symbols[conversion.query.from],
        targetAmount: conversion.result.toString(),
        targetCurrencyCode: conversion.query.to,
        targetCurrency: state.symbols[conversion.query.to],
        rate: conversion.info.rate,
        updatedOn: new Date(conversion.info.timestamp).toLocaleDateString('en-US', {
          weekday: 'long',
          year: 'numeric',
          month: 'long',
          day: 'numeric',
          timeZone: 'UTC',
          timeZoneName: 'short'
        })
      } as ConversionResult))
    }
  }
})
