var express = require('express');
var router = express.Router();
var pool=require("./pool")
var upload=require('./multer')

/* GET home page. */
router.post('/addfooditems',upload.any(), function(req, res, next) {
    console.log(req.files)
  
    pool.query("insert into allfooditems(restaurant_id, foodtype_id, fooditem, price, offer, offertype, fooditemtype, ingredients, rating, fooditemimage) values(?,?,?,?,?,?,?,?,?,?)",[req.body.restaurant_id,req.body.foodtype_id,req.body.fooditem,req.body.price,req.body.offer,req.body.offertype,req.body.fooditemtype,req.body.ingredients,req.body.rating,req.files[0].originalname],function(error,result){

        if(error)
        { console.log(error)
            res.status(500).json({result:false})
        }
        else
        {
            res.status(200).json({result:true})
        }
        


    })



});

router.post('/updateFoodItemImage',upload.single('fooditemimage'),function(req,res){
 pool.query("update allfooditems set fooditemimage=? where fooditem_id=?",[req.file.originalname,req.body.fooditem_id],function(error,result){

    if(error)
    { console.log(error)
        res.status(500).json({result:false})
    }
    else
    {
        res.status(200).json({result:true})
    }
    
})




 })    


 router.post('/deleteallfooditems',function(req,res){
    pool.query("delete from allfooditems where fooditem_id=?",[req.body.fooditem_id],function(error,result){
   
       if(error)
       { console.log(error)
           res.status(500).json({result:false})
       }
       else
       {
           res.status(200).json({result:true})
       }
       
   })
   
   
   
   
    })    
   
   



router.post('/editallfooditems', function(req, res, next) {
    console.log(req.files)
  
    pool.query("update allfooditems set restaurant_id=?, foodtype_id=?, fooditem=?, price=?, offer=?, offertype=?, fooditemtype=?, ingredients=?, rating=? where fooditem_id=?" ,[req.body.restaurant_id,req.body.foodtype_id,req.body.fooditem,req.body.price,req.body.offer,req.body.offertype,req.body.fooditemtype,req.body.ingredients,req.body.rating,req.body.fooditem_id],function(error,result){

        if(error)
        { console.log(error)
            res.status(500).json({result:false})
        }
        else
        {
            res.status(200).json({result:true})
        }
        


    })



});






router.get("/listallfooditems",function(req,res){
    pool.query("select * from allfooditems",function(error ,result){
    if(error)
    {
        res.status(500).json([])
    }    
    else
    {
        res.status(200).json(result)
    }

    })
})








router.post("/listallfooditemsbyfoodtype",function(req,res){
    pool.query("select * from allfooditems where foodtype_id=?",[req.body.foodtype_id],function(error ,result){
    if(error)
    {
        res.status(500).json([])
    }    
    else
    {
        res.status(200).json(result)
    }

    })
})




router.post("/listfooditemsoffer", function (req, res) {
    pool.query(
      "select * from allfooditems where restaurant_id=? and offer>0",[req.body.restaurant_id],
      function (err, result) {
      
        if (err) {
            console.log(err)
          res.status(500).json([]);
        } else {
          res.status(200).json(result);
        }
      }
    );
  });


/////Search  In  Header 
  router.post("/searchfooditems", function (req, res) {
    var q="select * from allfooditems F where F.fooditem like '%"+req.body.value+"%'"
    console.log(q)
    pool.query(
      q,
      
      function (err, result) {
        // pool.query("select * from fooditems",function(err,result){
        if (err) {
          console.log(err);
          res.status(500).json([]);
        } else {
          res.status(200).json(result);
        }
      }
    );
  });


  

  

router.get("/displayall",function(req,res){
  pool.query("select * from allfooditems",function(error ,result){
  if(error)
  {
      res.status(500).json([])
  }    
  else
  {
      res.status(200).json(result)
  }

  })
})










module.exports = router;
