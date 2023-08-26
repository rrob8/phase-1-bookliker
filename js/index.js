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
        userLi.className ='users-liked'
        bookUsersLiked.appendChild(userLi)
    })
    
    const likeBtn = document.createElement('button')
    likeBtn.textContent = 'LIKE'
    likeBtn.addEventListener('click', (e) =>{
        e.preventDefault()
        addLike(currentBook, users)
    })
    bookUsersLiked.appendChild(likeBtn)

}

//next step, like a book
function addLike (currentBook, users) {  // from line 62
    console.log(`Current book id# is:${currentBook}`)

    //check if Roberto has liked the book CASE SENSITIVE
    fetch(`http://localhost:3000/books/${currentBook}`)
    .then(response => response.json())
    .then(data => {
       const value = checkUsers(data)
       console.log(value)
       if (value == true) {
        // remove that dude
        const robertoId = '25'
        const roberto = {
            id:25,
            username:'Roberto'
        }
            removeUser(currentBook, users, robertoId)
       }
       else { // else make roberto like the book,add to the db & render

             users.push(    
        {"id": 25,"username": "Roberto" }
        )

        fetch(`http://localhost:3000/books/${currentBook}`,{
        method:"PATCH",
        headers: {
            "Content-Type": "application/json",
        Accept: "application/json"
        },
        body: JSON.stringify( { 
            'users':users
        })
    })

    .then(response => response.json())
    .then(data => {
       showUsers(users)
    })

       }  // end of else
    }) // end of then for check roberto
} // end of function


function checkUsers (data) {
    const users = data.users
    const userArray = []
    for (user of users) {
        userArray.push(user.username)
    }
    if (userArray.includes('Roberto')) {
        return true
    }
    else {
        return false
    }
}

function removeUser (currentBook, users, robertoId) {
   console.log(users)
    const allUsers = users.filter(user => {
        return user.id != robertoId
    })
    console.log(allUsers)

    fetch(`http://localhost:3000/books/${currentBook}`, {
        method:'PATCH',
        headers: {
            'Content-Type':'application/json',
            Accept: "application/json"
        },
        body: JSON.stringify( {
            'users':allUsers
        }
        )
    })
    .then(response => response.json())
    .then(data => showUsers(data.users))
}