const library = [];

function Book (id, title, author, nPages, readStatus) {
    this.id = id;
    this.title = title;
    this.author = author;
    this.nPages = nPages;
    this.readStatus = readStatus;
}
Book.prototype.info = function () {
    return `${this.title} by ${this.author}, ${this.nPages} pages, ${this.readStatus ? "have read" : "not read yet"} (${this.id})`
}
