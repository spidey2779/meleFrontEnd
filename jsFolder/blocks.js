
// let see blocks code

// Assume your JavaScript file is named script.js

// let blocks = {
//     WB: [101, 102, 103, 104, 105, 106, 107, 108, 109, 110, 111, 112, 113, 114, 115, 116, 117, 118, 119, 120, 121],
//     SB: [105, 106, 107, 108, 109, 110, 111, 112, 113, 114, 115, 116, 117, 118, 119],
//     EB: [109, 110, 111, 112, 113, 114, 115, 116, 117, 118, 119],
//   };
  
  // Maintain a map to store selected values for each blockType
// Define blocks globally
let  blocks = {};
let  selectedRooms={}

fetch('https://mele-be-eoda.onrender.com/rooms/empty')
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

      blocksMain(blocks)
    } else {
      console.log('Invalid data format.');
    }
  })
  .catch((err) => {
    console.log('error: ' + err);
  });


function blocksMain(blocks){
   
  let selectedValues = {};

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




const confirmButton = document.getElementById('generateBlocks');

// Attach a click event listener to the confirm button
confirmButton.addEventListener('click', handleConfirmButtonClick);

async function handleConfirmButtonClick() {
    // Check if at least one room is selected
    const totalSelectedRooms = Object.values(selectedValues).flat().length;

    if (totalSelectedRooms === 0) {
        // Display an alert if no room is selected
        alert('Please select at least one room.');
        return;
    }
    // Display a confirmation message to the user
    // const userConfirmation = confirm('Are you sure you want to confirm you cannot make any changes ?');
    const userConfirmation = await confrimAction("Confirmation","Are you sure you want to confirm you cannot make any changes ?")

    // Check if the user confirmed
    if (!userConfirmation) {
        // If the user didn't confirm, return
        return;
    }
    //starting the loader
    startLoader("updating rooms...");
    // You can replace the above log with your actual pre-confirmation operation

    // Set pointer-events to 'none' for blockSection
    const blockSection = document.getElementById('blockSection');
    if (blockSection) {
        blockSection.style.pointerEvents = 'none';
    }

   

 

    // Iterate over the selectedValues object and store the selected rooms
    for (const blockType in selectedValues) {
        selectedRooms[blockType] = selectedValues[blockType].map(Number);

        // Remove the respective h3 element
        const h3Element = document.getElementById(blockType.toLowerCase() + 'block');
        if (h3Element) {
            h3Element.remove();
        }
    }

    // Console log the selected rooms object
    // console.log(selectedRooms);
    
    mydatafunction2(selectedRooms)
    hello()
    // startLoader('sending selected rooms...')
    // Example asynchronous operation (replace this with your actual logic)
    confirmButton.disabled=true;
   stopLoader()
   alert('you can download the sheets now...')
}







}

function mydatafunction2(selectedRooms) {
 
  
}

function mydatafunction(selectedDataBeforeDeletion) {
 
  
}

function hello() {
  myFinalOutput.push(selectedRooms);
  myFinalOutput.push(selectedDataBeforeDeletion);
  myFinalOutput.push(mytimingDetails);

  console.log(myFinalOutput);

  // Assuming myFinalOutput is ready to be sent
  const url = 'https://mele-be-eoda.onrender.com/roll/allocRoom';

  fetch(url, {
    method: 'POST', // or 'PUT' or 'PATCH' depending on your API
    headers: {
      'Content-Type': 'application/json',
      // Include any additional headers if needed
    },
    body: JSON.stringify(myFinalOutput),
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error('Error in fetching...' + response.status);
      }
      return response.json();
    })
    .then((data) => {
      document.getElementById('secondform').style.pointerEvents = 'auto';
      triggersheets(data)
      // Handle the response from the server if needed
      console.log('Data sent successfully:', data);
    })
    .catch((error) => {
      console.error('Error sending data:', error);
    });
}

