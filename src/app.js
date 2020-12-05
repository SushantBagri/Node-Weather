const path = require('path');
const express = require('express');
const hbs = require('hbs')

const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');


const app = express();


const PORT = process.env.PORT || 3000;
const publicPath = path.join(__dirname,'../public');
const viewPath = path.join(__dirname,'../templates/views')
const partialPath = path.join(__dirname,'../templates/partials')

app.set('view engine','hbs');
app.set('views',viewPath)
app.use(express.static(publicPath))

hbs.registerPartials(partialPath);


app.get('',(req,res)=>{
    res.render('index',{
        title:'Weather',
        name:'Sushant Bagri',
    })
});

app.get('/about',(req,res)=>{
    res.render('about',{
        title:'About me',
        name:'Sushant Bagri',
    })
});

app.get('/help',(req,res)=>{
    res.render('help',{
        title:' HElP',
        name:'Sushant Bagri',
    })
});

app.get('/weather',(req,res)=>{
    const address=req.query.search;
    if(!address){
        return res.send({
            error:"must provide a address."
        })
    }

    geocode(address, (err, data) => {
        if (!err) {
            forecast(data.latitude, data.longitude, (err, forecastData) => {
                if (!err) {
                    console.log(forecastData);
                    return res.send({
                        location: forecastData.location,
                        forecast: forecastData.current
                    })
                }
                else {
                    return res.send({
                        error: err
                    })    
                }
            })
        }
        else {
            return res.send({
                error: err
            }) 
        }
    
    })
})

app.get('/help/*',(req,res)=>{
    res.render('404',{
        title:404,
        name:'Sushant Bagri',
        message:'HELP PAGE NOT FOUND'
    })
});
app.get('*',(req,res)=>{
    res.render('404',{
        title:404,
        name:'Sushant Bagri',
        message:"PAGE NOT FOUND"
    })
})

app.listen(PORT,()=>{
    console.log(`app is running at ${PORT} port.....`)
})