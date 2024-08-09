const operatorSymbols = {"":"", "add": "+", "subtract": "-", "multiply": "×", "divide": "÷"}

// Basic calculation functions
function add(a, b) {
    return a + b
}

function subtract(a, b) {
    return a - b
}

function multiply(a, b) {
    return a * b
}

function divide(a, b) {
    return a / b 
}

// Handler for basic calculation functions
function operate(a, b, operator) {
    if (operator == "add") {
        return add(a, b)
    }
    else if (operator == "subtract") {
        return subtract(a, b)
    }
    else if (operator == "multiply") {
        return multiply(a, b)
    }
    else if (operator == "divide") {
        return divide(a, b)
    }
}

function handleInputs(value, isOperator) {
    // THIS IS THE ONLY FUNCTION THAT HANDLES GLOBAL VARIABLES
    // Variables are filled in the order of: num1 --> operator --> num2

    // Handles operator functions
    if (isOperator) {
        if (value === "clear") {
            num1 = num2 = operator = ""
        }
        else if (value === "delete") {
            [num1, num2, operator] = deleteInput(num1, num2, operator) 
        }
        else {
            [num1, num2, operator] = isOperation(num1, num2, operator, value)
        }
    }

    // Handles number functions
    else {
        [num1, num2] = storeOperands(num1, num2, operator, value)
    }
    
    // Update display
    handleDisplay(num1, num2, operator)
}

function handleDisplay(num1, num2, operator) {
    // Defaults to 0 if there is no input
    if (num1 === "") {
        display.textContent = 0
    }
    else {
        display.textContent = `${num1} ${operatorSymbols[operator]} ${num2}`
    }
}   

function deleteInput(num1, num2, operator) {
    // Variables are filled in the order of: num1 --> operator --> num2 
    // If num1 is empty, do not do anything
    if (num1 === "") {
        return [num1, num2, operator]
    }
    // If operator is empty, delete from num1
    else if (operator === "") {
        return [num1.slice(0, -1), num2, operator]
    }
    // If num2 is empty and there is an operator, delete from operator
    else if (num2 === "" && operator.length != 0) {
        return [num1, num2, ""]
    }
    // Delete from num2
    else {
        return [num1, num2.slice(0, -1), operator]
    }
}

function storeOperator(num1, operator, value) {
    // If num1 is empty, do not do anything
    if (num1 === "") {
        return operator
    }
    return value
}

function storeOperands(num1, num2, operator, value) {
    // Stores to num1 since operator does not exist
    if (operator === "") {
        if (value === ".") {
            value = isValidDecimal(num1)
        }
        num1 += value
    }

    // Stores to num2 since operator exists
    else {
        if (value === ".") {
            value = isValidDecimal(num2)
        }
        num2 += value
    }
    return [num1, num2]
}

function isValidDecimal(num) {
    // Decimal in the start
    if (num === "") {
        return "0."
    }
    // Invalid decimal
    else if (num.includes(".")) {
        return "" 
    }
    // Decimal in the middle
    else {
        return "."
    }
    
}

function isOperation(num1, num2, operator, value) {    
    // Store operator if no operator exists
    if (num1 && !operator && !num2 && (value != "equals")) {
        operator = value
    }
    
    // Divide by 0 error
    else if ((num2 == 0) && (operator === "divide")) {
        alert("Cannot divide by 0!")
    }

    // Otherwise, complete the operation
    else {
        num1 = (+operate(parseFloat(num1), parseFloat(num2), operator)
                                            .toFixed(5))
                                            .toString()
        num2 = ""
        if (value == "equals") { operator = "" }
        else { operator = value }
    }
    return [num1, num2, operator]
}

let num1, num2, operator, expression
num1 = num2 = operator = ""

const display = document.querySelector(".display")

const numberButtons = document.querySelectorAll(".num")
numberButtons.forEach((button) => {
    button.addEventListener('click', () => {handleInputs(button.textContent, false)})
})

const operatorButtons = document.querySelectorAll(".op") 
operatorButtons.forEach((button) => {
    button.addEventListener('click', () => {handleInputs(button.id, true)})
})

function convertKeyboardInput(e) {
    if(e.key >= 0 && e.key <= 9) { handleInputs(e.key, false) }
    else if(e.key === ".") { handleInputs(".", false) }
    else if(e.key === "+") { handleInputs("add", true) }
    else if(e.key === "-") { handleInputs("subtract", true) }
    else if(e.key === "*") { handleInputs("multiply", true) }
    else if(e.key === "/") { handleInputs("divide", true) }
    else if(e.key === "=" || e.key === "Enter") { handleInputs("equals", true) }
    else if(e.key === "Backspace") { handleInputs("delete", true) }
}

document.addEventListener('keydown', convertKeyboardInput)