import mongoose from 'mongoose'
import * as dotenv from 'dotenv'
import PostMessage from './models/postMessage.js';

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


export const resetDB = async () => {
  try {
    let posts = [{
      audio: "",
      message: "",
      video: "",
      selectedFile: `${process.env.BASE_URL}${process.env.PORT}/uploads/facebook.png`
    },
    {
      audio: "",
      message: "Hello, isn't today a lovely day? Yeah, it's an amazing day!",
      video: "",
      selectedFile: ""
    },
    
    {
      audio: `${process.env.BASE_URL}${process.env.PORT}/uploads/file_example_MP3_1MG.mp3`,
      message: "Understand the world we live in...",
      video: "",
      selectedFile: `${process.env.BASE_URL}${process.env.PORT}/uploads/201122966_196781655667275_2063464168561422128_n.jpg`
    },
    {
      audio: "",
      message: "Old-school signature.",
      video: "",
      selectedFile: `${process.env.BASE_URL}${process.env.PORT}/uploads/NEW SIGN.PNG`
    },
    {
      audio: "",
      message: "",
      video: `${process.env.BASE_URL}${process.env.PORT}/uploads/file_example_MP4_1280_10MG.mp4`,
      selectedFile: ''
    },
    // file_example_MP4_1280_10MG
  ]
    await PostMessage.deleteMany()
    await PostMessage.create(posts)
  }
  catch (err) {
    console.log(err)
  }
}




