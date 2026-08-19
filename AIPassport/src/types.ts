export interface Auth {
    username: string
    password: string
}

export interface MessageState {
  message: string
  editMessage: string
}

export interface EventState {
  event: Event | null
}
