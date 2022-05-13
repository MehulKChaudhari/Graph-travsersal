const input = document.querySelector('#gridsize')
const submit = document.querySelector('#submitButton')
function createGrid(event) {
    const gridSize = input.value;
    console.log(gridSize)
        const element =  document.querySelector('#grid');
        const fragment = document.createDocumentFragment();

        const gridContainer = document.createElement("div");
        gridContainer.classList.add("gridContainer");
        gridContainer.style.gridTemplateColumns = `repeat(${gridSize}, 1fr)`;
        gridContainer.style.gridGap = "0.5rem"
        for (let i = 1; i <= gridSize; i++) {
            for(let j = 1; j <= gridSize; j++){
              const gridItem = document.createElement("gridItem");
              gridItem.classList.add("gridItem");
              gridContainer.appendChild(gridItem);
          }
        }
        fragment.appendChild(gridContainer);
        element.appendChild(fragment);

    event.preventDefault();
  }

  submit.addEventListener('click', createGrid)