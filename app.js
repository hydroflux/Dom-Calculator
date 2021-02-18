const $onlySpans = document.querySelectorAll("span")
const $documentScreen = document.getElementById("screen")

let storedValue
let storedOperator
let runningTotal

$onlySpans.forEach( span => {
    span.addEventListener( "click", buttonActions )
})

$documentScreen.addEventListener( 'input' , event => {
    screenText = event.target.value
    lastCharacter = screenText.charAt(screenText.length - 1)
    if (isNaN(lastCharacter)) {
        $documentScreen.value = dropLastCharacter(screenText)
        evaluateCharacter(lastCharacter)
    }
})

function evaluateCharacter(character) {
    if ( character === "c" || character === "C" ) {
        clearScreen()
    } else if ( ["+", "-", "x", "÷"].includes( character ) ) {
        performOperation( character )
    } else if ( character === "=" ) {
        calculateTotal()
    } else if ( /[0-9]/.test(character) ) {
        if ( $documentScreen.value == runningTotal ) {
            clearScreen()
        } else if ( storedOperator ) {
            clearScreen()
        }
        $documentScreen.value += character
    }
}

function buttonActions(event) {
    const buttonValue = event.target.innerText
    evaluateCharacter(buttonValue)
}

function dropLastCharacter(string) {
    return string.substring(0, string.length - 1)
}

function clearScreen() {
    if ( $documentScreen.value === "" ) {
        clearAll()
    }
    $documentScreen.value = ""
}

function clearAll() {
    runningTotal = 0
    storedValue = 0
    storedOperator = ""
}

function performOperation(operator) {
    if ( storedValue ) {
        storedValue = calculateTotal()
    } else {
        storedValue = $documentScreen.value
    }
    storedOperator = operator
}

function calculateTotal() {
    const performAddition = (sum, element) => +sum + +element
    const performSubtraction = (difference, element) => +difference - +element
    const performMultiplication = (product, element) => +product * +element
    const performDivision = (quotient, element) => +quotient / +element

    if (storedOperator === "+") {
        return updateTotal(performAddition)
    } else if ( storedOperator === "-") {
        return updateTotal(performSubtraction)
    } else if ( storedOperator === "x") {
        return updateTotal(performMultiplication)
    } else if ( storedOperator === "÷") {
        return updateTotal(performDivision)
    }
}

function updateTotal(operation) {
    let currentValue = $documentScreen.value
    clearScreen()

    updatedValue = [storedValue, currentValue].reduce(operation)
    
    if ( updatedValue === Infinity || currentValue === "Error" ) {
        $documentScreen.value = "Error"
        updatedValue = 0
    } else {
        $documentScreen.value = updatedValue
        runningTotal = updatedValue
        storedValue = 0
    }
    return updatedValue
}

console.log("done")

