import React from 'react';
import Loader from './Loader';
import { useNavigate } from 'react-router-dom';
const Carousel = () => {
    const navigate=useNavigate();
    return (
        <div>
            <div
                id="carouselExampleAutoplaying"
                className="carousel slide"
                data-bs-ride="carousel"
            // style={{height:'400px',overflow:'hidden'}}
            >
                <div className="carousel-indicators" style={{zIndex:'1'}}>
                    <button type="button" data-bs-target="#carouselExampleAutoplaying" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>
                    <button type="button" data-bs-target="#carouselExampleAutoplaying" data-bs-slide-to="1" aria-label="Slide 2"></button>
                    <button type="button" data-bs-target="#carouselExampleAutoplaying" data-bs-slide-to="2" aria-label="Slide 3"></button>
                </div>
                <div className="carousel-inner d-flex align-items-center" >
                    <div className="carousel-item active justify-content-center">
                        <img
                            className='d-block w-100'
                            src="https://drive.google.com/thumbnail?id=10tOlrw8pA6cergpLLlu-aH7Pxw6q-yw-&sz=w1000"
                            // https://drive.google.com/file/d/10tOlrw8pA6cergpLLlu-aH7Pxw6q-yw-/view?usp=sharing
                            alt="..."
                            onClick={()=>{navigate('/RWxlY3Ryb25pY3M=')}}
                            style={{cursor:'pointer'}}
                        />
                    </div>
                    <div className="carousel-item">
                        <img
                            className='d-block w-100'
                            // src="https://img.freepik.com/free-vector/horizontal-sale-banner-template_23-2148897328.jpg?w=2000"
                            src="https://drive.google.com/thumbnail?id=1RHvTTrdqh317v5uTyMjQBUxndq3-7cnf&sz=w1000"
                            alt="..."
                            onClick={()=>{navigate('/TWFrZXVw')}}
                            style={{cursor:'pointer'}}
                        />
                    </div>
                    <div className="carousel-item">
                        <img
                            className='d-block w-100'
                            // src="https://i.ytimg.com/vi/U5Q3Du2W9a0/maxresdefault.jpg"
                            src="https://drive.google.com/thumbnail?id=1X8TRY5ehNpt1ZtD1vcXh61lcOCc6EPtj&sz=w1000"
                            alt="..."
                            onClick={()=>{navigate('/womenclothing')}}
                            style={{cursor:'pointer'}}
                        />
                    </div>
                </div>
                <button
                    className="carousel-control-prev"
                    type="button"
                    data-bs-target="#carouselExampleAutoplaying"
                    data-bs-slide="prev"
                >
                    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Previous</span>
                </button>
                <button
                    className="carousel-control-next"
                    type="button"
                    data-bs-target="#carouselExampleAutoplaying"
                    data-bs-slide="next"
                >
                    <span className="carousel-control-next-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Next</span>
                </button>
            </div>
        </div>
    );
};

export default Carousel;
