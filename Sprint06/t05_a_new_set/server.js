const express = require('express');
const app = express();

app.use(express.static(__dirname));

app.get('/', (req, res) => {
    res.sendFile(`${__dirname}/index.html`);
});

const urlencodedParser = express.urlencoded({ extended: false });

app.post("/", urlencodedParser, function (request, response) {
    if (!request.body) {
        return response.sendStatus(400);
    }
    console.log(`Name: ${request.body.name}`);
    console.log(`Email: ${request.body.alias}`);
    console.log(`Age: ${request.body.age}`);
    console.log(`Description: ${request.body.description}`);
    console.log(`Photo: ${request.body.photo ? request.body.photo : 'No photo uploaded'}`);
    console.log("---------");
    response.send(` 
    <!DOCTYPE html><html lang="en"><head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="style.css">
    <title>A new set</title>
</head>
<body>
    <h1>New Avenger application</h1>
    <div class="art">
        <fieldset>
        <h2>Post</h2>
        Array
        <br>
        {
            <br>
            &nbsp;&nbsp;&nbsp;&nbsp;[name] => ${request.body.name} <br>
            &nbsp;&nbsp;&nbsp;&nbsp;[email] => ${request.body.alias} <br>
            &nbsp;&nbsp;&nbsp;&nbsp;[age] => ${request.body.age} <br>
            &nbsp;&nbsp;&nbsp;&nbsp;[description] => ${request.body.description} <br>
            &nbsp;&nbsp;&nbsp;&nbsp;[photo] => ${request.body.photo}<br>
        }
        </fieldset>
    </div>
    <br>
    <br>
    <fieldset>
    <form action="/" method="post">
            <fieldset>
                <legend>About candidate</legend>
                <span>Name</span>
                <input type="text" placeholder="Tell your name" autofocus name="name">
                <span>Email</span>
                <input type="text" placeholder="Tell your e-mail" name="alias">
                <span>Age</span>
                <input type="number" min="1" max="999" name="age">
                <br>
                <br>
                <span>About</span>
                <textarea placeholder="Tell about yourself, max 500 symbols" rows="5" cols="70" max="500"
                    name="description"></textarea>
                <br>
                <br>
                <span>Your photo</span>
                <input type="file" name="photo">
                <br>
            </fieldset>
            <br>
            <br>
            <input type="reset" value="CLEAR">
            <input type="submit" value="SEND">
        </form>
    </fieldset>
</body>
</html>
`);
});

app.listen(3000);

