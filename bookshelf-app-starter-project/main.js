document.addEventListener("DOMContentLoaded", function () {
  const bookForm = document.getElementById("bookForm");
  const searchForm = document.getElementById("searchBook");
  const incompleteBookList = document.getElementById("incompleteBookList");
  const completeBookList = document.getElementById("completeBookList");
  
  let books = JSON.parse(localStorage.getItem("books")) || [];

  bookForm.addEventListener("submit", function (event) {
      event.preventDefault();
      addBook();
  });

  searchForm.addEventListener("submit", function (event) {
      event.preventDefault();
      searchBook();
  });

  function addBook() {
      const title = document.getElementById("bookFormTitle").value;
      const author = document.getElementById("bookFormAuthor").value;
      const year = parseInt(document.getElementById("bookFormYear").value, 10);
      const isComplete = document.getElementById("bookFormIsComplete").checked;
  
      // if (isNaN(year)) {
      //     alert("Tahun harus berupa angka!");
      //     return;
      // }
  
      const book = {
          id: +new Date(),
          title,
          author,
          year,
          isComplete,
      };
  
      books.push(book);
      saveToLocalStorage();
      renderBooks();
      bookForm.reset();
  }

  function saveToLocalStorage() {
      localStorage.setItem("books", JSON.stringify(books));
  }

  function renderBooks() {
      incompleteBookList.innerHTML = "";
      completeBookList.innerHTML = "";
  
      books.forEach((book) => {
          const bookElement = createBookElement(book);
          if (book.isComplete) {
              completeBookList.appendChild(bookElement);
          } else {
              incompleteBookList.appendChild(bookElement);
          }
      });
  }

  function createBookElement(book) {
      const bookContainer = document.createElement("div");
      bookContainer.setAttribute("data-bookid", book.id);
      bookContainer.setAttribute("data-testid", "bookItem");
      
      const bookTitle = document.createElement("h3");
      bookTitle.setAttribute("data-testid", "bookItemTitle");
      bookTitle.innerText = book.title;
  
      const bookAuthor = document.createElement("p");
      bookAuthor.setAttribute("data-testid", "bookItemAuthor");
      bookAuthor.innerText = `Penulis: ${book.author}`;
  
      const bookYear = document.createElement("p");
      bookYear.setAttribute("data-testid", "bookItemYear");
      bookYear.innerText = `Tahun: ${book.year}`;
  
      const buttonContainer = document.createElement("div");
      
      const toggleButton = document.createElement("button");
      toggleButton.setAttribute("data-testid", "bookItemIsCompleteButton");
      toggleButton.innerText = book.isComplete ? "Belum selesai dibaca" : "Selesai dibaca";
      toggleButton.addEventListener("click", function () {
          book.isComplete = !book.isComplete;
          saveToLocalStorage();
          renderBooks();
      });
  
      const deleteButton = document.createElement("button");
      deleteButton.setAttribute("data-testid", "bookItemDeleteButton");
      deleteButton.innerText = "Hapus Buku";
      deleteButton.addEventListener("click", function () {
          books = books.filter((b) => b.id !== book.id);
          saveToLocalStorage();
          renderBooks();
      });
  
      buttonContainer.appendChild(toggleButton);
      buttonContainer.appendChild(deleteButton);
      bookContainer.appendChild(bookTitle);
      bookContainer.appendChild(bookAuthor);
      bookContainer.appendChild(bookYear);
      bookContainer.appendChild(buttonContainer);
  
      return bookContainer;
  }

  function searchBook() {
      const searchTitle = document.getElementById("searchBookTitle").value.toLowerCase();
      const filteredBooks = books.filter((book) => book.title.toLowerCase().includes(searchTitle));
      incompleteBookList.innerHTML = "";
      completeBookList.innerHTML = "";
      
      filteredBooks.forEach((book) => {
          const bookElement = createBookElement(book);
          if (book.isComplete) {
              completeBookList.appendChild(bookElement);
          } else {
              incompleteBookList.appendChild(bookElement);
          }
      });
  }

  renderBooks();
});
