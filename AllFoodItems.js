import React,{useEffect, useState} from "react"

import MaterialTable from "material-table"

import { makeStyles } from '@material-ui/core/styles';



import Dialog from '@material-ui/core/Dialog';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';

import Typography from '@material-ui/core/Typography';

import Slide from '@material-ui/core/Slide';

import TextField from "@material-ui/core/TextField"
import Grid from "@material-ui/core/Grid"

import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Button from '@material-ui/core/Button';

import renderHTML from "react-render-html"
import swal from 'sweetalert';

import FormControl from '@material-ui/core/FormControl';
import Avatar from '@material-ui/core/Avatar';
import Select from '@material-ui/core/Select';
import IconButton from '@material-ui/core/IconButton';
import PhotoCamera from '@material-ui/icons/PhotoCamera';
import {ServerURL, getData,postData, postDataAndImage} from "../../FetchNodeServices";


//import {isEmpty,isAlphabets} from '../Checks'


import Snackbar from '@material-ui/core/Snackbar';
import CloseIcon from '@material-ui/icons/Close';
import { AllFooditems } from "@material-ui/icons";

//var otpGenerator = require('otp-generator')







const useStyles = makeStyles((theme) => ({
    root:{
    display:'flex',
    justifyContent:'center',
    alignItems:'center',
    marginTop:20,
    padding:10
    
  },
  
    subdiv:{
        width:1000,
        background:'#ecf0f1',
        padding:10
    },

    appBar: {
      position: 'relative',
    },
    title: {
      marginLeft: theme.spacing(2),
      flex: 1,
    },

    formControlfooditem: {
      minWidth:485,
    },

    
    formControl: {
      minWidth:350,
    },

    input: {
      display: 'none',
    },

}));

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});


