function findAuthorById(authors, id) {
    return authors.find(author => author.id === id);
}

function findBookById(books, id) {
    return books.find(book => book.id === id);
}

function partitionBooksByBorrowedStatus(books) {
  const borrowedBooks = books.map(book => !book.borrows[0].returned ? book : null).filter(Boolean);
  const returnedBooks = books.map(book => book.borrows[0].returned ? book : null).filter(Boolean);
  return [borrowedBooks, returnedBooks];
}

// the helper function findAccountById, the same as in accounts.js
function findAccountById(accounts, id) {
    return accounts.find(account => account.id === id);
}
// the main function getBorrowersForBook
function getBorrowersForBook(book, accounts) {
    const { borrows } = book;
    // the helper function to find the account by ID
    const borrowers = borrows.reduce((acc, borrow) => {
        const account = findAccountById(accounts, borrow.id);
        if (account) {
            const borrowerInfo = {
                ...account,
                returned: borrow.returned
            };
            acc.push(borrowerInfo);
        }
        return acc;
    }, []);
    return borrowers.slice(0, 10);
}


module.exports = {
  findAuthorById,
  findBookById,
  partitionBooksByBorrowedStatus,
  getBorrowersForBook,
};
