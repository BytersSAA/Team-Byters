// Initialize station parameters with ideal values for fuel storage
let oxygenLevel = 20;       // in percentage
let temperature = -30;      // ideal temperature for fuel storage in °C
let humidity = 10;          // ideal humidity level in percentage
let pressure = 200;         // ideal pressure in hPa (2 bar)
let fuelLevel = 0;          // in percentage
let docked = false;         // docking status

// Function to update the display for station parameters
function updateStationDisplay() {
    document.getElementById("oxygen-level").innerText = oxygenLevel;
    document.getElementById("temperature").innerText = temperature;
    document.getElementById("humidity").innerText = humidity;
    document.getElementById("pressure").innerText = pressure;
    document.getElementById("fuel-level").innerText = fuelLevel;
    document.getElementById("dock-status").innerText = docked ? "Docked" : "Undocked";
    document.getElementById("refuel-button").disabled = !docked; // Enable refuel only when docked
}

// Function to dock the rocket
function dockRocket() {
    if (!docked) {
        docked = true;
        alert("Rocket has been docked!");
        updateStationDisplay();
    } else {
        alert("Rocket is already docked!");
    }
}

// Function to undock the rocket
function undockRocket() {
    if (docked) {
        docked = false;
        alert("Rocket has been undocked!");
        updateStationDisplay();
    } else {
        alert("Rocket is already undocked!");
    }
}

// Function to refuel the rocket
function refuelRocket() {
    if (docked) {
        if (fuelLevel < 100) {
            // Increase fuel level by a random amount (1-10)
            const fuelIncrease = Math.floor(Math.random() * 10) + 1;
            fuelLevel += fuelIncrease;

            // Ensure fuel level does not exceed 100
            if (fuelLevel > 100) {
                fuelLevel = 100;
            }

            updateStationDisplay();
            alert(`Rocket refueled by ${fuelIncrease}%. Current fuel level: ${fuelLevel}%`);
        } else {
            alert("Rocket is already fully fueled!");
        }
    } else {
        alert("Rocket must be docked to refuel!");
    }
}

// Function to get the real-time location of the ISS
async function fetchIssLocation() {
    try {
        const response = await fetch("http://api.open-notify.org/iss-now.json");
        const data = await response.json();
        const { latitude, longitude } = data.iss_position;

        document.getElementById("latitude").innerText = latitude;
        document.getElementById("longitude").innerText = longitude;
    } catch (error) {
        console.error("Error fetching ISS location:", error);
    }
}

// Set interval to fetch location every 5 seconds
setInterval(fetchIssLocation, 5000);

// Initial fetch of ISS location
fetchIssLocation();

// Add event listeners to the buttons
document.getElementById("dock-button").addEventListener("click", dockRocket);
document.getElementById("undock-button").addEventListener("click", undockRocket);
document.getElementById("refuel-button").addEventListener("click", refuelRocket);

// Display initial values
updateStationDisplay();