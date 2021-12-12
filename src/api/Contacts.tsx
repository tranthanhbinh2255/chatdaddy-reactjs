import axios from 'axios'
import { getAuthHeader } from './Auth'

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

interface Tag {
  name: string,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  filters: any
}

interface Contact {
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

export async function getContact(): Promise<ContactList> {
  const resp:ContactList = {
    totalCount: 0,
    contacts: [],
    nextPage: null
  }

  const header = await getAuthHeader()

  const { data } = await axios.get<ContactList>(
    'https://api-im.chatdaddy.tech/contacts',
    header
  )
  
  return data || resp
}
