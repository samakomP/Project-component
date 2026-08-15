import type { MessageState } from '@/types'
import { defineStore } from 'pinia'
export const useMessageStore = defineStore('message', {
  state: (): MessageState => ({
    message: '',
    editMessage: '',
  }),
  actions: {
    updateMessage(message: string): void {
      this.message = message
    },
    resetMessage(): void {
      this.message = ''
    },
  },
})
