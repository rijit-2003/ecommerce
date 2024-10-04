import React, { useEffect, useState } from 'react'
import Item from '../Item/Item'
import totalitems from '../products.json'
import Loader from '../Loader';
const Brandsearch = (props) => {
    const {brand}=props;
    const [filteredItems, setFilteredItems] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    useEffect(() => {
      setIsLoading(true);
      const filteredItems = totalitems.products.filter((item) =>
        item.name.toLowerCase().includes(brand.toLowerCase())
      );
      setFilteredItems(filteredItems);
      const timer = setTimeout(() => {
        setIsLoading(false);
      }, 200);
      
  
  
      return () => clearTimeout(timer);
    }, [brand]);
  return (
    <div>
    {isLoading ? (
      <div>
        <Loader /> {/* Replace with your Loader component */}
      </div>
    ) : (
      <div style={{ padding: '2em' }}>
        <h3 style={{ padding: '0.5em' }}>{brand}</h3>
        <div className="products-container" style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gridRowGap: '1em' }}>
          {filteredItems.map((product) => (
            <Item item={product} key={product.id} />
          ))}
        </div>
      </div>
    )}
  </div>
  )
}

export default Brandsearch
