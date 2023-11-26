
let Years = [
  {
      CSE1: ["20CSE101", "20CSE102", "20CSE103", "20CSE104", "20CSE105", "20CSE106", ],
      EEE1: ["20EEE101", "20EEE102", "20EEE103", "20CSE104", "20CSE105", "20CSE106",],
      ECE1: ["20ECE101", "20ECE102", "20ECE103"],
  },
  {
      CSE2: ["20CSE201", "20CSE102", "20CSE103"],
      EEE2: ["20EEE201", "20EEE102", "20EEE103"],
      ECE2: ["20ECE201", "20ECE102", "20ECE103"]
  },
  {
      CSE3: ["20CSE301", "20CSE102", "20CSE103"],
      EEE3: ["20EEE301", "20EEE102", "20EEE103"],
      ECE3: ["20ECE301", "20ECE102", "20ECE103"]
  }
];



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

function handleValueButtonClick(yearIndex, key, value) {
  // Handle button click for individual value
  console.log(`Clicked on ${key}: ${value}`);
}
