const {app} = require('./app')
const port = 8002;
// process.env.PORT ||

app.listen(port, ()=>{
  console.log(`Listening. TrainerU on port: ${port}`)
})