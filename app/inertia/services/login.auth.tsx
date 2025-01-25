import { FormValues } from '../utils/types/login.type'

export default function fetchLog(datas: FormValues) {
  return fetch('/auth/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'accept': 'application/json',
    },
    body: JSON.stringify(datas),
  })
}
