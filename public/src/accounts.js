function findAccountById(accounts, id) {
    return accounts.find(account => account.id === id)
}

function sortAccountsByLastName(accounts) {
    return accounts.sort((account1, account2) => {
        const lastName1 = account1.name.last.toLowerCase();
        const lastName2 = account2.name.last.toLowerCase();
        if (lastName1 < lastName2) {
            return -1;
        } else if (lastName1 > lastName2) {
            return 1;
        } else {
            return 0;
        }
    });
}

function getTotalNumberOfBorrows(account, books) {
    const accountId = account.id;
    let totalBorrows = 0;
    books.forEach(book => {
        const borrowsByAccount = book.borrows.filter(borrow => borrow.id === accountId);
        totalBorrows += borrowsByAccount.length;
    });
    return totalBorrows;
}

function getBooksPossessedByAccount(account, books, authors) {
    const accountId = account.id;
    const checkedOutBooks = books.filter(book => {
        const lastBorrow = book.borrows[0];
        return !lastBorrow.returned && lastBorrow.id === accountId;
    });
    checkedOutBooks.forEach(book => {
        const author = authors.find(author => author.id === book.authorId);
        book.author = author;
    });
    return checkedOutBooks;
}

module.exports = {
  findAccountById,
  sortAccountsByLastName,
  getTotalNumberOfBorrows,
  getBooksPossessedByAccount,
};
