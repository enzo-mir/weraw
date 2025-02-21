import Photo from '#models/photo'
import db from '@adonisjs/lucid/services/db'
import { Session } from '@adonisjs/session'

export const getAdminImages = async (params: { id: string }) =>
  await db
    .from('photos')
    .as('photos')
    .join('galeries', (q) => {
      q.on('photos.groupe', 'galeries.groupe')
    })
    .where('galeries.id', params.id)
    .select('photos.url')
    .select('photos.id')
    .orderBy('photos.id', 'asc')

export const getClientImages = async (params: { groupe: string }, session: Session) => {
  return await Photo.query()
    .select(
      'photos.url',
      'photos.id',
      'photo_actions_customers.like',
      'photo_actions_customers.comment'
    )
    .leftJoin('photo_actions_customers', (q) => {
      q.on('photos.id', 'photo_actions_customers.photo_id').andOnVal(
        'photo_actions_customers.customer_id',
        session.get('session_guest').id
      )
    })
    .where('photos.groupe', params.groupe)
    .pojo() // Group by photo ID to avoid duplicates
}
