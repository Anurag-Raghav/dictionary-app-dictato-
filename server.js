const fetch = require('node-fetch');
const express = require('express');
const hbs = require('hbs');
const app = express();
require('dotenv').config();

app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.set('view engine','hbs');

app.get('/', async (req,res)=>{

    res.render('index');
})

app.post('/api', async (req,res)=>{


    const word = req.body.word;
    
    fetch(`https://www.dictionaryapi.com/api/v3/references/learners/json/${word}?key=${process.env.API_KEY}`)
    .then(response =>response.json())
    .then((data)=>{

        if(!data[0].shortdef){
            
            return res.render('index',{
                word,
                result: 'this word does not exist'
        })}
        else{
            res.render('index',{
                word:word,
                result: data[0].shortdef[0]
            
            })
        }
    }).catch(err=>console.log(err.message))
});

const PORT = process.env.port || 3000; 
app.listen(PORT,()=>{
    console.log(`listening to port ${PORT}`);
});

