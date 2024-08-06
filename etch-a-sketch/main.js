function initializeBoard(boardLength = 16) {
    
    const pixelSize = boardSize / boardLength

    // Populate board with pixels
    for (i = 0; i < boardLength**2; i++) {
        const pixel = document.createElement("div")
        pixel.classList.add("pixel")

        pixel.style.width = pixelSize + 'px'
        pixel.style.height = pixelSize + 'px'

        pixel.addEventListener("mouseover", () => {pixel.style.backgroundColor = "black"})

        board.appendChild(pixel)
    }
}

function resizeBoard() {

    let inputLength = prompt("How many pixels per side? (max: 100)")

    if (0 < inputLength && inputLength <= 100) {

        // Delete all current pixels
        const pixels = document.querySelectorAll(".pixel")
        pixels.forEach((pixel) => {
            board.removeChild(pixel)
        })

        // Create board with desired length
        initializeBoard(inputLength)
    }
}

function resetBoard() {

    const pixels = document.querySelectorAll(".pixel")
    pixels.forEach((pixel) => {
        pixel.style.removeProperty('background-color')
    })
}

// Initial 16x16 setup
const board = document.querySelector(".board")
const boardSize = board.clientWidth
initializeBoard()

// Button listeners
const resize = document.querySelector("#resize")
resize.addEventListener("click", resizeBoard)

const reset = document.querySelector("#reset")
reset.addEventListener("click", resetBoard)
