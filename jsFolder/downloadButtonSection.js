//admin sheet of all rollnumbers
var mydata;
function triggersheets(data) {
  mydata = data;
}
document.getElementById("AdminSheetBtn").addEventListener("click", function () {
  // Create an array for CSV data with headers and additional information
  let csvData = [
    ["Madanapalle Institute of Technology and Science"], // Main Heading
    ["Examination: B Tech ( year - ), Department: "], // Placeholder for Examination and Department Information
    ["ROOM PLAN"], // Room Plan
    ["Date: ", "Time: "], // Placeholder for Exam Date and Time
    ["S.NO", "Roll No", "Room No"],
  ];
  let j = 1;
  // Iterate through each object in the array
  for (let i = 0; i < mydata.length; i++) {
    const currentObject = mydata[i];

    // Iterate through each room key in the object
    for (const roomKey in currentObject) {
      if (currentObject.hasOwnProperty(roomKey)) {
        // Extract information from the first element under the room key
        const { year, department, examDate, examTime } =
          currentObject[roomKey][0];

        // Populate Examination and Department Information in the placeholder
        csvData[1] = [
          `Examination: B Tech ( year - ${year} ), Department: ${department}`,
        ];
        // Populate Exam Date and Time in the placeholder
        csvData[3] = [`Date: ${examDate}`, `Time: ${examTime}`];

        // Populate CSV data from currentObject[roomKey]

        currentObject[roomKey].forEach((student) => {
          csvData.push([j++, student.roll, roomKey]);
        });
      }
    }
  }

  // Convert CSV data to string
  const csvString = Papa.unparse(csvData);

  // Create a Blob containing the CSV data
  const blob = new Blob([csvString], { type: "text/csv" });

  // Create a link to download the CSV file
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = "admin_sheet.csv";

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
    const { year, department, examDate, examTime } =
      currentObject[Object.keys(currentObject)[0]][0];

    // Populate CSV data and create separate CSV files for each room
    for (const roomKey in currentObject) {
      let csvData = [
        ["Madanapalle Institute of Technology and Science"], // Main Heading
        [`Examination: B Tech ( year - ${year} )`], // Examination Information
        [`Department: ${department}`], // Department Information
        [`Room No: ${roomKey}`], // Room No Information
        ["S.NO", "Roll No", "Booklet No", "Signature"],
      ];

      let sno = 1;
      currentObject[roomKey].forEach((student) => {
        csvData.push([sno++, student.roll, " ", " "]); // Add space for Booklet No and Signature
      });

      // Convert CSV data to string
      const csvString = Papa.unparse(csvData);

      // Create a Blob containing the CSV data
      const blob = new Blob([csvString], { type: "text/csv" });

      // Create a link to download the CSV file
      const link = document.createElement("a");
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
document
  .getElementById("AttendanceSheetBtn")
  .addEventListener("click", function () {
    generateCSV(mydata);
  });

// generating pdf for invizilators

// Function to generate PDF
function generatePDF() {
  // Function to generate details text
  function generateDetailsText(detailsArray) {
    return detailsArray
      .map(
        (detail) =>
          `${detail.roll}\n${detail.department}\n${detail.subCode}\nyear : ${detail.year}`
      )
      .join("\n\n");
  }

  // Initialize a new jsPDF instance
  const pdf = new jsPDF();

  // Find all unique room numbers in the data
  const uniqueRoomNumbers = [
    ...new Set(mydata.flatMap((roomData) => Object.keys(roomData))),
  ];

  // Iterate through each unique room number
  uniqueRoomNumbers.forEach((roomNumber) => {
    const detailsSet = mydata.reduce((acc, roomData) => {
      // Check if the room number is present in the current object
      if (roomNumber in roomData) {
        // Concatenate the details for the current room number
        return acc.concat(roomData[roomNumber]);
      }
      return acc;
    }, []);

    // Set up the dimensions and spacing for the page
    const pageWidth = pdf.internal.pageSize.width;
    const pageHeight = pdf.internal.pageSize.height;
    const margin = 12;
    const boxWidth = (pageWidth - 2 * margin) / 4;
    const boxHeight = (pageHeight - 2 * margin) / 6;

    // Draw the big box for the room
    pdf.rect(margin, margin, pageWidth - 2 * margin, pageHeight - 2 * margin);

    // Set font size
    const fontSize = 18;
    pdf.setFontSize(fontSize);

    // Draw room number as heading
    pdf.text(pageWidth / 2, 5, roomNumber, {
      align: "center",
      baseline: "top",
    });
    pdf.setFontSize(fontSize - 8);

    // Draw small boxes and insert details
    for (let row = 0; row < 6; row++) {
      for (let col = 0; col < 4; col++) {
        const x = margin + col * boxWidth;
        const y = margin + row * boxHeight;

        // Calculate the seat number based on column parity
        let seatNumber;
        if (col % 2 === 0) {
          // For odd columns, start from (col * 6) + row + 1 and increment
          seatNumber = col * 6 + row + 1;
        } else {
          // For even columns, start from (col + 1) * 6 - row and decrement
          seatNumber = (col + 1) * 6 - row;
        }

        // Reverse the order of seat numbers in the second and fourth columns
        if (col === 1 || col === 3) {
          seatNumber = (col + 1) * 6 - row;
        }

        // Draw small box
        pdf.rect(x, y, boxWidth, boxHeight);
        pdf.setFontSize(fontSize - 3);

        // Display seat number at the top
        pdf.text(
          x + boxWidth / 1.3 + 3,
          y + boxHeight / 4 - 3,
          seatNumber.toString(),
          {
            align: "center",
            baseline: "middle",
            angle: 0,
          }
        );
        pdf.setFontSize(fontSize - 8);

        // Check if seat number matches and insert details at the bottom
        const matchingDetails = detailsSet.filter(
          (detail) => detail.seatNo === seatNumber
        );

        // Generate details text for matching details
        const detailsText = generateDetailsText(matchingDetails);

        // Adjust margin and padding to fit within the box
        const textMargin = 2;
        // const textPadding = 2;
        const maxWidth = boxWidth - 2 * textMargin;

        // Draw details text horizontally within the same box
        pdf.text(
          x + textMargin,
          y + boxHeight / 4 - 4,
          pdf.splitTextToSize(detailsText, maxWidth),
          {
            align: "left",
            baseline: "top",
            angle: 0,
          }
        );
      }
    }

    // Add a new page for the next room
    pdf.addPage();
  });

  // Save or display the PDF
  pdf.save("output.pdf");
}

document
  .getElementById("InvizilatorSheetsBtn")
  .addEventListener("click", function (e) {
    generatePDF();
  });

// send mail button section

document.getElementById("sendMailBtn").addEventListener("click", async () => {
  // let userres "Are you sure to send Mails ?");
  let userres = await confrimAction("Confirmation","Are you sure to send Mails ?")
  if (!userres) {
    return;
  }
  startLoader("SendingMails...");
  let mailurl = "https://mele-be.onrender.com/mail/sending";
  fetch(mailurl)
    .then((response) => {
      if (!response.ok) {
        alert("error in Sending Mails");
        throw new Error("Error in sending mails" + response.status);
      }
      return response.json();
    })
    .then((data) => {
      stopLoader();
      // Alert with a custom title and text

      Swal.fire({
        text: "Mails Sent Successfully",
        icon:  'success',
                confirmButtonText: "OK",
                customClass: {
                    title: "text-primary",
                    confirmButton: "btn btn-primary",
                },
                timer:2000
      });
    })
    .catch((err) => console.error("Error:", err));
});
