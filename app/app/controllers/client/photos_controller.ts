import { HttpContext } from '@adonisjs/core/http'
import cloudinary from '../../services/get_collection.js'

export default class PhotosController {
  async index({ inertia }: HttpContext) {
    const collection = await cloudinary()

    return inertia.render('client/projects', { collection })
  }
}
