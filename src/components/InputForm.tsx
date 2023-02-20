import React from 'react';

// Input form where user can add needed infomation for calculating the delivery price.

interface Props {
  calcInfo: {
    cartVal: number;
    delDist: number;
    itemCount: number;
    time: string;
  };
  setCalcInfo: React.Dispatch<
    React.SetStateAction<{
      cartVal: number;
      delDist: number;
      itemCount: number;
      time: string;
    }>
  >;

  onSubmit: (e: React.FormEvent) => void;
}

const InputField: React.FC<Props> = ({ calcInfo, setCalcInfo, onSubmit }: Props) => {
  return (
    <div>
      <form onSubmit={onSubmit}>
        <label>Cart value</label>
        <input
          type="number"
          step="0.01"
          autoFocus
          required
          min="0"
          onInput={(e) =>
            setCalcInfo({
              ...calcInfo,
              cartVal: e.currentTarget.valueAsNumber,
            })
          }
        ></input>
        <br />

        <label>Delivery Distance</label>
        <input
          type="number"
          required
          min="0"
          onChange={(e) =>
            setCalcInfo({
              ...calcInfo,
              delDist: e.target.valueAsNumber,
            })
          }
        ></input>
        <br />

        <label>Amount of items</label>
        <input
          type="number"
          required
          min="0"
          onChange={(e) =>
            setCalcInfo({
              ...calcInfo,
              itemCount: e.target.valueAsNumber,
            })
          }
        ></input>
        <br />

        <label>Delivery time</label>
        <input
          type="datetime-local"
          required
          onChange={(e) =>
            setCalcInfo({
              ...calcInfo,
              time: e.target.value,
            })
          }
        ></input>
        <br />

        <button className="submitButton" type="submit">
          Submit
        </button>
      </form>
      <br />
    </div>
  );
};

export default InputField;
