const express = require('express');
const router = express.Router();
const axios = require('axios')
// const validateKey = require('../middleware/apikeys');

const data = async () => {
    const urlData = 'https://www.omdbapi.com/?s=city&apikey=e730671f'
    const request = await axios.get(urlData)
    const response = await request.data
    return response
}

const validateKey = (req, res, next) => {
    let api_key = req.headers['x-api-key']
    console.log(api_key)
    if (api_key == '95e41df0-5848-42f9-b3c7-e765753bffd0' ) {
        next()
    } else {
        res.status(403).send({ error: { code: 403, message: 'You not allowed.' } });
    }
}

router.get('/', validateKey, (req, res, next) => {
    data()
    .then(result => {
        res.status(200).send(result)
    })
})

router.get('/search', (req, res, next) => {
    const searchQuery = req.query.q
    var searchResult = []
    
 if (searchQuery) {
    data()
    .then(result => {
        
       var searchResult = result.Search.filter((ele) => {
            if (ele.Title.toLowerCase().includes(searchQuery.toLowerCase())){
                return ele
            }
        })
        console.log(searchResult)
        res.status(200).send(searchResult)
    })
 } else {
    res.status(200).send("Null")
 }

})

module.exports = router;