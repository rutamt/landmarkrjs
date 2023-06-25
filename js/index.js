var map = L.map("map").setView([0, 0], 2);
var marker;
var score = localStorage.getItem('score');
var rounds = localStorage.getItem('rounds');
let distance = parseFloat(localStorage.getItem('distance'));

const totalScoreElement = document.getElementById('total-score');
const totalScore = localStorage.getItem('score');
const statsElement = document.getElementById('stats');

var finalTextElement = document.getElementById('final-score-text');
var finalModal = document.getElementById('final-modal');
var resetButton = document.getElementById('reset-score-btn');
const submitButton = document.getElementById('submit-btn');
const lookingFor = document.getElementById('landmark-info');
const introModal = document.getElementById('intro-modal');

// // console.log("Rounds", rounds)
var roundScore = 1000 * rounds - 1000;
// // console.log("RS ", roundScore);
const guessAcuracy = (totalScore / roundScore) * 100;

//The List with all the data:
const landmarks = [
    ["The Kremlin", 55.7517, 37.6178, "The Kremlin is a historic fortified complex in Moscow, Russia.", "https://images.pexels.com/photos/16388618/pexels-photo-16388618.jpeg?auto=compress&cs=tinysrgb&h=650&w=940"],
    ["Great Sphinx of Giza", 29.9753, 31.1376, "The Great Sphinx of Giza is a limestone statue of a mythical creature with the head of a human and the body of a lion near the Giza Pyramids in Egypt.", "https://images.pexels.com/photos/16478623/pexels-photo-16478623.jpeg?auto=compress&cs=tinysrgb&h=650&w=940"],
    ["Hollywood Walk of Fame", 34.1014, -118.3412, "The Hollywood Walk of Fame is a sidewalk along Hollywood Boulevard and Vine Street in Hollywood, California, consisting of more than 2,690 five-pointed terrazzo and brass stars.", "https://images.pexels.com/photos/4700108/pexels-photo-4700108.jpeg?auto=compress&cs=tinysrgb&h=650&w=940"],
    ["Disneyland", 33.8121, -117.9189, "Disneyland is a world-famous theme park located in Anaheim, California.", "https://images.pexels.com/photos/3411135/pexels-photo-3411135.jpeg?auto=compress&cs=tinysrgb&h=650&w=940"],
    ["Times Square", 40.7589, -73.9851, "Times Square is a major commercial intersection and popular tourist destination in New York City.", "https://images.pexels.com/photos/802024/pexels-photo-802024.jpeg?auto=compress&cs=tinysrgb&h=650&w=940"],
    ["Red Square", 55.7539, 37.6208, "Red Square is a city square in Moscow, Russia, known for its historical and political significance.", "https://images.pexels.com/photos/92412/pexels-photo-92412.jpeg?auto=compress&cs=tinysrgb&h=650&w=940"],
    ["Mount Rushmore", 43.8791, -103.4591, "Mount Rushmore is a sculpture carved into the granite face of Mount Rushmore National Memorial in South Dakota, featuring the heads of four U.S. presidents.", "https://images.pexels.com/photos/34424/mount-rushmore-monument-landmark-scenic.jpg?auto=compress&cs=tinysrgb&h=650&w=940"],
    ["Cristo Redentor", -22.9519, -43.2105, "Cristo Redentor, also known as Christ the Redeemer, is an iconic Art Deco statue of Jesus Christ in Rio de Janeiro, Brazil.", "https://images.pexels.com/photos/1804177/pexels-photo-1804177.jpeg?auto=compress&cs=tinysrgb&h=650&w=940"],
    ["Sagrada Família", 41.4036, 2.1744, "Sagrada Família is a large unfinished Roman Catholic basilica in Barcelona, Spain, designed by architect Antoni Gaudí.", "https://images.pexels.com/photos/819764/pexels-photo-819764.jpeg?auto=compress&cs=tinysrgb&h=650&w=940"],
    ["Eiffel Tower", 48.8584, 2.2945, "The Eiffel Tower is a wrought-iron lattice tower located on the Champ de Mars in Paris, France.", "https://images.pexels.com/photos/699466/pexels-photo-699466.jpeg?auto=compress&cs=tinysrgb&h=650&w=940"],
    ["Taj Mahal", 27.1751, 78.0421, "The Taj Mahal is an ivory-white marble mausoleum on the right bank of the Yamuna river in Agra, India.", "https://images.pexels.com/photos/3881104/pexels-photo-3881104.jpeg?auto=compress&cs=tinysrgb&h=650&w=940"],
    ["Statue of Liberty", 40.6892, -74.0445, "The Statue of Liberty is a colossal neoclassical sculpture on Liberty Island in New York Harbor.", "https://images.pexels.com/photos/64271/queen-of-liberty-statue-of-liberty-new-york-liberty-statue-64271.jpeg?auto=compress&cs=tinysrgb&h=650&w=940"],
    ["Colosseum", 41.8902, 12.4922, "The Colosseum is an ancient amphitheater in Rome, Italy, known for its historical significance and grand architecture.", "https://images.pexels.com/photos/1797161/pexels-photo-1797161.jpeg?auto=compress&cs=tinysrgb&h=650&w=940"],
    ["Big Ben", 51.5007, -0.1246, "Big Ben is the nickname for the Great Bell of the clock at the north end of the Palace of Westminster in London, England.", "https://images.pexels.com/photos/77171/pexels-photo-77171.jpeg?auto=compress&cs=tinysrgb&h=650&w=940"],
    ["Golden Gate Bridge", 37.8199, -122.4783, "The Golden Gate Bridge is a suspension bridge spanning the Golden Gate, the one-mile-wide strait connecting San Francisco Bay and the Pacific Ocean.", "https://images.pexels.com/photos/208745/pexels-photo-208745.jpeg?auto=compress&cs=tinysrgb&h=650&w=940"],
    ["Sydney Opera House", -33.8568, 151.2153, "The Sydney Opera House is a multi-venue performing arts center in Sydney, Australia, famous for its unique architectural design.", "https://images.pexels.com/photos/1878293/pexels-photo-1878293.jpeg?auto=compress&cs=tinysrgb&h=650&w=940"],
    ["Machu Picchu", -13.1631, -72.5450, "Machu Picchu is an ancient Incan city situated on a mountain ridge in Peru.", "https://images.pexels.com/photos/2929906/pexels-photo-2929906.jpeg?auto=compress&cs=tinysrgb&h=650&w=940"],
    ["Acropolis of Athens", 37.9715, 23.7261, "The Acropolis of Athens is an ancient citadel located on a rocky outcrop above the city of Athens, Greece.", "https://images.pexels.com/photos/15238854/pexels-photo-15238854.jpeg?auto=compress&cs=tinysrgb&h=650&w=940"],
    ["Angkor Wat", 13.4125, 103.8660, "Angkor Wat is a massive temple complex in Cambodia and the largest religious monument in the world.", "https://images.pexels.com/photos/2416576/pexels-photo-2416576.jpeg?auto=compress&cs=tinysrgb&h=650&w=940"],
    ["Forbidden City", 39.9163, 116.3972, "The Forbidden City is a palace complex in central Beijing, China, known for its architectural grandeur and historical significance.", "https://images.pexels.com/photos/3587765/pexels-photo-3587765.jpeg?auto=compress&cs=tinysrgb&h=650&w=940"],
    ["Petra", 30.3285, 35.4444, "Petra is a historical and archaeological city in Jordan, famous for its rock-cut architecture and ancient tombs.", "https://images.pexels.com/photos/1631665/pexels-photo-1631665.jpeg?auto=compress&cs=tinysrgb&h=650&w=940"],
    ["Great Wall of China", 40.4319, 116.5704, "The Great Wall of China is a series of fortifications that stretches across northern China.", "https://images.pexels.com/photos/2412603/pexels-photo-2412603.jpeg?auto=compress&cs=tinysrgb&h=650&w=940"],
    ["Stonehenge", 51.1789, -1.8262, "Stonehenge is a prehistoric monument located in Wiltshire, England, known for its iconic stone circle.", "https://images.pexels.com/photos/1448136/pexels-photo-1448136.jpeg?auto=compress&cs=tinysrgb&h=650&w=940"],
    ["Christ the Redeemer", -22.9519, -43.2105, "Christ the Redeemer is a large Art Deco statue of Jesus Christ in Rio de Janeiro, Brazil.", "https://images.pexels.com/photos/2818895/pexels-photo-2818895.jpeg?auto=compress&cs=tinysrgb&h=650&w=940"],
    ["Louvre Museum", 48.8606, 2.3376, "The Louvre Museum is the world's largest art museum and a historic monument in Paris, France.", "https://images.pexels.com/photos/2363/france-landmark-lights-night.jpg?auto=compress&cs=tinysrgb&h=650&w=940"],
    ["Pisa Tower", 43.7229, 10.3966, "The Leaning Tower of Pisa is a freestanding bell tower in Pisa, Italy, famous for its unintended tilt.", "https://images.pexels.com/photos/1144271/pexels-photo-1144271.jpeg?auto=compress&cs=tinysrgb&h=650&w=940"],
    ["Brandenburg Gate", 52.5163, 13.3777, "The Brandenburg Gate is an 18th-century neoclassical monument in Berlin, Germany, and a symbol of German unity.", "https://images.pexels.com/photos/1963081/pexels-photo-1963081.jpeg?auto=compress&cs=tinysrgb&h=650&w=940"],
    ["Neuschwanstein Castle", 47.5576, 10.7498, "Neuschwanstein Castle is a 19th-century Romanesque Revival palace in Bavaria, Germany, known for its fairytale-like appearance.", "https://images.pexels.com/photos/187854/pexels-photo-187854.jpeg?auto=compress&cs=tinysrgb&h=650&w=940"],
    ["Alhambra", 37.1760, -3.5894, "The Alhambra is a palace and fortress complex located in Granada, Spain, renowned for its stunning Islamic architecture.", "https://images.pexels.com/photos/2431436/pexels-photo-2431436.jpeg?auto=compress&cs=tinysrgb&h=650&w=940"],
    ["Chichen Itza", 20.6843, -88.5678, "Chichen Itza is a pre-Columbian city built by the Maya civilization in Mexico, recognized as a UNESCO World Heritage Site.", "https://images.pexels.com/photos/3290068/pexels-photo-3290068.jpeg?auto=compress&cs=tinysrgb&h=650&w=940"],
    ["Blue Mosque", 41.0055, 28.9769, "The Blue Mosque, also known as the Sultan Ahmed Mosque, is a historic mosque in Istanbul, Turkey, distinguished by its blue tiles and grandeur.", "https://images.pexels.com/photos/2381048/pexels-photo-2381048.jpeg?auto=compress&cs=tinysrgb&h=650&w=940"],
    ["Empire State Building", 40.7484, -73.9857, "The Empire State Building is a famous skyscraper in New York City, known for its iconic Art Deco style and panoramic views from the observatories.", "https://images.pexels.com/photos/2404949/pexels-photo-2404949.jpeg?auto=compress&cs=tinysrgb&h=650&w=940"],
    ["Yellowstone National Park", 44.4280, -110.5885, "Yellowstone National Park is a vast national park primarily located in Wyoming, known for its geothermal features, wildlife, and natural beauty.", "https://images.pexels.com/photos/2416600/pexels-photo-2416600.jpeg?auto=compress&cs=tinysrgb&h=650&w=940"],
    ["Niagara Falls", 43.0792, -79.0758, "Niagara Falls is a world-famous group of waterfalls located on the border between the United States and Canada.", "https://images.pexels.com/photos/1374585/pexels-photo-1374585.jpeg?auto=compress&cs=tinysrgb&h=650&w=940"],
    ["Grand Canyon", 36.0566, -112.1251, "The Grand Canyon is a massive canyon carved by the Colorado River in Arizona, USA, renowned for its awe-inspiring natural beauty.", "https://images.pexels.com/photos/63553/pexels-photo-63553.jpeg?auto=compress&cs=tinysrgb&h=650&w=940"],
    ["Mount Everest", 27.9881, 86.9250, "Mount Everest is the highest peak in the world, located in the Mahalangur Himal sub-range of the Himalayas.", "https://images.pexels.com/photos/753772/pexels-photo-753772.jpeg?auto=compress&cs=tinysrgb&h=650&w=940"],
    ["Victoria Falls", -17.9244, 25.8567, "Victoria Falls is a breathtaking waterfall on the Zambezi River, located on the border of Zambia and Zimbabwe.", "https://images.pexels.com/photos/1637146/pexels-photo-1637146.jpeg?auto=compress&cs=tinysrgb&h=650&w=940"],
    ["Great Barrier Reef", -18.2871, 147.6992, "The Great Barrier Reef is the world's largest coral reef system, located off the coast of Queensland, Australia.", "https://images.pexels.com/photos/847393/pexels-photo-847393.jpeg?auto=compress&cs=tinysrgb&h=650&w=940"],
    ["Amazon Rainforest", -3.4653, -62.2159, "The Amazon Rainforest is the largest tropical rainforest in the world, spanning several South American countries.", "https://images.pexels.com/photos/2739664/pexels-photo-2739664.jpeg?auto=compress&cs=tinysrgb&h=650&w=940"],
    ["Everglades National Park", 25.2866, -80.8987, "Everglades National Park is a unique wetland ecosystem in Florida, USA, recognized as a UNESCO World Heritage Site.", "https://images.pexels.com/photos/11456326/pexels-photo-11456326.png?auto=compress&cs=tinysrgb&h=650&w=940"],
]
// Gets random element from the array
const getRandomElementFrom2DArray = (array) => {
    if (array.length === 0) {
        // Return a default value if the array is empty
        return 'No data available';
    }

    const randomRowIndex = Math.floor(Math.random() * array.length);
    const randomRow = array[randomRowIndex];

    return randomRow;
};

