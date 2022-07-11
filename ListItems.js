import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';
import DashboardIcon from '@material-ui/icons/Dashboard';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import PeopleIcon from '@material-ui/icons/People';
import BarChartIcon from '@material-ui/icons/BarChart';
import LayersIcon from '@material-ui/icons/Layers';
import AssignmentIcon from '@material-ui/icons/Assignment';
//import AddNewRestaurant from "./AddNewRestaurant"
//import AllRestaurant from "./AllRestaurant"

import FoodTypes from "./FoodTypes"
import FoodItems from "./FoodItems"

import AllFoodTypes from "./AllFoodTypes"
import AllFoodItems from "./AllFoodItems"

import ClientView from "./ClientView"
import ClientOrders from "./ClientOrders"


export default function ListItems (props){

  const handleClick =(component)=>{
    props.setDashBoardView(component)

  }





 const mainListItems=()=>{
   return(

  <div>
    <ListItem button>
      <ListItemIcon>
        <DashboardIcon />
      </ListItemIcon>
      <ListItemText primary="Dashboard" />
    </ListItem>
    <ListItem button>
      <ListItemIcon>
        <ShoppingCartIcon />
      </ListItemIcon>
      <ListItemText primary="Add Food Type"  onClick={()=>handleClick(<FoodTypes restaurant={props.restaurant}/>)} />
    </ListItem>
    <ListItem button>
      <ListItemIcon>
        <PeopleIcon />
      </ListItemIcon>
      <ListItemText primary="List Food Type" onClick={()=>handleClick(<AllFoodTypes />)} />
    </ListItem>
    <ListItem button>
      <ListItemIcon>
        <BarChartIcon />
      </ListItemIcon>
      <ListItemText primary="Add FoodItems" onClick={()=>handleClick(<FoodItems restaurant={props.restaurant} />)} />
    </ListItem>
    <ListItem button>
      <ListItemIcon>
        <LayersIcon />
      </ListItemIcon>
      <ListItemText primary="List FoodItems" onClick={()=>handleClick(<AllFoodItems />)} />
    </ListItem>
  </div>
  );
 };


const secondaryListItems=()=> {
  return (
  <div>
    <ListSubheader inset>Saved reports</ListSubheader>
    <ListItem button>
      <ListItemIcon>
        <AssignmentIcon />
      </ListItemIcon>
      <ListItemText primary="Current Orders" onClick={()=>handleClick(<ClientView />)} />
    </ListItem> 
   



    <ListItem button>
      <ListItemIcon>
        <AssignmentIcon />
      </ListItemIcon>
      <ListItemText primary="Your Orders Details" onClick={()=>handleClick(<ClientOrders />)} />
    </ListItem> 
   
    


    <ListItem button>
      <ListItemIcon>
        <AssignmentIcon />
      </ListItemIcon>
      <ListItemText primary="Last quarter" />
    </ListItem>
    <ListItem button>
      <ListItemIcon>
        <AssignmentIcon />
      </ListItemIcon>
      <ListItemText primary="Year-end sale" />
    </ListItem>
  </div>
);
}


return (
  <div>
   {mainListItems()}
   {secondaryListItems()}

  </div>

)

}