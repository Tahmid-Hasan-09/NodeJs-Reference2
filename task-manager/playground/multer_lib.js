const express = require('express')
const app = express()
const port = process.env.PORT || 3000

const multer = require('multer')
const upload = multer({
    dest: 'images',
    limits:{
        fileSize : 1000000
    },
    fileFilter(req,file,cb){
        /****Expects a pdf file with size limit 1mb
    
        if(!file.originalname.endsWith('.pdf')){
            return cb(new Error('Please upload a pdf file'))
        }
        ************************************/

        //Expects a doc/docx file 
        if(!file.originalname.match(/\.(doc|docx)$/)){
            return cb(new Error('Please upload a Word document'))
        }
        cb(undefined,true)
    }
})

app.post('/upload',upload.single('upload'),(req,res)=>{
    res.send()
},(error,req,res,next)=>{
    res.status(400).send({error:error.message})
})

/**************Json response instead of HTML while error occurred shown by normal express middleware

const errorMiddleware = (req,res,next)=>{
    throw new Error('From my middleware')
}

app.post('/upload',errorMiddleware,(req,res)=>{
    res.send()
},(error,req,res,next)=>{
    res.status(400).send({error:error.message})
})
*******************************************/


app.listen(port, () => {
    console.log('Server is up on port ' + port)
})