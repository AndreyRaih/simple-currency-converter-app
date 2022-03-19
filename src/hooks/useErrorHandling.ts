import { GENERIC_ERROR_TEXT } from '@/utils/constants'
import { AxiosError } from 'axios'
import { useMessage } from 'naive-ui'

export function useErrorHandling () {
  const message = useMessage()

  function handleErrorWithMessage (error: AxiosError) {
    console.error(error)
    message.error(GENERIC_ERROR_TEXT)
  }

  return {
    handleErrorWithMessage
  }
}
