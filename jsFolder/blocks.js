
// let see blocks code

// Assume your JavaScript file is named script.js

// let blocks = {
//     WB: [101, 102, 103, 104, 105, 106, 107, 108, 109, 110, 111, 112, 113, 114, 115, 116, 117, 118, 119, 120, 121],
//     SB: [105, 106, 107, 108, 109, 110, 111, 112, 113, 114, 115, 116, 117, 118, 119],
//     EB: [109, 110, 111, 112, 113, 114, 115, 116, 117, 118, 119],
//   };
  
  // Maintain a map to store selected values for each blockType
// Define blocks globally
let blocks = {};

fetch('https://mele-be.onrender.com/rooms/empty')
  .then((res) => {
    if (!res.ok) {
      throw new Error('fetching error: ' + res.status);
    }
    return res.json();
  })
  .then((data) => {
    // Assuming 'data' is an array with a single object
    if (Array.isArray(data) && data.length > 0) {
      // Extract the object from the array
      const roomData = data[0];

      // Extract the keys from the object (excluding '_id')
      const roomKeys = Object.keys(roomData).filter((key) => key !== '_id');

      // Create the 'blocks' object
      roomKeys.forEach((key) => {
        blocks[key] = roomData[key];
      });

      blocksMain()
    } else {
      console.log('Invalid data format.');
    }
  })
  .catch((err) => {
    console.log('error: ' + err);
  });


function blocksMain(){
   
  



  let selectedValues = {}
  
  
  
  for (let key in blocks) {
    generateTableAndH3(key, blocks[key]);
  }
  
  function generateTableAndH3(blockType, values) {
    var blockContainer = document.getElementById("blockSection");

    var tableContainer = document.createElement("div");
    var tableClass = blockType.toLowerCase() + "table";
    var divClass = blockType.toLowerCase() + "blockdiv";
    tableContainer.className = divClass;

    var button = document.createElement("button");
    button.type = "button";
    button.textContent = blockType;

    var table = document.createElement("table");
    table.classList.add(tableClass);

    var numColumns = 3; // Assuming you want 3 columns
    var numRows = Math.ceil(values.length / numColumns);

    for (var i = 0; i < numRows; i++) {
        var row = table.insertRow(i);

        for (var j = 0; j < numColumns; j++) {
            var index = i * numColumns + j;
            if (index < values.length) {
                var cell = row.insertCell(j);
                cell.textContent = values[index];

                // Attach a click event to each cell
                cell.addEventListener("click", function (event) {
                    var clickedCell = event.target;
                    var selectedValue = clickedCell.textContent;

                    // Check if selectedValues[blockType] exists, if not create an array
                    selectedValues[blockType] = selectedValues[blockType] || [];

                    // Toggle background color and update selected values
                    if (selectedValues[blockType].includes(selectedValue)) {
                        // Remove from selected values and revert background color
                        selectedValues[blockType] = selectedValues[blockType].filter(value => value !== selectedValue);
                        clickedCell.style.backgroundColor = "";
                    } else {
                        // Add to selected values and change background color
                        selectedValues[blockType].push(selectedValue);
                        clickedCell.style.backgroundColor = "lightblue";
                    }

                    updateDisplayTableData(blockType);
                });
            }
        }
    }

    tableContainer.appendChild(button);
    tableContainer.appendChild(table);
    blockContainer.appendChild(tableContainer);

    // Dynamically create and append an h3 element for each blockType
    var h3Element = document.createElement("h3");
    h3Element.id = blockType.toLowerCase() + "block";
    document.querySelector(".displaytabledata").appendChild(h3Element);

    // Initially hide the h3 element
    h3Element.style.display = "none";
}



  
function updateDisplayTableData(blockType) {
  // Get the corresponding h3 element based on blockType
  var h3Element = document.getElementById(blockType.toLowerCase() + "block");

  // Check if there are selected room numbers
  if (selectedValues[blockType] && selectedValues[blockType].length > 0) {
      // Update the content of the h3 element
      h3Element.textContent = "Selected rooms in " + blockType + ": " + selectedValues[blockType].join(", ");
      // Optionally, you can add styling to the h3 element
    
      // Show the h3 element
      h3Element.style.display = "block";
  } else {
      // If no room numbers are selected, hide the h3 element
      h3Element.style.display = "none";
  }
}


  
}