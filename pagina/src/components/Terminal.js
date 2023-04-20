import React, { useState } from 'react';
import './terminal.css';
const Terminal = () => {
  const [inputValue, setInputValue] = useState('');
  const [outputValue, setOutputValue] = useState('');

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    setOutputValue(`${outputValue}\n> ${inputValue}`);
    setInputValue('');
  };

  return (
    <div className="terminal">
      <h2>Terminal</h2>
      <div className="output">{outputValue}</div>
      <form onSubmit={handleFormSubmit}>
        <input type="text" value={inputValue} onChange={handleInputChange} />
        <button type="submit">Enviar</button>
      </form>
    </div>
  );
};

export default Terminal;
