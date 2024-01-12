function findAccountById(accounts, id) {
  if(accounts && id){
    return accounts.find((account) => account.id == id);
  }
  return {};
}

function sortAccountsByLastName(accounts) {
  if(accounts){
    accounts.sort(function (accountA, accountB){
      if(accountA.name.last < accountB.name.last){return -1};
      if(accountA.name.last > accountB.name.last){return 1};
      return 0;
    });
  }
  return accounts;
}

function getTotalNumberOfBorrows(account, books) {
  let total = 0;
  if(account && books){
    for(let book in books){
      const curBook = books[book];
      if(curBook.borrows){
        const filteredBorrows = curBook.borrows.filter((borrow) => borrow.id == account.id);
        total += filteredBorrows.length;
      }
    }
  }
  return total;
}

function getBooksPossessedByAccount(account, books, authors) {
  let checkedOutList = [];
  if(account && books && authors){
    const accountID = account.id;
    for(let book in books){
      const curBook = books[book];
      for(let borrow in curBook.borrows){
        const curBorrow = curBook.borrows[borrow];
       if(curBorrow.id == accountID && !curBorrow.returned){
          let author = authors.find((author) => author.id == curBook.authorId);
          let bookAndAuthor = {...curBook, author};
         checkedOutList.push(bookAndAuthor);
        }
      }
    }
  }
  return checkedOutList;
}

module.exports = {
  findAccountById,
  sortAccountsByLastName,
  getTotalNumberOfBorrows,
  getBooksPossessedByAccount,
};
