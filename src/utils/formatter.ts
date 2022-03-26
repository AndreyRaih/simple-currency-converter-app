import { ConversionResult, CurrencyApi } from '@/typings'

export function mapConversionResponseToConversionResult (conversion: CurrencyApi.Response.Conversion, symbols: { [key: string]: string }): ConversionResult {
  return {
    baseAmount: conversion.query.amount.toString(),
    baseCurrencyCode: conversion.query.from,
    baseCurrency: symbols[conversion.query.from],
    targetAmount: conversion.result.toString(),
    targetCurrencyCode: conversion.query.to,
    targetCurrency: symbols[conversion.query.to],
    rate: conversion.info.rate,
    updatedOn: convertTimestampToLastUpdatedDateString(conversion.info.timestamp)
  }
}

export function convertTimestampToLastUpdatedDateString (timestamp: number): string {
  const date = new Date()
  const year = date.getFullYear()
  const month = date.getMonth()
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  const timeDiffInSeconds = Math.floor(date.getTime() / 1000) - timestamp

  return new Date(year, month, day, hour, minute, second - timeDiffInSeconds).toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    timeZone: 'UTC',
    timeZoneName: 'short'
  })
}
