
generate package.json
npm init -y

npm install express - the most popular api for node


node sintax for import
const http = require('http');
instead import something from '...'
the second one is for front end.

----------

kogato pravim post request pravilniq kod za vra6tane e 201 ne 200
router.post('/', (req, res, next) => {
    res.status(201).json({
        message: 'Handling POST requests to /products'
    })
});

---

important package - 
npm install --save-dev nodemon

za da ne ni se nalaga da restartirame syrvyra vseki pyt kogato pravim promeni po koda a avtomati4no 
promenite da se otrazqvat.

--save-dev sled install comandata ozna4ava da se zapi6e v package.json

------

npm install --save morgan

----------

how we can handle cors errors:
npm install --save body-parser

cors - cross-origin-resource-sharing

za6to ne moga da polu4avam tezi cors gre6ki prez post man - za6toto post man e prosto testing tool,
ne e browser. I post man ne go e grija za tezi cors prosto se testva.

-------

install mongose
npm install --save mongoose

connect url address: mongodb+srv://bshopov:<password>@cluster0.shle3qk.mongodb.net/?retryWrites=true&w=majority

--------------

rabota s failove

npm install --save multer

prilojen e vav faila za producti v routes

const multer = require('multer');
//initialise
//dest - kyde da se uploudva
const upload = multer({dest: 'uploads/'});

----------