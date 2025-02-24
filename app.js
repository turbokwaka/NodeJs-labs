const express = require('express')
const app = express()
const port = 3000

// При відправці гет-реквесту, перейшовши на сторінку locahost:3000, висвітиться текст Hello World!
app.get('/', (req, res) => {
    res.send('Hello World!')
})

// Висвітиться в консолі при запуску проєкту
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})