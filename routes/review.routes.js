const router = require("express").Router()
const isSignedIn = require('../middleware/is-signed-in')
const Review =  require('../models/Review.js')
const Book = require('../models/Book.js')

router.get('/:bookId/newReview',isSignedIn, async (req,res)=>{
     const book = await Book.findById(req.params.bookId)
    res.render('reviews/new-review.ejs',{book})
})

router.post('/:bookId',isSignedIn, async (req,res)=>{
    const newReview = await Review.create({
        Rating: req.body.Rating,
        reviewText: req.body.reviewText,
        owner: req.session.user._id,
    })  
    const updatedBook = await Book.findByIdAndUpdate(req.params.bookId, { Reviews: newReview._id })
    res.redirect('/reviews')
    console.log('updatedBook:', updatedBook);
})

router.get('/',isSignedIn, async (req,res)=>{
    // filters the books that doesnt have a review, populate username since it wont appaer
    const book = await Book.find({
        Reviews: { $ne: null }
    }).populate({
        path: 'Reviews',
        populate: { path: 'owner', select: 'username' }
    })
    res.render('reviews/index.ejs',{allbooks: book})
})

router.delete('/:reviewId', isSignedIn, async (req, res) => {
    const review = await Review.findById(req.params.reviewId)

    if (!review.owner.equals(req.session.user._id)) {
        return res.send("Action Not Allowed")
    }
// it update the books with null reviews 
    await Book.updateOne({ Reviews: review._id }, { $unset: { Reviews: "" } })
// delete the review itself from database 
    await review.deleteOne()

    res.redirect('/reviews')
})

router.get('/:reviewId/edit', isSignedIn, async (req, res) => {
    const review = await Review.findById(req.params.reviewId)
    res.render('reviews/edit-review.ejs',{allreviews:review})
})

router.put('/:reviewId', isSignedIn, async (req, res) => {
    const updatedReview = await Review.findByIdAndUpdate(req.params.reviewId, req.body)
    res.redirect('/reviews')
})


module.exports = router;
