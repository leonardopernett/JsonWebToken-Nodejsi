const app = require('./app')
require('./database.js')
async function init(){

    await app.listen(app.get('port'))
    console.log('server on port 3000')
}

init()