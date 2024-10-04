import React from 'react'
import itemContext from '../../context/items/ItemContext'
import { useContext, useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Loader from '../Loader'; 
const Orders = () => {
    const context = useContext(itemContext)
    const { getorders, cancelorder } = context;
    const [orders, setorder] = useState([])
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(true);
    useEffect(() => {
        setIsLoading(true);
        const fetchorders = async () => {
            const Orders = await getorders();
            setorder(Orders);

        }

        fetchorders();
        const timer = setTimeout(() => {
            setIsLoading(false);
        }, 500);
        return () => clearTimeout(timer);
    }, [])

    return (
        <>
        {isLoading?(
        <Loader/>
        ):(<div style={{ backgroundColor: 'rgb(235 235 235)', minHeight: '86vh', justifyContent: 'center', display: 'flex' }}>
            {orders.length === 0 && (
                <div className='card' style={{ backgroundColor: 'rgb(250 255 205)', alignItems: 'center', justifyContent: 'center', display: 'flex' , margin: '3em', padding: '8em 8em 5em 8em' }}>
                    <img src="https://www.miraaf.com/assets/images/no_order1.png" alt="" />
                    <button className='btn btn-primary mt-3'  onClick={(e) => { e.preventDefault(); navigate('/') }}>Continue Shopping</button>
                </div>
            )}
            {orders.length > 0 && (
                <div className="main d-flex" style={{ gap: '1em', justifyContent: 'center', paddingTop: '0em' }}>
                    <div className="card cart-items px-4 py-4 " style={{ backgroundColor: 'white', margin: '2em 0em' }}>
                        {orders.map((item) => (
                            <Link to={`/item/${btoa(item.item.name)}`} key={btoa(item.item.name)}>
                                <div className="card mb-3" style={{padding: '1em', borderRadius: '0%', opacity: item.orderstatus === 'Placed' ? '1' : '0.7' }}>
                                    <div className="row g-0" style={{alignItems:'center'}}>
                                        <div className="col" style={{ justifyContent: 'center' }}>
                                            <div className="card" style={{  borderColor: 'white', alignItems: 'center' }}>
                                                <img src={item.item.imageurl +"&sz=w1000"} style={{ height: '10em', objectFit: 'contain' }} className="img-fluid rounded-start" alt="..." />
                                                <h5 style={{ color: item.orderstatus === "Placed" ? 'green' : 'red', justifyContent: 'center' }}>Order&nbsp;{item.orderstatus}</h5>
                                            </div>

                                        </div>
                                        <div className="col-7">
                                            <div className="card-body">
                                                <h5 className="card-title">{item.item.name.length >= 50 ? item.item.name.slice(0, 50) + '...' : item.item.name}</h5>
                                                <h6 style={{ fontWeight: 300 }}>{item.item.description.length >= 50 ? item.item.description.slice(0, 50) + '...' : item.item.description}</h6>
                                                <div className="price" style={{ fontSize: '1.25em' }}>
                                                    <h5><span className="badge bg-success my-2 mx-2">{item.item.rating}&nbsp;<i className="fa-sharp fa-solid fa-star" style={{ fontSize: '0.75rem' }}></i></span></h5>
                                                    <span style={{ fontWeight: '600' }}>Rs&nbsp;{item.item.newprice}</span>&nbsp;
                                                    <span className="old-price" style={{ textDecoration: 'line-through' }}>{item.item.oldprice}</span>&nbsp;
                                                    <span style={{ color: 'green', fontWeight: '600' }}>{((item.item.oldprice - item.item.newprice) / item.item.oldprice * 100).toFixed(2)}% off
                                                    </span>
                                                    <h6>No of items:&nbsp;<span style={{color:'green'}}>{item.noofitems}</span></h6>
                                                </div>

                                            </div>
                                        </div>
                                        <div className="col-2 ">
                                            {/* <button className='btn btn-primary mt-5'>Remove</button> */}
                                            <button className="btn btn-info " style={{width:'8em'}}  onClick={(e) => {
                                                e.preventDefault();
                                                cancelorder(item);
                                                alert("Order cancelled");
                                                window.location.reload();
                                            }}  disabled={item.orderstatus === "Cancelled"}>Cancel Order</button>
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        ))}

                    </div>
                </div>
            )}
        </div>
    )}
    </>
    )
}

export default Orders
