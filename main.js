// Setup const
const domModalForm = document.querySelector("form");
const domLibraryContainer = document.querySelector("#library-container");
const library = [];

// Book constructor and accompanying function
function Book (id, title, author, nPages, readStatus) {
    this.id = id;
    this.title = title;
    this.author = author;
    this.nPages = nPages;
    this.readStatus = readStatus;
}
Book.prototype.toggleReadStatus = function () {
    this.readStatus = !this.readStatus;
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

// Render all books
function renderBooks () {
    domLibraryContainer.innerHTML = "";
    for (const book of library) {
        let domBookCard = document.createElement("div");
        domBookCard.classList.add("book-card");
        domBookCard.setAttribute("data-id", book.id);

        let domBookTitle = document.createElement("h2");
        domBookTitle.textContent = book.title;
        domBookCard.append(domBookTitle);

        let domBookSubtext = document.createElement("div");
        domBookSubtext.classList.add("book-subtext")
        let domBookAuthor = document.createElement("p");
        domBookAuthor.textContent = book.author;
        let domSubtextDivider = document.createElement("p");
        domSubtextDivider.textContent = "•"
        let domBookPages = document.createElement("p");
        domBookPages.textContent = `${book.nPages} pages`;
        domBookSubtext.append(domBookAuthor, domSubtextDivider, domBookPages);
        domBookCard.append(domBookSubtext);

        let domBookButtons = document.createElement("div");
        domBookButtons.classList.add("book-buttons")
        let domBookReadStatus = document.createElement("button");
        domBookReadStatus.innerHTML = `
            <p>Read:</p>
            ${book.readStatus ? `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="read-yes"><path d="M20 6 9 17l-5-5"/></svg>` : `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="read-no"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>`}
        `;
        domBookReadStatus.classList.add("read-status-container")
        domBookButtons.append(domBookReadStatus)

        let domDeleteButton = document.createElement("button");
        domDeleteButton.textContent = "Delete?";
        domDeleteButton.classList.add("delete-button")
        domBookButtons.append(domDeleteButton);
        domBookCard.append(domBookButtons);

        domLibraryContainer.append(domBookCard);
    }
};
renderBooks();

// Add new book
domModalForm.addEventListener("submit", () => {
    let formData = new FormData(domModalForm);
    let title = formData.get("title");
    let author = formData.get("author");
    let nPages = parseInt(formData.get("nPages"));
    let readStatus = "true" === formData.get("readStatus");
    
    addBookToLibrary(title, author, nPages, readStatus);
    renderBooks()
});

// Remove a book
domLibraryContainer.addEventListener("click", (e) => {
    if (!e.target.classList.contains("delete-button")) return;
    let bookId = e.target.closest(".book-card").dataset.id;
    let bookIndex = library.findIndex((book) => bookId == book.id);
    if(!confirm(`Are you sure you want to delete "${library[bookIndex].title}"?`)) return;
    library.splice(bookIndex, 1);
    renderBooks();
});

// Change read status
domLibraryContainer.addEventListener("click", (e) => {
    let clickedButton = e.target.closest("button");
    if (!clickedButton || !clickedButton.classList.contains("read-status-container")) return;
    let bookId = e.target.closest(".book-card").dataset.id;
    let bookIndex = library.findIndex((book) => bookId == book.id);
    library[bookIndex].toggleReadStatus();
    renderBooks();
});