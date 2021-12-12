import axios from 'axios'
import { getAccessToken } from './Auth'
import * as qs from 'qs'

interface ContactList {
  totalCount: number,
  contacts: Contact[],
  nextPage: string | null,
}

interface Chat {
  accountId: string,
  id: string,
  lastMessage: Date
}

export interface Tag {
  name: string,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  filters: any
}

export interface Contact {
  id: number,
  type: 'individual' | 'group' | 'broadcast',
  name: string,
  platformNames: string[],
  createdAt?: Date,
  updatedAt?: Date,
  phoneNumber: string,
  email?: string,
  img: {
    url: string,
    fetchedAt: Date
  },
  tags: Tag[],
  assignee?: string,
  assigner?: string,
  messagesSent: number,
  messagesReceived: number,
  chats: Chat[],
}

export interface IGetContactParams {
  q?: string | null,
  page?: string | null,

  tags?: [string],
  notTags?: [string],

  minMessagesRecv?: number,
  maxMessagesRecv?: number,
  
  minMessagesSent?: number,
  maxMessagesSent?: number,
}

export async function getContacts(params?: IGetContactParams): Promise<ContactList> {  
  let accessToken = await getAccessToken()
  const resp:ContactList = {
    totalCount: 0,
    contacts: [],
    nextPage: null
  }

  let retry = 1
  while (retry > 0) {
    retry = 0
    try {
      const { data } = await axios.get<ContactList>(
        'https://api-im.chatdaddy.tech/contacts',
        {
          params: {
            ...params,
            returnTotalCount: true
          },
          paramsSerializer: params => {
            return qs.stringify(params, {arrayFormat: 'repeat'})
          },
          headers: {
            'Authorization': `Bearer ${accessToken}`
          }
        }
      )
      return data
    } catch (err) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const errData = (err as any).response?.data
      if (errData && errData.statusCode === 500) {
        console.log('Error:', errData.error)
        // refresh accessToken and retry
        if (errData.error === 'jwt expired') {
          console.log('Get New AccessToken')
          accessToken = await getAccessToken(true)
          retry = 1
        }
      } 
    }
  }

  return resp
}
