import express from 'express';

import { getPosts, getPost, createPost, updatePost, likePost, dislikePost, deletePost } from '../controllers/posts.js';
import { multerUpload} from '../middleware/multerUpload.js';

const router = express.Router();

router.get('/', getPosts);
router.post('/', multerUpload, createPost);
router.patch('/:id',  multerUpload, updatePost);
router.get('/:id', getPost);
router.delete('/:id', deletePost);
router.patch('/:id/likePost', likePost);
router.patch('/:id/dislikePost', dislikePost);

export default router;