import React, { useState, useContext, useEffect } from 'react';
import itemContext from '../../context/items/ItemContext';
import { useNavigate, Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Loader from '../Loader';

const Cart = () => {
  const context = useContext(itemContext);
  const { getitems, edititem, deleteitem, addorder } = context;
  const navigate = useNavigate();
  const [items, setItems] = useState([]);
  const [toldprice, setOldPrice] = useState(0);
  const [tnewprice, setNewPrice] = useState(0);
  const loggedin = useSelector(state => state.loggedin);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    setIsLoading(true);
    const fetchItems = async () => {
      const fetchedItems = await getitems();
      setItems(fetchedItems);
      
    };

    if (loggedin) fetchItems();
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 900);
    console.log(items)
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    let sum1 = 0;
    let sum2 = 0;
    for (let i = 0; i < items.length; i++) {
      sum1 += items[i].item.newprice * items[i].noofitems;
      sum2 += items[i].item.oldprice * items[i].noofitems;
    }
    setNewPrice(sum1);
    setOldPrice(sum2);
  }, [items]);

  const removeItem = (e, item) => {
    e.preventDefault();
    const updatedItems = items.filter((i) => i.item.name !== item.item.name);
    setItems(updatedItems);
    deleteitem(item.item);
  };

  const decrementCount = (e, item) => {
    e.preventDefault();
    if (item.noofitems === 1) {
      const updatedItems = items.filter((i) => i.item.name !== item.item.name);
      setItems(updatedItems);
      deleteitem(item.item);
    } else {
      const updatedItem = items.map((i) => {
        if (i.item.name === item.item.name) {
          return { ...i, noofitems: i.noofitems - 1 };
        }
        return i;
      });
      setItems(updatedItem);
      
      edititem(item.item, item.noofitems - 1);
    }
  };

  const incrementCount = (e, item) => {
    e.preventDefault();
    const updatedItem = items.map((i) => {
      if (i.item.name === item.item.name) {
        return { ...i, noofitems: i.noofitems + 1 };
      }
      return i;
    });
    setItems(updatedItem);
    edititem(item.item, item.noofitems + 1);
  };

  const placeOrder = () => {
    navigate("/api/account/paymentdetails")
  };

  return (
    <>
  {isLoading ? (
    <Loader />
  ) : (
    loggedin && (
      <div style={{ backgroundColor: 'rgb(235,235,235)', minHeight: '86vh', alignItems: 'center', justifyContent: 'center', display: 'flex' }}>
        {items.length === 0 && (
          <div className="card" style={{ display: 'flex', backgroundColor: '#f7f7f7', width: '60em', position: 'absolute', padding: '2em', alignItems: 'center' }}>
            <img src="https://www.seekpng.com/png/detail/117-1170538_404-your-cart-is-empty.png" alt="" />
            <button className="btn btn-primary col-md-6" onClick={() => navigate('/')}>
              Continue Shopping
            </button>
          </div>
        )}
        {items.length > 0 && (
          <div className="main d-flex flex-wrap" style={{ gap: '2em' }}>
            <div className="card cart-items px-4 py-4" style={{ margin: '2em 0em 2em 3em',width:'55em'}}>
              {items.map((item) => (
                <Link to={`/item/${btoa(item.item.name)}`} key={item.item.name}>
                  <div className="card mb-3" style={{ padding: '1em', borderRadius: '0%' }}>
                    <div className="row g-0">
                      <div className="col-md-3">
                        <div className="card" style={{ width: '12em', borderColor: 'white' }}>
                          <img src={item.item.imageurl+"&sz=w1000"} style={{ height: '10em', objectFit: 'contain' }} className="img-fluid rounded-start" alt="..." />
                        </div>
                      </div>
                      <div className="col-md-7">
                        <div className="card-body">
                          <h5 className="card-title">{item.item.name.length >= 50 ? item.item.name.slice(0, 50) + '...' : item.item.name}</h5>
                          <h6 style={{ fontWeight: 300 }}>{item.item.description.length >= 50 ? item.item.description.slice(0, 50) + '...' : item.item.description}</h6>
                          <div className="price" style={{ fontSize: '1.25em' }}>
                            <h5>
                              <span className="badge bg-success my-2 mx-2">
                                {item.item.rating}&nbsp;<i className="fa-sharp fa-solid fa-star" style={{ fontSize: '0.75rem' }}></i>
                              </span>
                            </h5>
                            <span style={{ fontWeight: '600' }}>Rs&nbsp;{item.item.newprice}</span>&nbsp;
                            <span className="old-price" style={{ textDecoration: 'line-through' }}>
                              {item.item.oldprice}
                            </span>&nbsp;
                            <span style={{ color: 'green', fontWeight: '600' }}>{((item.item.oldprice - item.item.newprice) / item.item.oldprice * 100).toFixed(2)}% off</span>
                          </div>
                          <button className="btn btn-info mt-3" onClick={(e) => removeItem(e, item)}>
                            Remove
                          </button>
                        </div>
                      </div>
                      <div className="col-md-1">
                        <div className="btn-group me-2 mt-5" role="group" aria-label="First group">
                          <button type="button" className="btn btn-primary" onClick={(e) => decrementCount(e, item)}>
                            -
                          </button>
                          <button type="button" className="btn btn-light">
                            {item.noofitems}
                          </button>
                          <button type="button" className="btn btn-primary" onClick={(e) => incrementCount(e, item)}>
                            +
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
              <button className="btn btn-warning" onClick={placeOrder} style={{ width: '8em', marginLeft: '50%', transform: 'translateX(-50%)', fontSize: '1.5em' }}>
                Place Order
              </button>
            </div>
            <div className="bill me-5" style={{ width:'25em'}}>
              <div className="card" style={{ width: 'auto', marginTop: '2em', padding: '2em' }}>
                <h3>Total price ({items.length} item(s))</h3>
                <div className="pricebody my-4">
                  <h5 style={{ fontSize: '1.3em', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    Actual Price: <span>Rs {toldprice}</span>
                  </h5>
                  <h5 style={{ fontSize: '1.3em', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    Discount: <span>Rs {toldprice - tnewprice}</span>
                  </h5>
                  <h5 style={{ fontSize: '1.3em', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    Delivery Charges: <span style={{ color: 'green' }}>Free</span>
                  </h5>
                  <hr />
                  <h5 style={{ fontSize: '1.3em', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    Total : <span style={{ width: 'fit-content' }}></span>Rs {tnewprice}
                  </h5>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    )
  )}
</>

  );
};

export default Cart;
