const input = document.querySelector("#gridsize");
const submit = document.querySelector("#submitButton");
function createGrid(event) {
  const gridSize = input.value;
  console.log(gridSize);
  const element = document.querySelector("#grid");
  const fragment = document.createDocumentFragment();
  let clickCount = 0;
  let src = null;
  let destination = null;
  const gridContainer = document.createElement("div");
  gridContainer.classList.add("gridContainer");
  gridContainer.style.gridTemplateColumns = `repeat(${gridSize}, 1fr)`;
  gridContainer.style.gridGap = "0.5rem";
  gridContainer.addEventListener("click", (e) => {
    if (e.target) {
      clickCount++;
      if (clickCount === 1) {
        src = e.target.id;
        e.target.style.backgroundColor = "green";
      } else if (clickCount === 2) {
        destination = e.target.id;
        e.target.style.backgroundColor = "red";
      } else if (clickCount > 2) {
        document.getElementsByClassName("gridContainer").disabled = true;
        alert(
          "src and destination already select refresh if you want to change to nodes"
        );
      }
    }
  });

  for (let i = 1; i <= gridSize; i++) {
    for (let j = 1; j <= gridSize; j++) {
      const gridItem = document.createElement("gridItem");
      gridItem.classList.add("gridItem");
      gridItem.setAttribute("id", `${i}${j}`);
      gridContainer.appendChild(gridItem);
    }
  }
  fragment.appendChild(gridContainer);
  element.appendChild(fragment);

  event.preventDefault();
}

submit.addEventListener("click", createGrid);
