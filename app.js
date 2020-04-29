class Book {
  constructor(book, author, isbn) {
    this.book = book;
    this.author = author;
    this.isbn = isbn;
  }
}
class UI {
  static display() {
    const a = store.localState();
    a.forEach((book) => UI.seeInConsole(book));
  }
  static seeInConsole(b) {
    const list = document.querySelector("#book-list");

    const row = document.createElement("tr");

    row.innerHTML = `
        <td>${b.book}</td>
        <td>${b.author}</td>
        <td>${b.isbn}</td>
        <td><a href="#" class="btn btn-danger btn-sm delete">X</a></td>
      `;

    list.appendChild(row);
  }

  static clearfields() {
    document.querySelector("#book").value = "";
    document.querySelector("#author").value = "";
    document.querySelector("#isbn").value = "";
  }
  static removeFromLocal(isbn) {
    let getIt = store.localState();
    getIt.forEach((ele, index) => {
      if (ele.isbn == isbn) {
        getIt.splice(index, 1);
        localStorage.setItem("buddha", JSON.stringify(getIt));
      }
    });
  }
}
class store {
  static showAlert(msg, cls) {
    let ele = document.createElement("h3");
    let txt = document.createTextNode(`${msg}`);
    ele.style.color = `${cls}`;
    ele.append(txt);
    let tarGet = document.querySelector(".container1");
    tarGet.appendChild(ele);
  }

  static localState() {
    let books;
    if (localStorage.getItem("buddha") === null) {
      books = [];
    } else {
      books = JSON.parse(localStorage.getItem("buddha"));
    }
    return books;
  }

  static sendToLocal(books) {
    const getLocalValue = store.localState();
    console.log(getLocalValue);
    getLocalValue.push(books);
    localStorage.setItem("buddha", JSON.stringify(getLocalValue));
  }
  static deleteBook(e) {
    if (e.classList.contains("delete")) {
      e.parentElement.parentElement.remove();
    }
  }
}

document.querySelector("#btnn").addEventListener("click", (e) => {
  e.preventDefault();
  const book = document.querySelector("#book").value;
  const author = document.querySelector("#author").value;
  const isbn = document.querySelector("#isbn").value;
  const books = new Book(book, author, isbn);
  if (book == "" || author == "" || isbn == "") {
    store.showAlert("Field Cant Be Empty", "red");
    setTimeout(() => document.querySelector(".container1 h3").remove(), 3000);
  } else {
    UI.seeInConsole(books);
    store.localState();

    store.sendToLocal(books);

    store.showAlert("Book Added", "green");
    setTimeout(() => document.querySelector(".container1 h3").remove(), 3000);

    UI.clearfields();
  }
});
document.addEventListener("DOMContentLoaded", UI.display());

document.querySelector("#book-list").addEventListener("click", (e) => {
  store.deleteBook(e.target);

  UI.removeFromLocal(e.target.parentElement.previousElementSibling.textContent);
  store.showAlert("Book Removed", "blue");
  setTimeout(() => document.querySelector(".container1 h3").remove(), 3000);
  // UI.display();
});
