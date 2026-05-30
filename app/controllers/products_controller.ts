import Product from '#models/product'
import type { HttpContext } from '@adonisjs/core/http'

export default class ProductsController {

  // GET ALL PRODUCTS
  async index() {

    const products = await Product.all()

    return products

  }

  // GET SINGLE PRODUCT
  async show({ params }: HttpContext) {

    const product = await Product.findOrFail(
      params.id
    )

    return product

  }

  // CREATE PRODUCT
  async store({ request, response }: HttpContext) {

    const data = request.only([
      'name',
      'category',
      'stock',
      'status',
      'image',
      'description',
    ])

    const product = await Product.create(data)

    return response.status(201).json({
      message: 'Product created successfully',
      product,
    })

  }

  // UPDATE PRODUCT
  async update({ params, request, response }: HttpContext) {

    const product = await Product.findOrFail(params.id)

    const data = request.only([
      'name',
      'category',
      'stock',
      'status',
      'image',
      'description',
    ])

    product.merge(data)

    await product.save()

    return response.json({
      message: 'Product updated successfully',
      product,
    })

  }

  // DELETE PRODUCT
  async destroy({ params, response }: HttpContext) {

    const product = await Product.findOrFail(params.id)

    await product.delete()

    return response.json({
      message: 'Product deleted successfully',
    })

  }

}