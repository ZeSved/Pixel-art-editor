import { colorContainer } from '../app.js'

const canvasGrid = document.querySelector('.canvas-grid')

const BACKGROUND_COLOR = '#777'

export default class Canvas {
  constructor(width = 20, height = 20) {
    this.width = width
    this.height = height

    this.createCanvas()
    this.setupEventListeners()
    this.updateCanvasSize()
  }

  setupEventListeners() {
    canvasGrid.addEventListener('click', (e) => {
      const clickedPixel = e.target

      const color = this.processInteraction(clickedPixel)
      if (!color) return

      if (clickedPixel.classList.value === 'canvas-grid') return

      this.paint(clickedPixel, color)
    })
    canvasGrid.addEventListener('contextmenu', (e) => {
      e.preventDefault()
      const clickedPixel = e.target

      const color = this.processInteraction(clickedPixel)
      if (!color) return

      this.erase(clickedPixel)
    })
    canvasGrid.addEventListener('mousemove', (e) => {
      const clickedPixel = e.target

      const color = this.processInteraction(clickedPixel)
      if (!color) return

      if (e.buttons === 1) {
        this.paint(clickedPixel, color)
      } else if (e.buttons === 2) {
        this.erase(clickedPixel)
      }
    })
    window.addEventListener('resize', () => {
      this.updateCanvasSize()
    })
  }

  processInteraction(elm) {
    const selectedColor = colorContainer.querySelector('.selected')
    if (!selectedColor || elm.classList.value === 'canvas-grid') return

    return window.getComputedStyle(selectedColor).backgroundColor
  }

  paint(elm, color) {
    elm.style.backgroundColor = color
  }

  erase(elm) {
    elm.style.backgroundColor = BACKGROUND_COLOR
  }

  clear() {
    const pixels = canvasGrid.children

    for (let i = 0; i < pixels.length; i++) {
      this.erase(pixels[i])
    }
  }

  createCanvas() {
    const totalPixels = this.width * this.height

    for (let i = 0; i < totalPixels; i++) {
      const div = document.createElement('div')

      canvasGrid.appendChild(div)
    }

    canvasGrid.style.setProperty('--width', JSON.stringify(this.width))
    canvasGrid.style.setProperty('--height', JSON.stringify(this.width))
  }

  updateCanvasSize() {
    const pixelWidth = (canvasGrid.offsetWidth - (this.width - 1)) / this.width

    canvasGrid.style.setProperty('--p-size', `${pixelWidth}px`)
    console.log('updated')
  }
}
