import Category from '#models/category'
import type { HttpContext } from '@adonisjs/core/http'

export default class CategoriesController {

  // GET ALL CATEGORIES
  async index({}: HttpContext) {

    return await Category.all()

  }

  // ADD CATEGORY
  async store({ request }: HttpContext) {

    const data = request.only([
      'name',
    ])

    return await Category.create(data)

  }

  // DELETE CATEGORY
  async destroy({ params }: HttpContext) {

    const category = await Category.findOrFail(
      params.id
    )

    await category.delete()

    return {
      message: 'Category deleted',
    }

  }

}