var path = require('path');

module.exports = {
    env: process.env.NODE_ENV,

    // Root path of server
    root: path.normalize(__dirname + '/../../..'),


    // Server port
    port: process.env.PORT || 9000,

    // Server 
    ip: process.env.IP || '0.0.0.0',

    // cors whitelist urls 
    whitelistURLs: ["http://localhost:4200"],

    mongo: {
        uri: 'mongodb+srv://dbuser:VGvjwZgdolhLH9F2@code-ai-cluster-jhecs.mongodb.net/chat_db?retryWrites=true&w=majority',
        options: {
            useNewUrlParser: true,
            db: {
                safe: true
            }
        }
    },
    redis:{
        port : 14915,
        host:"redis-14915.c51.ap-southeast-2-1.ec2.cloud.redislabs.com",
        options:{
          auth_pass: "kTeDCw4m73x4GiFxSLQ0TeCzZWpIwcKJ"
        }
      },
}