const domLibraryContainer = document.querySelector("#library-container");
const library = [];

function Book (id, title, author, nPages, readStatus) {
    this.id = id;
    this.title = title;
    this.author = author;
    this.nPages = nPages;
    this.readStatus = readStatus;
}
Book.prototype.info = function () {
    return `${this.title} by ${this.author}, ${this.nPages} pages, ${this.readStatus ? "have read" : "not read yet"}`
}

function addBookToLibrary (title, author, nPages, readStatus) {
    let id = crypto.randomUUID()
    library.push(new Book(id, title, author, nPages, readStatus));
}
addBookToLibrary("The Hobbit", "J.R.R. Tolkien", 310, true);
addBookToLibrary("1984", "George Orwell", 328, true);
addBookToLibrary("To Kill a Mockingbird", "Harper Lee", 281, false);
addBookToLibrary("Dune", "Frank Herbert", 412, true);
addBookToLibrary("The Great Gatsby", "F. Scott Fitzgerald", 180, false);
addBookToLibrary("Brave New World", "Aldous Huxley", 268, true);
addBookToLibrary("The Catcher in the Rye", "J.D. Salinger", 234, false);
addBookToLibrary("Fahrenheit 451", "Ray Bradbury", 194, true);
addBookToLibrary("Moby Dick", "Herman Melville", 635, false);
addBookToLibrary("Crime and Punishment", "Fyodor Dostoevsky", 671, false);

function renderBooks () {
    for (Book of library) {
        let domBookCard = document.createElement("div");
        domBookCard.classList.add("book-card");

        let domBookTitle = document.createElement("h2");
        domBookTitle.textContent = Book.title;
        domBookCard.append(domBookTitle);

        let domBookSubtext = document.createElement("div");
        domBookSubtext.classList.add("book-subtext")
        let domBookAuthor = document.createElement("p");
        domBookAuthor.textContent = Book.author;
        let domSubtextDivider = document.createElement("p");
        domSubtextDivider.textContent = "•"
        let domBookPages = document.createElement("p");
        domBookPages.textContent = `${Book.nPages} pages`;
        domBookSubtext.append(domBookAuthor, domSubtextDivider, domBookPages);
        domBookCard.append(domBookSubtext);

        let domBookReadStatus = document.createElement("div");
        domBookReadStatus.innerHTML = `
            <p>Read:<p>
            ${Book.readStatus ? `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="read-yes"><path d="M20 6 9 17l-5-5"/></svg>` : `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="read-no"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>`}
        `;
        domBookReadStatus.classList.add("read-status-container")
        domBookCard.append(domBookReadStatus);

        domLibraryContainer.append(domBookCard);
    }
};
renderBooks();