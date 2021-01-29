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

export const showProfile = (id, user, profile) => {
  return axios({
    url: apiUrl + '/profiles/' + id,
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${user.token}`
    },
    data: { profile }
  })
}

export const updateProfile = (profile, user) => {
  return axios({
    url: apiUrl + '/profile',
    method: 'PATCH',
    headers: {
      'Authorization': `Bearer ${user.token}`
    },
    data: { profile }
  })
}
