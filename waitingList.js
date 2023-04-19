//Book Constructor 
class Book {
    constructor(title, author, isbn) {
        this.title = title;
        this.isbn = isbn;
        this.author = author;
    }
}

class UI {
    constructor() {}

    addBookToList(book) {

        const list = document.getElementById('book-list');

        //create tr element
        const row = document.createElement('tr');

        //insert cols
        row.innerHTML = 
        `<td>${book.title}</td>
        <td>${book.isbn}</td>
        <td>${book.author}</td>    
        <td><a href="#" class = "delete">X</a></td>
        `;

        list.appendChild(row);
    }

    clearFields(){
        document.getElementById('title').value = '';
        document.getElementById('author').value = '';
        document.getElementById('isbn').value = '';
    }

    showAlert(message, className){

        const div = document.createElement('div');
        div.className = `alert ${className}`;
        div.appendChild(document.createTextNode(message));

        const container = document.querySelector('.container')
        const form = document.querySelector('#book-form');

        container.insertBefore(div, form);

        setTimeout(function(){
            document.querySelector('.alert').remove();
        }, 2400);
    }

    notify(target){
        
        if(target.className === 'delete'){
            const reciever = target.parentElement.previousElementSibling.previousElementSibling.textContent;
            const body = "Hello a table is vancant, please come in 10 minutes";
            console.log(target.parentElement.previousElementSibling.previousElementSibling.textContent);
            Email.send({
                Host : "smtp.elasticemail.com",
                Username : "vendor99Call@gmail.com",
                Password : "C22F7A02DBE00CBA62AFAAF0504ACA8918B8",
                To : reciever,
                From : "vendor99Call@gmail.com",
                Subject : "This is the subject",
                Body : body
            }).then(
              message => alert(message)
            );

            // Email.send({
            //     SecureToken : "a049eef-ad39-4df1-bdf5-b94038c8f02f",
            //     To : "ngng525252@gmail.com",
            //     From : "vendor99call@gmail.com",
            //     Subject : "This is the subject",
            //     Body : body
            // }).then(
            //   message => alert(message)
            // );
        }
    }

    deleteBook(target){
        if(target.className === 'delete'){
            target.parentElement.parentElement.remove();
        }
    }
}

//Local Storage Class
class Store{

    static getbooks(){
        let books;
        if(localStorage.getItem('books') === null){
            books = [];
        }
        else{
            books =JSON.parse(localStorage.getItem('books'));
        }

        return books;
    }

    static displayBooks(){
        const books = Store.getbooks();

        books.forEach(function(book){
            const ui = new UI;
            ui.addBookToList(book);
        })
    }

    static addBook(book){

        const books = Store.getbooks();
        books.push(book);

        localStorage.setItem('books',JSON.stringify(books));
    }

    static removeBook(isbn){
        
        const books = Store.getbooks();

        books.forEach(function(book, index){ 
            if(book.author == isbn){
                books.splice(index, 1);
            }
        });

        localStorage.setItem('books',JSON.stringify(books));
    }
}

//DOM event listerner
document.addEventListener('DOMContentLoaded', Store.displayBooks());

//Event Listener for Add book
document.getElementById('book-form').addEventListener('submit', function(e){
    
    const title = document.getElementById('title').value;
    const author = document.getElementById('author').value;
    const isbn = document.getElementById('isbn').value;

    const book = new Book(title,author,isbn);

    //Instantiate UI
    const ui = new UI();

    //Validate
    if(title === '' || author === '' || isbn === '' ){
        ui.showAlert('Please fill all the fields', 'error');
    }
    else{
        
    //Add book to list
    ui.addBookToList(book);
    
    //Add to localStorage
    Store.addBook(book);

    //success alert
    ui.showAlert('Book Added', 'success');

    //Clear fields
    ui.clearFields();
    }

    e.preventDefault();
    
})

//Event Listener for delete
document.getElementById('book-list').addEventListener('click', function(e){

    const ui = new UI();

    //notify
    ui.notify(e.target);

    //delete from page
    ui.deleteBook(e.target);

    //delete from LS
    Store.removeBook(e.target.parentElement.previousElementSibling.textContent);

    ui.showAlert('Book Removed', 'success');

    e.preventDefault();
})