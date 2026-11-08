const searchBarElement = document.querySelector('#search-bar')
const booksElements = document.querySelectorAll('.book')


function searchfeature(event){
    const input = event.target.value.toLowerCase()
    //console.log(input)
    
    for(let book of booksElements){
        const bookTitleElement = book.querySelector('h3')
        const authorElement = book.querySelector("#author")
        let wantedBook = bookTitleElement.textContent.toLowerCase()
        let wantedAuthor = authorElement.textContent.toLowerCase()
        console.log(wantedBook)
        console.log(book)

        if(wantedAuthor.includes(input) || wantedBook.includes(input)){
            book.style.display = ''
        }else{
            book.style.display = 'none'
        }

        //         if(wantedBook.includes(input)){
        //     book.style.display = ''
        // }else{
        //     book.style.display = 'none'
        // }

    }
}

searchBarElement.addEventListener('input',searchfeature)