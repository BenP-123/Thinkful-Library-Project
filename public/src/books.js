function findAuthorById(authors, id) {
  foundAuthor = {};
  if(authors && id){
    foundAuthor = authors.find((author) => author.id == id);
  }
  return foundAuthor;
}

function findBookById(books, id) {
  foundBook = {};
  if(books && id){
    foundBook = books.find((book) => book.id == id);
  }
  return foundBook;
}

function partitionBooksByBorrowedStatus(books) {
  let allBooks = [[],[]];
  if(books){
    for(let book in books){
      const curBook = books[book];
      if(!curBook.borrows[0].returned){
        allBooks[0].push(curBook);
      }
      else{
        allBooks[1].push(curBook);
      }
    }
  }
  return allBooks;
}

function addReturnedToAccount(account, returned) {
  let finishedAccount = {...account, "returned" : returned};
  return finishedAccount;
}

function getBorrowersForBook(book, accounts) {
  let borrowers = [];
  if(book && accounts){
    for(let borrow in book.borrows){
      const curBorrow = book.borrows[borrow];
      borrowers.push(addReturnedToAccount(accounts.find((account) => curBorrow.id == account.id), curBorrow.returned));
    }
  }
  return borrowers.slice(0,10);
}

module.exports = {
  findAuthorById,
  findBookById,
  partitionBooksByBorrowedStatus,
  getBorrowersForBook,
};
