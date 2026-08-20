import type { MessageState } from '@/types'
import { defineStore } from 'pinia'
export const useMessageStore = defineStore('message', {
  state: (): MessageState => ({
    message: '',
    messageEdit: '',
  }),
  actions: {
    updateMessage(message: string): void {
      this.message = message
    },
    resetMessage(): void {
      this.message = ''
    },
    updateMessageEdit(message: string): void {
      this.messageEdit = message
    },
    resetMessageEdit(): void {
      this.messageEdit = ''
    },
  },
})
