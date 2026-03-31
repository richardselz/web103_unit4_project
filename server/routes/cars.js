import express from 'express'
import CustomItems from '../controllers/CustomItems.js'

const router = express.Router()

// define routes to get, create, edit, and delete items
router.get('/', CustomItems.getCars)
router.get('/:id', CustomItems.getCar)
router.post('/', CustomItems.createCar)
router.patch('/:id', CustomItems.editCar)
router.delete('/:id', CustomItems.deleteCar)

export default router
