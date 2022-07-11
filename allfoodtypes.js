var express = require('express');
var router = express.Router();
var pool=require("./pool")
var upload=require('./multer')

/* GET home page. */
router.post('/addfoodtypes',upload.any(), function(req, res, next) {
    console.log(req.files)
  
    pool.query("insert into allfoodtypes(restaurant_id, foodtype, foodimage, foodtypead, status ) values(?,?,?,?,?)",[req.body.restaurant_id,req.body.foodtype,req.files[0].originalname,req.files[1].originalname,req.body.status],function(error,result){

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

router.post('/updateFoodImage',upload.single('foodimage'),function(req,res){
 pool.query("update allfoodtypes set foodimage=? where foodtype_id=?",[req.file.originalname,req.body.foodtype_id],function(error,result){

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



 router.post('/updateFoodTypeAd',upload.single('foodtypead'),function(req,res){
    pool.query("update allfoodtypes set foodtypead=? where foodtype_id=?",[req.file.originalname,req.body.foodtype_id],function(error,result){
   
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






 router.post('/deleteallfoodtypes',function(req,res){
    pool.query("delete from allfoodtypes where foodtype_id=?",[req.body.foodtype_id],function(error,result){
   
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
   
   



router.post('/editallfoodtypes', function(req, res, next) {
    console.log(req.files)
  
    pool.query("update allfoodtypes set foodtype=?, status=? where foodtype_id=?" ,[req.body.foodtype,req.body.status,req.body.foodtype_id],function(error,result){

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


router.post("/listallfoodtypesbyrestaurant",function(req,res){
    pool.query("select * from allfoodtypes where restaurant_id=?",[req.body.restaurant_id],function(error ,result){
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






router.get("/listallfoodtypes",function(req,res){
    pool.query("select * from allfoodtypes",function(error ,result){
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

/*
router.post('/chklogin', function(req, res, next) {
    pool.query("select * from restaurant where (emailaddress=? or mobilenumber=?) and password=?",[req.body.emailid,req.body.emailid,req.body.password],function(error,result){
        if(error)
        {res.status(500).json({result:false})}
        else
        { if(result.length==1)
            res.status(200).json({result:true})
        else
        res.status(200).json({result:false})}
        
    })
 
});*/






module.exports = router;
