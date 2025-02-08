import Photo from '#models/photo'
import db from '@adonisjs/lucid/services/db'

export const getAdminImages = async (params: { id: string }) =>
  await db
    .from('photos')
    .as('photos')
    .join('galeries', (q) => {
      q.on('photos.groupe', 'galeries.groupe')
    })
    .where('galeries.id', params.id)
    .select('photos.url')
    .select('photos.like')
    .select('photos.comment')
    .select('photos.id')

export const getClientImages = async (params: { groupe: string }) =>
  await Photo.query().where('groupe', params.groupe).select('url', 'like', 'comment', 'id')
