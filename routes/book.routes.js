const router = require("express").Router()
const isSignedIn = require('../middleware/is-signed-in')
const Book = require('../models/Book.js')
const Review =  require('../models/Review.js')
const User = require("../models/User.js");
const Status = require("../models/Status.js");

router.get('/new', isSignedIn,(req,res)=>{
    res.render('books/create-books.ejs')
})
router.post('/',isSignedIn, async (req,res)=>{
    const newStatus = await Status.create({
        statusType: req.body.StatusRightnow,
        owner: req.session.user._id
    })
    const createdBook = await Book.create({
        title: req.body.title,
        Cover: req.body.Cover,
        Type: req.body.Type,
        Author: req.body.Author,
        Summary: req.body.Summary,
        StatusRightnow: newStatus._id
    })
    res.redirect('/books')
})
router.get('/',isSignedIn,async(req,res)=>{
    const allbooks = await Book.find().populate('StatusRightnow');
    console.log(allbooks)
    res.render('books/index.ejs',{books:allbooks})
})

module.exports = router;