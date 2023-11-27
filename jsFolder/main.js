//loader
// Function to start the loader animation
function startLoader(loaderText = "loading...") {
  const loader = document.querySelector(".circle-container");
  loader.style.display = "flex";
  const backdrop = document.querySelector(".backdrop");
  backdrop.style.display = "block"; // Show backdrop
  document.getElementById("loadingText").textContent = loaderText;
  // Disable scrolling
  document.body.style.overflow = "hidden";
}
// Function to stop the loader animation
function stopLoader() {
  const loader = document.querySelector(".circle-container");
  loader.style.display = "none";
  const backdrop = document.querySelector(".backdrop");
  backdrop.style.display = "none"; // Hide backdrop

  // Enable scrolling
  document.body.style.overflow = "auto";
}

var mytimingDetails;
var fromTimeValue = document.getElementById("fromtime");
var toTimeValue = document.getElementById("totime");
var dateValue = document.getElementById("mydate");

// Assuming your radio buttons have IDs 'Continuos' and 'jumble'
const continuosRadioButton = document.getElementById("Continuos");
const jumbleRadioButton = document.getElementById("jumble");
let radiovalue = "";

// onclick on firstform button
document.getElementById("firstformBtn").addEventListener("click", function () {
  // Check which radio button is selected
  if (continuosRadioButton.checked) {
    radiovalue = "continuous";
    // You can perform additional actions for Continuos
  } else if (jumbleRadioButton.checked) {
    radiovalue = "jumble";
    // You can perform additional actions for Jumble
  } else {
    // If neither radio button is checked, show an alert
    alert("Please fill in all fields.")
    return;
  }

  // Check if any of the input fields is empty
  if (!fromTimeValue.value || !toTimeValue.value || !dateValue.value) {
    alert("Please fill in all fields.");
  } else {
    let con = confirm(
      "Are you sure with the details cannot make changes anymore?"
    );

    // Set the display property of the element with id 'alldetails' to 'flex'
    const allDetailsElement = document.getElementById("alldetails");
    if (allDetailsElement && con) {
      document.getElementById("firstform").style.pointerEvents = "none";
      allDetailsElement.style.display = "flex";

      // Assign values to mytimingDetails inside the 'else' block
      mytimingDetails = {
        fromtime: fromTimeValue.value,
        totime: toTimeValue.value,
        date: dateValue.value,
        seating: radiovalue,
      };
      
      // trig()
    }
  }
});

// function trig(){
// console.log(mytimingDetails)
// }