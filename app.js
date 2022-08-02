const colorContainer = document.querySelector(".color-container")
const canvasGrid = document.querySelector(".canvas-grid")

colorContainer.addEventListener("click", (e) => {
    const clickedDiv = e.target

    if (clickedDiv.classList.value === "color-container") return
    
    applySelectedOutLine(clickedDiv)
})

function applySelectedOutLine(div) {
    const selectedElms = colorContainer.querySelectorAll(".selected")

    selectedElms.forEach((elm) => {
        elm.classList.remove("selected")
    })

    div.classList.add("selected")
}

canvasGrid.addEventListener("click", (e) => {
    const selectedColor = colorContainer.querySelector(".selected")

    if (!selectedColor) return
    
    const color = window.getComputedStyle(selectedColor).backgroundColor
    const clickedPixel = e.target

    if(clickedPixel.classList.value === "canvas-grid") return
    
    clickedPixel.style.backgroundColor = color
})