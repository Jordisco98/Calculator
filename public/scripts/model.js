class Calculator {
  constructor (display, number_btn, symbol_btn) {
    this.display = document.getElementById(display)
    this.numbers = Array.from(document.getElementsByClassName(number_btn))
    this.symbols = Array.from(document.getElementsByClassName(symbol_btn))
    this.storedInput = ''
    this.secondInput = ''
    this.actionSymbol = ''
    this.isStarted = false
  }

  calculate () {
    var input1 = Number.parseFloat(this.storedInput)
    var input2 = Number.parseFloat(this.secondInput)
    var result
    switch (this.actionSymbol) {
      case '/':
        result = input1 / input2
        break
      case '*':
        result = input1 * input2
        break
      case '-':
        result = input1 - input2
        break
      case '+':
        result = input1 + input2
        break
    }
    this.storedInput = result.toString()
    this.secondInput = ''
    this.display.innerText = this.storedInput

  }

  setInput () {
    this.numbers.forEach(numbers => {
      numbers.addEventListener('click', e => {
        if (this.actionSymbol == '') {
          if (!this.isStarted) {
            this.storedInput += e.target.innerText
            this.display.innerText = this.storedInput
          }
        } else {
          this.secondInput += e.target.innerText
          this.display.innerText = this.secondInput
        }

        if (this.actionSymbol == '' && this.isStarted) {
          this.storedInput = ''
          this.isStarted = false
          this.storedInput += e.target.innerText
          this.display.innerText = this.storedInput
        }
      })
    })
  }

  setSymbol () {
    this.symbols.forEach(symbol => {
      symbol.addEventListener('click', e => {
        if (e.target.innerText !== '=') {
          this.isStarted = true
          if (this.actionSymbol.length == 0) {
            this.actionSymbol = e.target.innerText
            this.display.innerText = this.actionSymbol
          } else {
            this.calculate()
            this.actionSymbol = e.target.innerText
          }
        } else {
          if (this.storedInput.length > 0 && this.secondInput.length > 0) {
            this.calculate()
            this.actionSymbol = ''
          }
        }
      })
    })
  }

  startCalculator () {
    window.addEventListener('load', () => {
      this.display.innerText = 0
    })
    this.setInput()
    this.setSymbol()
  }
}

export default Calculator
