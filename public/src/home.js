function getTotalBooksCount(books) {
  if(books){
    return books.length;
  }
  return 0;
}

function getTotalAccountsCount(accounts) {
  if(accounts){
    return accounts.length;
  }
  return 0;
}

function getBooksBorrowedCount(books) {
  return count = books.reduce((borrowedCount, book) => {
    if(!book.borrows[0].returned){
      borrowedCount += 1;
    }
    return borrowedCount;
  },0);
}

function getMostCommonGenres(books) {
  let genres = [];
  let addedGenres = [];
  if(books){
    const bookGenres = books.map((book) => book.genre);
  for(let i = 0; i < bookGenres.length; i++){
    curGenre = bookGenres[i];
    if(!addedGenres.includes(curGenre)){
      genres.push({"name": curGenre, "count": 1});
      addedGenres.push(curGenre);
    }
    else{
      for(let i = 0; i < genres.length; i++){
        if(genres[i].name == curGenre){
          genres[i].count += 1;
        }
      }
    }
  }
  genres.sort((genreA, genreB) => genreB.count - genreA.count);
  return genres.slice(0,5);
  }
  return genres;
}

function getMostPopularBooks(books) {
  let popular = [];
  if(books){
    for(let book in books){
      const curBook = books[book];
      if(curBook.borrows){
        popular.push({"name": curBook.title, "count": curBook.borrows.length});
      }
    }
    popular.sort((bookA, bookB) => bookB.count - bookA.count);
    return popular.slice(0,5);
  }
  return popular;
}

function getMostPopularAuthors(books, authors) {
  let popular = [];
  let addedAuthId = [];
  if(books && authors){
    for(let book in books){
      const curBook = books[book];
      const author = authors.find((author) => author.id == curBook.authorId);
      const authName = author.name.first + " " + author.name.last;
      if(!addedAuthId.includes(curBook.authorId)){
        popular.push({"name": authName, "count": curBook.borrows.length});
        addedAuthId.push(author.id);
      }
      else{
        for(let i = 0; i < popular.length; i++){
          if(popular[i].name == authName){
            popular[i].count += curBook.borrows.length;
          }
        }
      }
    }
    popular.sort((authorA, authorB) => authorB.count - authorA.count);
    return popular.slice(0,5);
  }
  return popular;
}

module.exports = {
  getTotalBooksCount,
  getTotalAccountsCount,
  getBooksBorrowedCount,
  getMostCommonGenres,
  getMostPopularBooks,
  getMostPopularAuthors,
};
