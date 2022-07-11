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
import FoodTypes from "./FoodTypes";
//import { AllFoodTypes } from "@material-ui/icons";

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

    
    formControl: {
      minWidth:700,
    },

    input: {
      display: 'none',
    },

}));

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});


export default function AllFoodTypes() {
    const classes =useStyles();
    const [list,setList]=useState([])
    const [btnFoodImage,setBtnFoodImage]=useState(false)

    const [btnFoodTypeAd,setBtnFoodTypeAd]=useState(false)

    const [dopen, dsetOpen] = React.useState(false);
    const [open, setOpen] = React.useState(false);



    const [FoodImage,setFoodImage]=useState({bytes:'',file:'/noimage.jpg'})
    const [FoodTypeAd,setFoodTypeAd]=useState({bytes:'',file:'/noimage.jpg'})
 
    const [getRowData,setRowData]=useState([])
   
    const [restaurant_id,setRestaurant_id]=useState("")
    const [foodtype_id,setfoodtype_id]=useState("")
    const [foodtype,setfoodtype]=useState("")
  
    const [status,setStatus]=useState("")

    const [errorMessage,setErrorMessage]=useState("")



    /* const handleFoodImage=(event)=>{
       alert(URL.createObjectURL(event.target.files[0]));
       setFoodImage({bytes:event.target.files[0],
         file:URL.createObjectURL(event.target.files[0]),
       });
     };  */
 
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
    
    var body={"foodtype_id":getRowData.foodtype_id,
    "restaurant_id":restaurant_id,
     'foodtype':foodtype,
     'status':status,
    
    }
    
     
     var res=await postData(
       "allfoodtypes/editallfoodtypes",body);
      
    // alert(res.result)
 
    if(res.result)
    {
 
     swal({
       title: "New FoodTypes Edit Successfully",
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
 
     

     };
 






    const fetchFoodType=async()=>{
      var result=await getData('allfoodtypes/listallfoodtypes')
      setList(result)
    };


  const handleDClose=()=>{
    dsetOpen(false)

  };


  const handleDelete=async()=>{

   
   var body={"foodtype_id":getRowData.foodtype_id}
   
    
    var res=await postData(
      "allfoodtypes/deleteallfoodtypes",
      body

      );
   // alert(res.result)

   if(res.result)
   {

    swal({
      title: "All FoodTypes Deleted Successfully",
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
    fetchFoodType()
  }



  const handleSaveFoodImage=async()=>{
    var formData=new FormData()
    formData.append("foodtype_id",getRowData.foodtype_id,)
    formData.append("foodimage",FoodImage.bytes);
    var config = {headers: {"content-type": "multipart/form-data"}}
    var res =await postDataAndImage(
      "allfoodtypes/updateFoodImage",
      formData,
      config
    );
    //alert(res.result)
    if (res.result){
      swal({
        title: "Food Image Updated Successfully",
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
   setBtnFoodImage(false)
  }


  const handleFoodImage=(event)=>{ setFoodImage({
    bytes:event.target.files[0],
    file:URL.createObjectURL(event.target.files[0])
  })
  setBtnFoodImage(true)

  }





  
  const handleSaveFoodTypeAd=async()=>{
    var formData=new FormData()
    formData.append("foodtype_id",getRowData.foodtype_id,)
    formData.append("foodtypead",FoodTypeAd.bytes);
    var config = {headers: {"content-type": "multipart/form-data"}}
    var res =await postDataAndImage(
      "allfoodtypes/updateFoodTypeAd",
      formData,
      config
    );
    //alert(res.result)
    if (res.result){
      swal({
        title: "Food TypeAd Updated Successfully",
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
   setBtnFoodTypeAd(false)
  }


  const handleFoodTypeAd=(event)=>{ setFoodTypeAd({
    bytes:event.target.files[0],
    file:URL.createObjectURL(event.target.files[0])
  })
  setBtnFoodTypeAd(true)

  }






  const handleDOpen=(data)=>{
   // fetchCities(data.state)
    setRestaurant_id(data.restaurant_id)
    setfoodtype(data.foodtype)
    setStatus(data.status)
  

    setFoodImage({bytes:"",file:`${ServerURL}/images/${data.foodimage}`})

    setFoodTypeAd({bytes:"",file:`${ServerURL}/images/${data.foodtypead}`})

  
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
                  FoodTypes Details
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
        <TextField label="Restaurant Id"
        value={restaurant_id}
        onChange={(event)=>setRestaurant_id(event.target.value)} fullWidth
         variant="outlined" />    
        </Grid>



        <Grid item xs={12}>
        <TextField label="Food Types"
        value={foodtype}
        onChange={(event)=>setfoodtype(event.target.value)} fullWidth
         variant="outlined" />    
        </Grid>

     

        <Grid item xs={12} sm={6}>
          <div style={{display:'flex' ,flexDirection:'row',justifyContent:'center',alignItems:'center'}} >
        <input accept="image/*" className={classes.input} id="icon-button-act" type="file"
         multiple
         onChange={ (event) =>handleFoodImage(event)
         
        }
        />
      <label htmlFor="icon-button-act">
        <IconButton color="primary" aria-label="upload picture" component="span">
          <PhotoCamera />
        </IconButton>
      </label>  
      <Avatar alt="Remy Sharp" variant='rounded' style={{marginLeft:20}} src={FoodImage.file} className={classes.large} /> 
      {btnFoodImage?<Button color="primary" style={{padding:5}} onClick={()=>handleSaveFoodImage()}>Save</Button>:<></> }
      </div>
        </Grid>  

     
        <Grid item xs={12} sm={6}>
          <div style={{display:'flex' ,flexDirection:'row',justifyContent:'center',alignItems:'center'}} >
        <input accept="image/*" className={classes.input} id="icon-button-id" type="file" 
        multiple
        onChange={ (event) =>setFoodTypeAd({bytes:event.target.files[0],file:URL.createObjectURL(event.target.files[0])})}   
         onChange={ (event) =>handleFoodTypeAd(event)
         }
        
         
        />
      <label htmlFor="icon-button-id">
        <IconButton color="primary" aria-label="upload picture" component="span">
          <PhotoCamera />
        </IconButton>
      </label>  
      <Avatar alt="Remy Sharp" variant='rounded' style={{marginLeft:20}} src={FoodTypeAd.file} className={classes.large} /> 
      {btnFoodTypeAd?<Button color="primary" style={{padding:5}} onClick={()=>handleSaveFoodTypeAd()}>Save</Button>:<></> }
      </div>
        </Grid>  

    

        <Grid item xs={12} sm={6}>
        <FormControl variant="outlined" className={classes.formControl}>
        <InputLabel>Status</InputLabel>
        <Select
         value={status}
         
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
      fetchFoodType()

    },[])


    return (
 
        <div className={classes.root} >
            <div className={classes.subdiv}>

      <MaterialTable
        title="List of FoodTypes"
        columns={[
          { title: 'Id', field: 'restaurant_id',render:rowData=>
          <div style={{flexDirection:'column'}}>
            <div><b>{rowData.restaurant_id}</b></div>
          
            </div>
        },
       
    
        { title: 'Food Type', field: 'foodtype',render:rowData=>
        <div style={{flexDirection:'column'}}>
         
          <div>
          {rowData.foodtype}</div>
          </div>
      },


         
          { title: 'Status', field: 'status',render:rowData=>
            <div style={{flexDirection:'column'}}>
              <div>{rowData.status}</div>
            
              </div>
          },


      { title: 'Food Image', field: 'FoodImage',render:rowData=>
      <div style={{borderRadius:10}}>
        <img src={`${ServerURL}/images/${rowData.foodimage}`} width='50' height='50' />
      </div>
   

    },



    { title: 'Food TypeAd', field: 'FoodTypeAd',render:rowData=>
    <div style={{borderRadius:10}}>
      <img src={`${ServerURL}/images/${rowData.foodtypead}`} width='50' height='50' />
    </div>
 

  },


         
        ]}
        data={list  } 
                    
        actions={[
          {
            icon: 'edit',
            tooltip: 'Edit FoodTypes',
            onClick: (event, rowData) =>handleDOpen(rowData) ,
          },
        ]}
      />
      </div>
      {showEditDialog()}
      
      </div>
    )
  }