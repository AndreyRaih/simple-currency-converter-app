import type { RatesDataTableItem } from '@/typings'
import type { SelectOption } from 'naive-ui'

export function useFormatter () {
  const formatSymbolsToOptions = (symbols: { key: string, value: string }[]) => Array.isArray(symbols) ? symbols.map<SelectOption>(({ key, value }) => ({ label: value, value: key })) : []
  const formatRatesToTableData = (rates: { key: string, value: string }[]) => Array.isArray(rates) ? rates.map<RatesDataTableItem>(({ key, value }) => ({ currency: key, amount: value })) : []

  return {
    formatSymbolsToOptions,
    formatRatesToTableData
  }
}
