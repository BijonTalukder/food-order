import { IBooks } from "./books.interface"
import { BooksModel } from "./books.model"

const createBook = async (payload:IBooks) =>{
    const result = BooksModel.create(payload)
    return result

}

export const BookService = {
    createBook
}