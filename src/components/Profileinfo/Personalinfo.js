import React from 'react'
import './Profileinfo.css'
import { useState, useEffect } from 'react'
import BASE_URL from '../../config'
const Personalinfo = () => {
    const [submitted, setSubmitted] = useState(false)
    const host = BASE_URL;
    const [info, setinfo] = useState({ name: "", email: "", gender: "", address: "", mobileno: "", city: "", state: "", zip: "" })
    useEffect(() => {
        fetchuserinfo();
    }, []);
    const fetchuserinfo = async () => {
        const response = await fetch(`${host}/api/account/getuserinfo`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "auth-token": localStorage.getItem('token')
            },
        })
        const json = await response.json();
        setinfo(json)
    }
    const onChange = (e) => {
        setinfo({ ...info, [e.target.name]: e.target.value })
    }
    const editinfo = async (e, user) => {
        e.preventDefault();
        const response = await fetch(`${host}/api/account/editinfo`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "auth-token": localStorage.getItem('token'),
            },
            body: JSON.stringify(user)
        })
        const json = await response.json();
        setinfo(json)

    }
    const handlesubmit = (e) => {
        editinfo(e, info)
        alert("Personal info saved")
    }

    return (
        <div id="color" >
            <div className="card" style={{padding:'2em'}}>
                <h4 className="mb-3 mt-2" style={{ alignItems: 'center' }}>PERSONAL INFO</h4>
                <div className="mainsection" style={{ paddingTop: '1em' }}>
                    <form className="row g-3" onSubmit={handlesubmit}>
                        <div className="col-md-7">
                            <label htmlFor="inputName4" className="form-label">Name</label>
                            <input type="Name" className="form-control" id="inputName4" name="name" value={info.name} onChange={onChange} />
                        </div>
                        <br />
                        <div className="col-md-6">
                            <label htmlFor="inputemail4" className="form-label">Email</label>
                            <input type="email" className="form-control" id="inputemail4" name="email" value={info.email} disabled />
                        </div>
                        <div className="col-md-6">
                            <label htmlFor="inputemail4" className="form-label">Ph.No</label>
                            <input type="phone" className="form-control" id="inputphone4" name="mobileno" value={info.mobileno} onChange={onChange} />
                        </div>
                        <div className="d-flex" style={{ gap: '1em' }}>
                            <label htmlFor="">Gender:&nbsp;</label>
                            <div className="form-check " >
                                <input className="form-check-input" name="gender" type="radio" value="male" id="flexRadioDefault1" onChange={onChange} checked={info.gender === 'Male' || info.gender === null} />
                                <label className="form-check-label" htmlFor="flexRadioDefault1">
                                    Male
                                </label>
                            </div>
                            <div className="form-check ">
                                <input className="form-check-input" name="gender" type="radio" value="female" id="flexRadioDefault2" onChange={onChange} checked={info.gender === 'Female' || info.gender === null} />
                                <label className="form-check-label" htmlFor="flexRadioDefault2">
                                    Female
                                </label>
                            </div>
                            <div className="d-flex">
                                <div className="form-check " >
                                    <input className="form-check-input" type="radio" name="gender" value="others" id="flexRadioDefault1" onChange={onChange} checked={info.gender === 'Others' || info.gender === null} />
                                    <label className="form-check-label" for="flexRadioDefault1">
                                        Others
                                    </label>
                                </div>
                            </div>
                        </div>
                        <div className="col-12">
                            <label htmlFor="inputAddress" className="form-label">Address</label>
                            <input type="text" className="form-control" id="inputAddress" name="address" value={info.address} onChange={onChange} placeholder="1234 Main St" />
                        </div>
                        <div className="col-md-4">
                            <label htmlFor="inputCity" className="form-label">City</label>
                            <input type="text" className="form-control" id="inputCity" name="city" value={info.city} onChange={onChange} />
                        </div>
                        <div className="col-md-5">
                            <label htmlFor="inputState" className="form-label">State/Union Territory</label>
                            <select id="inputState" className="form-select" name="state" value={info.state} onChange={onChange}>
                                <option selected>Choose...</option>
                                <option>Andaman and Nicobar Islands</option>
                                <option>Andhra Pradesh</option>
                                <option>Arunachal Pradesh</option>
                                <option>Assam</option>
                                <option>Bihar</option>
                                <option>Chandigarh</option>
                                <option>Chhattisgarh</option>
                                <option>Dadra and Nagar Haveli & Daman and Diu</option>
                                <option>Delhi</option>
                                <option>Goa</option>
                                <option>Gujarat</option>
                                <option>Haryana</option>
                                <option>Himachal Pradesh</option>
                                <option>Jammu and Kashmir</option>
                                <option>Jharkhand</option>
                                <option>Karnataka</option>
                                <option>Kerala</option>
                                <option>Ladakh</option>
                                <option>Lakshadweep</option>
                                <option>Madhya Pradesh</option>
                                <option>Maharashtra</option>
                                <option>Manipur</option>
                                <option>Meghalaya</option>
                                <option>Mizoram</option>
                                <option>Nagaland</option>
                                <option>Odisha</option>
                                <option>Puducherry</option>
                                <option>Punjab</option>
                                <option>Rajasthan</option>
                                <option>Sikkim</option>
                                <option>Tamil Nadu</option>
                                <option>Telangana</option>
                                <option>Tripura</option>
                                <option>Uttar Pradesh</option>
                                <option>Uttarakhand</option>
                                <option>West Bengal</option>
                            </select>
                        </div>

                        <div className="col-md-3">
                            <label htmlFor="inputZip" className="form-label">Zip</label>
                            <input type="text" className="form-control" id="inputZip" name="zip" value={info.zip} onChange={onChange} />
                        </div>

                        <div className="col-12 mt-4 my-2">
                            <button type="submit" className="btn btn-primary">Save</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Personalinfo
