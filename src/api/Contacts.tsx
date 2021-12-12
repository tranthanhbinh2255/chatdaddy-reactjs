import axios from 'axios'
import { getAccessToken } from './Auth'

interface ContactList {
  contacts: Contact[],
  nextPage: string | null,
}

interface Chat {
  accountId: string,
  id: string,
  lastMessage: Date
}

interface Tag {
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

interface IGetContactParams {
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
  const accessToken = await getAccessToken()
  const { data } = await axios.get<ContactList>(
    'https://api-im.chatdaddy.tech/contacts',
    {
      params: params,
      headers: {
        'Authorization': `Bearer ${accessToken}`
      }
    }
  )
  
  return data || {
    contacts: [],
    nextPage: null
  }
}