const lookingForElement = getRandomElementFrom2DArray(landmarks);

// Filling in the game statistics when page is loaded
document.addEventListener('DOMContentLoaded', function () {
    // Handling the intro modal
    if (score === 0 && rounds === 1) {
        introModal.style.display = 'block';
        resetButton.style.display = 'none';
        lookingFor.style.display = 'none';
        map.off('click');
    }
    // Call the function once the document has finished loading
    statsElement.innerHTML = `<pre>Rounds: ${rounds}\nAverage distance: ${Math.round((distance / rounds) * 100) / 100} Km\nAccuracy: ${Math.round(guessAcuracy * 100) / 100}%</pre>`;
    lookingFor.textContent = `Looking for: ${lookingForElement[0]}`;

    // console.log(lookingForElement);
    // console.log(lookingForElement[0]);

});

if (rounds === null || isNaN(rounds) || rounds === NaN) {
    stealthClearScore();
    rounds = 1;
} else {
    rounds = parseInt(rounds);
}

if (isNaN(distance)) {
    localStorage.setItem('distance', 0);
    distance = 0;
} else {
    distance = parseInt(distance);
}

function startGame() {
    introModal.style.display = 'none';
    resetButton.style.display = 'block';
    lookingFor.style.display = 'block';
    map.on("click", onMapClick);
}

