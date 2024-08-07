function initializeBoard(boardLength = 16) {

    // Delete all current pixels
    const pixels = document.querySelectorAll(".pixel")
    pixels.forEach((pixel) => {
        board.removeChild(pixel)
    })
    
    const pixelSize = boardSize / boardLength
    currentLength = boardLength

    // Populate board with pixels
    for (i = 0; i < boardLength**2; i++) {
        const pixel = document.createElement("div")
        pixel.classList.add("pixel")
        pixel.style.width = pixelSize + 'px'
        pixel.style.height = pixelSize + 'px'
        pixel.style.backgroundColor = "rgba(255, 255, 255, 1)" // color white
        pixel.addEventListener ("mouseover", () => {modeHandler(pixel)})
        board.appendChild(pixel)
    }
}

function modeHandler(pixel) {
    if (mode == "default") {
        pixel.style.backgroundColor = "rgba(0, 0, 0, 0)" // color black
    }
    else if (mode == "random") {
        pixel.style.backgroundColor = randomizeColor()
    }
    else if (mode == "darken") {
        pixel.style.backgroundColor = darkenColor(pixel.style.backgroundColor)
    }
}

function resizeBoard() {
    let inputLength = prompt("How many pixels per side? (max: 100)")

    // Check if within bounds (to reduce computer resource usage)
    if (0 < inputLength && inputLength <= 100) {
        initializeBoard(inputLength)
    }
}

function resetBoard() {
    const pixels = document.querySelectorAll(".pixel")
    pixels.forEach((pixel) => {
        pixel.style.backgroundColor = "rgba(255, 255, 255, 1)"
    })
}

function randomizeColor() {
    const r = Math.floor(Math.random() * 255)
    const g = Math.floor(Math.random() * 255)
    const b = Math.floor(Math.random() * 255)
    return `rgba(${r}, ${g}, ${b}, 1)`
}

function darkenColor(rgb) {
    // This program uses opacity to darken colors by letting the 
    // black background "bleed" through the pixel 

    // Parses rgb string
    const arr = rgb.substring(rgb.indexOf("(")+1, rgb.indexOf(")")).split(", ")
    let opacity = parseFloat(arr[3]) 

    // Do not change color if the color is already black
    if (opacity == 0) { return }

    const r = parseFloat(arr[0])
    const g = parseFloat(arr[1])
    const b = parseFloat(arr[2])
    
    // CSS converts 'rgba(255, 255, 255, 1)' (this is white) to 'rgb(255, 255, 255)',
    // so if the rgb string is in this form, we use an opacity of 1 by default.
    if (isNaN(opacity)) {
        opacity = 1;
    }

    return `rgb(${r}, ${g}, ${b}, ${opacity - 0.1})`
}

// Initial 16x16 setup
const board = document.querySelector(".board")
const boardSize = board.clientWidth

let currentLength, mode;
mode = "default"

const block = document.querySelector("#color")
const blocks = document.querySelectorAll(".color-sub-block")
blocks.forEach((block) => {
    block.style.backgroundColor = "black"
})

initializeBoard()

// Button listeners
const resize = document.querySelector("#resize")
resize.addEventListener("click", resizeBoard)

const reset = document.querySelector("#reset")
reset.addEventListener("click", resetBoard)

const defaultMode = document.querySelector("#default")
defaultMode.addEventListener("click", () => {
    mode = "default"
    blocks.forEach((block) => {
        block.style.backgroundColor = "black"
    })
})

const randomMode = document.querySelector("#random")
randomMode.addEventListener("click", () => {
    mode = "random"
    blocks.forEach((block) => {
        block.style.backgroundColor = randomizeColor()
    })
})

const darkenMode = document.querySelector("#darken")
darkenMode.addEventListener("click", () => {
    mode = "darken"
    blocks.forEach((block) => {
        block.style.backgroundColor = "rgba(0, 0, 0, 0.2)"
    })
})