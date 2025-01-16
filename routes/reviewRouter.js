import express from 'express';
import {addReview} from '../controller/reviewController.js';
import {getReviews} from '../controller/reviewController.js';
import {deleteReview} from '../controller/reviewController.js';
import {approveReview} from '../controller/reviewController.js';



const reviewRouter = express.Router();

reviewRouter.post('/add',addReview)
reviewRouter.get('/get',getReviews)
reviewRouter.delete('/delete/:email',deleteReview)
reviewRouter.put('/approve/:email',approveReview)

export default reviewRouter;