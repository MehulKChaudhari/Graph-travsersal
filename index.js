const input = document.querySelector("#gridsize");
const submit = document.querySelector("#submitButton");
const algorithmSelect = document.querySelector("#algorithmSelect");

let src = null;
let destination = null;

function createGrid(event) {
  const gridSize = parseInt(input.value, 10);
  const element = document.querySelector("#grid");
  element.innerHTML = "";
  const fragment = document.createDocumentFragment();
  let clickCount = 0;

  const gridContainer = document.createElement("div");
  gridContainer.classList.add("gridContainer");
  gridContainer.style.gridTemplateColumns = `repeat(${gridSize}, 1fr)`;
  gridContainer.style.gridGap = "0.5rem";

  gridContainer.addEventListener("click", (e) => {
    if (e.target.classList.contains("gridItem")) {
      clickCount++;
      if (clickCount === 1) {
        src = e.target.id;
        e.target.style.backgroundColor = "#d0f4de";
      } else if (clickCount === 2) {
        destination = e.target.id;
        e.target.style.backgroundColor = "#f08080";
      } else {
        alert(
          "Source and destination already selected. Refresh if you want to change nodes."
        );
      }
    }
  });

  for (let i = 0; i < gridSize; i++) {
    for (let j = 0; j < gridSize; j++) {
      const gridItem = document.createElement("div");
      gridItem.classList.add("gridItem");
      gridItem.setAttribute("id", `${i}-${j}`);
      gridContainer.appendChild(gridItem);
    }
  }
  fragment.appendChild(gridContainer);
  element.appendChild(fragment);

  event.preventDefault();
}

function findPath(src, destination, algorithm) {
  console.log("mehull", src, destination, algorithm);
  const gridSize = parseInt(input.value, 10);
  const gridItems = document.querySelectorAll(".gridItem");
  const grid = new Set(Array.from(gridItems).map((item) => item.id));
  let path = [];

  if (!grid.has(src) || !grid.has(destination)) {
    alert("Invalid source or destination.");
    return;
  }

  // Clear previous path highlights
  clearPathHighlights();

  if (algorithm === "BFS") {
    path = bfs(src, destination, grid, gridSize);
  } else if (algorithm === "DFS") {
    path = dfs(src, destination, grid, gridSize);
  }

  highlightPath(path);
}

// Clear previous path highlights
function clearPathHighlights() {
  const gridItems = document.querySelectorAll(".gridItem");
  gridItems.forEach((item) => {
    item.style.backgroundColor = "";
  });
}

// BFS algorithm implementation
function bfs(src, destination, grid, gridSize) {
  const queue = [[src]];
  const visited = new Set();
  visited.add(src);

  const getNeighbors = (id) => {
    const neighbors = [];
    const [x, y] = id.split("-").map(Number);
    const directions = [
      [1, 0],
      [-1, 0],
      [0, 1],
      [0, -1],
    ]; // Down, Up, Right, Left

    directions.forEach(([dx, dy]) => {
      const nx = x + dx;
      const ny = y + dy;
      const neighborId = `${nx}-${ny}`;
      if (nx >= 0 && nx < gridSize && ny >= 0 && ny < gridSize && grid.has(neighborId)) {
        neighbors.push(neighborId);
      }
    });

    return neighbors;
  };

  while (queue.length > 0) {
    const path = queue.shift(); // remove the first path
    const node = path[path.length - 1]; // Get the last node in the path

    if (node === destination) {
      return path; // If we found the destination, return the path
    }

    for (const neighbor of getNeighbors(node)) {
      if (!visited.has(neighbor)) {
        visited.add(neighbor);
        queue.push([...path, neighbor]); // Enqueue the new path with this neighbor
      }
    }
  }

  return [];
}

// DFS algorithm implementation
function dfs(src, destination, grid, gridSize) {
  const stack = [[src]];
  const visited = new Set();

  const getNeighbors = (id) => {
    const neighbors = [];
    const [x, y] = id.split("-").map(Number);
    const directions = [
      [1, 0],
      [-1, 0],
      [0, 1],
      [0, -1],
    ];

    directions.forEach(([dx, dy]) => {
      const nx = x + dx;
      const ny = y + dy;
      const neighborId = `${nx}-${ny}`;
      if (nx >= 0 && nx < gridSize && ny >= 0 && ny < gridSize && grid.has(neighborId)) {
        neighbors.push(neighborId);
      }
    });

    return neighbors;
  };

  while (stack.length > 0) {
    const path = stack.pop(); // Pop the last path
    const node = path[path.length - 1]; // Get the last node in the path

    if (node === destination) {
      return path; // If we found the destination, return the path
    }

    if (!visited.has(node)) {
      visited.add(node);
      for (const neighbor of getNeighbors(node)) {
        stack.push([...path, neighbor]); // Push the new path with this neighbor
      }
    }
  }

  return [];
}

async function highlightPath(path) {
  if (path.length === 0) {
    alert("No path found.");
    return;
  }

  for (let i = 0; i < path.length; i++) {
    const gridItem = document.getElementById(path[i]);
    if (gridItem) {
      if (path[i] === src) {
        gridItem.style.backgroundColor = "#d0f4de";
      } else if (path[i] === destination) {
        gridItem.style.backgroundColor = "#f08080";
      } else {
        gridItem.style.backgroundColor = "#fcf6bd";
      }
      await new Promise((resolve) => setTimeout(resolve, 500));
    }
  }
}

const traverseButton = document.querySelector("#traverseButton");

traverseButton.addEventListener("click", () => {
  if (src && destination) {
    findPath(src, destination, algorithmSelect.value);
  } else {
    alert("Please select both source and destination nodes.");
  }
});

submit.addEventListener("click", createGrid);
