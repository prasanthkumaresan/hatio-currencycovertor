import fetch  from 'node-fetch';
import express, { response } from 'express';
import cors from 'cors';
const app = express();

app.use(express.json());
app.use(cors({
    origin: "http://localhost:3000",
}))

app.get('/api/rates',async (request,response) => {
    try{
    const {base} = request.query;
    const fetchResponse = await fetch(`https://v6.exchangerate-api.com/v6/8dcb557faca7fd22d6427c40/latest/${base}`)
    const data = await fetchResponse.json();
    response.status(200);
    response.send(data);
    }catch(err){
        response.status(401);
        console.error(err.message);
    }
})


app.post('/api/convert',async (request,response) => {
    try{
    const {from,to,amount} = request.body;
    console.log(from,to)
    const fetchResponse = await fetch(`https://v6.exchangerate-api.com/v6/8dcb557faca7fd22d6427c40/latest/${from}`)
    const data = await fetchResponse.json();
    const conversionRate = data.conversion_rates[to];
    console.log(conversionRate);
    const res = Math.floor(amount * conversionRate);
    response.send(JSON.stringify(res));
    }catch(err){
        response.status(400);
        console.log(err.message);
    }
})


app.listen(8080,(err) => {
    if(err){
        console.error("Error in creating server");
        return
    }else{
        console.log("Server is initialized in 8080")
    }
});