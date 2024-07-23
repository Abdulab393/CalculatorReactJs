
import React, { useState } from "react";
import "./Calculator.css";

const Calculator = () => {
  const [currentValue, setCurrentValue] = useState("0");
  const [previousValue, setPreviousValue] = useState("");
  const [operator, setOperator] = useState(null);

  const handleNumberClick = (num) => {
    if (currentValue === "0" && num !== ".") {
      setCurrentValue(String(num));
    } else {
      setCurrentValue(currentValue + num);
    }
  };

  const handleOperatorClick = (op) => {
    if (op === "±") {
      setCurrentValue((prev) => (parseFloat(prev) * -1).toString());
      return;
    }

    if (currentValue !== "0") {
      setPreviousValue(currentValue);
      setCurrentValue("0");
    }

    setOperator(op);
  };

  const handleClear = () => {
    setCurrentValue("0");
    setPreviousValue("");
    setOperator(null);
  };

  const handleEquals = () => {
    const prev = parseFloat(previousValue);
    const current = parseFloat(currentValue);

    let result;

    switch (operator) {
      case "+":
        result = prev + current;
        break;
      case "-":
        result = prev - current;
        break;
      case "x":
        result = prev * current;
        break;
      case "÷":
        result = prev / current;
        break;
      default:
        return;
    }

    setCurrentValue(result.toString());
    setPreviousValue("");
    setOperator(null);
  };

  const handlePercentage = () => {
    const current = parseFloat(currentValue);
    if (previousValue) {
      const prev = parseFloat(previousValue);
      const result = (prev * current) / 100;
      setCurrentValue(result.toString());
    } else {
      const result = current / 100;
      setCurrentValue(result.toString());
    }
  };

  return (
    <div className="calculator">
      <Display value={`${previousValue} ${operator ? operator : ""} ${currentValue}`} />
      <div className="buttons">
        <Button onClick={handleClear} label="C" />
        <Button onClick={() => handleOperatorClick("±")} label="±" />
        <Button onClick={handlePercentage} label="%" />
        <Button
          onClick={() => handleOperatorClick("÷")}
          label="÷"
          className="sameColor"
        />

        <Button onClick={() => handleNumberClick("7")} label="7" />
        <Button onClick={() => handleNumberClick("8")} label="8" />
        <Button onClick={() => handleNumberClick("9")} label="9" />
        <Button
          onClick={() => handleOperatorClick("x")}
          label="x"
          className="sameColor"
        />

        <Button onClick={() => handleNumberClick("4")} label="4" />
        <Button onClick={() => handleNumberClick("5")} label="5" />
        <Button onClick={() => handleNumberClick("6")} label="6" />
        <Button
          onClick={() => handleOperatorClick("-")}
          label="-"
          className="sameColor"
        />

        <Button onClick={() => handleNumberClick("1")} label="1" />
        <Button onClick={() => handleNumberClick("2")} label="2" />
        <Button onClick={() => handleNumberClick("3")} label="3" />
        <Button
          onClick={() => handleOperatorClick("+")}
          label="+"
          className="sameColor"
        />

        <Button
          onClick={() => handleNumberClick("0")}
          label="0"
          className="zero"
        />
        <Button onClick={() => handleNumberClick(".")} label="." />
        <Button onClick={handleEquals} label="=" className="sameColor" />
      </div>
    </div>
  );
};

const Display = ({ value }) => {
  return <div className="display">{value}</div>;
};

const Button = ({ onClick, label, className }) => {
  return (
    <button className={`button ${className}`} onClick={onClick}>
      {label}
    </button>
  );
};

export default Calculator;
