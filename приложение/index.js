//подключаем пакет express in script
const express = require('express')
//подключаем пакет body-parser
const bodyParser = require('body-parser')

const weatherRequest = require('./requests/weather.request')
//переменная отвечает за всё приложение
const app = express()

app.set('view engine', 'ejs') //хотим установить параметр view engine на значение ejs
//метод позволяет использовать дополнительные опции в приложении
app.use(express.static('public')) // обозначаем статический путь 
app.use(bodyParser.urlencoded({extended: true}))//теперь в req.body будут данные 


app.get('/', (req, res) => { //при запрое на корневую страницу 
//нашего приложения мы рендерим файл index с расширением ejs
    res.render('index', {weather: null, error: null})
})

//обрабатываем POST запрос
app.post('/', async (req, res) => {
    //возвращаем ту же страницу, но с другими параметрами
    //console.log(req.body)//то что мы отправляем в запросе
    //деструктуризируем строчку выше 
    const { city } = req.body
    
   const {weather, error} = await weatherRequest(city) //подключили из другого файла
   res.render('index', {weather, error})//то как мы отвечаем на запрос
})

app.listen(3000, () => { //1 порт на котором будем слушать наше приложение; 2 callback
    console.log('Server has started on port 3000...')
}) 