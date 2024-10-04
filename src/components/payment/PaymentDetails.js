import React, { useState } from 'react';
import "./payment.css"
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import itemContext from '../../context/items/ItemContext';

const PaymentDetails = () => {
  const [selected, setSelected] = useState(null);
  const navigate=useNavigate()
  const context = useContext(itemContext);
  const { getitems, edititem, deleteitem, addorder } = context;
  const [items, setItems] = useState([]);
  const loggedin = useSelector(state => state.loggedin);
  const handleRadioChange = (event) => {
    const { value } = event.target;
    setSelected(prevSelected => prevSelected === value ? null : value);
  };
  useEffect(() => {
    const fetchItems = async () => {
      const fetchedItems = await getitems();
      setItems(fetchedItems);
    };

    if (loggedin) fetchItems();
  }, []);
  
  const placeorder=()=>{
    for (let i = 0; i < items.length; i++) {
      addorder(items[i].item, items[i].noofitems);
    }
    for (let i = 0; i < items.length; i++) {
      deleteitem(items[i].item);
    }
    alert("Order placed Successfully");
    navigate("/api/account/orders");
  }

  return (
    <div className="paymentpage" style={{ backgroundColor: "rgb(235,235,235)", justifyContent: 'center', display: 'flex', minheight: '80vh', padding: '2em 0em' }}>
      <div className="card col-md-8" style={{ backgroundColor: 'white', padding: '2em', display: 'inline-block' }}>
        <div className="deliveryaddress">
          <div className="col-7">
            <h4><label htmlFor="inputAddress" className="form-label">Address</label></h4>
            <input type="text" className="form-control" id="inputAddress" name="address" placeholder="Enter your address where item(s) to be delivered" />
          </div>
        </div>
        <div className="paymentoptions mt-4 col-md-6" >
          <h4>Payment Options</h4>
          <div className="accordion" id="accordionExample">
            <div className="accordion-item">
              <h2 className="accordion-header">
                <button
                  className={`accordion-button ${selected === 'radioOne' ? 'active' : ''}`}
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#collapseOne"
                  aria-expanded={selected === 'radioOne'}
                  aria-controls="collapseOne"
                >
                  <input
                    type="radio"
                    name="accordion-radio"
                    value="radioOne"
                    id="radioOne"
                    checked={selected === 'radioOne'}
                    onChange={handleRadioChange}
                  />{' '}
                  &nbsp; UPI
                </button>
              </h2>
              <div
                id="collapseOne"
                className={`accordion-collapse collapse ${selected === 'radioOne' ? 'show' : ''}`}
                data-bs-parent="#accordionExample"
              >
                <div className="accordion-body">
                  <h5><label htmlFor="inputAddress" className="form-label">UPI ID</label></h5>
                  <input type="text" className="form-control" id="inputAddress" name="address" placeholder="Enter your UPI ID" />
                  <button className="btn btn-warning mt-3">Pay Now</button>
                </div>
              </div>
            </div>
            <div className="accordion-item">
              <h2 className="accordion-header">
                <button
                  className={`accordion-button ${selected === 'radioTwo' ? 'active' : ''}`}
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#collapseTwo"
                  aria-expanded={selected === 'radioTwo'}
                  aria-controls="collapseTwo"
                >
                  <input
                    type="radio"
                    name="accordion-radio"
                    value="radioTwo"
                    id="radioTwo"
                    checked={selected === 'radioTwo'}
                    onChange={handleRadioChange}
                  />{' '}
                  &nbsp; Paytm
                </button>
              </h2>
              <div
                id="collapseTwo"
                className={`accordion-collapse collapse ${selected === 'radioTwo' ? 'show' : ''}`}
                data-bs-parent="#accordionExample"
              >
                <div className="accordion-body">
                  {/* <strong>This is the second item's accordion body.</strong> It is shown when the radio button is enabled. */}
                  <h5><label htmlFor="inputAddress" className="form-label">Ph. no</label></h5>
                  <input type="text" className="form-control" id="inputAddress" name="address" placeholder="Enter your mobile no" />
                  <button className="btn btn-warning mt-3">Pay Now</button>
                </div>
              </div>
            </div>
            <div className="accordion-item">
              <h2 className="accordion-header">
                <button
                  className={`accordion-button ${selected === 'radioThree' ? 'active' : ''}`}
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#collapseThree"
                  aria-expanded={selected === 'radioThree'}
                  aria-controls="collapseThree"
                >
                  <input
                    type="radio"
                    name="accordion-radio"
                    value="radioThree"
                    id="radioThree"
                    checked={selected === 'radioThree'}
                    onChange={handleRadioChange}
                  />
                  &nbsp; Credit/Debit/ATM Card
                </button>
              </h2>
              <div
                id="collapseThree"
                className={`accordion-collapse collapse ${selected === 'radioThree' ? 'show' : ''}`}
                data-bs-parent="#accordionExample"
              >
                <div className="accordion-body">
                  {/* <strong>This is the third item's accordion body.</strong> It is shown when the radio button is enabled. */}
                  <form style={{gap:'1em'}}>
                    <label>
                      Card Number:
                      <input
                        type="text"
                        className='form-control'
                        // value={cardNumber}
                        // onChange={(event) => setCardNumber(event.target.value)}
                        required
                      />
                    </label>
                    <br />
                    <label>
                      Expiration Date:
                      <input
                        type="text"
                        className="form-control"
                        // value={expirationDate}
                        // onChange={(event) => setExpirationDate(event.target.value)}
                        required
                      />
                    </label>
                    <br />
                    <label>
                      CVV:
                      <input
                        type="text"
                        className="form-control"
                        required
                      />
                    </label>
                    <br />
                    <label>
                      Cardholder Name:
                      <input
                        type="text"
                        className="form-control"
                        // value={cardholderName}
                        // onChange={(event) => setCardholderName(event.target.value)}
                        required
                      />
                    </label>
                    <br />
                    <button className="btn btn-warning mt-2">Pay Now</button>
                  </form>
                </div>
              </div>
            </div>
            <div className="accordion-item">
              <h2 className="accordion-header">
                <button
                  className={`accordion-button ${selected === 'radiofour' ? 'active' : ''}`}
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#collapsefour"
                  aria-expanded={selected === 'radiofour'}
                  aria-controls="collapseThree"
                >
                  <input
                    type="radio"
                    name="accordion-radio"
                    value="radiofour"
                    id="radiofour"
                    checked={selected === 'radiofour'}
                    onChange={handleRadioChange}
                  />
                  &nbsp; Cash on Delivery
                </button>
              </h2>
              {/* <div
                id="collapseThree"
                className={`accordion-collapse collapse ${selected === 'radioThree' ? 'show' : ''}`}
                data-bs-parent="#accordionExample"
              >
                <div className="accordion-body">
                  <strong>This is the third item's accordion body.</strong> It is shown when the radio button is enabled.
                </div>
              </div> */}
            </div>
          </div>
        </div>
        <button className='btn btn-warning mt-3 ms-2' onClick={placeorder}>Place Order</button>
      </div>
    </div>
  );
};

export default PaymentDetails;
