import React from 'react'
import { useSelector } from 'react-redux'

import { selectBooks } from '../store/books/selectors'

const BooksPage: React.FC = () => {
  const books = useSelector(selectBooks)

return <div>BOOKS: {books.map(({author, publisher, location}, index) => <div key={index}>{`${author} ${publisher} ${location}`}</div>)}</div>
}

export default BooksPage
