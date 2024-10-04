import React, { useEffect } from 'react'
import Item from '../Item/Item'
import totalitems from '../products.json'
import Loader from '../Loader';
import { useState } from 'react';
const Womentype = (props) => {
  const { type } = props;
  const [isLoading, setIsLoading] = useState(true);
  const filteredProducts = totalitems.products.filter((product) => product.type === type);
  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 200);
    return () => clearTimeout(timer);
  }, [type])

  return (
    <div>
      {isLoading? 
      (<div>
        <Loader/>
      </div>)
      :(<div style={{ padding: '2em' }}>
        <h3 style={{ padding: '0.5em' }}>{type}</h3>
        <div className="products-container" style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gridRowGap: '1em' }}>
          {filteredProducts.map((product) => (
            <Item item={product} />
          ))}
        </div>
      </div>)}
    </div>
  )
}

export default Womentype
