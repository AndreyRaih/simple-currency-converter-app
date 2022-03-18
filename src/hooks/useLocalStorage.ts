export function useLocalStorage () {
  function setData (key: string, data: any): void {
    let storedData = data
    if (typeof data === 'object') {
      storedData = JSON.stringify(data)
    }
    localStorage.setItem(key, storedData)
  }

  function getData (key: string): any {
    const restoredData = localStorage.getItem(key)
    return restoredData ? JSON.parse(restoredData) : null
  }

  return {
    setData,
    getData
  }
}
