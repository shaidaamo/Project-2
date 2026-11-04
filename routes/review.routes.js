const router = require("express").Router()
const isSignedIn = require('../middleware/is-signed-in')
const Review =  require('../models/Review.js')
const Book = require('../models/Book.js')

router.get('/:bookId/newReview',isSignedIn, async (req,res)=>{
     const book = await Book.findById(req.params.bookId)
    res.render('reviews/new-review.ejs',{book})
})

router.post('/:bookId',isSignedIn, async (req,res)=>{
    req.body.isPublic = req.body.isPublic === 'on';
    const newReview = await Review.create({
        Rating: req.body.Rating,
        reviewText: req.body.reviewText,
        isPublic: req.body.isPublic,
        owner: req.session.user._id,
    })  
    const updatedBook = await Book.findByIdAndUpdate(req.params.bookId, { $push: { Review: newReview._id } })
    res.redirect('/reviews')
    console.log('updatedBook:', updatedBook);
})

router.get('/',isSignedIn, async (req,res)=>{
    const book = await Book.findById(req.params.bookId)
    res.render('reviews/index.ejs')
})

module.exports = router;
