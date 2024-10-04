import React, { useContext, useEffect, useState } from 'react'
import './Item.css'
import itemContext from '../../context/items/ItemContext'
import { Link, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
const Item = (props) => {
    const { item } = props;
    const context = useContext(itemContext);
    const { additem, searchitem, edititem, deleteitem, addwishitem, deletewishitem, searchwishitem } = context;
    const discount = ((item.oldprice - item.newprice) / item.oldprice) * 100;

    const navigate = useNavigate()
    const [noofitem, setno] = useState(0)
    const [isWishlist, setIsWishlist] = useState(false);
    const loggedin=useSelector(state=>state.loggedin)

    useEffect(() => {
        const fetchWishlist = async () => {
            const json = await searchwishitem(item);
            if (json.founditem) {
                setIsWishlist(true);
            }
        };

        if(loggedin) fetchWishlist();
    }, [loggedin]);
    const handleWishlistClick = async (e) => {
        e.preventDefault()
        if(loggedin){
            if (isWishlist) {
                setIsWishlist(!isWishlist);
                await deletewishitem(item);
              } else {
                setIsWishlist(!isWishlist);
                await addwishitem(item);
                alert("Item added to wishlist");
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
    }, [loggedin])
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
        alert("Item added to cart");
        }
        // alert("Item added successfully");

    }
    return (
        <div className='eachitem'>
            <Link to={`/item/${btoa(item.name)}`} className="card-link">
                <div className="card" style={{ width: "22rem" }}>
                    <div className={`wishlist-icon ${isWishlist ? 'active' : ''}`} onClick={handleWishlistClick}>
                        <i className="fas fa-heart"></i>
                    </div>
                    <img src={item.imageurl +"&sz=w1000"} className="card-img-top" alt="..." style={{ height: "17rem", objectFit: 'contain' }} />
                    <div className="card-body">
                        <h5 className="card-title">{item.name.length <= 25 ? item.name : item.name.slice(0, 25) + '...'}</h5>
                        <p className="card-text">{item.description.length === 0 ? <br /> : item.description.length <= 35 ? item.description : item.description.slice(0, 35) + '...'}</p>
                        <h5><span className="badge bg-success my-2 mx-2">{item.rating}&nbsp;<i className="fa-sharp fa-solid fa-star" style={{ fontSize: '0.75rem' }}></i></span></h5>
                        <span style={{ fontWeight: '600', fontSize: '1.35em' }}>Rs&nbsp;{item.newprice}</span>&nbsp;
                        <span className="old-price" style={{ textDecoration: 'line-through' }}>{item.oldprice}</span>&nbsp;
                        {discount > 0 && (
                            <span style={{ color: 'green', fontWeight: '600' }}>{discount.toFixed(2)}% off
                            </span>
                        )}
                        <h5></h5>
                        {noofitem > 0 ? (
                            <div className=' mb-1 ms-1'>
                                <div className=" btn-group " role="group" aria-label="First group">
                                    <button type="button" className="btn btn-primary" onClick={(e) => decrementCount(e, item)}>-</button>
                                    <button type="button" className="btn btn-light">{noofitem}</button>
                                    <button type="button" className="btn btn-primary" onClick={(e) => incrementCount(e, item)}>+</button>
                                </div>
                            </div>) : (
                            <a href="#" className="btn btn-primary" onClick={handleCheck} style={{ padding: '0.5em' }}>
                                Add to Cart
                            </a>
                        )}
                    </div>
                </div>
            </Link>
        </div>
    )
}

export default Item
