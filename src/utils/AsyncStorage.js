import AsyncStorage from '@react-native-community/async-storage'

export const getSavedStorage = () => {
  return AsyncStorage.getItem('books').then((req) => JSON.parse(req))
}
export const setSavedStorage = (books) => {
  return AsyncStorage.setItem('books', JSON.stringify(books))
}

export const AddBookToStorage = (book) => {
  return AsyncStorage.getItem('books')
    .then((req) => JSON.parse(req))
    .then((json) => {
      let books
      json != null ? (books = json) : (books = [])
      if (!books.some((item) => item.isbn13 === book.isbn13)) {
        books.push(book)
        setSavedStorage(books)
      } else throw new Error('Book is already saved')
    })
}
export const RemoveBookFromStorage = (isbn13) => {
  return AsyncStorage.getItem('books')
    .then((req) => JSON.parse(req))
    .then((json) => {
      const books = json
      setSavedStorage(books.filter((item) => item.isbn13 !== isbn13))
      console.log(books.filter((item) => item.isbn13 !== isbn13))
    })
    .catch((error) => console.log(error))
}
