const container = document.querySelector("#container");
const resetButton = document.querySelector("#resetButton");
const rainbowButton = document.querySelector("#rainbowButton");

let rainbowMode = false; // Flag to track whether rainbowButton is clicked

// Function to create the grid based on the given size
function createGrid(size = 10) {
    container.innerHTML = "";
  
    const squareSize = 960 / size;
  
    for (let i = 0; i < size * size; i++) {
      const square = document.createElement("div");
      square.classList.add("square");
      square.style.width = `${squareSize}px`;
      square.style.height = `${squareSize}px`;
  
      // Add event listener for mouseenter to change color
      square.addEventListener("mouseenter", () => {
        if (rainbowMode) {
          square.style.backgroundColor = getRandomColor();
        } else {
          square.style.backgroundColor = 'grey';
        }
      });
  
      // Add event listener for mouseleave to darken the square
      darkenSquare(square);
  
      container.appendChild(square);
    }
  
    // Update the container height explicitly based on square size and number of squares
    container.style.height = `${squareSize * size}px`;
  }
  
  // Function to reset the grid based on user input
  function resetGrid() {
    const newSize = prompt("Enter the number of squares per side (maximum 100):");
    const size = parseInt(newSize);
  
    if (!isNaN(size) && size > 0 && size <= 100) {
      createGrid(size);
    } else {
      alert("Invalid input. Please enter a number between 1 and 100.");
    }
  }
  
  // Rest of the code remains unchanged
  

// Function to generate a random RGB color
function getRandomColor() {
  const r = Math.floor(Math.random() * 256);
  const g = Math.floor(Math.random() * 256);
  const b = Math.floor(Math.random() * 256);
  return `rgb(${r}, ${g}, ${b})`;
}

// Function to progressively darken the square on mouseleave
function darkenSquare(square) {
  let darkness = 0;

  // Add event listener for mouseleave to darken the square
  square.addEventListener("mouseleave", () => {
    darkness += 10;
    if (darkness <= 100) {
      square.style.filter = `brightness(${100 - darkness}%)`;
    }
  });
}

// Function to toggle rainbow mode
function toggleRainbowMode() {
  rainbowMode = !rainbowMode;
}

// Add click event listeners to the buttons
resetButton.addEventListener("click", resetGrid);
rainbowButton.addEventListener("click", toggleRainbowMode);

// Create initial 10x10 grid on page load
createGrid();
