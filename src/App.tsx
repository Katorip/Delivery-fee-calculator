import React from 'react';
import './App.css';
import Calculator from './components/Calculator';

// A delivery fee calculator. It is needed when a customer is ready with their
// shopping cart and it is time to show them how much the delivery will cost.
// The delivery price depends on the cart value, the number of items in the cart,
// the time of the order, and the delivery distance.
// Instructions: https://github.com/woltapp/engineering-summer-intern-2023

const App: React.FC = () => {
  return (
    <div className="App">
      <span>Delivery Fee Calcualtor</span>
      <Calculator />
    </div>
  );
};

export default App;
