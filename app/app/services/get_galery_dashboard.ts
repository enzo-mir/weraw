import Photo from '#models/photo'
import Url from '#models/url'

export const groupedGaleriesByName = async () => {
  const galeries = await Url.query()
    .select('id', 'name', 'created_at', 'done', 'end_selected', 'groupe')
    .orderBy('id')

  const updatedGaleries = await Promise.all(
    galeries.map(async (galery) => {
      const photos = await Photo.query().select('url').where('groupe', galery.groupe).limit(3)
      const photoUrls = photos.map((photo) => photo.url)
      return {
        id: galery.id,
        name: galery.name,
        created_at: galery.createdAt,
        done: galery.done,
        end_selected: galery.endSelected,
        url: photoUrls,
      }
    })
  )

  return updatedGaleries
}
