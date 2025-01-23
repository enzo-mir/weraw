import db from '@adonisjs/lucid/services/db'

export const getImages = async (params: { id: string }) =>
  await db
    .from('photos')
    .as('photos')
    .join('urls', (q) => {
      q.on('photos.groupe', 'urls.groupe')
    })
    .where('urls.id', params.id)
    .select('photos.url')
    .select('photos.like')
    .select('photos.comment')
    .select('photos.id')
