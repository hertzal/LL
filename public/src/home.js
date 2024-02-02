function getTotalBooksCount(books) {
    return books.length;
}

function getTotalAccountsCount(accounts) {
    return accounts.length;
}

function getBooksBorrowedCount(books) {
    let borrowedCount = 0;
    books.forEach(({ borrows }) => {
        const [firstTransaction] = borrows;
        if (!firstTransaction.returned) {
            borrowedCount++;
        }
    });
    return borrowedCount;
}


function getMostCommonGenres(books) {
    const genreCount = books.reduce((acc, { genre }) => {
        if (acc[genre]) {
            acc[genre]++;
        } else {
            acc[genre] = 1;
        }
        return acc;
    }, {});
    const genreArray = Object.keys(genreCount).map(name => ({
        name,
        count: genreCount[name]
    }));
    genreArray.sort((genreA, genreB) => genreB.count - genreA.count);
    return genreArray.slice(0, 5);
}

function getMostPopularBooks(books) {
    const borrowCounts = books.reduce((acc, book) => {
        acc[book.title] = book.borrows.length;
        return acc;
    }, {});
    const bookArray = Object.keys(borrowCounts).map(name => ({
        name,
        count: borrowCounts[name]
    }));
    bookArray.sort((bookA, bookB) => bookB.count - bookA.count);
    return bookArray.slice(0, 5);
}

function getMostPopularAuthors(books, authors) {
    const authorBorrows = {};
    books.forEach(book => {
        const author = authors.find(author => author.id === book.authorId);
        const authorName = `${author.name.first} ${author.name.last}`;
        if (!authorBorrows[authorName]) {
            authorBorrows[authorName] = 0;
        }
        authorBorrows[authorName] += book.borrows.length;
    });
    const authorArray = Object.keys(authorBorrows).map(name => ({
        name,
        count: authorBorrows[name]
    }));
    authorArray.sort((authorA, authorB) => authorB.count - authorA.count);
    return authorArray.slice(0, 5);
}

module.exports = {
  getTotalBooksCount,
  getTotalAccountsCount,
  getBooksBorrowedCount,
  getMostCommonGenres,
  getMostPopularBooks,
  getMostPopularAuthors,
};
