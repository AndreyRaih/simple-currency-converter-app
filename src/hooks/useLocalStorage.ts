export function useLocalStorage () {
  function setData (key: string, data: string | number | boolean | object): void {
    localStorage.setItem(key, (typeof data === 'object' ? JSON.stringify(data) : data.toString()))
  }

  function getData (key: string) {
    const restoredData = localStorage.getItem(key)
    return restoredData ? JSON.parse(restoredData) : null
  }

  return {
    setData,
    getData
  }
}
