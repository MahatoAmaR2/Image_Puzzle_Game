const size = 3;
const tileContainer = document.getElementById("tileContainer");
const dropContainer = document.getElementById("dropContainer");
const moveCountDisplay = document.getElementById("moveCount");
let tiles = [];
let moveCount = 0;

function startPuzzle() {
  tileContainer.innerHTML = "";
  dropContainer.innerHTML = "";
  tiles = [];
  moveCount = 0;
  moveCountDisplay.textContent = moveCount;

  for (let i = 0; i < size * size; i++) {
    const tile = document.createElement("div");
    tile.className = "tile";
    tile.id = "tile-" + i;

    const x = (i % size) * 100;
    const y = Math.floor(i / size) * 100;
    tile.style.backgroundImage = "url('./assets/vishali.jpg')";
    tile.style.backgroundSize = "300px 300px";
    tile.style.backgroundPosition = `-${x}px -${y}px`;

    tile.draggable = true;
    tile.addEventListener("dragstart", (e) => {
      e.dataTransfer.setData("text/plain", tile.id);
    });

    tiles.push(tile);
  }

  shuffleTiles();

  for (let i = 0; i < size * size; i++) {
    const dropCell = document.createElement("div");
    dropCell.className = "drop-tile";

    dropCell.addEventListener("dragover", (e) => {
      e.preventDefault();
    });

    dropCell.addEventListener("drop", (e) => {
      e.preventDefault();
      const draggedId = e.dataTransfer.getData("text/plain");
      const draggedTile = document.getElementById(draggedId);

      if (dropCell.children.length === 0) {
        dropCell.appendChild(draggedTile);
        moveCount++;
        moveCountDisplay.textContent = moveCount;
      }
    });

    dropContainer.appendChild(dropCell);
  }
}

function shuffleTiles() {
  tileContainer.innerHTML = "";
  tiles.sort(() => Math.random() - 0.5);
  tiles.forEach((tile) => tileContainer.appendChild(tile));
}
