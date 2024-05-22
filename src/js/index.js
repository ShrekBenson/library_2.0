const books = [];
const grid = document.querySelector('.grid');
const formFields = document.querySelectorAll('.form__field>input');
const buttonAddBook = document.getElementById('addBook');
const readedCheckbox = document.getElementById('readed');
const modal = document.querySelector('.modal');

let readed = false;

function Book (id, title, author, pages, readed = false) {  
  this.id = id;
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.readed = readed;
  this.position = 0;
}
Book.prototype.createCard = function() {
  const fragment = document.createDocumentFragment();
  const card = document.createElement('div');  
  const cardTitle = document.createElement('h2');  
  const cardAuthor = document.createElement('p');  
  const cardPages = document.createElement('p');
  const cardReaded = document.createElement('div');
  const cardReadedLabel = document.createElement('label');
  const cardReadedCheckbox = document.createElement('input');
  const deleteBook = document.createElement('button');
  
  card.classList.add('card');
  card.dataset.index = this.position;
  cardTitle.classList.add('card__title');
  cardAuthor.classList.add('card__author');
  cardPages.classList.add('card__pages');
  cardReaded.classList.add('card__readed')
  cardReadedLabel.setAttribute('for', `cardReaded${this.id}`)
  cardReadedCheckbox.setAttribute('type', 'checkbox');
  cardReadedCheckbox.id = `cardReaded${this.id}`;
  deleteBook.classList.add('delete-book');
  
  cardTitle.innerText = this.title;
  cardAuthor.innerText = this.author;
  cardPages.innerText = this.pages;
  cardReadedLabel.innerText = "Readed";
  cardReadedCheckbox.checked = this.readed;
  deleteBook.textContent = "Delete";
  cardReadedCheckbox.addEventListener('change', () => {
    this.bookReaded(cardReadedCheckbox.checked);
  }) 
  deleteBook.addEventListener('click', () => {
    this.deleteBook(card);
  })
  
  cardReaded.appendChild(cardReadedLabel);
  cardReaded.appendChild(cardReadedCheckbox);
  const elementsCard = [cardTitle, cardAuthor, cardPages, cardReaded, deleteBook];
  elementsCard.forEach(element => {
    card.appendChild(element);
  })

  fragment.appendChild(card);
  grid.appendChild(fragment);
}
Book.prototype.deleteBook = function (card) {
  books.splice(this.position, 1);
  books.forEach((book, index) => {
    book.position = index;
  })

  card.remove();  
}
Book.prototype.bookReaded = function(checked) {
  this.readed = checked;    
}

buttonAddBook.addEventListener('click', function(event) {
  event.preventDefault();
  
  const fields = Array.from(formFields);
  const fieldsValues = fields.map((input) => {
    return input.value;
  })

  let [title, author, pages] = fieldsValues;
  let id = Math.trunc(Math.random()*1_000_000);
  let readed = readedCheckbox.checked;
  let book = new Book(id, title, author, pages, readed);

  books.push(book);  
  book.position = books.findIndex(item => {
    return item.id === id;
  })

  book.createCard();
})