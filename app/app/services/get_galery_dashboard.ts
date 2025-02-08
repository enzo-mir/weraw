import Photo from '#models/photo'
import Galery from '#models/galery'

export const groupedGaleriesByName = async () => {
  const galeries = await Galery.query()
    .select('id', 'name', 'created_at', 'end_selected', 'groupe')
    .orderBy('id')

  const updatedGaleries = await Promise.all(
    galeries.map(async (galery) => {
      const photos = await Photo.query().select('url').where('groupe', galery.groupe).limit(3)
      const photoUrls = photos.map((photo) => photo.url)
      return {
        id: galery.id,
        name: galery.name,
        created_at: galery.createdAt,
        end_selected: galery.endSelected,
        url: photoUrls,
      }
    })
  )

  return updatedGaleries
}