export default function AllFoodItems() {
    const classes =useStyles();
    const [list,setList]=useState([])
    const [btnFoodItemImage,setBtnFoodItemImage]=useState(false)

    const [dopen, dsetOpen] = React.useState(false);
    const [open, setOpen] = React.useState(false);



    const [FoodItemImage,setFoodItemImage]=useState({bytes:'',file:'/noimage.jpg'})
 
    const [getFoodItem,setFoodItem]=useState([])
    const [getFoodTypes,setFoodTypes]=useState([])
    const [getRowData,setRowData]=useState([])

   // const [getCity,setCity]=useState([])
   
    const [restaurant_id,setrestaurant_id]=useState("")
    const [foodtype_id,setfoodtype_id]=useState("")
    const [fooditem_id,setfooditem_id]=useState("")
    const [foodtype,setfoodtype]=useState("")
  
    const [fooditem,setfooditem]=useState("")
    const [price,setprice]=useState("")
    const [offer,setoffer]=useState("")
    const [offertype,setoffertype]=useState("")
    const [fooditemtype,setfooditemtype]=useState("")
    const [ingredients,setingredients]=useState("")
    const [rating,setrating]=useState("")

    const [errorMessage,setErrorMessage]=useState("")



    const fetchFoodTypes=async()=>{
      var list=await getData("allfoodtypes/listallfoodtypes")
    
     setFoodTypes(list)
 
     }
 
     const fillFoodTypes=()=>{
       return(
 
       getFoodTypes.map((item,index)=>{
         return(<MenuItem value={item.foodtype_id}>{item.foodtype}</MenuItem>)
 
 
         })
       )
 
     }
 
     
     const handleFoodTypeChange= async(event)=>{
     //  alert(event.target.value)
     setfoodtype_id(event.target.value);
   
   //  fetchFoodItem(event.target.value)
     
     };

   /*  const fetchFoodItems=async(foodtype_id)=>
     {
      var body={foodtype_id:foodtype_id };
      var list=await postData('fooditems/fetchfooditems',body)
      setFoodItem(list)
     }
 
     const fillFoodItems=()=>{
       return(
 
         getFoodItem.map((item,index)=>{
 
         return(<MenuItem value={item.fooditem_id}>{item.fooditem}</MenuItem>)
         })
       )
 
     }  */


 
   /*  const handleFoodItemImage=(event)=>{
       alert(URL.createObjectURL(event.target.files[0]));
       setFoodItemImage({bytes:event.target.files[0],
         file:URL.createObjectURL(event.target.files[0]),
       });
     };
  */


     const handleSubmit=async()=>{ 
 
    /*   var msg=""
       var err=false
       if(isEmpty(restaurantName))
       {err=true;
         msg+="<b>Restaurant Name Should Not Be Empty.....<b><br>"
       
       }
 
       if(isEmpty(ownerName))
       {err=true;
         msg+="<b>Owner Name Should Not Be Empty.....<b><br>" 
       }
 
       if(!isAlphabets(ownerName))
       {err=true;
         msg+="<b>Owner Name Must Contains Alphabets Only....<b><br>"   
       }
 
       if(err)
       {
         setErrorMessage(msg)
         setOpen(true)
       }
 
 
 
       if(!err)
     */  
 
 
    
     //alert(otp)
    
    var body={"fooditem_id":getRowData.fooditem_id,
    "restaurant_id":restaurant_id,
     'foodtype_id':foodtype_id,
     'fooditem':fooditem,
     'price':price,
     'offer':offer,
     'offertype':offertype,
     'fooditemtype':fooditemtype,
     'ingredients':ingredients,
     'rating':rating,
    }
    
     
     var res=await postData(
       "allfooditems/editallfooditems",body);
      
    // alert(res.result)
 
    if(res.result)
    {
 
     swal({
       title: "New FoodItems Edit Successfully",
       icon: "success",
       dangerMode: true,
     })
 
    }
    else
    {
     swal({
       
       title: "Fail to Add New FoodItems",
       icon: "warning",
       dangerMode: true,
     });
    }
 
     };
 


    const fetchFoodItem=async()=>{
      var result=await getData('allfooditems/listallfooditems')
      setList(result)
    };


  const handleDClose=()=>{
    dsetOpen(false)

  };


  const handleDelete=async()=>{

   
   var body={"fooditem_id":getRowData.fooditem_id}
   
    
    var res=await postData(
      "allfooditems/deleteallfooditems",
      body

      );
   // alert(res.result)

   if(res.result)
   {

    swal({
      title: "All FoodItems Deleted Successfully",
      icon: "success",
      dangerMode: true,
    })

   }
   else
   {
    swal({
      title: "Fail to Delete Record",     
      icon: "warning",
      dangerMode: true,
    });
   
  }
  }
  const handleRefresh=()=>
  {
    dsetOpen(false)
    fetchFoodItem()
  }



  const handleSaveFoodItemImage=async()=>{
    var formData=new FormData()
    formData.append("fooditem_id",getRowData.fooditem_id,)
    formData.append("fooditemimage",FoodItemImage.bytes);
    var config = {headers: {"content-type": "multipart/form-data"}}
    var res =await postDataAndImage(
      "allfooditems/updateFoodItemImage",
      formData,
      config
    );
    //alert(res.result)
    if (res.result){
      swal({
        title: "Food Item Image Update Successfully",
        icon: "success",
        dangerMode: true,
      });
    } 
    else {
      swal({
        title: "Fail to Update Image",

        icon: "warning",
        dangerMode: true,


      });
    }
   
   setBtnFoodItemImage(false)
  }



  
  const handleFoodItemImage=(event)=>{ setFoodItemImage({
    bytes:event.target.files[0],
    file:URL.createObjectURL(event.target.files[0])
  })
  setBtnFoodItemImage(true)

  }



  const handleDOpen=(data)=>{
   // fetchCities(data.state)
    setrestaurant_id(data.restaurant_id)
    setfoodtype_id(data.foodtype_id)
    setfooditem(data.fooditem)
    setprice(data.price)
    setoffer(data.offer)
    setoffertype(data.offertype)
    setfooditemtype(data.fooditemtype)
    setingredients(data.ingredients)
    setrating(data.rating)


    setFoodItemImage({bytes:"",file:`${ServerURL}/images/${data.fooditemimage}`})

    setRowData(data);
    dsetOpen(true);
   
  };

    const showEditDialog=()=>{
      return (
        <div>
         
          <Dialog fullScreen open={dopen} onClose={handleDClose} TransitionComponent={Transition}>
            <AppBar className={classes.appBar}>
              <Toolbar>
                <IconButton edge="start" color="inherit" onClick={handleRefresh} aria-label="close">
                  <CloseIcon />
                </IconButton>
                <Typography variant="h6" className={classes.title}>
                  FoodItems Details
                </Typography>
              
                <Button autoFocus color="inherit" onClick={handleSubmit}>
                  Edit
                </Button>
                <Button autoFocus color="inherit" onClick={handleDelete}>
                  Delete
                </Button>

              </Toolbar>
            </AppBar>



            <div className={classes.root}>
        <div className={classes.subdiv}>
        <Grid container spacing={1}>



        <Grid item xs={12}>
        <TextField label="restaurant_id"
        value={restaurant_id}
        onChange={(event)=>setrestaurant_id(event.target.value)} fullWidth
         variant="outlined" />    
        </Grid>


        <Grid item xs={12}>
        <TextField label="foodtype_id"
        value={foodtype_id}
        onChange={(event)=>setfoodtype_id(event.target.value)} fullWidth
         variant="outlined" />    
        </Grid>



        <Grid item xs={12} sm={6}>
        <FormControl variant="outlined" className={classes. formControlfooditem}>
        <InputLabel>FoodTypes</InputLabel>
        <Select
         
          value={getRowData.foodtype_id}
          onChange={(event)=>handleFoodTypeChange(event)}
          label="FoodType"
          fullWidth
        >

          {fillFoodTypes()}
         
       
        </Select>
      </FormControl>      
        </Grid>   







        <Grid item xs={12} sm={6}>
        <TextField 
        label="Food Item"
         fullWidth
         value={fooditem}
          variant="outlined" 
         onChange={(event)=>setfooditem(event.target.value)} />    
        </Grid>    
       
       
        <Grid item xs={12} sm={6}>
        <TextField 
        label="Price"
         fullWidth
         value={price}
          variant="outlined" 
         onChange={(event)=>setprice(event.target.value)} />    
        </Grid>    
       


        <Grid item xs={12} sm={6}>
        <TextField 
        label="Offer"
         fullWidth
         value={offer}
          variant="outlined" 
         onChange={(event)=>setoffer(event.target.value)} />    
        </Grid>    
       

        <Grid item xs={12} sm={6}>
        <TextField 
        label="Offer Type"
         fullWidth
         value={offertype}
          variant="outlined" 
         onChange={(event)=>setoffertype(event.target.value)} />    
        </Grid>    
       

        <Grid item xs={12} sm={6}>
        <TextField 
        label="FoodItemType"
         fullWidth
         value={fooditemtype}
          variant="outlined" 
         onChange={(event)=>setfooditemtype(event.target.value)} />    
        </Grid>    
       


        <Grid item xs={12} sm={6}>
        <TextField 
        label="Ingredients"
         fullWidth
         value={ingredients}
          variant="outlined" 
         onChange={(event)=>setingredients(event.target.value)} />    
        </Grid>    
       


        <Grid item xs={12} sm={6}>
        <TextField 
        label="Rating"
         fullWidth
         value={rating}
          variant="outlined" 
         onChange={(event)=>setrating(event.target.value)} />    
        </Grid>    
       

         
      
        <Grid item xs={12} >
          <div style={{display:'flex' ,flexDirection:'row',justifyContent:'center',alignItems:'center'}} >
        <input accept="image/*" className={classes.input} id="icon-button-act" type="file"
         multiple
         onChange={ (event) =>handleFoodItemImage(event)
         
        }
        />
      <label htmlFor="icon-button-act">
        <IconButton color="primary" aria-label="upload picture" component="span">
          <PhotoCamera />
        </IconButton>
      </label>  
      <Avatar alt="Remy Sharp" variant='rounded' style={{marginLeft:20}} src={FoodItemImage.file} className={classes.large} /> 
      {btnFoodItemImage?<Button color="primary" style={{padding:5}} onClick={()=>handleSaveFoodItemImage()}>Save</Button>:<></> }
      </div>
        </Grid>  

      

    
  
         </Grid>   

        </div>

        <Snackbar
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        open={open}
        autoHideDuration={6000}
        onClose={handleClose}
        message={renderHTML(errorMessage)}
        action={
          <React.Fragment>
         
            <IconButton size="small" aria-label="close" color="inherit" 
             onClick={handleClose}
             >
              <CloseIcon fontSize="small" />
            </IconButton>
          </React.Fragment>
        }
      />
    
      </div>
        

          </Dialog>
        </div>
      );


      
    }


    const handleClickOpen = () => {
      setOpen(true);
    };
  
    const handleClose = () => {
      setOpen(false);
    };




    useEffect(function(){
      fetchFoodTypes()

      fetchFoodItem()

    },[])


    return (
 
        <div className={classes.root} >
            <div className={classes.subdiv}>

      <MaterialTable
        title="List of FoodItems"
        columns={[
          { title: 'Id', field: 'restaurant_id',render:rowData=>
          <div style={{flexDirection:'column'}}>
            <div><b>{rowData.restaurant_id}</b></div>
          
            </div>
        },



        { title: 'FoodType/FoodItem', field: 'foodtype/fooditem',render:rowData=>
        <div style={{flexDirection:'column'}}>
            <div><b>{rowData.foodtype_id}</b></div>
          <div><b>{rowData.fooditem}</b></div>
        
          </div>
      },
     
      { title: 'Price/Offer', field: 'price/offer',render:rowData=>
      <div style={{flexDirection:'column'}}>
        <div><b>{rowData.price}</b></div>
        <div><b>{rowData.offer}</b></div>
      
        </div>
    },
   

    { title: 'OfferType', field: 'offertype',render:rowData=>
    <div style={{flexDirection:'column'}}>
      <div><b>{rowData.offertype}</b></div>
     
      </div>
  },

  { title: 'FoodItemType/Ingredients', field: 'fooditemtype/ingredients',render:rowData=>
    <div style={{flexDirection:'column'}}>
      <div><b>{rowData.fooditemtype}</b></div>
      <div><b>{rowData.ingredients}</b></div>
     
      </div>
  },



       
    
        { title: 'Rating', field: 'rating',render:rowData=>
        <div style={{flexDirection:'column'}}>   
          <div>
          {rowData.rating}</div>
          </div>
      },


       


      { title: 'Food ItemImage', field: 'FoodItemImage',render:rowData=>
      <div style={{borderRadius:10}}>
        <img src={`${ServerURL}/images/${rowData.fooditemimage}`} width='50' height='50' />
      </div>
   

    },
     
        ]}
        data={list} 
                    
        actions={[
          {
            icon: 'edit',
            tooltip: 'Edit FoodItems',
            onClick: (event, rowData) =>handleDOpen(rowData) ,
          },
        ]}
      />
      </div>
      {showEditDialog()}
      
      </div>
    )
  }