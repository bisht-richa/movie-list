const express = require('express');
const router = express.Router();
const axios = require('axios')

require('dotenv').config()
const api_keys = process.env.API_KEY

const data = async () => {
    const urlData = 'https://www.omdbapi.com/?s=city&apikey=e730671f'
    const request = await axios.get(urlData)
    const response = await request.data
    return response
}

const validateKey = (req, res, next) => {
  let api_key = req.headers['x-api-key']
  if (api_key == api_keys ) {
      next()
  } else {
      res.status(403).send({ error: { code: 403, message: 'You are not allowed.' } });
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
      res.status(200).send(searchResult)
    })
  } else {
    res.status(200).send("Null")
  }
})

module.exports = router;