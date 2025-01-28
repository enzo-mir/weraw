import { UUID } from 'crypto'

export const likeImage = async (group: UUID, id: number, _csrf: string) => {
  return await fetch(`/like/${group}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'accept': 'application/json',
    },
    body: JSON.stringify({ id, _csrf }),
  })
}
