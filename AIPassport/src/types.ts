export interface Auth {
    username: string
    password: string
}

export interface MessageState {
  message: string
  messageEdit: string
}

export interface User {
  "users_ID": number,
  "username": string,
  "password": string,
  "fName": string,
  "lName": string,
  "role": string,
  "province": string,
  "profileImg": string,
  "isActivate": boolean,
  "level_ID": number
}