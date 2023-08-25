document.addEventListener("DOMContentLoaded", function() {
    fetch(`http://localhost:3000/books`)
    .then(response => response.json())
    .then(data => populateBooks(data))

});

const list = document.getElementById('list')
const bookImage = document.createElement('img')
const bookDescription = document.createElement('p')
const bookUsersLiked = document.createElement('ul')
const bookPanel = document.getElementById('show-panel')
bookPanel.appendChild(bookImage)
bookPanel.appendChild(bookDescription)
bookPanel.appendChild(bookUsersLiked)

function populateBooks (data) {
    console.log(data)
    data.forEach(book => {
        const title = document.createElement('li')
        const bookInfo = book
    title.textContent = book.title
        list.appendChild(title)
        title.addEventListener('click', (e) =>{
            e.preventDefault()
            displayBook(book)
        })
    })
}



function displayBook (book) {
    console.log(book)
     // /display the book's thumbnail, description, and a list of users who have liked the book. This information should be displayed in the div#show-panel element.
    
    bookImage.src = book.img_url
    bookImage.id = book.id
    bookDescription.textContent = book.description 
    showUsers(book.users)


   


}

function showUsers (users) {
    bookUsersLiked.innerHTML =''
    const currentBook = bookImage.id
     users.forEach(user => {
        const userLi = document.createElement('li')
        userLi.textContent = user.username
        bookUsersLiked.appendChild(userLi)
    })
    
    const likeBtn = document.createElement('button')
    likeBtn.textContent = 'LIKE'
    likeBtn.addEventListener('click', (e) =>{
        e.preventDefault()
        addLike(currentBook)
    })
    bookUsersLiked.appendChild(likeBtn)

}

//next step, like a book
function addLike (currentBook) {
    console.log(`Current book id# is:${currentBook}`)
}