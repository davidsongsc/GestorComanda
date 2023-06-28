import React, { useState } from 'react';

const Teclado = () => {
  const [input, setInput] = useState('');
  const [capsLockOn, setCapsLockOn] = useState(false);
  const [shiftPressed, setShiftPressed] = useState(false);

  const handleKeyClick = (key) => {
    let value = key;

    if (shiftPressed || (capsLockOn && !isNumeric(key))) {
      value = key.toUpperCase();
    }

    setInput((prevInput) => prevInput + value);
  };

  const handleDelete = () => {
    setInput((prevInput) => prevInput.slice(0, -1));
  };

  const handleClear = () => {
    setInput('');
  };

  const handleCapsLockToggle = () => {
    setCapsLockOn((prevCapsLockOn) => !prevCapsLockOn);
  };

  const handleShiftToggle = () => {
    setShiftPressed((prevShiftPressed) => !prevShiftPressed);
  };

  const isNumeric = (key) => {
    return /^\d+$/.test(key);
  };

  return (
    <div>
      <input type="text" value={input} />

      <div>
        <div>
          <button onClick={() => handleKeyClick('1')}>1</button>
          <button onClick={() => handleKeyClick('2')}>2</button>
          <button onClick={() => handleKeyClick('3')}>3</button>
          {/* ... other numeric keys */}
        </div>
        <div>
          <button onClick={() => handleKeyClick('q')}>Q</button>
          <button onClick={() => handleKeyClick('w')}>W</button>
          <button onClick={() => handleKeyClick('e')}>E</button>
          {/* ... other letter keys */}
        </div>
        <div>
          <button onClick={handleCapsLockToggle}>Caps Lock</button>
          <button onClick={() => handleKeyClick('a')}>A</button>
          <button onClick={() => handleKeyClick('s')}>S</button>
          {/* ... other letter keys */}
        </div>
        <div>
          <button onClick={handleShiftToggle}>Shift</button>
          <button onClick={() => handleKeyClick('z')}>Z</button>
          <button onClick={() => handleKeyClick('x')}>X</button>
          {/* ... other letter keys */}
        </div>
        <div>
          <button onClick={handleDelete}>Delete</button>
          <button onClick={() => handleKeyClick(' ')}>Space</button>
          <button onClick={handleClear}>Clear</button>
        </div>
      </div>
    </div>
  );
};

export default Teclado;
