import prisma from '../../prisma/client.js'

export async function getAnnouncements(req, res) {
  const { search, sort, page = '1' } = req.query
  const pageNum = Math.max(1, Number(page))
  const perPage = 10
  const skip = (pageNum - 1) * perPage

  const where = {}
  if (search && search.trim()) {
    where.title = {
      contains: search.trim(),
    }
  }

  const orderBy = { createdAt: sort === 'oldest' ? 'asc' : 'desc' }

  const [data, total] = await Promise.all([
    prisma.announcement.findMany({ where, orderBy, skip, take: perPage }),
    prisma.announcement.count({ where }),
  ])

  const totalPages = Math.ceil(total / perPage)

  res.json({
    data,
    pagination: {
      total,
      page: pageNum,
      totalPages,
      perPage,
    },
  })
}

export async function getAnnouncementById(req, res) {
  const id = Number(req.params.id)

  const announcement = await prisma.announcement.findUniqueOrThrow({
    where: { id },
  })

  res.json(announcement)
}

export async function createAnnouncement(req, res) {
  const announcement = await prisma.announcement.create({
    data: req.body,
  })

  res.status(201).json(announcement)
}

export async function updateAnnouncement(req, res) {
  const id = Number(req.params.id)

  const announcement = await prisma.announcement.update({
    where: { id },
    data: req.body,
  })

  res.json(announcement)
}

export async function deleteAnnouncement(req, res) {
  const id = Number(req.params.id)

  await prisma.announcement.delete({ where: { id } })

  res.status(204).end()
}
