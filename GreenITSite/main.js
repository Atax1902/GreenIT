const express = require('express')
const { readFileSync } = require('fs')
const app = express()
const port = process.env.PORT || 3000

const questions = JSON.parse(readFileSync('public/questions.json'))
const empreinteMax = questions.map(q => {
  if (q.type === 'Y/N') {
    return q.options[1]
  } else {
    return q.options[q.options.length-1][1]
  }
}).reduce((a, b) => a+b)
app.set('view engine', 'ejs');

app.use(express.static('./public'));
app.get('/', (req, res) => {
    res.render('pages/index', { questions, empreinteMax });
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