// console.log("Changing totalScore");
totalScoreElement.textContent = `Total Score: ${totalScore} / ${roundScore}`;

if (score === null) {
    score = 0;
} else {
    score = parseInt(score);
}


// Update and save the score
function updateScore(newScore, newDistance) {
    var currentScore = parseInt(localStorage.getItem('score'));
    currentScore += newScore;
    localStorage.setItem('score', currentScore);

    var currentRounds = parseInt(localStorage.getItem('rounds'));

    var currentDistance = parseInt(localStorage.getItem('distance'));
    currentDistance += newDistance;
    localStorage.setItem('distance', currentDistance);
    // console.log(`CD: ${currentDistance}, td = ${distance}`);

    // console.log("Rounds from US", localStorage.getItem('rounds'))
    document.getElementById('total-score').textContent = 'Score: ' + currentScore + ' / ' + 1000 * currentRounds;
    localStorage.setItem('rounds', currentRounds + 1);

}


// Clear the score from localStorage
function clearScore() {

    finalModal.style.display = 'block';
    submitButton.style.display = 'none';
    resetButton.style.display = 'none';
    lookingFor.style.display = 'none';
    map.off('click');
    finalTextElement.innerHTML = `<pre>Rounds: ${rounds}\nAverage distance: ${Math.round((distance / rounds) * 100) / 100} Km\nAccuracy: ${Math.round(guessAcuracy * 100) / 100}%</pre>`;

    score = 0;
    rounds = 1;
    document.getElementById('total-score').textContent = 'Score: ' + score + ' / ' + 1000 * rounds;
    localStorage.setItem('score', score);
    localStorage.setItem('distance', score);

    localStorage.setItem('rounds', rounds);
}

