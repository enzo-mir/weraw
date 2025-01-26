import env from '#start/env'
import jwt from 'jsonwebtoken'
import { UUID } from 'node:crypto'
export type PayloadType = {
  groupe: UUID
  iat: number
  exp: number
}
export const jwtMaker = async (groupe: UUID, date?: Date) => {
  return new Promise<string | Error>((resolve, reject) => {
    jwt.sign(
      { groupe, date },
      env.get('JWT_SECRET'),
      {
        expiresIn: date ? Math.floor(date.getTime() / 1000) : '7d',
      },
      function (err, token) {
        if (err) {
          reject('Une errreur est survenue')
        } else if (token) {
          resolve(token)
        }
      }
    )
  })
}

export const jwtVerifier = (jwtToken: string) => {
  const promise = new Promise<jwt.VerifyErrors | PayloadType>((resolve, reject) =>
    jwt.verify(jwtToken, env.get('JWT_SECRET'), function (err, decoded) {
      if (err) {
        return reject(err)
      } else {
        return resolve(decoded as PayloadType)
      }
    })
  )

  return promise.then((data) => data.groupe)
}
