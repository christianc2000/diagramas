const { Router } = require('express');
const router = Router();
const admin = require('firebase-admin');

var serviceAccount = require('../../node-firebase-example-5d2cf-firebase-adminsdk-7nll4-847c3de79e.json');

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: 'https://node-firebase-example-5d2cf-default-rtdb.firebaseio.com/'
});

const db = admin.database();


router.get('/', (req, res) => {
    db.ref('contacts').once('value', (snapshot) => {
        const data = snapshot.val();
        res.render('index', { contacts: data });
    });

});
router.post('/new-contact', (req, res) => {
    console.log(req.body);
    const newContact = {
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        email: req.body.email,
        phone: req.body.phone,
    }
    db.ref('contacts').push(newContact);
    res.redirect('/');
});

router.get('/delete-contact/:id',(req,res)=>{
      db.ref('contacts/'+req.params.id).remove();

      res.redirect('/');
});

router.get('/lienzo',(req,res)=>{
   res.render('lienzo');
});
module.exports = router; 