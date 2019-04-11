const {app} = require('./app')
const port = 8002
// process.env.PORT || 8002;

app.get('/', (req, res) => {
  res.json('Hello world');
})

app.listen(port, ()=>{
  console.log(`Listening. TrainerU on port: ${port}`)
})