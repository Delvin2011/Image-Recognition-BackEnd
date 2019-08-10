const http = require('http');

const server = http.createServer((request,response) => {//response is the Server response
    console.log('headers', request.headers);
    console.log('method', request.method);
    console.log('url', request.url);

    const user = {
        name: 'Tkay',
        surname: 'Mular'
    }
    //response.setHeader('Content-Type','text/html')
    //response.end('<h1>Heloo Mr Developer</h1>');

    response.setHeader('Content-Type','application/json') //
    response.end(JSON.stringify(user)); //in the front end, we run parse to convert back into Javascript.
    
    //console.log('I hear you, thanks for the request');
})

server.listen(3000);