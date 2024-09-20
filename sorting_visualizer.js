let array = [];
let originalArray = [];
let speed = 200; // Default speed
let isSorting = false; // Sorting status
let sortTimeout; // Timeout for sort pauses
const arrayContainer = document.getElementById("arrayContainer");
const speedInput = document.getElementById("speed");
const originalArrayDisplay = document.getElementById("originalArray");
const arraySizeInput = document.getElementById("arraySize");

function generateRandomArray(size) {
    array = [];
    for (let i = 0; i < size; i++) {
        array.push(Math.floor(Math.random() * 100) + 1);
    }
    originalArray = [...array]; // Save original array
    renderArray();
    displayOriginalArray();
}

function renderArray() {
    arrayContainer.innerHTML = "";
    array.forEach(value => {
        const bar = document.createElement("div");
        bar.style.height = `${value * 3}px`; // Scaling the height for visibility
        bar.className = "bar";

        const valueLabel = document.createElement("div");
        valueLabel.className = "bar-value show"; // Added class to show shining effect
        valueLabel.innerText = value;
        bar.appendChild(valueLabel);
        arrayContainer.appendChild(bar);
    });
}

function displayOriginalArray() {
    originalArrayDisplay.innerText = originalArray.join(", ");
}

async function bubbleSort() {
    isSorting = true;
    for (let i = 0; i < array.length - 1 && isSorting; i++) {
        for (let j = 0; j < array.length - i - 1 && isSorting; j++) {
            if (array[j] > array[j + 1]) {
                await swap(j, j + 1);
            }
        }
    }
    isSorting = false;
}

async function selectionSort() {
    isSorting = true;
    for (let i = 0; i < array.length - 1 && isSorting; i++) {
        let minIndex = i;
        for (let j = i + 1; j < array.length && isSorting; j++) {
            if (array[j] < array[minIndex]) {
                minIndex = j;
            }
        }
        if (minIndex !== i) {
            await swap(i, minIndex);
        }
    }
    isSorting = false;
}

async function insertionSort() {
    isSorting = true;
    for (let i = 1; i < array.length && isSorting; i++) {
        let key = array[i];
        let j = i - 1;
        while (j >= 0 && array[j] > key && isSorting) {
            await swap(j + 1, j);
            j--;
        }
    }
    isSorting = false;
}

async function swap(i, j) {
    [array[i], array[j]] = [array[j], array[i]];
    renderArray();
    await new Promise(resolve => {
        sortTimeout = setTimeout(resolve, speed);
    });
}

// Stop sorting
function stopSorting() {
    isSorting = false;
    clearTimeout(sortTimeout);
}

// Restart sorting with the original array
function restartSorting() {
    stopSorting();
    array = [...originalArray]; // Reset array to original state
    renderArray(); // Render the original array
}

// Resume sorting
function resumeSorting() {
    if (!isSorting) {
        bubbleSort(); // You can change this to selectionSort or insertionSort as needed
    }
}

// Visualize sorting from the start
function visualizeSorting() {
    bubbleSort(); // You can change this to selectionSort or insertionSort as needed
}

// Update speed based on input
speedInput.addEventListener("input", (e) => {
    speed = parseInt(e.target.value);
});

// Event listener for generating the array based on user input
document.getElementById("generateArray").addEventListener("click", () => {
    const size = parseInt(arraySizeInput.value);
    if (size >= 1 && size <= 20) {
        generateRandomArray(size);
    } else {
        alert("Please enter a number between 1 and 20.");
    }
});

document.getElementById("bubbleSort").addEventListener("click", bubbleSort);
document.getElementById("selectionSort").addEventListener("click", selectionSort);
document.getElementById("insertionSort").addEventListener("click", insertionSort);
document.getElementById("stop").addEventListener("click", stopSorting);
document.getElementById("resume").addEventListener("click", resumeSorting);
document.getElementById("restart").addEventListener("click", restartSorting);

// Start with generating a random array
generateRandomArray(10);
