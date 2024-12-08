const booksInfoPreparation = (data) => {
  if (data) {
    const mappedBooks = data.docs.map((book) => {
      return {
       author: book.author_name || "",
       publish_year: book.first_publish_year || "",
       first_sentence: book.first_sentence || "",
       rating:book.ratings_average ? Math.round(book.ratings_average * 10)/10 : "",
       title: book.title || "",
     }
    } )
 
    const preparedBooks = {
     total: data.numFound,
     books: mappedBooks
    }
 
    return preparedBooks 
  }
}

export default booksInfoPreparation