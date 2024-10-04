import React, { useState } from 'react'
import './Navbar2.css'
import { Link, useNavigate } from "react-router-dom"
const Navbar2 = () => {
    const [islistvisible, setislist] = useState(false);
    const navigate = useNavigate()
    const hovermouseenter = () => {
        setislist(true);
    }
    const hovermouseleave = () => {
        setislist(false);
    }
    const hoverchange = (e) => {
        e.preventDefault();
        if (islistvisible == true) setislist(false);
        else setislist(true);
    }
    const basename = "ecommerce-whole"
    return (
        <div className='navbar2' style={{ maxHeight: '70px', backgroundColor: 'black' }}>
            <div className="container" >
                <div className="wrapper flexitem">
                    {/* <a href="" style={{fontFamily:'Great Vibes', fontWeight:'600',fontSize:'30px',color:'#990a99'}}>ShoppingHub</a> */}
                    <div className="left d-flex">
                        <ul className="flexitem" >
                            <li><Link to="/">Home</Link></li>
                            <li onMouseEnter={hovermouseenter} onMouseLeave={hovermouseleave} onClick={hoverchange}>
                                <a href="" id="1">Women
                                    <div className="icon-small">&nbsp;<i className="fa-solid fa-angle-down" style={{ transform: islistvisible ? 'scaleY(-1)' : '' }}></i></div>
                                </a>
                                {islistvisible && (<div className="list" id="1">
                                    <div className="container">
                                        <div className="wrapper">
                                            {/* <div className="flexcol">
                                                <div className="row">
                                                    <h4>Clothing</h4>
                                                    <ul>
                                                        <li><Link to={`/${btoa('Hair Care')}`}>Dresses</a></li>
                                                        <li><Link to={`/${btoa('Hair Care')}`}>Tops</a></li>
                                                        <li><Link to={`/${btoa('Hair Care')}`}>Jackets</a></li>
                                                        <li><Link to={`/${btoa('Hair Care')}`}>Pants & Capri</a></li>
                                                        <li><Link to={`/${btoa('Hair Care')}`}>Sweatshirts</a></li>
                                                        <li><Link to={`/${btoa('Hair Care')}`}>Shorts</a></li>
                                                        <li><Link to={`/${btoa('Hair Care')}`}>Swimmers</a></li>
                                                        <li><Link to={`/${btoa('Hair Care')}`}>Pajamas</a></li>
                                                        <li><Link to={`/${btoa('Hair Care')}`}>Sweaters</a></li>
                                                    </ul>
                                                </div>
                                            </div> */}
                                            <div className="flexcol">
                                                <div className="row">
                                                    <h4>Jewellery</h4>
                                                    <ul>
                                                        <li><Link to={`/${btoa('Bags & Purses')}`}>Bags & Purses</Link></li>
                                                        <li><Link to={`/${btoa('Necklace')}`} >Necklaces</Link></li>
                                                        <li><Link to={`/${btoa('Ring')}`}>Ring</Link></li>
                                                        <li><Link to={`/${btoa('Earrings')}`}>Earrings</Link></li>
                                                        <li><Link to={`/${btoa('Bracelet')}`} >Bracelets</Link></li>
                                                    </ul>
                                                </div>
                                            </div>
                                            <div className="flexcol">
                                                <div className="row">
                                                    <h4>Beauty</h4>
                                                    <ul>
                                                        <li><Link to={`/${btoa('Hair Care')}`} >Hair Care</Link></li>
                                                        <li><Link to={`/${btoa('Skin Care')}`}>Skin Care</Link></li>
                                                        <li><Link to={`/${btoa('Makeup')}`} >Makeup</Link></li>
                                                        <li><Link to={`/${btoa('Perfume')}`}>Perfumes & deos</Link></li>
                                                    </ul>
                                                </div>
                                            </div>
                                            {/* <div className="flexcol products">
                                                <div className="row">
                
                                                    <div className="text-content">
                                                        <h4>Most Wanted!</h4>
                                                        <a href="" className="primary-button">Order Now</a>
                                                    </div>
                                                </div>
                                            </div> */}
                                        </div>
                                    </div>
                                </div>)}
                            </li>
                            <li><Link to={`/menclothing`}>Men
                                <div className="icon-small"></div>
                            </Link></li>
                            <li><Link to={`/${btoa('Kidsclothing')}`}>Kids
                                <div className="icon-small"></div>
                            </Link></li>
                            <li>
                                <Link to={`/${btoa('Furniture')}`}>Furniture</Link>
                            </li>
                            <li><Link to={`/${btoa('Electronics')}`}>Electronics</Link></li>
                            <li><Link to={`/topdeals`}>Top Deal</Link></li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Navbar2
