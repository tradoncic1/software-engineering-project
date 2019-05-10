const express = require ('express');
const router = express.Router();
const mongoose = require ('mongoose');

var Ticket = require ('../modules/ticket');
var User = require ('../modules/user');
const jwt = require ('jsonwebtoken');

var userid = '';
var userrole = '';


// list of valid values for status field
router.get('/statuslist', function (req,res) {
    res.send (Ticket.schema.path('status').enumValues);
});

// ticket statuses
router.get('/overview', function (req,res) {
    Ticket.aggregate([{"$group": {_id:"$status", count:{$sum:1}}}])
        .exec(function (err,ticketstatus){
                        if (err) {
                            res.send (err);
                            return;
                        } else {
                            res.send (ticketstatus);
                        }
        });
});



// list of all tickets
router.get('/',checkToken, function (req,res) {
    // initial criteria for ticket list is that the ticket is created or added to a user
    var query = { "$or":[{"assignedto":userid},{"author":userid}]};
    
    // if the user is a manager or admin, the previous condition is nulled, the list returns all values
    if (userrole == 'admin' || userrole=="manager") {
        query = {};
    }

        Ticket.find(query, function (err,tickets){
            if (err) {
                res.send(err);
            } else {
                res.send(tickets)
            }
    
        });
    });

    
router.get('/:id', checkToken,function (req,res) {
            console.log(req.params.id);
            Ticket.findOne({_id:req.params.id}, function (err,ticket){
                if (err) {
                    res.send(err);
                } else {
                    res.send(ticket)
                }
        
            });
});  
    
    
// new ticket entry
router.post('/',checkToken ,function (req,res) {
           ticket = new Ticket ( {
               subject : req.body.subject,
               description : req.body.description,
               author:  userid
              }
           );
        
            ticket.save(function (err,ticket){
                if (err) {
                    res.send(err);
                } else {
                    res.send(ticket);
                }
        
            });
    });
    
// ticket deletion
router.delete('/:id', checkToken, function (req,res) {
    var query = {_id:req.params.id};
    Ticket.findOneAndDelete (query,function(err, ticket) {
        if (err) {
            res.send(err);    
        } else {
            res.send(ticket);
        }
    });
});
    
// ticket update
router.put('/:id',checkToken,  function (req,res) {
    var query = {_id:req.params.id};
    console.log(req.body.notes);

    Ticket.findOneAndUpdate (query,
                           {subject: req.body.subject,
                            description:req.body.description,
                            notes : req.body.notes,
                            status : req.body.status,
                            assignedto : mongoose.Types.ObjectId (req.body.assignedto)
                           },                           
            function(err,ticket) {
        if (err) {
            res.send(err);    
        } else {
            res.status(200).send(ticket);
        }
    });
});


function checkToken (req,res,next){
    jwt.verify (req.headers.authorization,'aminasifra',function (err,decoded) {
      if (err) {
         res.status(401).send('Authorization error!!');
      } else {
		 userid = mongoose.Types.ObjectId (decoded._id);
		 userrole = decoded.role;
         return next();
      } 
    });
};
    
module.exports = router;
