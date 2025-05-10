import express from 'express'
import { BooksController } from './books.controler'
const router = express.Router()
router.post('/create-books',BooksController.CreateBook)

export const BooksRoute = router