const $onlySpans = document.querySelectorAll("span")
const $documentScreen = document.getElementById("screen")
let storedValue
let storedOperator
let runningTotal

$onlySpans.forEach( span => {
    span.addEventListener( "click", buttonActions )
})

function buttonActions(event) {
    const buttonValue = event.target.innerText
    console.log(buttonValue)

    if ( buttonValue === "C" ) {
        clearScreen()
    } else if ( ["+", "-", "x", "÷"].includes(buttonValue) ) {
        performOperation( buttonValue )
    } else if ( buttonValue === "=" ) {
        calculateTotal()
    } else {
        if ( $documentScreen.innerText == runningTotal ) {
            clearScreen()
        } else if ( storedOperator ) {
            clearScreen()
        }
        $documentScreen.append( buttonValue )
    }
}

function clearScreen() {
    $documentScreen.textContent = ""
}

function performOperation(buttonValue) {
    if ( storedValue ) {
        storedValue = calculateTotal()
    } else {
        storedValue = +$documentScreen.innerText
    }
    storedOperator = buttonValue
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
    let currentValue = $documentScreen.innerText
    clearScreen()

    updatedValue = [storedValue, currentValue].reduce(operation)

    console.log("stored value 1", storedValue)
    console.log("current value 1", currentValue)
    console.log("stored operator 1", storedOperator)
    console.log("updated value 1", updatedValue)

    if ( updatedValue === Infinity || currentValue === "Error" ) {
        $documentScreen.innerText = "Error"
        updatedValue = 0
    } else {
        $documentScreen.innerText = updatedValue
    }
    return updatedValue
}