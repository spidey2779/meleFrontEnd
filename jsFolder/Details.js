


// this is the output array
let myoutput=[
  {},
  {},
  {},
]

// this is input years after upadate this with the database array
// let Years = [
//   {
//       CSE1: ["20CSE101", "20CSE102", "20CSE103", "20CSE104", "20CSE105", "20CSE106", ],
//       EEE1: ["20EEE101", "20EEE102", "20EEE103", "20CSE104", "20CSE105", "20CSE106",],
//       ECE1: ["20ECE101", "20ECE102", "20ECE103"],
//   },
//   {
//       CSE2: ["20CSE201", "20CSE102", "20CSE103"],
//       EEE2: ["20EEE201", "20EEE102", "20EEE103"],
//       ECE2: ["20ECE201", "20ECE102", "20ECE103"]
//   },
//   {
//       CSE3: ["20CSE301", "20CSE102", "20CSE103"],
//       EEE3: ["20EEE301", "20EEE102", "20EEE103"],
//       ECE3: ["20ECE301", "20ECE102", "20ECE103"]
//   }
// ];



// Initialize Years as an empty array
// Initialize Years as an empty array
let Years = [];

fetch('https://mele-be.onrender.com/year/code')
  .then((response) => {
    if (!response.ok) {
      throw new Error("Error in fetching..." + response.status);
    }
    return response.json();
  })
  .then((data) => {
    // Assuming 'data' is an array of department objects

    // Iterate over each department object
    data.forEach((department, index) => {
      // Filter out the "_id" key
      const keysWithoutId = Object.keys(department).filter((key) => key !== "_id");

      // Create an object to represent the department
      let departmentObject = {};

      // Iterate over the properties of the current department object
      keysWithoutId.forEach((key) => {
        // Add the key and its associated values to the department object
        departmentObject[key] = department[key];
      });

      // Push the department object to the Years array
      Years.push(departmentObject);
    });

    // Now, you can access the Years array here or call a function that uses it
   
    // Call a function that uses the Years array
    exampleFunction();
  })
  .catch((err) => {
    console.log('fetching error:' + err);
  });

// Define a function that uses the Years array
function exampleFunction() {
 



const yearDetails = document.getElementById('initial');
const yearsSection = document.querySelector('.yearsSection');
const selectedYears = new Set();
//yearssectioin
Years.forEach((yearData, index) => {
  const option = document.createElement('p');
  option.textContent = `Year ${index + 1}`;
  option.addEventListener('click', () => showYearKeys(index + 1));
  yearDetails.appendChild(option);

  const yearSection = document.createElement('div');
  yearSection.classList.add('firstYearMainSection');
  yearSection.id = `year${index + 1}`;

  for (const key in yearData) {
      const button = document.createElement('button');
      button.classList.add('subject');
      button.type = 'button';
      button.textContent = key;
      button.addEventListener('click', () => showYearData(index + 1, key));

      yearSection.appendChild(button);
  }

  const displayDiv = document.createElement('div');
  displayDiv.classList.add('display' + (index + 1));
  displayDiv.id = 'dis' + (index + 1);
  yearSection.appendChild(displayDiv);

  yearsSection.appendChild(yearSection);
});

function showYearKeys(yearIndex) {
  const selectedSection = document.getElementById(`year${yearIndex}`);
  
  if (selectedYears.has(yearIndex)) {
      selectedYears.delete(yearIndex);
      selectedSection.style.display = 'none';
  } else {
      selectedYears.add(yearIndex);
      selectedSection.style.display = 'block';
  }
}

//selected departments
const selectedKeys = new Set();

function showYearData(yearIndex, key) {
  const displayDiv = document.querySelector(`#year${yearIndex} > .display${yearIndex}`);
  
  if (selectedYears.has(yearIndex) && displayDiv) {
      // Check if the key is already selected
      if (selectedKeys.has(key)) {
          // If yes, remove the key and hide the data
          selectedKeys.delete(key);
          const dataToRemove = displayDiv.querySelectorAll(`button[data-key="${key}"], br[data-key="${key}"]`);
          if (dataToRemove) {
              dataToRemove.forEach(item => displayDiv.removeChild(item));
          }
      } else {
          // If no, add the key and display the data as separate buttons 
          selectedKeys.add(key);

          const values = Years[yearIndex - 1][key];

          values.forEach((value, index) => {
              const newButton = document.createElement('button');
              newButton.classList.add('value-button');
              newButton.type = 'button'; // Ensure the button is of type button
              newButton.textContent = `${key}: ${value}`;
              newButton.setAttribute('data-key', key);
              newButton.setAttribute('data-value', value);
              newButton.addEventListener('click', () => handleValueButtonClick(yearIndex, key, value));

              displayDiv.appendChild(newButton);
              
         
          });
      }
  }
}

const selectedData = {};

// Modify the handleValueButtonClick function
function handleValueButtonClick(yearIndex, key, value) {
    // Check if there is an array for the key in the selectedData object
    if (!selectedData[key]) {
        // If not, create a new array for the key
        selectedData[key] = [];
    }

    // Replace the existing value or add the new value to the array
    selectedData[key] = [value];

    // Update the display
    updateDisplay();
}


// Function to update the display with the selected values
function updateDisplay() {
  const displayDiv = document.querySelector('.displayyeardata');

  // Clear the display
  displayDiv.innerHTML = '';

  // Create an object to store values based on the ending number in the key
  const valuesByEndingNumber = {};

  // Iterate over the selected values and organize them by ending number
  for (const key in selectedData) {
      const endingNumber = key.slice(-1);

      if (!valuesByEndingNumber[endingNumber]) {
          valuesByEndingNumber[endingNumber] = [];
      }

      valuesByEndingNumber[endingNumber].push({ key, value: selectedData[key][0] });
  }

  // Iterate over the organized values and create rows
  for (const endingNumber in valuesByEndingNumber) {
      // Create a heading for each set of values
      const heading = document.createElement('h3');
      heading.textContent = `Year${endingNumber}`;
      heading.classList.add('heading');
      displayDiv.appendChild(heading);

      // Iterate over the values for the current ending number and create rows
      valuesByEndingNumber[endingNumber].forEach(({ key, value }) => {
          // Create a row div for each key
          const keyRowDiv = document.createElement('div');
          keyRowDiv.classList.add('key-row');
          keyRowDiv.setAttribute('data-key', key);

          // Create a div to display the values for the key, including the key itself
          const selectedValuesDiv = document.createElement('div');
          selectedValuesDiv.classList.add('selected-values');

          // Append the key to the div
          selectedValuesDiv.textContent += key + ': ';

          // Append the single value to the div
          selectedValuesDiv.textContent += value;

          // Append the values div to the row div
          keyRowDiv.appendChild(selectedValuesDiv);

          // Append the row div to the display
          displayDiv.appendChild(keyRowDiv);
      });
  }
}

//  confirming the  department details

let depdetailsBtn = document.getElementById('generateDataButton');

depdetailsBtn.addEventListener('click', function (e) {
    // Iterate over the selected years and hide their sections
    selectedYears.forEach(yearIndex => {
        const selectedSection = document.getElementById(`year${yearIndex}`);
        if (selectedSection) {
            selectedSection.style.display = 'none';
        }
    });

    // Clear the selected years and keys
    selectedYears.clear();
    selectedKeys.clear();

    // Clear the selected data
    for (const key in selectedData) {
        delete selectedData[key];
    }

    // Update the display
    updateDisplay();
    
    
    startLoader()
    setTimeout(() => {
      stopLoader();
    }, 3000);

});


}