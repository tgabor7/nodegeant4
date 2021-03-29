const request = require('request');
const fs = require('fs');
const bcrypt = require('bcrypt');
const mongoose = require('mongoose');
const UserModel = require('./userModel');
const MaterialList = require('./MaterialList');
const fetch = require('node-fetch')

// async function f() {
//     // mongoose.connect("mongodb://localhost/users", {useNewUrlParser: true});
//     // const salt = await bcrypt.genSalt(10);
//     // const hashedPassword = await bcrypt.hash("admin",salt);
//     // const user = new UserModel({
//     //     name: "admin",
//     //     password: hashedPassword
//     // });
//     // user.save().then(data => {
//     //     console.log("success");
//     // })
//     // .catch(err => {
//     //     console.log(err);
//     // });
    
//     let response = await fetch("http://localhost:9000/geometryAPI/get", {
//       headers: {
//         'Accept': 'application/json',
//         'Content-Type': 'application/json'
//       },
//       method: 'GET'
//     });
//     let json = await response.json();
//     console.log(json);
// }
// f();
// let modelData = fs.readFileSync("cube.stl");

// request.get('http://localhost:9000/geometryAPI/get/').on('response', response =>{
//     console.log(response);
// });

// request.post('http://localhost:9000/geometryAPI/add', {
//     json: {
//         name: 'torus',
//         data: modelData
//     }
// }, (error, res, body) => {
//         if (error) {
//           console.error(error)
//           return
//         }
//         console.log(`statusCode: ${res.statusCode}`)
//         console.log(body)
// });
// for(var i = 0;i<MaterialList.materials.length;i++){
//     request.put('http://localhost:9000/elementAPI/create', {
//         headers: {
//          "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2MTM0MjI5NTZ9.XFVeD3DsndusHzYQsO7yGH7ZSlr4ltk8_i--o3MD3X8   "
//         },
//         json: {
//             name: MaterialList.materials[i].name,
//             g4name: 'G4_' + MaterialList.materials[i].symbol,
//             z: MaterialList.materials[i].z,
//             symbol: MaterialList.materials[i].symbol
//         }
//     }, (error, res, body) => {
//             if (error) {
//             console.error(error)
//             return
//             }
//             console.log(`statusCode: ${res.statusCode}`)
//             console.log(body)
//     });
// }
// for(var i = 0;i<MaterialList.compounds.length;i++){
//     request.put('http://localhost:9000/compoundAPI/create', {
//         headers: {
//          "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2MTM0Njk5OTJ9.ngb_8aFHj8BYNoYr6MoM32cFLJ82HMpOp82oiOBAz5Y"
//         },
//         json: {
//             name: MaterialList.compounds[i],
//             g4name: 'G4_' + MaterialList.compounds[i]
//         }
//     }, (error, res, body) => {
//             if (error) {
//             console.error(error)
//             return
//             }
//             console.log(`statusCode: ${res.statusCode}`)
//             console.log(body)
//     });
// }
// for(var i = 0;i<MaterialList.sources.length;i++){
//     request.put('http://localhost:9000/sourceAPI/create', {
//         headers: {
//          "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2MTM0Njk5OTJ9.ngb_8aFHj8BYNoYr6MoM32cFLJ82HMpOp82oiOBAz5Y"
//         },
//         json: {
//             name: MaterialList.sources[i]
//         }
//     }, (error, res, body) => {
//             if (error) {
//             console.error(error)
//             return
//             }
//             console.log(`statusCode: ${res.statusCode}`)
//             console.log(body)
//     });
// }
// async function f(){
//     let result = await fetch("http://localhost:9000/elementAPI/get",{
//         json: {
//             symbol: ""
//         },
//         method: 'GET',
//         }, (error, res, body) => {
//             if (error) {
//             console.error(error)
//             return
//             }
//             console.log(`statusCode: ${res.statusCode}`)
//             console.log(body)
//     });
//     let json = await result.json();
//     alert(json);
// }
// f();
// let modelData = fs.readFileSync("sphere.stl");
// request.post('http://localhost:9000/geometryAPI/add', {
//     json: {
//         name: 'sphere',
//         data: modelData
//     }
// }, (error, res, body) => {
//         if (error) {
//           console.error(error)
//           return
//         }
//         console.log(`statusCode: ${res.statusCode}`)
//         console.log(body)
// });

var SMTPServer = require('smtp-server').SMTPServer;

var server = new SMTPServer({
    onData: function(stream, session, callback) {
        console.log('received');
    }
});

server.listen(465);
console.log('listening');

var nodemailer = require('nodemailer');

//smtp transport configuration
var smtpTransport = nodemailer.createTransport({
    host: "localhost",
    port: 465,
    auth: {
        user: "",
        pass: ""
    }
});

//Message
var message = {
    from: "me@radsim.inf.elte.hu",
    replyTo: "me@radsim.inf.elte.hu",
    to: "tgabor7@gmail.com",
    subject: "hello"
};

console.log('Sending Mail');
// Send mail
smtpTransport.sendMail(message, function(error, info) {
    if (error) {
        console.log(error);
    } else {
        console.log('Message sent successfully!');
        console.log('Server responded with "%s"', info.response);
    }
    console.log('Closing Transport');
    smtpTransport.close();
});