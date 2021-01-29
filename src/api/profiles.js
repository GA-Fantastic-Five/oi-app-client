import apiUrl from '../apiConfig'
import axios from 'axios'

export const createProfile = (profile, user) => {
  return axios({
    url: apiUrl + '/profiles',
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${user.token}`
    },
    data: { profile }
  })
}

export const indexProfiles = (user) => {
  return axios({
    url: apiUrl + '/profiles',
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${user.token}`
    }
  })
}

export const showProfile = (profile, user) => {
  return axios({
    url: apiUrl + '/profiles/' + profile.nickname,
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${user.token}`
    }
  })
}

export const updateProfile = (profile, user) => {
  return axios({
    url: apiUrl + '/profile',
    method: 'PATCH',
    headers: {
      'Authorization': `Bearer ${user.token}`
    },
    data: {
      profile: {
        nickname: profile.nickname,
        avatar: profile.avatar
      }
    }
  })
}
