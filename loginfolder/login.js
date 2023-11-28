const openeye = document.getElementById("openeye");
const closedeye = document.getElementById("closedeye");
pinput = document.getElementById("passwordinput");
openeye.addEventListener("click", function () {
  closedeye.classList.toggle("inactive");
  openeye.classList.toggle("inactive");
  if (pinput.type == "password") {
    pinput.type = "text";
  } else {
    pinput.type = "password";
  }
});
closedeye.addEventListener("click", function () {
  openeye.classList.toggle("inactive");
  closedeye.classList.toggle("inactive");
  if (pinput.type == "password") {
    pinput.type = "text";
  } else {
    pinput.type = "password";
  }
});


// loader js

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


//button js
document.getElementById("lgnbtn").addEventListener("click", async function (e) {
    e.preventDefault();
    
    const username = document.getElementById("usernameInput").value;
    const password = document.getElementById("passwordinput").value;
  
    if (username.trim() !== '' && password.trim() !== '') {
        startLoader("logginn in...");
        const credentials = {
            username: username,
            password: password,
        };
  
        const url = "https://mele-be.onrender.com/auth/login";
  
        try {
            const response = await fetch(url, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(credentials),
            });
  
            if (!response.ok) {
                throw new Error("Error in fetching login details");
            }
  
            const data = await response.json();
            var title = data.message;
            var iconText;
  
            if (data.success) {
                iconText = "success";
            } else {
                iconText = "error";
            }
            
            stopLoader();
            
            Swal.fire({
                text: title,
                icon: iconText,
                confirmButtonText: "OK",
                customClass: {
                    title: "text-primary",
                    confirmButton: "btn btn-primary",
                },
                timer:3000
            })
            setTimeout(() => {
                window.location.href='../user.html'
            }, 3000);
        } catch (err) {
            console.error("!!Error while logging in...");
            alert("!!Error while logging in...");
        }
    }
});



  