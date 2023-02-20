import React, { useState } from 'react';
import InputForm from './InputForm';
import { calculatePrice } from '../utils';

// Render calculator

const Calculator: React.FC = () => {
  const [totalDeliveryPrice, setTotalDeliveryPrice] = useState<string>('');

  const [calcInfo, setCalcInfo] = useState({
    cartVal: 0,
    delDist: 0,
    itemCount: 0,
    time: '',
  });

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newPrice = calculatePrice(calcInfo, e);
    if (newPrice) {
      setTotalDeliveryPrice(newPrice);
    }
  };

  return (
    <div>
      <InputForm calcInfo={calcInfo} setCalcInfo={setCalcInfo} onSubmit={onSubmit} />
      <p>Delivery Price:</p>
      <p>{totalDeliveryPrice}</p>
    </div>
  );
};

export default Calculator;
