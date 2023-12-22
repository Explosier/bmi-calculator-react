import React, { useState } from 'react';
import './index.css';

const BMICalculator = () => {
    const [height, setHeight] = useState('');
    const [weight, setWeight] = useState('');
    const [result, setResult] = useState(null);
    const [bmiClass, setBmiClass] = useState('');
    const [error, setError] = useState('');

    const getBMIResultClass = (bmi) => {
        if (bmi < 18.5) return 'bmi-low';
        if (bmi <= 24.9) return 'bmi-normal';
        if (bmi <= 29.9) return 'bmi-high';
        return 'bmi-danger';
    };

    const calculateBMI = () => {
        if (height === "" || weight === "") {
            setError("Prašome užpildyti abu laukus.");
            setResult(null);
            setBmiClass('');
            return;
        }

        let heightMeters = height / 100;
        let bmi = weight / (heightMeters ** 2);
        let resultText = bmi < 18.5 ? "Jūs sveriate per mažai" : bmi <= 24.9 ? "Jūs sveriate normaliai" : bmi <= 29.9 ? "Jūs sveriate per daug" : "Jums yra pavojingas nutukimas";

        setResult({ value: bmi.toFixed(2), text: resultText });
        setBmiClass(getBMIResultClass(bmi));
        setError('');
    };

    const resetForm = () => {
        setHeight('');
        setWeight('');
        setResult(null);
        setError('');
        setBmiClass('');
    };

    return (
        <main>
            <h1>KMI Skaičiuotuvas</h1>
            <input type="number" value={height} onChange={e => setHeight(e.target.value)} placeholder="Ūgis cm" min="0" max="300" />
            <input type="number" value={weight} onChange={e => setWeight(e.target.value)} placeholder="Svoris kg" min="0" max="500" />
            <button onClick={calculateBMI}>Skaičiuoti</button>
            {result && (
                <div id="result" style={{ display: 'block' }}>
                    <p className={bmiClass}>{`${result.text}`}</p>
                    <p className={bmiClass}>{`Jūsų KMI yra: ${result.value}`}</p>
                    <button onClick={resetForm}>Reset</button>
                </div>
            )}
            {error && <div id="error" style={{ display: 'block' }}>{error}</div>}
        </main>
    );
};

export default BMICalculator;