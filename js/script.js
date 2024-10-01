function getOS() {
  var platform = window.navigator.platform;
  var macosPlatforms = ["macOS", "Macintosh", "MacIntel", "MacPPC", "Mac68K"];
  var windowsPlatforms = ["Win32", "Win64", "Windows", "WinCE"];
  // var userAgent = window.navigator.userAgent;
  // var iosPlatforms = ["iPhone", "iPad", "iPod"];
  var os = null;

  if (macosPlatforms.indexOf(platform) !== -1) {
    os = "Mac";
  } else if (windowsPlatforms.indexOf(platform) !== -1) {
    os = "Windows";
  } else {
    os = "Other";
  }

  // else if (iosPlatforms.indexOf(platform) !== -1) {
  //   os = "iOS";
  // } else if (/Android/.test(userAgent)) {
  //   os = "Android";
  // } else if (!os && /Linux/.test(platform)) {
  //   os = "Linux";
  // }

  return os;
}

function setDownloadLink() {
  var os = getOS();
  var downloadAnchor1 = document.getElementById("download-index-anchor-1");
  var downloadAnchor2 = document.getElementById("download-index-anchor-2");
  var downloadButton1 = document.getElementById("download-index-button-1");
  var downloadButton2 = document.getElementById("download-index-button-2");

  if (
    downloadAnchor1 &&
    downloadAnchor2 &&
    downloadButton1 &&
    downloadButton2
  ) {
    if (os === "Mac") {
      var downloadString =
        "https://github.com/nuttyartist/notes/releases/download/v2.3.1/Notes.2.3.1.dmg";
      downloadAnchor1.href = downloadString;
      downloadAnchor2.href = downloadString;
      downloadButton1.innerText = "Download for macOS";
      downloadButton2.innerText = "Download for macOS";

      document
        .querySelectorAll(".other-platforms-container")
        .forEach(function (element) {
          element.style.display = "flex";
        });
    } else if (os === "Windows") {
      var downloadString =
        "https://github.com/nuttyartist/notes/releases/download/v2.3.1/NotesSetup_2.3.1.exe";
      downloadAnchor1.href = downloadString;
      downloadAnchor2.href = downloadString;
      downloadButton1.innerText = "Download for Windows";
      downloadButton2.innerText = "Download for Windows";
      document
        .querySelectorAll(".other-platforms-container")
        .forEach(function (element) {
          element.style.display = "flex";
        });
    }
  }
}

setDownloadLink();

var videoContainer = document.getElementById("videoContainer");

if (videoContainer) {
  // document
  //   .getElementById("videoControlButton")
  //   .addEventListener("click", toggleFullScreen);
  document
    .getElementById("videoContainer")
    .addEventListener("click", toggleFullScreen);
}

function toggleFullScreen() {
  if (videoContainer && window.innerWidth < 600) {
    // Toggle controls
    if (videoContainer.hasAttribute("controls")) {
      videoContainer.removeAttribute("controls");
    } else {
      videoContainer.setAttribute("controls", "");
    }

    // Toggle fullscreen
    if (videoContainer.requestFullscreen) {
      videoContainer.requestFullscreen();
    } else if (videoContainer.mozRequestFullScreen) {
      // Firefox
      videoContainer.mozRequestFullScreen();
    } else if (videoContainer.webkitRequestFullscreen) {
      // Chrome, Safari and Opera
      videoContainer.webkitRequestFullscreen();
    } else if (videoContainer.msRequestFullscreen) {
      // IE/Edge
      videoContainer.msRequestFullscreen();
    }
  }
}

// document.addEventListener('DOMContentLoaded', function() {
//   const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
//   if (mediaQuery.matches) {
//     document.getElementById('theme-toggle').checked = true;
//     document.body.classList.add('dark-mode');
//   } else {
//     document.body.classList.add('light-mode');
//   }
//   // other initialization code
// });

// document.addEventListener("DOMContentLoaded", function () {
//   var mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");

//   function updateVideoSource() {
//     if (mediaQuery.matches) {
//       // document.getElementById("theme-toggle").checked = true;
//       // document.getElementById("theme-toggle-2").checked = true;
//       document.body.classList.remove("light-mode");
//       document.body.classList.add("dark-mode");
//       loadDarkThemeMedia();
//     } else {
//       // document.getElementById("theme-toggle").checked = false;
//       document.body.classList.remove("dark-mode");
//       document.body.classList.add("light-mode");
//       loadLightThemeMedia();
//     }

//     document.querySelectorAll(".videoExample").forEach(function (video) {
//       const theme = document.body.classList.contains("dark-mode")
//         ? "dark"
//         : "light";
//       const source =
//         theme === "dark"
//           ? video.getAttribute("data-dark-src")
//           : video.getAttribute("data-light-src");
//       if (video.src !== source) {
//         video.src = source;
//       }
//     });
//   }

