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

function handleInputs(value, text, isOperator) {
    // Handles inputs and assigns global variables

    // Operator functions
    if (isOperator) {
        if (value === "clear") {
            num1 = num2 = operator = undefined
            handleDisplay("0", false)
        }
        else if (num1 === undefined) {
            return
        }
        else if (num1 && num2 && operator && value) {

            if (num2 == 0 && operator === "divide") {
                alert("Cannot divide by 0!")
                return
            }
            num1 = (+operate(parseFloat(num1), parseFloat(num2), operator).toFixed(5)).toString()
            num2 = operator = undefined
            handleDisplay(num1, false)

            if (value != "equals") {
                operator = value
                handleDisplay(text, true)
            }
        }
        else if (num1 && value === "equals") {
            return
        }
        else {
            operator = value
            handleDisplay(text, true)
        }
    }

    // Number functions
    else {
        if (operator === undefined) {
            if (num1 === undefined && value === ".") { num1 = "0" }
            else if (num1 === undefined) { num1 = "" }
            else if (num1.includes(".") && value === ".") { return }
            num1 += value
            handleDisplay(num1, false)
        }
        else {
            if (num2 === undefined && value === ".") { num2 = "0" }
            else if (num2 === undefined) { num2 = "" }
            else if (num2.includes(".") && value === ".") { return }
            num2 += value
            handleDisplay(num2, false)
        }
    }
}

function handleDisplay(value, isOperator) {
    if (isOperator) {
        display.textContent += value
    }
    else {
        display.textContent = value
    }
}

let num1, num2, operator
num1 = num2 = operator = undefined

const display = document.querySelector(".display")

const numberButtons = document.querySelectorAll(".num")
numberButtons.forEach((button) => {
    button.addEventListener('click', () => {handleInputs(button.textContent, button.textContent, false)})
})

const operatorButtons = document.querySelectorAll(".op") 
operatorButtons.forEach((button) => {
    button.addEventListener('click', () => {handleInputs(button.id, button.textContent, true)})
})


