// Define the bounds of the map
const southWest = L.latLng(-90, -180);
const northEast = L.latLng(90, 180);
const bounds = L.latLngBounds(southWest, northEast);

// Create the Leaflet map with maxBounds option
const map = L.map('map', {
    center: [35, 20], // Set the initial center of the map
    zoom: 2, // Set the initial zoom level of the map
    maxBounds: bounds, // Set the maxBounds option
    maxBoundsViscosity: 1.0, // Adjust the maxBoundsViscosity if needed
    minZoom: 3, // Set the limit for zooming out
});
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
    ["Serengeti National Park", -2.3333, 34.8333, "Serengeti National Park is a famous wildlife reserve in Tanzania", "https://images.pexels.com/photos/5574041/pexels-photo-5574041.jpeg?auto=compress&cs=tinysrgb&h=650&w=940"],
    ["Antelope Canyon", 36.8626, -111.3749, "Antelope Canyon is a stunning slot canyon located in Arizona", "https://images.pexels.com/photos/33041/antelope-canyon-lower-canyon-arizona.jpg?auto=compress&cs=tinysrgb&h=650&w=940"],
    ["Matterhorn", 45.9763, 7.6586, "The Matterhorn is a famous mountain peak in the Swiss Alps.", "https://images.pexels.com/photos/267104/pexels-photo-267104.jpeg?auto=compress&cs=tinysrgb&h=650&w=940"],
    ["Parthenon", 37.9715, 23.7266, "The Parthenon is an ancient Greek temple located on the Acropolis of Athens", "https://images.pexels.com/photos/164336/pexels-photo-164336.jpeg?auto=compress&cs=tinysrgb&h=650&w=940"],
    ["Milan Cathedral", 45.4642, 9.1900, "Milan Cathedral is a magnificent Gothic cathedral located in Milan", "https://images.pexels.com/photos/16517892/pexels-photo-16517892.jpeg?auto=compress&cs=tinysrgb&h=650&w=940"],
    ["Ch\u00e2teau de Versailles", 48.8049, 2.1204, "The Palace of Versailles", "https://images.pexels.com/photos/13692259/pexels-photo-13692259.jpeg?auto=compress&cs=tinysrgb&h=650&w=940"],
    ["White House", 38.8977, -77.0365, "The White House is the official residence and workplace of the President of the United States.", "https://images.pexels.com/photos/129112/pexels-photo-129112.jpeg?auto=compress&cs=tinysrgb&h=650&w=940"],
    ["Kiyomizu-dera", 34.9948, 135.7850, "Kiyomizu-dera is a historic Buddhist temple in Kyoto", "https://images.pexels.com/photos/16469212/pexels-photo-16469212.jpeg?auto=compress&cs=tinysrgb&h=650&w=940"],
    ["Prague Castle", 50.0909, 14.4005, "Prague Castle is a historic castle complex in Prague", "https://images.pexels.com/photos/3977192/pexels-photo-3977192.jpeg?auto=compress&cs=tinysrgb&h=650&w=940"],
    ["Saint Basil's Cathedral", 55.7525, 37.6231, "Saint Basil's Cathedral is a famous Orthodox church located in Moscow", "https://images.pexels.com/photos/5273637/pexels-photo-5273637.jpeg?auto=compress&cs=tinysrgb&h=650&w=940"],
    ["Saint Peter's Basilica", 41.9022, 12.4539, "Saint Peter's Basilica is a renowned Catholic church in Vatican City.", "https://images.pexels.com/photos/5273637/pexels-photo-5273637.jpeg?auto=compress&cs=tinysrgb&h=650&w=940"],
    ["La Sagrada Fam\u00edlia", 41.4036, 2.1744, "La Sagrada Família is an iconic basilica designed by Antoni Gaudí in Barcelona", "https://images.pexels.com/photos/13081002/pexels-photo-13081002.jpeg?auto=compress&cs=tinysrgb&h=650&w=940"],
    ["Pyramid of the Sun", 19.6925, -98.8447, "The Pyramid of the Sun is an ancient Mesoamerican pyramid located in Teotihuacan", "https://images.pexels.com/photos/11212909/pexels-photo-11212909.jpeg?auto=compress&cs=tinysrgb&h=650&w=940"],
    ["Mount Fuji", 35.3606, 138.7274, "Mount Fuji is the highest mountain in Japan and an iconic symbol of the country.", "https://images.pexels.com/photos/3408353/pexels-photo-3408353.jpeg?auto=compress&cs=tinysrgb&h=650&w=940"],
    ["Mount Kilimanjaro", -3.0674, 37.3556, "Mount Kilimanjaro is the highest mountain in Africa and a popular destination for climbers.", "https://images.pexels.com/photos/8427984/pexels-photo-8427984.jpeg?auto=compress&cs=tinysrgb&h=650&w=940"],
    ["Burj Khalifa", 25.1972, 55.2744, "Burj Khalifa is the tallest building in the world", "https://images.pexels.com/photos/162031/dubai-tower-arab-khalifa-162031.jpeg?auto=compress&cs=tinysrgb&h=650&w=940"],
    ["Sydney Harbour Bridge", -33.8523, 151.2108, "Sydney Harbour Bridge is an iconic bridge spanning Sydney Harbour in Australia.", "https://images.pexels.com/photos/635632/pexels-photo-635632.jpeg?auto=compress&cs=tinysrgb&h=650&w=940"],
    ["Pompeii", 40.7489, 14.4989, "Pompeii is an ancient Roman city buried by the eruption of Mount Vesuvius in 79 AD.", "https://images.pexels.com/photos/8912460/pexels-photo-8912460.jpeg?auto=compress&cs=tinysrgb&h=650&w=940"],
    ["Buckingham Palace", 51.5014, -0.1419, "Buckingham Palace is the official residence of the British monarch in London", "https://images.pexels.com/photos/1560102/pexels-photo-1560102.jpeg?auto=compress&cs=tinysrgb&h=650&w=940"],
    ["Tower Bridge", 51.5055, -0.0754, "Tower Bridge is a famous landmark and a combined bascule and suspension bridge in London", "https://images.pexels.com/photos/726484/pexels-photo-726484.jpeg?auto=compress&cs=tinysrgb&h=650&w=940"],
    ["Golden Temple", 31.6204, 74.8765, "The Golden Temple", "https://images.pexels.com/photos/574313/pexels-photo-574313.jpeg?auto=compress&cs=tinysrgb&h=650&w=940"],
    ["Redwood National and State Parks", 41.2132, -124.0046, "Redwood National and State Parks are a collection of protected forests in California", "https://images.pexels.com/photos/1784577/pexels-photo-1784577.jpeg?auto=compress&cs=tinysrgb&h=650&w=940"],
    ["Uluru", -25.3444, 131.0369, "Uluru", "https://images.pexels.com/photos/6610368/pexels-photo-6610368.jpeg?auto=compress&cs=tinysrgb&h=650&w=940"],
    ["Kilimanjaro National Park", -3.0757, 37.3530, "Kilimanjaro National Park is a protected area in Tanzania encompassing Mount Kilimanjaro", "https://images.pexels.com/photos/417074/pexels-photo-417074.jpeg?auto=compress&cs=tinysrgb&h=650&w=940"],
    ["Yosemite Valley", 37.7427, -119.5734, "Yosemite Valley is a picturesque glacial valley within Yosemite National Park", "https://images.pexels.com/photos/1571108/pexels-photo-1571108.jpeg?auto=compress&cs=tinysrgb&h=650&w=940"],
    ["Plaza de Espa\u00f1a", 37.3772, -5.9869, "Plaza de España is a grand square in Seville", "https://images.pexels.com/photos/16487643/pexels-photo-16487643.jpeg?auto=compress&cs=tinysrgb&h=650&w=940"],
    ["Fushimi Inari Taisha", 34.9671, 135.7727, "Fushimi Inari Taisha is a Shinto shrine famous for its thousands of vermilion torii gates in Kyoto", "https://images.pexels.com/photos/3995905/pexels-photo-3995905.jpeg?auto=compress&cs=tinysrgb&h=650&w=940"],
    ["Potala Palace", 29.6550, 91.1175, "Potala Palace is a magnificent palace complex in Lhasa", "https://images.pexels.com/photos/165169/pexels-photo-165169.jpeg?auto=compress&cs=tinysrgb&h=650&w=940"],
    ["Lake Baikal", 53.5190, 107.5753, "Lake Baikal is the deepest and oldest freshwater lake in the world", "https://images.pexels.com/photos/8985166/pexels-photo-8985166.jpeg?auto=compress&cs=tinysrgb&h=650&w=940"],
    ["Champs-\u00c9lys\u00e9es", 48.8698, 2.3075, "Champs-Élysées is a famous avenue in Paris", "https://images.pexels.com/photos/17152635/pexels-photo-17152635.jpeg?auto=compress&cs=tinysrgb&h=650&w=940"],
    ["Piazza San Marco", 45.4338, 12.3378, "Piazza San Marco", "https://images.pexels.com/photos/847366/pexels-photo-847366.jpeg?auto=compress&cs=tinysrgb&h=650&w=940"],
    ["Museum of Modern Art", 40.7614, -73.9776, "The Museum of Modern Art (MoMA) is a renowned art museum located in New York City", "https://images.pexels.com/photos/10612538/pexels-photo-10612538.jpeg?auto=compress&cs=tinysrgb&h=650&w=940"],
    ["Golden Pavilion", 35.0395, 135.7290, "The Golden Pavilion", "https://images.pexels.com/photos/16454565/pexels-photo-16454565.jpeg?auto=compress&cs=tinysrgb&h=650&w=940"],
    ["Trevi Fountain", 41.9009, 12.4833, "The Trevi Fountain is a famous Baroque fountain in Rome", "https://images.pexels.com/photos/2031967/pexels-photo-2031967.jpeg?auto=compress&cs=tinysrgb&h=650&w=940"],
    ["Charles Bridge", 50.0865, 14.4119, "Charles Bridge is a historic bridge that crosses the Vltava River in Prague", "https://images.pexels.com/photos/442583/pexels-photo-442583.jpeg?auto=compress&cs=tinysrgb&h=650&w=940"],
    ["Hagia Sophia", 41.0086, 28.9802, "Hagia Sophia is a former Byzantine cathedral and Ottoman mosque", "https://images.pexels.com/photos/16491575/pexels-photo-16491575.jpeg?auto=compress&cs=tinysrgb&h=650&w=940"],
    ["Moai Statues", -27.1212, -109.3664, "The Moai Statues are monolithic human figures carved by the Rapa Nui people on Easter Island", "https://images.pexels.com/photos/2819082/pexels-photo-2819082.jpeg?auto=compress&cs=tinysrgb&h=650&w=940"],
    ["Pamukkale", 37.9215, 29.1187, "Pamukkale is a natural site in Turkey featuring terraces of mineral-rich thermal waters cascading down white travertine terraces.", "https://images.pexels.com/photos/10212470/pexels-photo-10212470.jpeg?auto=compress&cs=tinysrgb&h=650&w=940"],
    ["Namib Desert", -24.7287, 15.2773, "The Namib Desert is a coastal desert in southern Africa known for its vast sand dunes and stunning landscapes.", "https://images.pexels.com/photos/3714898/pexels-photo-3714898.jpeg?auto=compress&cs=tinysrgb&h=650&w=940"],
    ["Antarctica", -82.8628, 135.0000, "Antarctica is Earth's southernmost continent", "https://images.pexels.com/photos/48178/mountains-ice-bergs-antarctica-berg-48178.jpeg?auto=compress&cs=tinysrgb&h=650&w=940"],
    ["Mount Cook", -43.7340, 170.0961, "Mount Cook", "https://images.pexels.com/photos/12638483/pexels-photo-12638483.jpeg?auto=compress&cs=tinysrgb&h=650&w=940"],
    ["Great Blue Hole", 17.3187, -87.5352, "The Great Blue Hole is a giant underwater sinkhole off the coast of Belize", "https://images.pexels.com/photos/968299/pexels-photo-968299.jpeg?auto=compress&cs=tinysrgb&h=650&w=940"],
    ["Yellowstone National Park", 44.4279, -110.5885, "Yellowstone National Park is a vast wilderness area in the United States", "https://images.pexels.com/photos/2416600/pexels-photo-2416600.jpeg?auto=compress&cs=tinysrgb&h=650&w=940"],
    ["Tikal", 17.2220, -89.6237, "Tikal is an ancient Mayan city located in the rainforests of Guatemala", "https://images.pexels.com/photos/14843659/pexels-photo-14843659.jpeg?auto=compress&cs=tinysrgb&h=650&w=940"],
    ["Parc G\u00fcell", 41.4145, 2.1527, "Parc Güell is a public park in Barcelona", "https://images.pexels.com/photos/11816123/pexels-photo-11816123.jpeg?auto=compress&cs=tinysrgb&h=650&w=940"],
    ["Bora Bora", -16.5004, -151.7415, "Bora Bora is a tropical paradise and popular tourist destination in French Polynesia", "https://images.pexels.com/photos/1188473/pexels-photo-1188473.jpeg?auto=compress&cs=tinysrgb&h=650&w=940"],
    ["The Louvre", 48.8606, 2.3376, "The Louvre is the world's largest art museum and a historic monument in Paris", "https://images.pexels.com/photos/6644765/pexels-photo-6644765.jpeg?auto=compress&cs=tinysrgb&h=650&w=940"],
    ["Royal Palace of Madrid", 40.4170, -3.7144, "The Royal Palace of Madrid is the official residence of the Spanish royal family and a major cultural site in Madrid", "https://images.pexels.com/photos/1547738/pexels-photo-1547738.jpeg?auto=compress&cs=tinysrgb&h=650&w=940"],
    ["Tower of London", 51.5081, -0.0759, "The Tower of London is a historic castle located on the River Thames in London", "https://images.pexels.com/photos/248193/pexels-photo-248193.jpeg?auto=compress&cs=tinysrgb&h=650&w=940"],
    ["Cappadocia", 38.6431, 34.8283, "Cappadocia is a unique region in Turkey characterized by its surreal rock formations", "https://images.pexels.com/photos/3889704/pexels-photo-3889704.jpeg?auto=compress&cs=tinysrgb&h=650&w=940"],
    ["Victoria Falls", -17.9244, 25.8567, "Victoria Falls is a stunning waterfall on the Zambezi River", "https://images.pexels.com/photos/1637146/pexels-photo-1637146.jpeg?auto=compress&cs=tinysrgb&h=650&w=940"],
    ["Mont Saint-Michel", 48.6361, -1.5113, "Mont Saint-Michel is a rocky island commune in Normandy", "https://images.pexels.com/photos/8910668/pexels-photo-8910668.jpeg?auto=compress&cs=tinysrgb&h=650&w=940"],
    ["Westminster Abbey", 51.4994, -0.1276, "Westminster Abbey is a historic Gothic abbey in London", "https://images.pexels.com/photos/162001/pexels-photo-162001.jpeg?auto=compress&cs=tinysrgb&h=650&w=940"],
    ["Alcatraz Island", 37.8267, -122.4233, "Alcatraz Island is a former high-security federal prison located in San Francisco Bay", "https://images.pexels.com/photos/2913776/pexels-photo-2913776.jpeg?auto=compress&cs=tinysrgb&h=650&w=940"],
    ["The Shard", 51.5045, -0.0865, "The Shard is a skyscraper and one of the tallest buildings in Europe", "https://images.pexels.com/photos/940309/pexels-photo-940309.jpeg?auto=compress&cs=tinysrgb&h=650&w=940"],
    ["The Acropolis", 37.9715, 23.7266, "The Acropolis is an ancient citadel featuring several historic buildings", "https://images.pexels.com/photos/3264723/pexels-photo-3264723.jpeg?auto=compress&cs=tinysrgb&h=650&w=940"],
    ["Giant's Causeway", 55.2408, -6.5115, "Giant's Causeway is a natural wonder in Northern Ireland consisting of hexagonal basalt columns formed by volcanic activity.", "https://images.pexels.com/photos/13570767/pexels-photo-13570767.jpeg?auto=compress&cs=tinysrgb&h=650&w=940"],
    ["Grand Palace", 13.7510, 100.4926, "The Grand Palace is a magnificent palace complex in Bangkok", "https://images.pexels.com/photos/5825366/pexels-photo-5825366.jpeg?auto=compress&cs=tinysrgb&h=650&w=940"],

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
    const clickX = e.originalEvent.clientX;
    const clickY = e.originalEvent.clientY;

    const submitButton = document.querySelector('#submit-btn');
    const buttonRect = submitButton.getBoundingClientRect();

    const buttonX = buttonRect.left + buttonRect.width / 2;
    const buttonY = buttonRect.top + buttonRect.height / 2;

    const distance = Math.sqrt(
        Math.pow(clickX - buttonX, 2) +
        Math.pow(clickY - buttonY, 2)
    );

    const thresholdDistance = 75; // Adjust this value as needed

    if (distance > thresholdDistance) {
        if (marker) {
            map.removeLayer(marker);
        }

        marker = L.marker(e.latlng).addTo(map);
        $("#latitude").val(e.latlng.lat.toFixed(6));
        $("#longitude").val(e.latlng.lng.toFixed(6));
        $("#submit-btn").prop("disabled", false).show();
    }
}


map.on("click", onMapClick);

L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
    subdomains: 'abcd',
    maxZoom: 20
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

    // Change the behavior when the marker is clicked
    landmarkMarker.on('click', function () {
        scoreModal.style.display = 'block';
        submitButton.style.display = 'none';
    });

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
