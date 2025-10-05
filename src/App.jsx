import { useState, useEffect, useRef } from 'react'

function App() {
  const [currentInput, setCurrentInput] = useState('');
  const [runningTotal, setRunningTotal] = useState(0);
  const [history, setHistory] = useState([{step: 'Starting', number: 0, total: 0}]);
  const inputRef = useRef(null);

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      const num = parseFloat(currentInput);
      if (!isNaN(num)) {
        const newTotal = runningTotal + num;
        setRunningTotal(newTotal);
        setHistory(prev => [...prev, {step: `+ ${num}`, number: num, total: newTotal}]);
        setCurrentInput('');
        inputRef.current.focus();
      }
    } else if (e.key === 'Escape') {
      setCurrentInput('');
    } else if (e.ctrlKey && e.key === 'r') {
      setRunningTotal(0);
      setHistory([{step: 'Starting', number: 0, total: 0}]);
      setCurrentInput('');
    } else if (e.ctrlKey && e.key === 'c') {
      navigator.clipboard.writeText(runningTotal.toLocaleString());
    } else if (!/[0-9.]/.test(e.key) && !['Backspace', 'Delete', 'ArrowLeft', 'ArrowRight', 'Tab'].includes(e.key)) {
      e.preventDefault();
    }
  };

  const handleInputChange = (e) => {
    const value = e.target.value;
    if (/^[0-9]*\.?[0-9]*/.test(value)) {
      setCurrentInput(value);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4">
      <input
        ref={inputRef}
        type="text"
        value={currentInput}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
        className="text-4xl text-center border-2 border-gray-300 rounded-lg p-4 mb-4 w-full max-w-md"
        placeholder="Enter number"
      />
      <div className="text-6xl font-bold text-green-600 mb-4">
        Running Total: {runningTotal.toLocaleString()}
      </div>
      <div className="w-full max-w-md">
        <h3 className="text-xl font-semibold mb-2">Calculation History:</h3>
        <div className="bg-white rounded-lg p-6 max-h-96 overflow-y-auto text-xl">
          {history.map((item, index) => (
            <div key={index} className="mb-2">
              {item.step}: {item.total.toLocaleString()}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App
