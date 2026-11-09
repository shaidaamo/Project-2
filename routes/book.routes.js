const router = require("express").Router()
const isSignedIn = require('../middleware/is-signed-in')
const Book = require('../models/Book.js')
const Review =  require('../models/Review.js')
const User = require("../models/User.js");


router.get('/new', isSignedIn,(req,res)=>{
    res.render('books/create-books.ejs')
})
router.post('/',isSignedIn, async (req,res)=>{
    const createdBook = await Book.create({
        title: req.body.title,
        Cover: req.body.Cover,
        Type: req.body.Type,
        Author: req.body.Author,
        Summary: req.body.Summary,
        StatusRightnow: req.body.StatusRightnow,
        owner: req.session.user._id
    })
    res.redirect('/books')
})
router.get('/',isSignedIn,async(req,res)=>{
    const allbooks = await Book.find({ owner: req.session.user._id });
    console.log(allbooks)
    res.render('books/index.ejs',{books:allbooks})
})
router.get('/:bookId', isSignedIn, async(req,res)=>{
    const allbooks = await Book.findById(req.params.bookId).populate('Reviews');
    res.render('books/book-detelis.ejs',{books:allbooks})
})

router.get('/:bookId/edit', isSignedIn, async(req,res)=>{
    const foundBook = await Book.findById(req.params.bookId)
    res.render('books/edit-books.ejs',{books: foundBook})
})

router.put('/:bookId', isSignedIn, async(req,res)=>{
     const updatedBook = await Book.findByIdAndUpdate(req.params.bookId,req.body)
    res.redirect('/books')
    })
router.delete('/:bookId',isSignedIn,async(req,res)=>{
    const foundBook = await Book.findById(req.params.bookId)
    if(Book.owner == req.session.user._id){
        return res.send("Action Not Allowed")
    }
    await Book.findByIdAndDelete(req.params.bookId)
    res.redirect('/books')
})

module.exports = router;