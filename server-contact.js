let express = require('express');
let app = express();
const path = require('path');

// Static Folder
app.use(express.static(__dirname +'/public/dist'));

//Morgan
let morgan =  require('morgan');
// app.use(morgan('dev'));

// Monogo Databse
let mongoose = require("mongoose");
mongoose.connect('mongodb://localhost/contactsSchema', { useMongoClient: true });
let ContactSchema = new mongoose.Schema({
    first_name:{type:String, require:true},
    last_name:{type:String, require:true},
    phone:{type:String, require:true},
    email:{type:String, require:true},
    eitable:{type:Boolean, require:true},
})

// Define contact model
mongoose.model("Contact",ContactSchema);
// Get contact model
let Contact =  mongoose.model("Contact");


//Body parser
let bodyParser =  require("body-parser");
// run body parser
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.use(function(req, res, next) {
    res.header('Access-Control-Allow-Credentials', true);
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, DELETE');
    res.header('Access-Control-Allow-Headers', 'appid, X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept');
    next();
});

/**
 * Create New contact
 */
app.get('/contacts', (req, res, next) =>{ 
    Contact.find({}, (err, contacts)=>{
        return res.json(contacts);
    });
})

/**
 * Create new contact
 */
app.post('/contacts',(req, res, next) =>{
    delete req.body._id
    console.log('Server > POST > contact', req.body);
    Contact.create(req.body, (err,contact)=>{
        if(err){
            return res.json(err);
        }
        else{
            return res.json(contact);
        }
    });
})

/**
 * Delete contact
 */
app.delete('/contacts/:id', (req, res, next)=> {
    let contactId = req.params.id;
    // TODO should remove and for dev for testing e2e
    console.log('Server > DELETE ',  contactId); 
    if(contactId=='all'){
        Contact.remove();
    }
    else {
        Contact.deleteOne({_id:contactId},(status)=>{
            return res.json(status);
        });
    }
    
})


/**
 * Allow to Angular Project
 */
app.all("/", (req, res, next) => {
    res.sendfile(path.resolve("./public/dist/index.html"));
})

// Configure the node server
app.listen(1337, () => console.log("Server is running 1337"))