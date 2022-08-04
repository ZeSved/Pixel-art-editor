import Canvas from './classes/Canvas.js'

export const colorContainer = document.querySelector('.color-container')
const clearButton = document.querySelector('.clear')

const canvas = new Canvas(20, 10)
console.log(canvas)

setupEventListeners()
function setupEventListeners() {
  colorContainer.addEventListener('click', (e) => {
    const clickedDiv = e.target

    if (clickedDiv.classList.value === 'color-container') return

    applySelectedOutLine(clickedDiv)
  })
  clearButton.addEventListener('click', canvas.clear.bind(canvas))
}

// Process functions
function applySelectedOutLine(div) {
  const selectedElms = colorContainer.querySelectorAll('.selected')

  selectedElms.forEach((elm) => {
    elm.classList.remove('selected')
  })

  div.classList.add('selected')
}
