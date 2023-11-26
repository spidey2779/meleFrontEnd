
// let see blocks code

// Assume your JavaScript file is named script.js

let blocks = {
    WB: [101, 102, 103, 104, 105, 106, 107, 108, 109, 110, 111, 112, 113, 114, 115, 116, 117, 118, 119, 120, 121],
    SB: [105, 106, 107, 108, 109, 110, 111, 112, 113, 114, 115, 116, 117, 118, 119],
    EB: [109, 110, 111, 112, 113, 114, 115, 116, 117, 118, 119],
  };
  
  // Maintain a map to store selected values for each blockType


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
  
                    // Check if the value is not already in the array before adding it
                    if (!selectedValues[blockType].includes(selectedValue)) {
                        selectedValues[blockType].push(selectedValue);
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
  }
  
  function updateDisplayTableData(blockType) {
    // Get the corresponding h3 element based on blockType
    var h3Element = document.getElementById(blockType.toLowerCase() + "block");
  
    // Update the content of the h3 element
    h3Element.textContent = "Selected rooms in " + blockType + ": " + selectedValues[blockType].join(", ");
  }
  