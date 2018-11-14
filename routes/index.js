var express = require('express');
var router = express.Router();


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });

  
  
});

router.post('/api/swarm',(req,res,next)=>{

  
  res.send(req.body)
 
   req.io.emit("checkin",req.body.checkin)
 
})
router.get('/api',(req,res,next)=>{

  console.log(req.body)
  res.send(req.body)

})
 



module.exports = router;
