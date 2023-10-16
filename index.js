import express from "express";
import axios from "axios";
import bodyParser from "body-parser";

const port=3000;
const app=express();
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));
const ApiUrl1="https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=1";
const ApiUrl2="https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1"
const ApiUrl3="https://api.themoviedb.org/3/tv/top_rated?language=en-US&page=1"
const ApiUrl4="https://api.themoviedb.org/3/trending/all/week?language=en-US"
const yourBearerToken="eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwZDBlNDNmYjZjMjgxOWFiMmVlNjRjYzU3MDU2NGE0MSIsInN1YiI6IjY1MjgzNDQ3NjI5YjJjMDBlMjY2ZDEwZiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.Ai0NZaj37DTMfc1TsAUh2__GNn08Ri-e5t1E9rV5ELY"
const config = {
    headers: { Authorization: `Bearer ${yourBearerToken}` },
  };
app.get("/",async (req,res)=>{

    try{
        const response = await axios.get(ApiUrl4, config);
        const responseTwo = await axios.get(ApiUrl2, config);
        const responseThree = await axios.get(ApiUrl3, config);

        const result = response.data;
        const resultTwo = responseTwo.data;
        const resultThree=responseThree.data;
       
        res.render("index.ejs",{res1:result.results,res2:resultTwo.results,res3:resultThree.results});
    
    }catch(error)
    {
        console.error("Failed to make request:", error.message);
    }
   
});

app.get("/week",async (req,res)=>{
    try{
        const response = await axios.get(ApiUrl1, config);
        const responseTwo = await axios.get(ApiUrl2, config);
        const responseThree = await axios.get(ApiUrl3, config);

        const result = response.data;
        const resultTwo = responseTwo.data;
        const resultThree=responseThree.data;
       
        res.render("index.ejs",{res1:result.results,res2:resultTwo.results,res3:resultThree.results});
    
    }catch(error)
    {
        console.error("Failed to make request:", error.message);
    }
   
});
app.post("/search",async(req,res)=>
{
    try{
        console.log(req.body);
        const response = await axios.get(`https://api.themoviedb.org/3/search/movie?query=${req.body.find}&include_adult=false&language=en-US&page=1'`, config);
        const result = response.data;
        console.log(result);
        res.render("search.ejs",{res2:result.results});
    
    }catch(error)
    {
        console.error("Failed to make request:", error.message);
    }

});
app.listen(port,()=>
{
    console.log(`Server is running on port ${port}`);
})