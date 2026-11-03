const router = require("express").Router()
const isSignedIn = require('../middleware/is-signed-in')
const Book = require('../models/Book.js')

router.get('/new', isSignedIn,(req,res)=>{
    res.render('books/create-books.ejs')
})
router.post('/',isSignedIn,async (req,res)=>{
    const createdBook = await Book.create({
        title: req.body.title,
          Cover: req.body.cover,
          Type: req.body.type,
          Author: req.body.author,
          Status: req.body.status,
          Summary: req.body.summary,
    })
    res.redirect('/books')
})


module.exports = router;