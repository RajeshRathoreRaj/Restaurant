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



import Switch from '@material-ui/core/Switch';
import Snackbar from '@material-ui/core/Snackbar';
import CloseIcon from '@material-ui/icons/Close';



const useStyles = makeStyles((theme) => ({
    root:{
    display:'flex',
    justifyContent:'center',
    alignItems:'center',
    marginTop:20,
    padding:10
    
  },
  
    subdiv:{
        width:1200,
        background:'#FFF',
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



export default function ClientView() {
  const classes =useStyles();
  const [list,setList]=useState([])


  const [state, setState] = React.useState({
    checkedA: true,
    checkedB: true,
  });
  

  const [dopen, dsetOpen] = React.useState(false);
  const [open, setOpen] = React.useState(false);



  const [getRowData,setRowData]=useState([])

  const [orderid,setorderid]=useState("")
 
  const [orderdate,setdate]=useState("")
  const [ordertime,settime]=useState("")

  const [emailid,setemailid]=useState("")
  const [mobileno,setmobileno]=useState("")

  const [fooditem,setfooditem]=useState("")
  const [price,setprice]=useState("")
  const [deliverystatus,setdeliverystatus]=useState("")
  const [deliverat,setdeliverat]=useState("")
  const [paymentstatus,setpaymentstatus]=useState("")
  const [totalamount,settotalamount]=useState("")
  
  const [errorMessage,setErrorMessage]=useState("")
  const [getOrders,setOrders]=useState("")
  const [getDetails,setDetails]=useState("")
  const [orderstatus,setorderstatus]=useState("")
  


     const handleSubmit=async()=>{ 
 
      var body={"orderid":getRowData.orderid,
   
     'orderdate':orderdate,
     'ordertime':ordertime,
     'emailid':emailid,
     'mobileno':mobileno,
     'fooditem':fooditem,
     'price':price,
     'deliverystatus':deliverystatus,
     'deliverat':deliverat,
     'paymentstatus':paymentstatus,
     'totalamount':totalamount,
     'orderstatus':orderstatus


    }
        
         };
    const fetchOrders=async()=>{
      var result=await getData('orders/listordergeneration')
      setList(result)
    };


    const fetchDetails=async()=>{
      var res=await getData('orders/listorders')
      setList(res)
    };



  const handleDClose=()=>{
    dsetOpen(false)

  };

  
  const handleRefresh=()=>
  {
    dsetOpen(false)
    fetchOrders()
    //fetchDetails()
   
  }


  const handleDOpen=(data)=>{
   
     setorderid(data.orderid)
     setdate(data.orderdate)
     settime(data.ordertime)
     setemailid(data.emailid)
     setmobileno(data.mobileno)
     setfooditem(data.fooditem)
     setprice(data.price)
     setdeliverystatus(data.deliverystatus)
     setdeliverat(data.deliverat)
     setpaymentstatus(data.paymentstatus)
     settotalamount(data.totalamount)
     setorderstatus(data.orderstatus)

 
 
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
                  Orders Details
                </Typography>
              
                <Button autoFocus color="inherit" onClick={handleSubmit}>
                  Order Bill
                </Button>
           
              </Toolbar>
            </AppBar>



            <div className={classes.root}>
        <div className={classes.subdiv}>
        <MaterialTable
   title="Orders Details"
   columns={[
     { title: 'OrderId/NO', field: 'orderid',render:rowData=>
     <div style={{flexDirection:'column'}}>
       <div><b>{rowData.orderid}</b></div>
     
       </div>
   },



 { title: 'Date', field: 'orderdate',render:rowData=>
 <div style={{flexDirection:'column'}}>
   <div><b>{rowData.orderdate}</b></div>
 
   </div>
},


{ title: 'Time', field: 'ordertime',render:rowData=>
<div style={{flexDirection:'column'}}>
 <div><b>{rowData.ordertime}</b></div>

 </div>
},


{ title: 'EmailId', field: 'emailid',render:rowData=>
<div style={{flexDirection:'column'}}>
 <div><b>{rowData.emailid}</b></div>

 </div>
},



{ title: 'MobileNo.', field: 'mobileno',render:rowData=>
<div style={{flexDirection:'column'}}>
 <div><b>{rowData.mobileno}</b></div>

 </div>
},



{ title: 'DeliveryStatus', field: 'deliverystatus',render:rowData=>
<div style={{flexDirection:'column'}}>
 <div><b>{rowData.deliverystatus}</b></div>
 </div>
},



{ title: 'DeliverAt', field: 'deliverat',render:rowData=>
<div style={{flexDirection:'column'}}>
 <div><b>{rowData.deliverat}</b></div>
 </div>
},



{ title: 'PaymentStatus', field: 'paymentstatus',render:rowData=>
<div style={{flexDirection:'column'}}>
 <div><b>{rowData.paymentstatus}</b></div>
 </div>
},



{ title: 'TotalAmount', field: 'totalamount',render:rowData=>
<div style={{flexDirection:'column'}}>
 <div><b>{rowData.totalamount}</b></div>
 </div>
 
},


 ]}
/>


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
      fetchDetails()
      fetchOrders()

     

    },[])


    return (
 
        <div className={classes.root} >
            <div className={classes.subdiv}>

      <MaterialTable
   title="Today's Order"
   columns={[
     { title: 'OrderId/NO', field: 'orderid',render:rowData=>
     <div style={{flexDirection:'column'}}>
       <div><b>{rowData.orderid}</b></div>
     
       </div>
   },



 { title: 'Date', field: 'orderdate',render:rowData=>
 <div style={{flexDirection:'column'}}>
   <div><b>{rowData.orderdate}</b></div>
 
   </div>
},


{ title: 'Time', field: 'ordertime',render:rowData=>
<div style={{flexDirection:'column'}}>
 <div><b>{rowData.ordertime}</b></div>

 </div>
},


{ title: 'EmailId', field: 'emailid',render:rowData=>
<div style={{flexDirection:'column'}}>
 <div><b>{rowData.emailid}</b></div>

 </div>
},



{ title: 'MobileNo.', field: 'mobileno',render:rowData=>
<div style={{flexDirection:'column'}}>
 <div><b>{rowData.mobileno}</b></div>

 </div>
},



{ title: 'OrderStatus', field: 'orderstatus',render:rowData=>
<div style={{flexDirection:'column'}}>
 <div><b>{rowData.orderstatus}</b></div>

 </div>
},

 ]}




        data={list} 
                    
        actions={[
          {
            icon: 'edit',
            tooltip: 'Orders Details',
            onClick: (event, rowData) =>handleDOpen(rowData) ,
          
          
          
          },
       
        ]}
      />
     
      </div>
   
      {showEditDialog()}
  
      
      </div>
    )
  }