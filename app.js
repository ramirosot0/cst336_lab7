const express = require("express");
const app = express();
app.set("view engine", "ejs");
app.use(express.static("public"));// folder for images, css, js



const request = require('request');//used to create a request but -first: npm i request

//reoutes
app.get("/", async function (req, res) {

   // let parseData =  await getImages("otters");
   //
   // console.dir("parseData: " + parseData); //display content of the object
   //
   // res.render("index", {"image": parseData.hits[0].largeImageURL});
   console.dir(req);
  // let keyword = req.query.keyword;//gets the value that the user typed in the form using GET method
  // let ori = req.query.orienta;
   //console.log(ori);

   let parseData = await getImages("otter", "horizontal");

   res.render("index", {"image":parseData})




});//root route

app.get("/results", async function (req, res) {

   console.dir(req);
   let keyword = req.query.keyword;//gets the value that the user typed in the form using GET method
   let ori = req.query.orienta;
   //console.log(ori);

   let parseData = await getImages(keyword, ori);

   res.render("results", {"images":parseData})

});//result route

//returns data from pixabay API as JSON format
function getImages(keyword, orienta){

   return new Promise(function (resolve, reject) {
      request('https://pixabay.com/api/?key=13947455-26745dbfad73eb069381e3731&q='+keyword+'&orientation='+orienta, function (error, response, body) {

         if (!error && response.statusCode == 200){// no issues

            let parseData = JSON.parse(body);//converts string info to json
            resolve(parseData);

            //let randomIndex = Math.floor(Math.random() * parseData.hits.length);
            //res.send(`<img src= '${parseData.hits[randomIndex].largeImageURL}'>`);
            //res.render("index", {"image": parseData.hits[randomIndex].largeImageURL});

         }
         else {
            reject(error);
            console.log(response.statusCode);
            console.log(error);
         }
      });//result
   });



}


//server listener
// app.listen("8081", "127.0.0.1", function () {
//    console.log("Express server is running...");
// });

//heroku listener
app.listen(process.env.PORT, process.env.IP, function () {
    console.log("Running Express Server...");
});
