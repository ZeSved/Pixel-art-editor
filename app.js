const colorContainer = document.querySelector(".color-container")
const canvasGrid = document.querySelector(".canvas-grid")
const clearButton = document.querySelector('.clear')

const BACKGROUND_COLOR = "#777"

setupEventListeners()
function setupEventListeners(){
    canvasGrid.addEventListener("click", (e) => {
        const clickedPixel = e.target
        
        const color = processInteraction(clickedPixel)
        if(!color) return
        
        if(clickedPixel.classList.value === "canvas-grid") return
        
        paint(clickedPixel, color)
    })
    canvasGrid.addEventListener("contextmenu", (e) => {
        e.preventDefault()
        const clickedPixel = e.target
        
        const color = processInteraction(clickedPixel)
        if(!color) return
        
        erase(clickedPixel)
    })
    canvasGrid.addEventListener("mousemove", (e) => {
        const clickedPixel = e.target
        
        const color = processInteraction(clickedPixel)
        if(!color) return
        
        if(e.buttons === 1){
            paint(clickedPixel, color)
        } else if (e.buttons === 2){
            erase(clickedPixel)
        }
    })
    colorContainer.addEventListener("click", (e) => {
        const clickedDiv = e.target
        
        if (clickedDiv.classList.value === "color-container") return
        
        applySelectedOutLine(clickedDiv)
    })
    clearButton.addEventListener('click', clear)
}

// Process functions
function applySelectedOutLine(div) {
    const selectedElms = colorContainer.querySelectorAll(".selected")
    
    selectedElms.forEach((elm) => {
        elm.classList.remove("selected")
    })
    
    div.classList.add("selected")
}

function processInteraction (elm) {
    const selectedColor = colorContainer.querySelector(".selected")
    if (!selectedColor || elm.classList.value === "canvas-grid") return
    
    return window.getComputedStyle(selectedColor).backgroundColor
}

// Action functions
function paint(elm, color) {
    elm.style.backgroundColor = color
}

function erase(elm) {
    elm.style.backgroundColor = BACKGROUND_COLOR
}

function clear() {
    const pixels = canvasGrid.children
    for (let i = 0; i < pixels.length; i++) {
        erase(pixels[i])
    }
}