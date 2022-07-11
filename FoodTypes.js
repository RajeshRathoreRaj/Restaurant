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


import {isEmpty} from '../Checks'


import Snackbar from '@material-ui/core/Snackbar';
import CloseIcon from '@material-ui/icons/Close';




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
    const [FoodImage,setFoodImage]=useState({bytes:'',file:'/noimage.jpg'})
    const [FoodTypeAd,setFoodTypeAd]=useState({bytes:'',file:'/noimage.jpg'})
 
console.log("PROPS:",props)

    const [FoodTypes,setFoodTypes]=useState("")
    const [restaurant_id,setRestaurant_id]=useState(props.restaurant.restaurant_id)
    const [status,setStatus]=useState("")
    const [errorMessage,setErrorMessage]=useState("")

  
  //const handleSubmit=async()=>{ 

    

        



    const handleSubmit=async()=>{ 
    var otp=otpGenerator.generate(6, { upperCase: false, specialChars: false });
    alert(otp)


    var msg=""
    var err=false
    if(isEmpty(restaurant_id))
    {err=true;
      msg+="<b>Restaurant Id Should Not Be Empty.....<b><br>"
    
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
    formData.append('foodtype',FoodTypes)
    formData.append('status',status)
  //  formData.append('foodimage',FoodImage)
    formData.append('foodimage',FoodImage.bytes)
  //  formData.append('foodtypead',FoodTypeAd)
    formData.append('foodtypead',FoodTypeAd.bytes)
    

    var config = {headers: {"content-type": "multipart/form-data"}}
    var res = await postDataAndImage(
      "allfoodtypes/addfoodtypes",
      formData,
      config
    );
   // alert(res.result)


    if(res.result)
    {
 
     swal({
       title: "New FoodTypes Added Successfully",
       icon: "success",
       dangerMode: true,
     })
 
    }
    else
    {
     swal({
       
       title: "Fail to Add New FoodTypes",
       icon: "warning",
       dangerMode: true,
     });
    }
 
  }
     

    };
    
  const handleClose=()=>{
    setOpen(false)
  }
 


  /*  useEffect(function(){
      fetchFoodTypes()

    },[])

*/


    return(
     <div className={classes.root}>
        <div className={classes.subdiv}>
        <Grid container spacing={1}>

        <Grid item xs={12} >
        <TextField label="Restaurant Id" value={restaurant_id} disabled={true}  fullWidth variant="outlined" onChange={(event)=>setRestaurant_id(event.target.value)} />    
        </Grid>    
      
        
        <Grid item xs={12} >
        <TextField label="Food Types" fullWidth variant="outlined" onChange={(event)=>setFoodTypes(event.target.value)} />    
        </Grid>    
      


        
      

        <Grid item xs={12} sm={6}>
          <div style={{display:'flex' ,flexDirection:'row',justifyContent:'center',alignItems:'center'}} >
        <input accept="image/*" className={classes.input} id="icon-button-act" type="file"
         multiple
         onChange={ (event) =>setFoodImage({bytes:event.target.files[0],file:URL.createObjectURL(event.target.files[0])})}
        />
      <label htmlFor="icon-button-act">
        <b>Upload FoodImage</b>
        <IconButton color="primary" aria-label="upload picture" component="span">
          <PhotoCamera />
        </IconButton>
      </label>  
      <Avatar alt="Remy Sharp" variant='rounded' style={{marginLeft:20}} src={FoodImage.file} className={classes.large} /> 
      </div>
        </Grid>  



        <Grid item xs={12} sm={6}>
          <div style={{display:'flex' ,flexDirection:'row',justifyContent:'center',alignItems:'center'}} >
        <input accept="image/*" className={classes.input} id="icon-button-id" type="file" 
        multiple
        onChange={ (event) =>setFoodTypeAd({bytes:event.target.files[0],file:URL.createObjectURL(event.target.files[0])})}
      
        />
      <label htmlFor="icon-button-id">
      <b>Upload FoodTypeAd</b>
        <IconButton color="primary" aria-label="upload picture" component="span">
          <PhotoCamera />
        </IconButton>
      </label>  
      <Avatar alt="Remy Sharp" variant='rounded' style={{marginLeft:20}} src={FoodTypeAd.file} className={classes.large} /> 
      </div>
        </Grid>  

        

        <Grid item xs={12}>
        <FormControl variant="outlined" className={classes.formControl}>
        <InputLabel>Status</InputLabel>
        <Select
         
          //value={age}
         // onChange={handleChange}
         onChange={(event)=>setStatus(event.target.value)}
          label="Status"
          fullWidth
        >
         
          <MenuItem value={"Pending"}>Pending</MenuItem>
          <MenuItem value={"Active"}>Active</MenuItem>
          <MenuItem value={"Deactive"}>Deactive</MenuItem>
        </Select>
      </FormControl>     
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