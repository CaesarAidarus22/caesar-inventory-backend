import Report from '#models/report'
import type { HttpContext } from '@adonisjs/core/http'

export default class ReportsController {

  // GET ALL REPORTS
  async index() {

    const reports = await Report.all()

    return reports

  }

  // CREATE REPORT
  async store({ request, response }: HttpContext) {

    const data = request.only([
      'petugas',
      'productName',
      'reportType',
      'priority',
      'description',
    ])

    const report = await Report.create({
      ...data,
      status: 'Pending',
    })

    return response.status(201).json({
      message: 'Report created successfully',
      report,
    })

  }

  // UPDATE STATUS
  async update({ params, request, response }: HttpContext) {

    const report = await Report.findOrFail(
      params.id
    )

    report.status = request.input(
      'status'
    )

    await report.save()

    return response.json({
      message: 'Report updated successfully',
      report,
    })

  }

  // DELETE REPORT
  async destroy({ params, response }: HttpContext) {

    const report = await Report.findOrFail(
      params.id
    )

    await report.delete()

    return response.json({
      message: 'Report deleted successfully',
    })

  }

}