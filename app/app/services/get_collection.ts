import env from '#start/env'
import { v2 as cloudinary } from 'cloudinary'
import metadataCollection from '../static/collection.data.json' with { type: 'json' }

cloudinary.config({
  cloud_name: env.get('API_NAME_CLOUDINARY'),
  api_key: env.get('API_KEY_CLOUDINARY'),
  api_secret: env.get('API_KEY_SECRET_CLOUDINARY'),
  secure: true,
})

export default async () => {
  const { resources } = await cloudinary.api.resources({
    type: 'upload',
    prefix: 'weraw/',
    max_results: 500,
  })

  const array = metadataCollection.map(() => [])

  resources.map((resource) => {
    metadataCollection.forEach((metadata, index) => {
      if (metadata.folder === resource.folder) {
        array[index].push({ ...resource, metadata })
      }
    })
  })

  return array
}