// Clear the score from localStorage without any visual feedback. Works for the first time a user gets on
function stealthClearScore() {
    score = 0;
    rounds = 1;
    document.getElementById('total-score').textContent = 'Score: ' + score + ' / ' + 1000 * rounds;
    localStorage.setItem('score', score);
    localStorage.setItem('distance', score);
    localStorage.setItem('rounds', rounds);
}

function onMapClick(e) {
    if (marker) {
        map.removeLayer(marker);
    }

    marker = L.marker(e.latlng).addTo(map);
    $("#latitude").val(e.latlng.lat.toFixed(6));
    $("#longitude").val(e.latlng.lng.toFixed(6));
    $("#submit-btn").prop("disabled", false).show();
}

map.on("click", onMapClick);

L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}.png', {
    attribution:
        'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors',
    maxZoom: 18,
}).addTo(map);

function calculateScore() {
    var latitude = marker.getLatLng().lat.toFixed(6);
    var longitude = marker.getLatLng().lng.toFixed(6);
    var landmark_lat = lookingForElement[1];
    var landmark_lon = lookingForElement[2];

    const guess_lat_rad = latitude * (Math.PI / 180);
    const guess_lon_rad = longitude * (Math.PI / 180);
    const real_lat_rad = landmark_lat * (Math.PI / 180);
    const real_lon_rad = landmark_lon * (Math.PI / 180);

    // Haversine formula
    const dlon = real_lon_rad - guess_lon_rad;
    const dlat = real_lat_rad - guess_lat_rad;
    const a = Math.sin(dlat / 2) ** 2 + Math.cos(guess_lat_rad) * Math.cos(real_lat_rad) * Math.sin(dlon / 2) ** 2;
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = 6371 * c;  // Earth's radius in km

    // Calculate the score
    const max_distance = 3000;  // Maximum possible distance between two points
    const score = Math.round(1000 * (1 - distance / max_distance));
    const formattedScore = Math.max(score, 0);  // Ensure the score is not negative

    // Display the score in a modal
    const scoreModal = document.getElementById('score-modal');
    const scoreText = document.getElementById('score-text');
    scoreText.textContent = `Score: ${formattedScore} out of 1000`;

    const distanceText = document.getElementById('distance-from-point');
    const meterDistance = (Math.round((distance * 1000) * 100) / 100);
    const formattedDistance = (Math.round(distance * 100) / 100);

    distanceText.textContent = `${meterDistance >= 1000 ? `${(Math.round(distance * 100) / 100).toLocaleString("en-US")}KM (${(Math.round((distance * 0.621371) * 100) / 100).toLocaleString("en-US")}Mi)` : `${meterDistance.toLocaleString("en-US")}M (${(Math.round((meterDistance * 3.2808) * 100) / 100).toLocaleString("en-US")}ft)`}`;

    const congratsLine = document.getElementById('congrats-text');
    if (score === 1000) { congratsLine.textContent = `Perfect score! Can you do it again?` }
    else if (score >= 750) {
        congratsLine.textContent = `Great job! Only ${1000 - score} point${1000 - score == 1 ? "" : "s"} from perfection!`
    }

    // Putting the summary and image into the score modal
    const summaryText = document.getElementById('summary-text');
    summaryText.textContent = lookingForElement[3];
    const landmarkPhoto = document.getElementById('landmark-photo');
    landmarkPhoto.src = lookingForElement[4];

    // Updating the localstorage score and showing the score modal
    updateScore(parseInt(formattedScore), formattedDistance);
    scoreModal.style.display = 'block';

    var greenIcon = new L.Icon({
        iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png',
        shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
        iconSize: [25, 41],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34],
        shadowSize: [41, 41]
    });
    // Create a marker at the landmark's location with a different color
    const landmarkMarker = L.marker([landmark_lat, landmark_lon], { icon: greenIcon }).addTo(map);

    // Draw a dotted line between the two markers
    const line = L.polyline([[latitude, longitude], [landmark_lat, landmark_lon]], {
        dashArray: '5, 5',
        color: 'green'
    }).addTo(map);

    // Disable further marker placement
    map.off('click');
    marker.off('drag');

    // Hide the submit button
    const submitButton = document.getElementById('submit-btn');
    submitButton.style.display = 'none';
}


