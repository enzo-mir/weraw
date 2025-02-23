import Photo from '#models/photo'
import { Session } from '@adonisjs/session'
import { UUID } from 'node:crypto'

export const getAdminImages = async (groupe: UUID, customer_id: string) =>
  await Photo.query()
    .select(
      'photos.url',
      'photos.id',
      'photo_actions_customers.like',
      'photo_actions_customers.comment'
    )
    .leftJoin('photo_actions_customers', (q) => {
      q.on('photos.id', 'photo_actions_customers.photo_id').andOnVal(
        'photo_actions_customers.customer_id',
        customer_id
      )
    })
    .where('photos.groupe', groupe)
    .pojo()

export const getClientImages = async (
  params: { groupe: string },
  session: Session,
  qs: 'all' | 'liked' | 'comment' | null
) => {
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
    .pojo()
    .if(qs === 'liked', (q) => {
      q.where('photo_actions_customers.like', true)
    })
    .if(qs === 'comment', (q) => {
      q.whereNotNull('photo_actions_customers.comment')
    })
}
