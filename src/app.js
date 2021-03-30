const path = require('path')
const express = require ('express')
const hbs =require('hbs')
const { title } = require('process')

const port = process.env.PORT || 3000

const geocode= require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()
//Define paths for express config
const publicDirectoryPath =path.join(__dirname , '../public')
const viewspath = path.join(__dirname,'../templates/views')
const paritialsPath = path.join(__dirname,'../templates/partials')
//setup handler engine and view location
app.set('view engine', 'hbs')
app.set('views', viewspath)
hbs.registerPartials(paritialsPath)

//setup static direcctory to serve
app.use(express.static(publicDirectoryPath))


app.get('', (req , res) =>{
    res.render('index' ,{
        title : 'Weather App' ,
        name : 'Abhishek Singhal'
    })
})
app.get('/about', (req , res) =>{
    res.render('about' ,{
        title : 'About' ,
        name : 'Abhishek Singhal'
    })
})
app.get('/help', (req , res) =>{
    res.render('help' ,{
        title : 'Help' ,
        helptext : 'For any query contact',
        name : 'Abhishek Singhal' ,
        email : '14shanu@gmail.com'
    })
})

app.get('/help/*', (req ,res) => {
    res.render('404' , {
        error : 'Help article not found' ,
        title:'404',
        name:'Abhishek Singhal'
    })
})

app.get('/weather' ,(req , res) => {
    if (!req.query.address) {
        return res.send ({
            error : 'you must provide a  address'
        })
    }
    geocode(req.query.address , (error,{longitude ,latitude ,location} = {}) =>  {
        if (error){
            return res.send({error})
        }
    
        forecast(latitude ,longitude,  (error, forecastData) => {
            if (error){
                return res.send({error})
            }
    
            res.send({
                location ,
                forecast: forecastData,
                address : req.query.address
            })
        
        })
    })


})

app.get('*',(req ,res) => {
    res.render('404' ,{
        error: 'page not found',
        title:'404',
        name:'Abhishek Singhal'
        
    })
})


app.listen(port , () => {
    console.log('Server is up on port ' + port)
})
