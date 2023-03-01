var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');

// conecting db/ app confi
mongoose.connect('mongodb://localhost:27017/Subject',{
  useNewUrlParser: true,
  useCreateIndex:true,
  useFindAndModify:false
});
//create collection
let SubjectSchema = mongoose.Schema({
  
  MaMH:{
    type: String,
  },
  TenMH:{
    type: String,
  },
  description:{
    type: String,
  }
})
let Subject = mongoose.model('Subject', SubjectSchema);

/* GET home page. */
router.get('/', function(req, res, next) {
  Subject.find({},(error, data)=>{
    console.log("danh sách lớp", data);
    res.render('index', { Subjects: data });
  });
});

//form add
router.get('/form-add', function (req, res, next){
  res.render('form-add', {});

})
router.post('/add',function(req, res, next){
  Subject.create(req.body);
  res.redirect('/')
})
router.get('/form-update/:id', function(req, res, next){
  Subject.findById(req.params.id, (error, data)=>{
    res.render('form-update', {Subject: data});
  });
});
router.post('/update', function(req, res, next){
  console.log(req,body);
  Subject.findById(req.body.id, req.body, (error, data)=>{
    res.redirect('/');
  });
});
router.get('/form-delete/:id', function(req, res, next){
  Subject.findByIdAndDelete(req.params.id, (error, data)=>{
    res.redirect('/');
  });
});
module.exports = router;
