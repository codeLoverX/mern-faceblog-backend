import express from 'express';
import mongoose from 'mongoose';

import PostMessage from '../models/postMessage.js';
let baseURL = process.env.DEVELOPMENT==="true"? `${process.env.BASE_URL}${process.env.PORT}`: `${process.env.BASE_PRODUCTION_URL}`

const router = express.Router();

export const getPosts = async (req, res) => {
    try {
        const postMessages = await PostMessage.find().sort({created_at: -1});

        res.status(200).json(postMessages);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export const getPost = async (req, res) => {
    const { id } = req.params;

    try {
        const post = await PostMessage.findById(id);

        res.status(200).json(post);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export const createPost = async (req, res) => {
    let audio, selectedFile, video = "";
    let { message } = req.body;
    console.log({files: req.files})
    for (let value of req.files){
        console.log({field: value.fieldname})
        switch(value.fieldname){
            case 'selectedFile': {
                selectedFile= `${baseURL}/uploads/${value.filename}`;                
                break;
            }
            case 'audio': {
                audio= `${baseURL}/uploads/${value.filename}`;                
                break;
            }
            case 'video': {
                video= `${baseURL}/uploads/${value.filename}`;                
                break;
            }
        }
    }
    const newPostMessage = new PostMessage({ audio, message, selectedFile, video })
    res.json(newPostMessage);

}

export const updatePost = async (req, res) => {
    let { video, audio, message, selectedFile } = req.body;
    console.log({files: req.files, body: req.body})
    for (let value of req.files){
        switch(value.fieldname){
            case 'selectedFile': {
                selectedFile= `${baseURL}/uploads/${value.filename}`;                
                break;
            }
            case 'audio': {
                audio= `${baseURL}/uploads/${value.filename}`;                
                break;
            }
            case 'video': {
                video= `${baseURL}/uploads/${value.filename}`;                
                break;
            }
        }
    }
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No post with id: ${id}`);
    const updatedPost = { video, audio, message, selectedFile };

    await PostMessage.findByIdAndUpdate(id, updatedPost, { new: true });
    console.log({updatedPost})
    res.json(updatedPost);
}

export const deletePost = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No post with id: ${id}`);

    await PostMessage.findByIdAndRemove(id);

    res.json({ message: "Post deleted successfully." });
}

export const likePost = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No post with id: ${id}`);

    const post = await PostMessage.findById(id);

    const updatedPost = await PostMessage.findByIdAndUpdate(id, { likeCount: post.likeCount + 1 }, { new: true });

    res.json(updatedPost);
}


export const dislikePost = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No post with id: ${id}`);

    const post = await PostMessage.findById(id);

    const updatedPost = await PostMessage.findByIdAndUpdate(id, { dislikeCount: post.dislikeCount + 1 }, { new: true });

    res.json(updatedPost);
}


export default router;