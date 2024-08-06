function initializeBoard(boardLength = 16, mode = "default") {

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
        
        if (mode == "default") {
            blocks.forEach((block) => {
                block.style.backgroundColor = "black"
            })
            pixel.addEventListener("mouseover", () => {pixel.style.backgroundColor = "black"})
        }
        else if (mode == "random") {
            blocks.forEach((block) => {
                block.style.backgroundColor = randomizeColor()
            })
            pixel.addEventListener ("mouseover", () => {pixel.style.backgroundColor = randomizeColor()})
        }
        else if (mode == "darken") {
            blocks.forEach((block) => {
                block.style.backgroundColor = "rgba(0, 0, 0, 0.2)"
            })
            pixel.style.backgroundColor = "rgba(0, 0, 0, 0.0)"
            pixel.addEventListener ("mouseover", () => {pixel.style.backgroundColor = darkenColor(pixel)})
        }

        board.appendChild(pixel)

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
        pixel.style.removeProperty('background-color')
    })
}

function randomizeColor() {
    const r = Math.floor(Math.random() * 255)
    const g = Math.floor(Math.random() * 255)
    const b = Math.floor(Math.random() * 255)
    return `rgb(${r}, ${g}, ${b})`
}

function darkenColor(pixel) {
    const rgb = pixel.style.backgroundColor
    const opacity = parseFloat(rgb.slice(14, -1)) 
    if (opacity != 1) {
        return `rgba(0, 0, 0, ${opacity + 0.1})`
    }
}

// Initial 16x16 setup
const board = document.querySelector(".board")
const boardSize = board.clientWidth

let currentLength

const block = document.querySelector("#color")
const blocks = document.querySelectorAll(".color-sub-block")

initializeBoard()


// Button listeners
const resize = document.querySelector("#resize")
resize.addEventListener("click", resizeBoard)

const reset = document.querySelector("#reset")
reset.addEventListener("click", resetBoard)

const defaultMode = document.querySelector("#default")
defaultMode.addEventListener("click", () => {initializeBoard(currentLength)})

const randomMode = document.querySelector("#random")
randomMode.addEventListener("click", () => {initializeBoard(currentLength, "random")})

const darkenMode = document.querySelector("#darken")
darkenMode.addEventListener("click", () => {initializeBoard(currentLength, "darken")})