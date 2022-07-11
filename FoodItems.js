import React,{useState,useEffect} from "react"
import { makeStyles } from '@material-ui/core/styles';
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
import {getData,postData, postDataAndImage} from "../../FetchNodeServices";


import {isEmpty,isNumber,isAlphabets,isMobile} from '../Checks'


import Snackbar from '@material-ui/core/Snackbar';
import CloseIcon from '@material-ui/icons/Close';

/*
import Rating from '@material-ui/lab/Rating';
import Box from '@material-ui/core/Box';


const labels = {
    0.5: 'Useless',
    1: 'Useless+',
    1.5: 'Poor',
    2: 'Poor+',
    2.5: 'Ok',
    3: 'Ok+',
    3.5: 'Good',
    4: 'Good+',
    4.5: 'Excellent',
    5: 'Excellent+',
  };*/
  






var otpGenerator = require('otp-generator')
const useStyles = makeStyles((theme) => ({
  root:{
  display:'flex',
  justifyContent:'center',
  alignItems:'center',
  marginTop:20,
  padding:10
  
},

  subdiv:{
      width:700,
      background:'#ecf0f1',
      padding:10



  },
  formControl: {
   
    minWidth: 680,
  },

  formControlfoodtype: {
   
    minWidth: 325,
  },

  large: {
    width: theme.spacing(7),
    height: theme.spacing(7),
  },
  input: {
    display: 'none',
  },


  }));



export default function FoodTypes(props){
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);
    const [fooditemimage,setfooditemimage]=useState({bytes:'',file:'/noimage.jpg'})
 
  const [restaurant_id,setRestaurant_id]=useState(props.restaurant.restaurant_id)
  const [getfoodtype,setfoodtype]=useState([])
  const [foodtype_id,setfoodtype_id]=useState("")
 
 //const [getFoodItem,setFoodItem]=useState([])