//   // Update video source initially
//   updateVideoSource();

//   // Add listener for changes in color scheme
//   mediaQuery.addEventListener("change", updateVideoSource);
// });

// ["theme-toggle", "theme-toggle-2"].forEach(function (id) {
//   document.getElementById(id).addEventListener("change", function () {
//     const pictureElements = document.querySelectorAll("picture");
//     pictureElements.forEach((picture) => {
//       const sourceElements = picture.querySelectorAll("source");
//       sourceElements.forEach((source) => {
//         source.removeAttribute("srcset");
//       });
//     });

//     if (this.checked) {
//       document.body.classList.add("dark-mode");
//       document.body.classList.remove("light-mode");
//       loadDarkThemeMedia();
//     } else {
//       document.body.classList.add("light-mode");
//       document.body.classList.remove("dark-mode");
//       loadLightThemeMedia();
//     }
//   });
// });

function loadDarkThemeMedia() {
  document.querySelectorAll("[data-dark-src]").forEach((img) => {
    img.src = img.getAttribute("data-dark-src");
  });

  // const video = document.getElementById("videoContainer");
  // video.src = "images/plume-demo-dark.mp4";
}

function loadLightThemeMedia() {
  document.querySelectorAll("[data-light-src]").forEach((img) => {
    img.src = img.getAttribute("data-light-src");
  });

  // const video = document.getElementById("videoContainer");
  // video.src = "images/plume-demo-light.mp4";
}

document.addEventListener("fullscreenchange", function () {
  if (document.fullscreenElement) {
    // the page just entered full screen mode
  } else {
    // the page just exited full screen mode, remove controls
    videoContainer.removeAttribute("controls");
  }
});

if (document.getElementById("videoContainer")) {
  if (document.getElementById("waitlistForm")) {
    document
      .getElementById("waitlistForm")
      .addEventListener("submit", function (e) {
        e.preventDefault();

        document.getElementById("waitlistForm").style.display = "none";
        document.getElementById("loader").style.display = "block";

        var email = document.getElementById("waitlistEmail").value;
        var url =
          "https://script.google.com/macros/s/AKfycbwfvwTVQT01R9KSHm3CSlNB-iQXGQZTKuPbKd9H7jYysjJJaPWyT7igIWorH-R2pCBsOw/exec"; // Web app URL
        var messageContainer = document.getElementById(
          "messageAfterSubmissionContainer"
        );
        var messageElement = document.getElementById("messageAfterSubmission");

        fetch(url, {
          method: "POST",
          mode: "no-cors",
          cache: "no-cache",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
          body: "email=" + encodeURIComponent(email),
        })
          .then(function (response) {
            document.getElementById("loader").style.display = "none";
            messageElement.textContent =
              "Success! You're on the list. We'll notify you when Plume launches.";
            messageContainer.className = "success";
          })
          .catch(function (error) {
            document.getElementById("waitlistForm").style.display = "block";
            document.getElementById("loader").style.display = "none";
            console.log("Error: " + error);
            messageElement.textContent =
              "Oops! Something went wrong. Please try again.";
            messageContainer.className = "error";
          });
      });

    window.addEventListener("scroll", function () {
      const nav = document.querySelector("nav");
      if (window.scrollY > document.body.scrollHeight * 0.2) {
        nav.style.backgroundColor = "#000580";
      } else {
        nav.style.backgroundColor = "transparent";
      }
    });
  }
}

if (document.getElementById("detailsButton")) {
  document
    .getElementById("detailsButton")
    .addEventListener("click", function () {
      var chart = document.querySelector(".chart-column");
      var table = document.getElementById("detailsTable");
      var detailsButton = document.getElementById("detailsButton");
      var chartCaption = document.getElementById("chartCaption");
      var methodology = document.getElementById("methodology");
      var benchmarks = document.querySelectorAll(".benchmarks"); // Select all elements with the 'benchmarks' class

      if (chart.style.display !== "none") {
        chart.style.display = "none";
        table.style.display = "block";
        detailsButton.textContent = "Less details";
        chartCaption.style.display = "none";
        methodology.style.display = "block";
        benchmarks.forEach(function (benchmark) {
          benchmark.style.marginBottom = "0"; // Set margin-bottom to zero
        });
      } else {
        chart.style.display = "block";
        table.style.display = "none";
        detailsButton.textContent = "More details";
        chartCaption.style.display = "block";
        methodology.style.display = "none";
        benchmarks.forEach(function (benchmark) {
          benchmark.style.marginBottom = "100px"; // Reset margin-bottom
        });
      }
    });
}

