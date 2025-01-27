import env from '#start/env'
import jwt from 'jsonwebtoken'
import { UUID } from 'node:crypto'
export type PayloadType = {
  groupe: UUID
  iat: number
  exp: number
}
export const jwtMaker = async (groupe: UUID, date?: Date | string) => {
  const payload: Record<string, any> = { groupe }
  return new Promise<string | Error>((resolve, reject) => {
    if (!date) {
      const currentDate = new Date()
      const nextWeek = new Date(currentDate)
      nextWeek.setDate(currentDate.getDate() + 7)

      date = nextWeek.toISOString()
    }
    const expirationTimestamp = Math.floor(new Date(date).getTime() / 1000)

    if (Number.isNaN(expirationTimestamp)) {
      return reject(new Error('Invalid expiration date provided'))
    }

    payload.exp = expirationTimestamp
    jwt.sign(payload, env.get('JWT_SECRET'), function (err, token) {
      if (err) {
        console.log(err)

        reject('Une errreur est survenue')
      } else if (token) {
        resolve(token)
      }
    })
  })
}

export const jwtVerifier = async (jwtToken: string) => {
  const promise = new Promise<jwt.VerifyErrors | PayloadType>((resolve, reject) =>
    jwt.verify(jwtToken, env.get('JWT_SECRET'), function (err, decoded) {
      if (err) {
        reject(err)
      } else {
        resolve(decoded as PayloadType)
      }
    })
  )

  return promise.then((d) => {
    if ('groupe' in d) {
      return {
        groupe: d.groupe,
        iat: d.iat,
        exp: d.exp,
      }
    } else {
      throw new Error('Invalid token')
    }
  })
}
