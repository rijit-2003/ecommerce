import React, { useState } from 'react'
import ItemContext from './ItemContext'
import { useSelector } from 'react-redux'
import BASE_URL from '../../config'
// mport BASE_URL1

const Itemstate = (props) => {
  
  const host =BASE_URL;
  // console.log(host);
  const itemsInitial = []
  const [items, setitems] = useState(itemsInitial)
  const [wishitems, setwishitems] = useState(itemsInitial)
  const [orders,setorders]=useState(itemsInitial)
  const loggedin = useSelector(state => state.loggedin);
  //Get all items
  const getitems = async () => {
    // to do api call
    
    const response = await fetch(`${host}/api/cart`, {
      method: "GET", // *GET, POST, PUT, DELETE, etc.
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem('token'),
      },
      // body: JSON.stringify({title,description,tag}), 
    });
    const json = await response.json();
    // console.log(json);
    setitems(json)
    return json;
    
  }

  //Add a note
  const additem = async (item) => {
    // to do api call
    const response = await fetch(`${host}/api/cart/additem`, {
      method: "POST", // *GET, POST, PUT, DELETE, etc.
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem('token'),
      },
      body: JSON.stringify({ item }),
    });
    const json= await response.json();
    setitems(items.concat(json))
  }

  //Delete a note
  const deleteitem = async (item) => {
    //API CALL
    const response = await fetch(`${host}/api/cart/deleteitem`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem('token'),
      },
      body: JSON.stringify({ item })

    });
    // const json=await response.json();
    // console.log(json)
    const newitems = items.filter((ele) => { return ele.item.name !== item.name })
    setitems(newitems)
  }
  const edititem = async (item, noofitems) => {
    const response = await fetch(`${host}/api/cart/updateitem`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem('token'),
      },
      body: JSON.stringify({ item, noofitems })
    });
    const json = await response.json();
    let newitems = JSON.parse(JSON.stringify(items))
    for (let ind = 0; ind < newitems.length; ind++) {
      let element = items[ind];
      if (element.item.name === item.name) {
        newitems[ind].noofitems = noofitems;
        break;
      }
    }
    setitems(newitems)
  }
  const searchitem = async (item) => {
    // const encoded = btoa(item.name)
    const response = await fetch(`${host}/api/cart/finditem`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem('token'),
      },
      body:JSON.stringify({item})
    });
    const json = await response.json();
    return json;

  }
  /////////
  const getwishitems=async()=>{
    // to do api call
    const response = await fetch(`${host}/api/wishlist`, {
      method: "GET", // *GET, POST, PUT, DELETE, etc.
      headers: {
        "Content-Type": "application/json",
        "auth-token":localStorage.getItem('token'),
      },
      // body: JSON.stringify({title,description,tag}), 
    });
    const json= await response.json();
    setwishitems(json)
    return json;
  }

  //Add a note
  const addwishitem=async(item)=>{
    // to do api call
    const response = await fetch(`${host}/api/wishlist/addwishitem`, {
      method: "POST", // *GET, POST, PUT, DELETE, etc.
      headers: {
        "Content-Type": "application/json",
        "auth-token":localStorage.getItem('token'),
      },
      body: JSON.stringify({item}), 
    });
    const json=await response.json();
    setwishitems(wishitems.concat(json))
  }

  //Delete a note
  const deletewishitem=async(item)=>{
    //API CALL
    const response = await fetch(`${host}/api/wishlist/deletewishitem`, {
      method: "DELETE", 
      headers: {
        "Content-Type": "application/json",
        "auth-token":localStorage.getItem('token'),
      },
      body:JSON.stringify({item})
      
    });
    // const json=await response.json();
    // console.log(json)
    const newitems=wishitems.filter((ele)=>{return ele.item.name!==item.name})
    setwishitems(newitems)
  }
  const searchwishitem=async(item)=>{
    // const encoded=btoa(item.name)
    const response=await fetch (`${host}/api/wishlist/findwishitem`,{
      method:"PUT",
      headers:{
        "Content-Type":"application/json",
        "auth-token":localStorage.getItem('token'),
      },
      body:JSON.stringify({item})
    });
    const json= await response.json();
    return json;

  } 
  const getorders=async()=>{
    const response=await fetch(`${host}/api/orders`,{
      method:"GET", 
      headers:{
        "Content-Type":"application/json",
        "auth-token":localStorage.getItem('token')
      }
    });
    const json=await response.json();
    setorders(json);
    return json;
  }
  const addorder=async(item,noofitems)=>{
    const response=await fetch(`${host}/api/orders/addorder`,{
      method:"POST",
      headers:{
        "Content-Type":"application/json",
        "auth-token":localStorage.getItem('token')
      },
      body:JSON.stringify({item,noofitems})
    })
    const json=await response.json();
    setorders(orders.concat(json));

  }
  const cancelorder=async(item)=>{
    const response=await fetch(`${host}/api/orders/cancelorder`,{
      method:"DELETE",
      headers:{
        "Content-Type":"application/json",
        "auth-token":localStorage.getItem('token')
      },
      body:JSON.stringify(item)
    })
    const json = await response.json();
    const newItems = orders.map((order) => {
      if (order.item.name === item.item.name) {
        return { ...order, orderstatus: "Cancelled" };
      }
      return order;
    });

    setorders(newItems);

  }
  
  


  return (
    <ItemContext.Provider value={{ items, additem, deleteitem, getitems, edititem, searchitem,addwishitem,getwishitems,deletewishitem,searchwishitem ,wishitems,getorders,addorder,cancelorder }}>
      {props.children}
    </ItemContext.Provider>
  )
}

export default Itemstate