// Get the toggle input
const toggleInput = document.getElementById("plan-toggle");
const buyButton = document.getElementById("pro-buy-button");

// Get the pricing elements
const monthlyPrices = document.querySelectorAll(".monthly-price");
const yearlyPrices = document.querySelectorAll(".yearly-price");

const monthlyPlanUrl =
  "https://buy.get-plume.com/buy/f7f0da6c-3222-4f01-bce3-7c873d82a7db?media=0&discount=0";
const yearlyPlanUrl =
  "https://buy.get-plume.com/buy/3b6180de-7bde-426f-86f7-1ac28572b187?media=0&discount=0";

function updateProBuyButtonUrl() {
  if (!toggleInput) return;

  if (toggleInput.checked) {
    buyButton.setAttribute("href", yearlyPlanUrl);
  } else {
    buyButton.setAttribute("href", monthlyPlanUrl);
  }
}

// Function to toggle pricing
// function togglePricing() {
//   if (!toggleInput) return;

//   if (toggleInput.checked) {
//     monthlyPrices.forEach((price) => (price.style.display = "none"));
//     yearlyPrices.forEach((price) => (price.style.display = "block"));
//   } else {
//     monthlyPrices.forEach((price) => (price.style.display = "block"));
//     yearlyPrices.forEach((price) => (price.style.display = "none"));
//   }
// }

// if (toggleInput) {
//   // Toggle pricing on page load
//   togglePricing();
//   updateProBuyButtonUrl();
//   // Add event listener to the toggle input
//   toggleInput.addEventListener("change", function () {
//     togglePricing();
//     updateProBuyButtonUrl();
//   });
// }

// const toggleInput2 = document.getElementById("plan-toggle-2");
// function togglePricing2() {
//   if (toggleInput2) return;

//   if (toggleInput2.checked) {
//     monthlyPrices.forEach((price) => (price.style.display = "none"));
//     yearlyPrices.forEach((price) => (price.style.display = "block"));
//   } else {
//     monthlyPrices.forEach((price) => (price.style.display = "block"));
//     yearlyPrices.forEach((price) => (price.style.display = "none"));
//   }
// }

// if (toggleInput2) {
//   togglePricing2();
//   toggleInput2.addEventListener("change", togglePricing2);
// }

// let counter = 2;

// document.querySelector(".minus-button").addEventListener("click", function () {
//   if (counter > 2) {
//     counter--;
//     document.querySelector(".counter").textContent = counter;
//   }
// });

// document.querySelector(".plus-button").addEventListener("click", function () {
//   counter++;
//   document.querySelector(".counter").textContent = counter;
// });

const commercialBuyButton = document.getElementById("commercial-buy-button");

function updateCommercialBuyButtonLink(seatCount) {
  const baseBuyLink =
    "https://buy.get-plume.com/buy/651023c9-6c31-4bce-9839-3ecd2aefd47f?media=0&discount=0";
  commercialBuyButton.href = `${baseBuyLink}&quantity=${seatCount}`;
}

function changeSeatCount(delta) {
  const input = document.getElementById("seat-count");

  let value = parseInt(input.value);
  if (isNaN(value)) value = 2;

  let newValue = value + delta;
  if (newValue < 2) {
    window.alert("At least 2 users are required for a Commercial license.");
    newValue = 2;
  }
  if (newValue > 10000) {
    window.alert(
      "For quantities over 10,000, please contact contact@get-plume.com."
    );
    newValue = 10000;
  }

  input.value = newValue;
  updateCommercialBuyButtonLink(newValue);
}

const hamburger = document.querySelector(".hamburger");
const navMenu = document.querySelector(".nav-menu");

hamburger.addEventListener("click", mobileMenu);

function mobileMenu() {
  hamburger.classList.toggle("active");
  navMenu.classList.toggle("active");
  if (navMenu.classList.contains("active")) {
    document.body.style.overflow = "hidden";
    navMenu.style.zIndex = "1000";
  } else {
    document.body.style.overflow = "";
    navMenu.style.zIndex = "-1";
  }
}

const navLink = document.querySelectorAll(".nav-link-mobile");

navLink.forEach((n) => n.addEventListener("click", closeMenu));

function closeMenu() {
  hamburger.classList.remove("active");
  navMenu.classList.remove("active");
  navMenu.style.zIndex = "-1";
}

document
  .getElementById("pro-buy-button")
  .addEventListener("click", function (e) {
    e.preventDefault(); // Prevent any default action
    alert(
      "We currently have issues with payment processing. We apologize for the inconvenience. Please check again in a few days."
    );
  });
