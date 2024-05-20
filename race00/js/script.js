let data = {
    operation: [],
    formula: [],
};

let calculator_buttons = [
    {
        name: "rad",
        symbol: "Rad",
        formula: false,
        type: "key"
    },
    {
        name: "deg",
        symbol: "Deg",
        formula: false,
        type: "key"
    },
    {
        name: "square-root",
        symbol: "√",
        formula: "Math.sqrt",
        type: "math_function"
    },
    {
        name: "square",
        symbol: "x²",
        formula: "POWER(",
        type: "math_function"
    },
    {
        name: "open-parenthesis",
        symbol: "(",
        formula: "(",
        type: "number"
    },
    {
        name: "close-parenthesis",
        symbol: ")",
        formula: ")",
        type: "number"
    },
    {
        name: "clear",
        symbol: "C",
        formula: false,
        type: "key"
    },
    {
        name: "delete",
        symbol: "⌫",
        formula: false,
        type: "key"
    },
    {
        name: "pi",
        symbol: "π",
        formula: "Math.PI",
        type: "number"
    },
    {
        name: "cos",
        symbol: "cos",
        formula: "trigo(Math.cos,",
        type: "trigo_function"
    },
    {
        name: "sin",
        symbol: "sin",
        formula: "trigo(Math.sin,",
        type: "trigo_function"
    },
    {
        name: "tan",
        symbol: "tan",
        formula: "trigo(Math.tan,",
        type: "trigo_function"
    },
    {
        name: "7",
        symbol: 7,
        formula: 7,
        type: "number"
    },
    {
        name: "8",
        symbol: 8,
        formula: 8,
        type: "number"
    },
    {
        name: "9",
        symbol: 9,
        formula: 9,
        type: "number"
    },
    {
        name: "division",
        symbol: "÷",
        formula: "/",
        type: "operator"
    },
    {
        name: "e",
        symbol: "e",
        formula: "Math.E",
        type: "number"
    },
    {
        name: "4",
        symbol: 4,
        formula: 4,
        type: "number"
    },
    {
        name: "5",
        symbol: 5,
        formula: 5,
        type: "number"
    },
    {
        name: "6",
        symbol: 6,
        formula: 6,
        type: "number"
    },
    {
        name: "multiplication",
        symbol: "×",
        formula: "*",
        type: "operator"
    },
    {
        name: "factorial",
        symbol: "×!",
        formula: "FACTORIAL(",
        type: "math_function"
    },
    {
        name: "exp",
        symbol: "exp",
        formula: "Math.exp",
        type: "math_function"
    },
    {
        name: "ln",
        symbol: "ln",
        formula: "Math.log",
        type: "math_function"
    },
    {
        name: "log",
        symbol: "log",
        formula: "Math.log10",
        type: "math_function"
    },
    {
        name: "1",
        symbol: 1,
        formula: 1,
        type: "number"
    },
    {
        name: "2",
        symbol: 2,
        formula: 2,
        type: "number"
    },
    {
        name: "3",
        symbol: 3,
        formula: 3,
        type: "number"
    },
    {
        name: "subtraction",
        symbol: "–",
        formula: "-",
        type: "operator"
    },
    {
        name: "power",
        symbol: "x<span>y</span>",
        formula: "POWER(",
        type: "math_function"
    },
    {
        name: "percent",
        symbol: "%",
        formula: "/100",
        type: "number"
    },
    {
        name: "comma",
        symbol: ".",
        formula: ".",
        type: "number"
    },
    {
        name: "0",
        symbol: 0,
        formula: 0,
        type: "number"
    },
    {
        name: "calculate",
        symbol: "=",
        formula: "=",
        type: "calculate"
    },
    {
        name: "addition",
        symbol: "+",
        formula: "+",
        type: "operator"
    }
];

let RADIAN = true;

document.getElementById("rad").classList.add("active-angle");

function angleToggle()
{
    document.getElementById("rad").classList.toggle("active-angle");
    document.getElementById("deg").classList.toggle("active-angle");
}

document.querySelector(".input").addEventListener("click", event =>
{
    const target_btn = event.target;
    calculator_buttons.forEach(button =>
    {
        if (button.name == target_btn.id)
        {
            calculator(button);
        }
    });
})