function showModal() {
    document.getElementById('stats-modal').classList.add('active');
}

function hideModal() {
    document.getElementById('stats-modal').classList.remove('active');
}

var img = document.getElementById('landmark-photo');

img.addEventListener('load', function () {
    var maxWidth = 600;
    var maxHeight = 500;

    if (img.naturalWidth > maxWidth || img.naturalHeight > maxHeight) {
        var aspectRatio = img.naturalWidth / img.naturalHeight;
        var width = img.naturalWidth;
        var height = img.naturalHeight;

        if (aspectRatio > 1) {
            // Landscape image
            if (img.naturalWidth > maxWidth) {
                width = maxWidth;
                height = maxWidth / aspectRatio;
            }
        } else {
            // Portrait image
            if (img.naturalHeight > maxHeight) {
                height = maxHeight;
                width = maxHeight * aspectRatio;
            }
        }

        img.width = width;
        img.height = height;
    }
});

// Get the modal element and the close button
const modal = document.getElementById('score-modal');
function hideScoreModal() {
    document.getElementById('score-modal').style = "none";
    // console.log("Showing submit-btn")
    const submitButton = document.getElementById("submit-btn");
    submitButton.innerText = "Next Round";
    submitButton.onclick = function () {
        location.reload();
    };
    submitButton.style.display = "block";
}


