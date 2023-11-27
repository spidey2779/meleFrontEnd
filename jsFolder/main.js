 //loader
  // Function to start the loader animation
   function startLoader(loaderText="loading...") {
    const loader = document.querySelector('.circle-container');
    loader.style.display = 'flex';
    const backdrop = document.querySelector('.backdrop');
    backdrop.style.display = 'block'; // Show backdrop
    document.getElementById('loadingText').textContent = loaderText;
    // Disable scrolling
    document.body.style.overflow = 'hidden';
  }
  // Function to stop the loader animation
    function stopLoader() {
    const loader = document.querySelector('.circle-container');
    loader.style.display = 'none';
    const backdrop = document.querySelector('.backdrop');
    backdrop.style.display = 'none'; // Hide backdrop

    // Enable scrolling
    document.body.style.overflow = 'auto';
  }
