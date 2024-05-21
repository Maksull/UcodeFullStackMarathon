let data = {
    operation: [],
    formula: [],
};
let history = [];


const calculatorButtons = [
    { name: "rad", symbol: "Rad", formula: false, type: "key" },
    { name: "deg", symbol: "Deg", formula: false, type: "key" },
    { name: "square-root", symbol: "√", formula: "Math.sqrt", type: "math_function" },
    { name: "square", symbol: "x²", formula: "POWER(", type: "math_function" },
    { name: "open-parenthesis", symbol: "(", formula: "(", type: "number" },
    { name: "close-parenthesis", symbol: ")", formula: ")", type: "number" },
    { name: "clear", symbol: "C", formula: false, type: "key" },
    { name: "delete", symbol: "⌫", formula: false, type: "key" },
    { name: "pi", symbol: "π", formula: "Math.PI", type: "number" },
    { name: "cos", symbol: "cos", formula: "trigo(Math.cos,", type: "trigo_function" },
    { name: "sin", symbol: "sin", formula: "trigo(Math.sin,", type: "trigo_function" },
    { name: "tan", symbol: "tan", formula: "trigo(Math.tan,", type: "trigo_function" },
    { name: "7", symbol: 7, formula: 7, type: "number" },
    { name: "8", symbol: 8, formula: 8, type: "number" },
    { name: "9", symbol: 9, formula: 9, type: "number" },
    { name: "division", symbol: "÷", formula: "/", type: "operator" },
    { name: "e", symbol: "e", formula: "Math.E", type: "number" },
    { name: "4", symbol: 4, formula: 4, type: "number" },
    { name: "5", symbol: 5, formula: 5, type: "number" },
    { name: "6", symbol: 6, formula: 6, type: "number" },
    { name: "multiplication", symbol: "×", formula: "*", type: "operator" },
    { name: "factorial", symbol: "x!", formula: "FACTORIAL(", type: "math_function" },
    { name: "exp", symbol: "exp", formula: "Math.exp", type: "math_function" },
    { name: "ln", symbol: "ln", formula: "Math.log", type: "math_function" },
    { name: "log", symbol: "log", formula: "Math.log10", type: "math_function" },
    { name: "1", symbol: 1, formula: 1, type: "number" },
    { name: "2", symbol: 2, formula: 2, type: "number" },
    { name: "3", symbol: 3, formula: 3, type: "number" },
    { name: "subtraction", symbol: "-", formula: "-", type: "operator" },
    { name: "power", symbol: "x<sup>y</sup>", formula: "POWER(", type: "math_function" },
    { name: "percent", symbol: "%", formula: "/100", type: "number" },
    { name: "comma", symbol: ".", formula: ".", type: "number" },
    { name: "0", symbol: 0, formula: 0, type: "number" },
    { name: "calculate", symbol: "=", formula: "=", type: "calculate" },
    { name: "addition", symbol: "+", formula: "+", type: "operator" },
];

let isRadian = true;

document.getElementById("rad").classList.add("active-angle");

function angleToggle() {
    document.getElementById("rad").classList.toggle("active-angle");
    document.getElementById("deg").classList.toggle("active-angle");
}

document.querySelector(".input").addEventListener("click", event => {
    const targetBtn = event.target;
    const button = calculatorButtons.find(btn => btn.name === targetBtn.id);
    if (button) calculator(button);
});

function calculator(button) {
    const { type, symbol, formula, name } = button;

    if (type === "operator" || type === "number") {
        data.operation.push(symbol);
        data.formula.push(formula);
    } else if (type === "trigo_function") {
        data.operation.push(symbol + "(");
        data.formula.push(formula);
    } else if (type === "math_function") {
        handleMathFunction(button);
    } else if (type === "key") {
        handleKey(button);
    } else if (type === "calculate") {
        calculateResult();
    }

    document.querySelector(".operation .value").innerHTML = data.operation.join("");
}

function handleMathFunction(button) {
    const { name, formula } = button;
    let newFormula = formula;

    switch (name) {
        case "factorial":
            data.operation.push("!");
            break;
        case "power":
            data.operation.push("^(");
            break;
        case "square":
            data.operation.push("^(2)");
            break;
        case "square-root":
            data.operation.push("√(");
            newFormula += "(";
            break;
        case "ln":
            data.operation.push("ln(");
            newFormula += "(";
            break;
        case "log":
            data.operation.push("log(");
            newFormula += "(";
            break;
        case "exp":
            data.operation.push("exp(");
            newFormula += "(";
            break;
        default:
            data.operation.push(button.symbol + "(");
            break;
    }

    switch (name) {
        case "square":
            data.formula.push(newFormula);
            data.formula.push("2");
            data.formula.push(")");
            break;
        default:
            data.formula.push(newFormula);
            break;
    }
}