function calculator(button)
{
    if (button.type == "operator")
    {
        data.operation.push(button.symbol);
        data.formula.push(button.formula);
    }
    else if (button.type == "number")
    {
        data.operation.push(button.symbol);
        data.formula.push(button.formula);
    }
    else if (button.type == "trigo_function")
    {
        data.operation.push(button.symbol + "(");
        data.formula.push(button.formula);
    }
    else if (button.type == "math_function")
    {
        let formula;
        if (button.name == "factorial") 
        {
            formula = button.formula;
            data.operation.push("!");
            data.formula.push(formula);
        }
        else if (button.name == "power")
        {
            formula = button.formula;
            data.operation.push("^(");
            data.formula.push(formula);
        }
        else if (button.name == "square")
        {
            formula = button.formula;
            data.operation.push("^(");
            data.formula.push(formula);
            data.operation.push("2)");
            data.formula.push("2)");
        }
        else if (button.name == "ln")
        {
            formula = button.formula + "(";
            data.operation.push("ln(");
            data.formula.push(formula);
        }
        else if (button.name == "log")
        {
            formula = button.formula + "(";
            data.operation.push("log(");
            data.formula.push(formula);
        }
        else if (button.name == "exp")
        {
            formula = button.formula + "(";
            data.operation.push("exp(");
            data.formula.push(formula);
        }
        else
        {
            formula = button.formula;
            data.operation.push(button.symbol + "(");
            data.formula.push(formula);
        }
    }
    else if (button.type == "key")
    {
        if (button.name == "clear")
        {
            data.operation = [];
            data.formula = [];
            document.querySelector(".result .value").innerHTML = 0;
        }
        else if (button.name == "delete")
        {
            data.operation.pop();
            data.formula.pop();
        }
        else if (button.name == "rad")
        {
            RADIAN = true;
            angleToggle();
        }
        else if (button.name == "deg")
        {
            RADIAN = false;
            angleToggle();
        }
    }
    else if (button.type == "calculate")
    {
        formula_str = data.formula.join("");

        let POWER_SEARCH_RESULT = search(data.formula, "POWER(");

        let FACTORIAL_SEARCH_RESULT = search(data.formula, "FACTORIAL(");

        const BASES = powerbasegetter(data.formula, POWER_SEARCH_RESULT);

        BASES.forEach(base =>
        {
            let toreplace = base + "POWER(";
            let replacement = "Math.pow(" + base + ",";
            formula_str = formula_str.replace(toreplace, replacement);
        })

        const NUMBERS = factorialnumgetter(data.formula, FACTORIAL_SEARCH_RESULT);

        NUMBERS.forEach(number =>
        {
            formula_str = formula_str.replace(number.toReplace, number.replacement);
        })
        let result;
        try
        {
            result = eval(formula_str);
        }
        catch (error)
        {
            if (error instanceof SyntaxError)
            {
                result = "SyntaxError";
                document.querySelector(".result .value").innerHTML = result;
                return;
            }
        }
        data.operation = [result];
        data.formula = [result];
        document.querySelector(".result .value").innerHTML = result;
        return;
    }
    document.querySelector(".operation .value").innerHTML = data.operation.join("");
}

function factorialnumgetter(formula, result)
{
    let numbers = [];
    let factorial_sequence = 0;
    result.forEach(fact_index =>
    {
        let number = [];
        let next_index = fact_index + 1;
        if (next_index == "FACTORIAL(")
        {
            factorial_sequence++;
            return;
        }
        let first_fact_index = fact_index - factorial_sequence;
        let paren_count = 0;
        for (let prev_idx = first_fact_index - 1; prev_idx >= 0; prev_idx--)
        {
            if (formula[prev_idx] == "(")
            {
                paren_count--;
            }
            else if (formula[prev_idx] == ")")
            {
                paren_count++;
            }
            let is_operator = false;
            if(formula[prev_idx] == "+" || formula[prev_idx] == "-" || formula[prev_idx] == "*" || formula[prev_idx] == "/")
            {
                is_operator = true;
            }

            if (is_operator && paren_count == 0)
            {
                break;
            }
            number.unshift(formula[prev_idx]);
        }

        let number_str = number.join("");
        const factorial = "factorial(";
        const close_paren = ")";
        let times = factorial_sequence + 1;
        numbers.push(
        {
            toReplace: number_str + "FACTORIAL(".repeat(times),
            replacement: factorial.repeat(times) + number_str + close_paren
        });
        factorial_sequence = 0;
    })

    return numbers;
}

function powerbasegetter(formula, result)
{
    let powers_base = [];
    result.forEach(power_index =>
    {
        let base = [];

        let paren_count = 0;
        for (let prev_idx = power_index - 1; prev_idx >= 0;  prev_idx--)
        {
            if (formula[prev_idx] == "(")
            {
                paren_count--;
            }
            if (formula[prev_idx] == ")")
            {
                paren_count++;
            }
            let is_operator = false;
            if(formula[prev_idx] == "+" || formula[prev_idx] == "-" || formula[prev_idx] == "*" || formula[prev_idx] == "/")
            {
                is_operator = true;
            }
            let is_power = formula[prev_idx] == "POWER(";

            if ((is_operator && paren_count == 0) || is_power)
            {
                break;
            }

            base.unshift(formula[prev_idx]);
        }
        powers_base.push(base.join(""));
    })

    return powers_base;
}

function search(array, keyword)
{
    let search_res = [];
    array.forEach((element, index) => 
    {
        if (element == keyword)
        {
            search_res.push(index);
        }
    })
    return search_res;
}

function trigo(callback, angle)
{
    if (!RADIAN)
    {
        angle = angle * Math.PI / 180;
    }
    return callback(angle);
}

function inv_trigo(callback, value)
{
    let angle = callback(value);
    if (!RADIAN)
    {
        angle = angle * 180 / Math.PI;
    }
    return angle;
}

function factorial(number)
{
    if (number % 1 != 0)
    {
        return gamma(number + 1);
    }

    if (number == 0 || number == 1)
    {
        return 1;
    }
    let result = 1;
    for (let i = 1; i <= number; i++)
    {
        result *= i;
    }
    if (result == Infinity)
    {
        return Infinity;
    }
    return result;
}

function gamma(n)
{
    var g = 7;
    var p = [0.99999999999980993, 676.5203681218851, -1259.1392167224028, 771.32342877765313, -176.61502916214059, 12.507343278686905, -0.13857109526572012, 9.9843695780195716e-6, 1.5056327351493116e-7];
    if (n < 0.5)
    {
        return Math.PI / Math.sin(n * Math.PI) / gamma(1 - n);
    } 
    else
    {
        n--;
        var x = p[0];
        for (var i = 1; i < g + 2; i++)
        {
            x += p[i] / (n + i);
        }
        var t = n + g + 0.5;
        return Math.sqrt(2 * Math.PI) * Math.pow(t, (n + 0.5)) * Math.exp(-t) * x;
    }
}

document.getElementById("toggle-sign").addEventListener("click", toggleSign);

function toggleSign() {
    let result = parseFloat(document.querySelector(".result .value").innerHTML);
    if (result !== 0) {
        result = -result;
        document.querySelector(".result .value").innerHTML = result;
        data.operation = [result];
        data.formula = [result];
    }
}