// sabdoor uparvala


  const [fooditem,setfooditem]=useState("")
  const [fooditem_id,setfooditem_id]=useState("")

    const [Price,setPrice]=useState("")
    const [offer,setOffer]=useState("")
    const [Offertype,setOffertype]=useState("")
    const [FoodItemType,setfooditemtype]=useState("")
    const [Ingredients,setingredients]=useState("")
     const [Rating,setrating]=useState("")
    const [errorMessage,setErrorMessage]=useState("")



    const fetchfoodtype=async()=>{

      var body={restaurant_id:props.restaurant.restaurant_id}
     var list= await postData("allfoodtypes/listallfoodtypesbyrestaurant",body)
  
    setfoodtype(list)
    }

  const fillfoodtype=()=>{
      return(

      getfoodtype.map((item,index)=>{
        return(<MenuItem value={item.foodtype_id}>{item.foodtype}</MenuItem>)


        })
      )

    }

    
  const handleFoodTypeChange= async(event)=>{
   //  alert(event.target.value)
    setfoodtype_id(event.target.value)
  var body={foodtype_id:event.target.value}
  var list=await postData('fooditems/fetchfooditems',body)
// setFoodItem(list)
    }



    //const handleSubmit=async()=>{ 

     

        const handleSubmit=async()=>{ 
    var otp = otpGenerator.generate(6, { upperCase: false, specialChars: false });
    alert(otp)


    var msg=""
    var err=false
    if(isEmpty(restaurant_id))
    {err=true;
      msg+="<b>Restaurant Id Should Not Be Empty.....<b><br>"
    
    }

    if(isEmpty(Price))
    {err=true;
      msg+="<b>Price Should Not Be Empty.....<b><br>" 
    }



    if(!isNumber(Price))
    {err=true;
      msg+="<b>Price Must Contains Numeric Only....<b><br>"   
    }





   /* if(isEmpty(Rating))
    {err=true;
      msg+="<b>Rating Should Not Be Empty.....<b><br>" 
    }


    
    if(!isMobile(Rating))
    {err=true;
      msg+="<b>Rating Must Contains Numeric Only....<b><br>"   
    }
*/

    if(isEmpty(Ingredients))
    {err=true;
      msg+="<b>Ingredients Should Not Be Empty.....<b><br>" 
    }


    if(!isAlphabets(Ingredients))
    {err=true;
      msg+="<b>Ingredients Must Contains Alphabets Only....<b><br>"   
    }



    if(err)
    {
      setErrorMessage(msg)
      setOpen(true)
    }



    if(!err)  
    {

      

    var formData =new FormData()
    formData.append('restaurant_id',restaurant_id)

    formData.append('foodtype_id',foodtype_id)
  //   formData.append('fooditem_id',fooditem_id)
    formData.append('fooditem',fooditem)
    formData.append('price',Price)
    formData.append('offer',offer)
    formData.append('offertype',Offertype)
    formData.append('fooditemtype',FoodItemType)
    formData.append('ingredients',Ingredients)
    formData.append('rating',Rating)

 
    formData.append('fooditemimage',fooditemimage)
    formData.append('fooditemimage',fooditemimage.bytes)
 
        

    var config = {headers: {"content-type": "multipart/form-data"}}
    var res =await postDataAndImage(
      "allfooditems/addfooditems",
      formData,
      config
    );
   // alert(res.result)


   if(res.result)
   {

    swal({
      title: "New FoodItems Added Successfully",
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
  }
      
        }
      
  const handleClose=()=>{
    setOpen(false)
  }
 


    useEffect(function(){
      fetchfoodtype()

    },[])




    return(
     <div className={classes.root}>
        <div className={classes.subdiv}>
        <Grid container spacing={1}>

        <Grid item xs={12} >
        <TextField label="Restaurant Id" value={restaurant_id} disabled={true} fullWidth variant="outlined" onChange={(event)=>setRestaurant_id(event.target.value)} />    
        </Grid>    
      
        



        <Grid item xs={12} sm={6}>
        <FormControl variant="outlined" className={classes.formControlfoodtype}>
        <InputLabel>foodtypes</InputLabel>
        <Select
         
          //value={age}
          onChange={(event)=>handleFoodTypeChange(event)}
          label="foodtypes"
          fullWidth
        >

          {fillfoodtype()}
         
       
        </Select>
      </FormControl>      
        </Grid>   


        <Grid item xs={12} sm={6} >
        <TextField label="Food Item" fullWidth variant="outlined" onChange={(event)=>setfooditem(event.target.value)} />    
        </Grid>    
    


        <Grid item xs={12} >
        <TextField label="Price" fullWidth variant="outlined" onChange={(event)=>setPrice(event.target.value)} />    
        </Grid>    
      


        <Grid item xs={12} >
        <TextField label="Offer" fullWidth variant="outlined" onChange={(event)=>setOffer(event.target.value)} />    
        </Grid>

      
        <Grid item xs={12} >
        <TextField label="Offer Type" fullWidth variant="outlined" onChange={(event)=>setOffertype(event.target.value)} />    
        </Grid>


   
        <Grid item xs={12}>
        <FormControl variant="outlined" className={classes.formControl}>
        <InputLabel>FoodItemType</InputLabel>
        <Select
         
          //value={age}
         // onChange={handleChange}
         onChange={(event)=>setfooditemtype(event.target.value)}
          label="FoodItemType"
          fullWidth
        >
         
          <MenuItem value={"Veg"}>Veg</MenuItem>
          <MenuItem value={"NonVeg"}>NonVeg</MenuItem>
         
        </Select>
      </FormControl>     
        </Grid>  



        <Grid item xs={12} >
        <TextField label="Ingredients" fullWidth variant="outlined" onChange={(event)=>setingredients(event.target.value)} />    
        </Grid>




        <Grid item xs={12} >
        <TextField label="Rating" fullWidth variant="outlined" onChange={(event)=>setrating(event.target.value)} />    
        </Grid>
      
      

        <Grid item xs={12} >
          <div style={{display:'flex' ,flexDirection:'row',justifyContent:'center',alignItems:'center'}} >
        <input accept="image/*" className={classes.input} id="icon-button-act" type="file"
         multiple
         onChange={ (event) =>setfooditemimage({bytes:event.target.files[0],file:URL.createObjectURL(event.target.files[0])})}
        />
      <label htmlFor="icon-button-act">
        <b>Upload FoodItemImage</b>
        <IconButton color="primary" aria-label="upload picture" component="span">
          <PhotoCamera />
        </IconButton>
      </label>  
      <Avatar alt="Remy Sharp" variant='rounded' style={{marginLeft:20}} src={fooditemimage.file} className={classes.large} /> 
      </div>
        </Grid>  



        <Grid item xs={12} sm={6}>
        <Button onClick={()=>handleSubmit()} variant="contained" fullWidth color="primary">
        Submit
      </Button>   
        </Grid>    
            
        <Grid item xs={12} sm={6}>
        <Button variant="contained" fullWidth color="primary">
        Reset
      </Button> 
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
        



   )

}