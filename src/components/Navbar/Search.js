import React, { useEffect, useState } from 'react';
import totalitems from '../products.json';
import Item from '../Item/Item';
import seedrandom from 'seedrandom';
import Loader from '../Loader';

const Search = (props) => {
  const { word } = props;
  const [isLoading, setIsLoading] = useState(true);
  const [filteredItems, setFilteredItems] = useState([]);

  useEffect(() => {
    setIsLoading(true);
    filterItems();
    // Simulate a loading period of 2 seconds
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 200);
    


    return () => clearTimeout(timer);

  }, [props]);

  const filterItems = () => {
    const filteredItems = totalitems.products.filter((item) => {
      const itemKeys = Object.keys(item);
      const searchTermLower = word.toLowerCase();

      for (let i = 0; i < itemKeys.length; i++) {
        const key = itemKeys[i];
        if (
          typeof item[key] === 'string' &&
          item[key].toLowerCase().includes(searchTermLower)
        ) {
          return true;
        }
      }

      return false;
    });

    const shuffledArray = shuffleArrayWithSeed(filteredItems, 123);
    setFilteredItems(shuffledArray);
  };

  const shuffleArrayWithSeed = (array, seed) => {
    const shuffledArray = [...array];
    const rng = seedrandom(seed);

    for (let i = shuffledArray.length - 1; i > 0; i--) {
      const j = Math.floor(rng() * (i + 1));
      [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
    }

    return shuffledArray;
  };

  return (
    <>
      {isLoading ? (
        <div>
          <Loader /> 
        </div>
      ) : filteredItems.length === 0 ? (
        <div style={{ padding: '7em 35em' }}>
          <img src="https://saferoomdesigns.com/wp-content/uploads/2021/06/item_no.png" alt="" />
        </div>
      ) : (
        <div style={{ padding: '2em' }}>
          <h2 style={{ paddingBottom: '0.25em' }}>Search Results:</h2>
          <div className="products-container" style={{ display: 'grid', gridRowGap: '1em' }}>
            {filteredItems.map((item) => (
              <Item item={item} key={item.id} />
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default Search;
