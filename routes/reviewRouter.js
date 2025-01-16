import express from 'express';
import {addReview} from '../controller/reviewController.js';
import {getReviews} from '../controller/reviewController.js';


const reviewRouter = express.Router();

reviewRouter.post('/add',addReview)
reviewRouter.get('/get',getReviews)

export default reviewRouter;