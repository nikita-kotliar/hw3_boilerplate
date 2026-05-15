import { Router } from 'express'
import {
  getAnnouncements,
  getAnnouncementById,
  createAnnouncement,
  updateAnnouncement,
  deleteAnnouncement,
} from '../controllers/announcements.controller.js'
import {
  getListValidator,
  getByIdValidator,
  createValidator,
  updateValidator,
  deleteValidator,
} from '../validators/announcements.validators.js'

const router = Router()

/**
 * @swagger
 * /announcements:
 *   get:
 *     summary: Отримати список оголошень
 *     parameters:
 *       - in: query
 *         name: search
 *         schema:
 *           type: string
 *         description: Пошук по назві (нечутливий до регістру)
 *       - in: query
 *         name: sort
 *         schema:
 *           type: string
 *           enum: [newest, oldest]
 *         description: Порядок сортування
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *         description: Номер сторінки
 *     responses:
 *       200:
 *         description: Список оголошень з пагінацією
 *       400:
 *         description: Помилка валідації query-параметрів
 */
router.get('/', getListValidator, getAnnouncements)

/**
 * @swagger
 * /announcements/{id}:
 *   get:
 *     summary: Отримати одне оголошення за ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Оголошення знайдено
 *       404:
 *         description: Оголошення не знайдено
 */
router.get('/:id', getByIdValidator, getAnnouncementById)

/**
 * @swagger
 * /announcements:
 *   post:
 *     summary: Створити нове оголошення
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [title, description, price, category, contactInfo]
 *             properties:
 *               title:
 *                 type: string
 *                 minLength: 5
 *                 maxLength: 100
 *               description:
 *                 type: string
 *                 minLength: 10
 *               price:
 *                 type: number
 *                 minimum: 0.01
 *               category:
 *                 type: string
 *                 enum: [sale, service, job, other]
 *               contactInfo:
 *                 type: string
 *                 minLength: 5
 *     responses:
 *       201:
 *         description: Оголошення створено
 *       400:
 *         description: Помилка валідації
 */
router.post('/', createValidator, createAnnouncement)

/**
 * @swagger
 * /announcements/{id}:
 *   patch:
 *     summary: Частково оновити оголошення
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             minProperties: 1
 *             properties:
 *               title:
 *                 type: string
 *                 minLength: 5
 *                 maxLength: 100
 *               description:
 *                 type: string
 *                 minLength: 10
 *               price:
 *                 type: number
 *                 minimum: 0.01
 *               category:
 *                 type: string
 *                 enum: [sale, service, job, other]
 *               contactInfo:
 *                 type: string
 *                 minLength: 5
 *     responses:
 *       200:
 *         description: Оголошення оновлено
 *       400:
 *         description: Помилка валідації
 *       404:
 *         description: Оголошення не знайдено
 */
router.patch('/:id', updateValidator, updateAnnouncement)

/**
 * @swagger
 * /announcements/{id}:
 *   delete:
 *     summary: Видалити оголошення
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       204:
 *         description: Оголошення видалено
 *       404:
 *         description: Оголошення не знайдено
 */
router.delete('/:id', deleteValidator, deleteAnnouncement)

export default router
