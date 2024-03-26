import axios from 'https://cdn.jsdelivr.net/npm/axios@1.4.0/+esm'

export const intanceEmail = axios.create({
  baseURL: 'https://napi.dev-limprod.com/',
  // baseURL: "http://localhost:3200/"
})

export const instanceLead = axios.create({
  baseURL: "https://claromarketingtool.pe/save-form/",
})