const app = require('./app')

const port = process.env.PORT;
const host = process.env.HOSTl;

app.listen(port, host, ()=> {
    console.log(`server listening on http://${host}:${port}`)
})