function handleKey(button) {
    const { name } = button;
    if (name === "clear") {
        data.operation = [];
        data.formula = [];
        document.querySelector(".result .value").innerHTML = 0;
    } else if (name === "delete") {
        data.operation.pop();
        data.formula.pop();
    } else if (name === "rad") {
        isRadian = true;
        angleToggle();
    } else if (name === "deg") {
        isRadian = false;
        angleToggle();
    }
}

function calculateResult() {
    let formulaStr = data.formula.join("");

    replacePowerAndFactorialFunctions();
    formulaStr = data.formula.join("");

    let result;
    try {
        result = eval(formulaStr);
    } catch (error) {
        if (error instanceof SyntaxError) {
            result = "SyntaxError";
        }
    }

    history.push(data.operation.toString().replace(/,/g, '') + ' = ' + result);
    data.formula = [data.operation.toString().replace(/,/g, '')];
    data.operation = [result];
    updateFormula(data.formula.toString())
    updateResult(result);
    updateHistory();
}

function replacePowerAndFactorialFunctions() {
    let formulaStr = data.formula.join("");
    const powerIndices = search(data.formula, "POWER(");
    const bases = getPowerBases(powerIndices);

    bases.forEach(base => {
        let toReplace = base + "POWER(";
        let replacement = "Math.pow(" + base + ",";
        formulaStr = formulaStr.replace(toReplace, replacement);
    });

    const factorialIndices = search(data.formula, "FACTORIAL(");
    const numbers = getFactorialNumbers(factorialIndices);

    numbers.forEach(number => {
        formulaStr = formulaStr.replace(number.toReplace, number.replacement);
    });

    data.formula = formulaStr.split("");
}

function getFactorialNumbers(factorialIndices) {
    let numbers = [];
    let factorialSequence = 0;

    factorialIndices.forEach(index => {
        if (data.formula[index + 1] === "FACTORIAL(") {
            factorialSequence++;
            return;
        }

        let number = extractNumber(index - factorialSequence - 1);
        const times = factorialSequence + 1;
        numbers.push({
            toReplace: number + "FACTORIAL(".repeat(times),
            replacement: "factorial(".repeat(times) + number + ")"
        });

        factorialSequence = 0;
    });

    return numbers;
}

function getPowerBases(powerIndices) {
    return powerIndices.map(index => extractNumber(index - 1)).filter(base => base.length > 0);
}

function extractNumber(startIndex) {
    let number = [];
    let parenCount = 0;

    for (let i = startIndex; i >= 0; i--) {
        if (data.formula[i] === "(") parenCount--;
        if (data.formula[i] === ")") parenCount++;
        if (isOperator(data.formula[i]) && parenCount === 0) break;

        number.unshift(data.formula[i]);
    }

    return number.join("");
}

function isOperator(char) {
    return ["+", "-", "*", "/"].includes(char);
}

function search(array, keyword) {
    return array.reduce((acc, val, index) => (val === keyword ? acc.concat(index) : acc), []);
}

function trigo(callback, angle) {
    if (!isRadian) angle *= Math.PI / 180;
    return callback(angle);
}

function factorial(number) {
    if (number % 1 !== 0) return gamma(number + 1);
    if (number === 0 || number === 1) return 1;

    return Array.from({ length: number }, (_, i) => i + 1).reduce((acc, val) => acc * val, 1);
}

function gamma(n) {
    const g = 7;
    const p = [
        0.99999999999980993, 676.5203681218851, -1259.1392167224028,
        771.32342877765313, -176.61502916214059, 12.507343278686905,
        -0.13857109526572012, 9.9843695780195716e-6, 1.5056327351493116e-7
    ];

    if (n < 0.5) return Math.PI / Math.sin(n * Math.PI) / gamma(1 - n);

    n--;
    let x = p[0];
    for (let i = 1; i < g + 2; i++) x += p[i] / (n + i);

    const t = n + g + 0.5;
    return Math.sqrt(2 * Math.PI) * Math.pow(t, n + 0.5) * Math.exp(-t) * x;
}

document.getElementById("toggle-sign").addEventListener("click", toggleSign);

function toggleSign() {
    let result = parseFloat(document.querySelector(".result .value").innerHTML);
    if (result !== 0) {
        result = -result;
        updateResult(result);
    }
}

function updateResult(result) {
    document.querySelector(".result .value").innerHTML = result;
    data.operation = [data.operation.toString().replace(/,/g, '')];
    data.formula = [result];
}

function updateFormula(formula){
    document.querySelector(".operation .value").innerHTML = formula;
}

// Add a new function to update the calculation history
function updateHistory() {
    const historyList = document.querySelector(".history ul");
    historyList.innerHTML = "";
    history.forEach(calculation => {
        const li = document.createElement("li");
        li.textContent = calculation;
        historyList.appendChild(li);
    });
}