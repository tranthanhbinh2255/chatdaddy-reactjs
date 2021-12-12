import axios from 'axios'

interface TokenData {
  access_token: 'string'
}

export async function getAccessToken(): Promise<string> {  
  const oldAccessToken = window.sessionStorage.getItem('accessToken')
  if (oldAccessToken) {
    return oldAccessToken
  }

  try {
    const { data } = await axios.post<TokenData>(
      'https://api-teams.chatdaddy.tech/token',
      {
        'refreshToken': '059c420e-7424-431f-b23b-af0ecabfe7b8',
        'teamId': 'a001994b-918b-4939-8518-3377732e4e88'
      }
    )
    if (data.access_token) {
      sessionStorage.setItem('accessToken', data.access_token)
      return data.access_token
    } else {
      console.log('Error: no accessToken in resp body')
    }
  } catch (error) {
    console.log('API Error:', JSON.stringify(error))
  }
  return ''
}
