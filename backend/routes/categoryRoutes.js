import express from 'express'
import {
  createCategory,
  deleteCategory,
  getAllCategories,
  getCategoryById,
  updateCategory,
} from '../controllers/categoryController.js'
import { admin, protect } from '../middleware/authMiddleware.js'
const router = express.Router()

router.route('/').get(getAllCategories).post(protect, admin, createCategory)
router
  .route('/:id')
  .get(getCategoryById)
  .put(protect, admin, updateCategory)
  .delete(protect, admin, deleteCategory)

export default router
