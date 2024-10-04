import React from 'react'
import totalitems from '../products.json'
import itemContext from '../../context/items/ItemContext'
import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
const Itemmain = (props) => {
  const { item } = props;
  const d = Math.floor(Math.random() * 4) + 1;
  // const props = totalitems.products[0];
  const discount = ((item.oldprice - item.newprice) / item.oldprice * 100).toFixed(2)
  const offers = [
    'Get 10% off on your first purchase',
    'Buy 2 items and get 1 item free',
    'Flat ₹500 off on orders above ₹3000',
    'Free shipping on all orders',
    'Special discount for students: 15% off',
  ];
  const [isWishlist, setIsWishlist] = useState(false);
  const context = useContext(itemContext);
  const { additem, searchitem, edititem, deleteitem, searchwishitem, deletewishitem, addwishitem } = context;
  const navigate = useNavigate()
  const [filteredItems, setFilteredItems] = useState([]);
  const [noofitem, setno] = useState(0)
  const loggedin=useSelector(state=>state.loggedin)
  useEffect(() => {
    const fetchWishlist = async () => {
      const json = await searchwishitem(item);
      if (json.founditem) {
        setIsWishlist(true);
      }
    };

    if(loggedin)fetchWishlist();
  }, [loggedin]);
  const handleWishlistClick = () => {
    if(loggedin){
      if (isWishlist) {
        setIsWishlist(!isWishlist);
        deletewishitem(item);
      }
      else {
        setIsWishlist(!isWishlist);
        addwishitem(item);
        alert("Item added to wishlist")
      }
    }
    else{
      alert("You need to login first to add items");
      navigate("/api/auth/login")
    }
  };
  useEffect(() => {
    const fetchNoOfItem = async () => {
      const json = await searchitem(item);
      if (json.no > 0) {
        setno(json.no);
      }
    };

    if(loggedin) fetchNoOfItem();
  }, [])

  const decrementCount = (e) => {
    e.preventDefault();
    if (noofitem == 1) {
      deleteitem(item);
      setno(0)
    }
    else {
      edititem(item, noofitem - 1);
      setno(noofitem - 1);
    }

  }
  const incrementCount = (e) => {
    e.preventDefault();
    edititem(item, noofitem + 1);
    setno(noofitem + 1);
  }
  const handleCheck = (e) => {
    e.preventDefault();
    const authtoken = localStorage.getItem('token');
    if (!authtoken) {
      alert("You need to login first");
      navigate('/api/auth/login');
    }
    else{
      setno(noofitem + 1)
      additem(item);
      alert("Item added to cart")
    }
    // alert("Item added successfully");
    

  }
  const buynow =(e)=>{
   if(loggedin){
    e.preventDefault();
    if(noofitem>0){
      alert("Item already added to cart");
    }
    else{
    setno(noofitem + 1)
    additem(item);
    alert("Item added to cart")
    }
   }
   else{
    alert("You need to login first");
    navigate("/api/auth/login")
   }
  }
  useEffect(() => {
    const filtered = totalitems.products.filter((product) => {
      return (
       product.newprice===item.newprice && product.oldprice===item.oldprice && product.name!==item.name && product.type===item.type
      );
    });
    setFilteredItems(filtered);
  }, [item])
  return (
    <div style={{ maxHeight: '120vh', paddingTop: '2em', paddingBottom: '2em', display: 'flex', justifyContent: 'center', margin: '0 auto' }}>
      <div className='itemmain card py-2' style={{ alignItems: 'center', maxWidth: '95em',display:'flex',flexDirection:'row' }}>
        <div style={{ display: 'flex', flexDirection: 'column', marginLeft: '2em',gap:'0.5em' }}>
          {filteredItems.map((filteredItem) => (
            <div className="card">
              <img
              src={filteredItem.imageurl +"&sz=w1000"}
              alt={filteredItem.name}
              style={{ width: '6em', padding:'0.5em',cursor: 'pointer' }}
              onClick={() => navigate(`/item/${btoa(filteredItem.name)}`)}
            />
            </div>
          ))}
        </div>
        <div className={`wishlist-icon ${isWishlist ? 'active' : ''}`} onClick={handleWishlistClick}>
          <i className="fas fa-heart mt-4 me-4" style={{ fontSize: '1.5em' }} ></i>
        </div>
        <div style={{ display: 'flex', padding: '2em 4em 2em 1em', height: '100%', overflow: 'auto' }}>
          <div className="card" style={{ width: "25rem", height: '34em', padding: '1em', marginLeft: '2em' }}>

            <img src={item.imageurl +"&sz=w1000"} alt={item.name} style={{ width: "25rem", height: '30em', objectFit: 'contain' }} />
          </div>

          <div style={{ flex: 1, marginLeft: '3em' }}>
            <h2>{item.name}</h2>
            <p className='my-4' style={{ fontSize: '1.25em' }}>{item.description}</p>
            <div className='mx-1'>
              <span style={{ fontWeight: '600', fontSize: '1.65em' }}>Rs {item.newprice}</span>&nbsp;&nbsp;
              <span className="old-price" style={{ textDecoration: 'line-through', fontSize: '1.2em' }}>Rs {item.oldprice}</span>&nbsp;
              {discount > 0 && (
                <span style={{ color: 'green', fontWeight: '600', fontSize: '1.2em' }}>&nbsp;{discount}% off</span>
              )}
            </div>
            <h5><span className="badge bg-success my-2 mx-2">{item.rating}&nbsp;<i className="fa-sharp fa-solid fa-star" style={{ fontSize: '0.75rem' }}></i></span></h5>
            <div className='my-2 ms-1'><h6 style={{ color: 'blue' }}>Delivery in 2 days</h6></div>
            <div className='my-5 d-flex' >
              {noofitem > 0 ?
                (
                  <div className=" btn-group me-4" role="group" aria-label="First group">
                    <button type="button" className="btn btn-primary" onClick={(e) => decrementCount(e)}>-</button>
                    <button type="button" className="btn btn-light">{noofitem}</button>
                    <button type="button" className="btn btn-primary" onClick={(e) => incrementCount(e)}>+</button>
                  </div>
                )

                : (<button className="btn btn-primary me-3" style={{ fontSize: '1.2em', height: '2.5em' }} onClick={handleCheck}>Add to Cart <img width="24" height="24" src="https://img.icons8.com/material-rounded/24/000000/shopping-cart.png" alt="shopping-cart" /></button>
                )}

              <button className="btn btn-warning" style={{ fontSize: '1.2em', height: '2.5em' }} onClick={buynow}>Buy Now</button>
            </div>
            <div className='mx-2'>
              <h3 style={{ marginBottom: '0.5em' }}>Offers:</h3>
              <ul style={{ listStyleType: 'disc', marginLeft: '-1em', }}>
                {offers.map((offer, index) => (
                  <li style={{ marginTop: '0.5em' }} key={index}><h5 style={{ fontWeight: '500' }}>&nbsp;{offer}</h5>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Itemmain
