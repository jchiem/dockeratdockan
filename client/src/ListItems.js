import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ListItems = () => {
  const [listItems, setListItems] = useState([]);
  const [newItem, setNewItem] = useState('');

  useEffect(() => {
    fetchItems()
  }, []);

  const fetchItems = async () => {
    const { data } = await axios.get('/api/values/all');
    setListItems(data);
  }

  const handleSubmit = async event => {
    event.preventDefault();

    const { data } = await axios.post('/api/values', {
      item: newItem
    });

    setNewItem('');
    setListItems(data);
  };

  const renderListItems = () =>
    listItems.map(({ item }) =>
      <li key={item + Math.random(10)}>{item}</li>
    );


  const removeAllItems = async () => {
    const { data } = await axios.delete('/api/values/all');
    setListItems(data);
  }

  const handleKeyUp = function (e) {
    if (e.key === 'Enter') {
      handleSubmit(e);
      setNewItem('');
    }
  }

  return (
    <div>
      <div className="listitem-form">
        <input
          value={newItem}
          onChange={event => setNewItem(event.target.value)}
          placeholder="Skriv upp något på listan här för f*n"
          onKeyUp={handleKeyUp}
        />
      </div>
      <div className="button-area">
        <button className="add-button" onClick={handleSubmit}>LÄGG TILL DÅ</button>
        <button className="remove-all-button" onClick={removeAllItems}>AMEN TA BORT SKITEN</button>
      </div>
      <div className="list-container">
        {listItems.length > 0 ? <h3>Saker i din j*vla lista:</h3> : ''}
        <ul className="listItems">
          {renderListItems()}
        </ul>
      </div>
    </div>
  );

}

export default ListItems;
