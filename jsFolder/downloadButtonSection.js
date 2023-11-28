
//admin sheet of all rollnumbers
var mydata;
function triggersheets(data){
   mydata=data
}
document.getElementById('AdminSheetBtn').addEventListener('click', function() {

    // Create an array for CSV data with headers and additional information
    let csvData = [
      ["Madanapalle Institute of Technology and Science"], // Main Heading
      ["Examination: B Tech ( year - ), Department: "], // Placeholder for Examination and Department Information
      ["ROOM PLAN"], // Room Plan
      ["Date: ", "Time: "], // Placeholder for Exam Date and Time
      ["S.NO", "Roll No", "Room No"]
    ];
   let j=1
    // Iterate through each object in the array
    for (let i = 0; i < mydata.length; i++) {
      const currentObject = mydata[i];
  
      // Iterate through each room key in the object
      for (const roomKey in currentObject) {
        if (currentObject.hasOwnProperty(roomKey)) {
          // Extract information from the first element under the room key
          const { year, department, examDate, examTime } = currentObject[roomKey][0];
  
          // Populate Examination and Department Information in the placeholder
          csvData[1] = [`Examination: B Tech ( year - ${year} ), Department: ${department}`];
          // Populate Exam Date and Time in the placeholder
          csvData[3] = [`Date: ${examDate}`, `Time: ${examTime}`];
  
          // Populate CSV data from currentObject[roomKey]
        
          currentObject[roomKey].forEach(student => {
            csvData.push([j++, student.roll, roomKey]);
          });
        }
      }
    }
  
    // Convert CSV data to string
    const csvString = Papa.unparse(csvData);
  
    // Create a Blob containing the CSV data
    const blob = new Blob([csvString], { type: 'text/csv' });
  
    // Create a link to download the CSV file
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'admin_sheet.csv';
  
    // Append the link to the document and trigger the download
    document.body.appendChild(link);
    link.click();
  
    // Clean up: remove the link from the document
    document.body.removeChild(link);
  });
  
  
  
  
  
  
  
  
  
  
  
  
  //Attendance sheets download
  
  // Function to generate and download separate CSV files for each room
  function generateCSV(mydata) {
    // Iterate through each object in the array
    for (let i = 0; i < mydata.length; i++) {
      const currentObject = mydata[i];
  
      // Extract information from the first element under the room key
      const { year, department, examDate, examTime } = currentObject[Object.keys(currentObject)[0]][0];
  
      // Populate CSV data and create separate CSV files for each room
      for (const roomKey in currentObject) {
        let csvData = [
          ["Madanapalle Institute of Technology and Science"], // Main Heading
          [`Examination: B Tech ( year - ${year} )`], // Examination Information
          [`Department: ${department}`], // Department Information
          [`Room No: ${roomKey}`], // Room No Information
          ["S.NO", "Roll No", "Booklet No", "Signature"]
        ];
  
        let sno = 1;
        currentObject[roomKey].forEach(student => {
          csvData.push([sno++, student.roll, " ", " "]); // Add space for Booklet No and Signature
        });
  
        // Convert CSV data to string
        const csvString = Papa.unparse(csvData);
  
        // Create a Blob containing the CSV data
        const blob = new Blob([csvString], { type: 'text/csv' });
  
        // Create a link to download the CSV file
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = `${roomKey}_attendance_sheet_${i + 1}.csv`; // Add index to distinguish sheets
  
        // Append the link to the document and trigger the download
        document.body.appendChild(link);
        link.click();
  
        // Clean up: remove the link from the document
        document.body.removeChild(link);
      }
    }
  }
  
  
  
  
  // Attach the function to the button click event
  document.getElementById('AttendanceSheetBtn').addEventListener('click', function() {
    generateCSV(mydata);
  });
  