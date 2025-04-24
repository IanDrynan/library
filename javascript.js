const library = [];
const lib = document.querySelector(".library");


function Book(title, author, status) {
  if (!new.target) {
    throw Error("must use new operator for this constructor");
  }
  this.title = title;
  this.author = author;
  this.status = status;
  this.id = crypto.randomUUID();
}

Book.prototype.changeStatus = function () {
  this.status = this.status === "read" ? "unread" : "read";
};

function addBooktoLibrary(title, author, status) {
  const book = new Book(title, author, status);
  library.push(book);
  addBooktoDisplay(book);
}
function addBooktoDisplay(book) {
    const tr = document.createElement("tr");
    const titleDOM = document.createElement("td");
    const authorDOM = document.createElement("td");
    const statusDOM = document.createElement("td");
    lib.appendChild(tr);
    tr.appendChild(authorDOM);
    tr.appendChild(titleDOM);
    tr.appendChild(statusDOM);
    titleDOM.textContent = book.title;
    authorDOM.textContent = book.author;
    statusDOM.textContent = book.status;
    tr["data_id"] = book.id;

    const status = document.createElement("button");
    tr.appendChild(status);
    status.textContent = "🕮";
    status.addEventListener("click", () => {
      book.changeStatus();
      displayBooks();
    });

    const remove = document.createElement("button");
    tr.appendChild(remove);
    remove.textContent = "delete";
    remove.addEventListener("click", () => {
      lib.removeChild(tr);
      library.splice(library.indexOf(book), 1);
      displayBooks();
    });
}

function displayBooks() {
    lib.innerHTML = "";
  for (const book of library) {
    addBooktoDisplay(book);
  }
}

const addBook = document.querySelector(".new");
const bookDialog = document.querySelector("#bookDialog");
addBook.addEventListener("click", () => {
  bookDialog.showModal();
});

const newAuthor = bookDialog.querySelector("#author");
const newTitle = bookDialog.querySelector("#title");
const newStatus = bookDialog.querySelector("select");
const confirmNew = document.querySelector("#confirmNew");
confirmNew.addEventListener("click", (event) => {
  event.preventDefault();
  const requiredFields = bookDialog.querySelectorAll("[required]");
  let valid = true;
  requiredFields.forEach((field) => {
    if (!field.value) {
      valid = false;
    }
  });
  if (valid) {
    addBooktoLibrary(newTitle.value, newAuthor.value, newStatus.value);
    bookDialog.close();
  } else {
    alert("Please fill in all fields");
  }
});

const cancel = bookDialog.querySelector("#cancel");
cancel.addEventListener("click", () => {
  bookDialog.close();
});
