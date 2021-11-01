const MongoClient = require('mongodb').MongoClient;
const cors = require('cors');
const express = require ('express');
const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded());
const uri = process.env.MONGODB_URI;
const port = process.env.PORT || 5000;

MongoClient.connect('mongodb+srv://Mongo_Nick:Vxxbgl8xP2758Tyg@servercluster.edziw.mongodb.net/survey_results?retryWrites=true&w=majority',
 { useUnifiedTopology:true})
    .then(client=>{
        console.log('connected to database')
        const db=client.db('survey_results')
        const resultsCollection=db.collection('results')

        app.post('/results/post', (req, res)=> {
            var data=req.body;
            resultsCollection.insertOne({
                Name: data.Name,
                Company: data.Company,
                City: data.City,
                Province: data.Province,
                Country: data.Country,
                RFV: data.RFV,
                Industry: data.Industry,
                WorkLocation: data.WorkLocation,
                TravelReq: data.TravelReq
            })
            .then(result => {
                res.sendStatus(200)
                console.log(result)
            })
            .catch(error => {
                res.sendStatus(500)
                console.error(error)})
        })

        app.get('/results/get', (req,res) => {
            db.collection('results').find().toArray()
            .then(results => {
                res.send(results)
                console.log(results)
            })
            .catch(error => {
                res.sendStatus(500)
                console.error(error)})
        })
    })
    .catch(console.error)


    app.listen(port, () => console.log('server available on http://localhost:5000'))
