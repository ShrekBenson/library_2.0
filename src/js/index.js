const books = [];
const grid = document.querySelector(".grid");
const form = document.getElementById("newBookForm");
const formFields = document.querySelectorAll(".form__field>input");
const buttonAddBook = document.getElementById("addBook");
const readedCheckbox = document.getElementById("readed");
const modal = document.querySelector(".modal");

let readed = false;

class Book {
  #id;
  #title;
  #author;
  #pages;
  #readed;
  #position = 0;

  constructor(id, title, author, pages, readed = false) {
    this.#id = id;
    this.#title = title;
    this.#author = author;
    this.#pages = pages;
    this.#readed = readed;
  }

  createCard() {
    const fragment = document.createDocumentFragment();
    const card = document.createElement("div");
    const cardTitle = document.createElement("h2");
    const cardAuthor = document.createElement("p");
    const cardPages = document.createElement("p");
    const cardReaded = document.createElement("div");
    const cardReadedLabel = document.createElement("label");
    const cardReadedCheckbox = document.createElement("input");
    const deleteBook = document.createElement("button");

    card.classList.add("card");
    card.dataset.index = this.#position;
    cardTitle.classList.add("card__title");
    cardAuthor.classList.add("card__author");
    cardPages.classList.add("card__pages");
    cardReaded.classList.add("card__readed");
    cardReadedLabel.setAttribute("for", `cardReaded${this.#id}`);
    cardReadedCheckbox.setAttribute("type", "checkbox");
    cardReadedCheckbox.id = `cardReaded${this.#id}`;
    deleteBook.classList.add("delete-book");

    cardTitle.innerText = this.#title;
    cardAuthor.innerText = this.#author;
    cardPages.innerText = `${this.#pages} pgs.`;
    cardReadedLabel.innerText = "Readed";
    cardReadedCheckbox.checked = this.#readed;
    deleteBook.textContent = "Delete";
    cardReadedCheckbox.addEventListener("change", () => {
      this.#bookReaded(cardReadedCheckbox.checked);
    });
    deleteBook.addEventListener("click", () => {
      this.#deleteBook(card);
    });

    cardReaded.appendChild(cardReadedLabel);
    cardReaded.appendChild(cardReadedCheckbox);
    const elementsCard = [
      cardTitle,
      cardAuthor,
      cardPages,
      cardReaded,
      deleteBook,
    ];
    elementsCard.forEach((element) => {
      card.appendChild(element);
    });

    fragment.appendChild(card);
    grid.appendChild(fragment);
  }

  #deleteBook(card) {
    books.splice(this.position, 1);
    books.forEach((book, index) => {
      book.position = index;
    });

    card.remove();
  }

  #bookReaded(checked) {
    this.readed = checked;
  }
}

function showError(field) {
  const messageError = document.querySelector(`#${field.id}Error`);

  if (field.validity.valueMissing) {
    messageError.textContent = 'Please fill the empty field';
    setTimeout(function () {
      messageError.textContent = '';
    }, 3000);
    return;
  }

  return;
}

function isError() {
  if (Array.from(formFields).some(field => field.validity.valueMissing)) return true;
  return false;
}

function addBook(e) {
  e.preventDefault();

  if (isError()) {
    formFields.forEach(field => {
      showError(field);
    });
  } else {
    const fields = Array.from(formFields);
    const fieldsValues = fields.map((input) => {
      return input.value;
    });
  
    let [title, author, pages] = fieldsValues;
    let id = Math.trunc(Math.random() * 1_000_000);
    let readed = readedCheckbox.checked;
    let book = new Book(id, title, author, pages, readed);
  
    books.push(book);
    book.position = books.findIndex((item) => {
      return item.id === id;
    });
  
    book.createCard();
    form.reset();
    modal.close();
  }
}

buttonAddBook.removeEventListener("click", addBook);
buttonAddBook.addEventListener("click", addBook);