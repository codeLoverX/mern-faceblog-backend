import mongoose from 'mongoose'
import * as dotenv from 'dotenv'
import PostMessage from './models/postMessage.js';
import fs from 'fs';
import fs_extra from "fs-extra";
import path from 'path';

dotenv.config({ path: "./env/config.env" })
export const connectionString = process.env['DB_CONNECTION']
export const connectDB = () => {
  try {
    mongoose.connect(connectionString, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
      useCreateIndex: true,
      useFindAndModify: false,
    })
    console.log('Connected to Database') // outputs green text
  }
  catch {
    console.log('Failed to connect to Database') // outputs green text
  }
}

let baseURL = process.env.DEVELOPMENT==="true"? `${process.env.BASE_URL}${process.env.PORT}`: `${process.env.BASE_PRODUCTION_URL}`

let posts = [{
  audio: "",
  message: "",
  video: "",
  selectedFile: `${baseURL}/uploads/facebook.png`
},
{
  audio: "",
  message: "Hello, isn't today a lovely day? Yeah, it's an amazing day!",
  video: "",
  selectedFile: ""
},

{
  audio: `${baseURL}/uploads/file_example_MP3_1MG.mp3`,
  message: "Understand the world we live in...",
  video: "",
  selectedFile: `${baseURL}/uploads/201122966_196781655667275_2063464168561422128_n.jpg`
},
{
  audio: "",
  message: "Old-school signature.",
  video: "",
  selectedFile: `${baseURL}/uploads/NEW SIGN.PNG`
},
{
  audio: "",
  message: "",
  video: `${baseURL}/uploads/file_example_MP4_1280_10MG.mp4`,
  selectedFile: ''
},
// file_example_MP4_1280_10MG
]


async function deleteFiles() {

  const directory = 'uploads';
  console.log({directory})
  fs.readdir(directory, (err, files) => {
    if (err) throw err;
    console.log({files})
    for (const file of files) {
      fs.unlink(path.join(directory, file), err => {
        if (err) throw err;
      });
    }
  });

}

async function copyFiles() {
  var source = 'templates'
  var destination = 'uploads'

  // Copy the source folder to the destination
  fs_extra.copy(source, destination, function (err) {
    if (err) {
      console.log('An error occurred while copying the folder.')
      return console.error(err)
    }
    console.log('Copy completed!')
  });
}

export const resetDB = async () => {
  try {
    await deleteFiles()
    await copyFiles()
    await PostMessage.deleteMany()
    await PostMessage.create(posts)
  }
  catch (err) {
    console.log(err)
  }
}




