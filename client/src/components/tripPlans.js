const tripPlans = [
    {
      title: "Explore the Wonders of Bali",
      date: "20.09.2024",
      color: "bg-gradient-to-br from-green-400 to-green-600",
      description: "Enjoy the serene beaches and vibrant culture of Bali. Visit Ubud, Tanah Lot, and relax in beautiful resorts.",
      duration: "7 days, 6 nights",
      itinerary: [
        { day: 1, activities: ["Arrival in Denpasar", "Transfer to Ubud", "Welcome dinner at a traditional Balinese restaurant"], icon: "Plane" },
        { day: 2, activities: ["Morning yoga session", "Visit Ubud Monkey Forest", "Afternoon at Tegalalang Rice Terraces"], icon: "Sun" },
        { day: 3, activities: ["Sunrise hike at Mount Batur", "Relax at hot springs", "Visit coffee plantation"], icon: "Mountain" },
        { day: 4, activities: ["Transfer to Seminyak", "Beach time", "Sunset at Tanah Lot Temple"], icon: "Umbrella" },
        { day: 5, activities: ["Surfing lesson", "Spa treatment", "Dinner at beachfront restaurant"], icon: "Wave" },
        { day: 6, activities: ["Day trip to Nusa Penida", "Snorkeling", "Visit Kelingking Beach"], icon: "Camera" },
        { day: 7, activities: ["Morning yoga", "Souvenir shopping", "Departure"], icon: "Plane" }
      ],
      bestSpots: [
        "Ubud Monkey Forest",
        "Tegalalang Rice Terraces",
        "Mount Batur",
        "Tanah Lot Temple",
        "Seminyak Beach",
        "Nusa Penida Island"
      ],
      expenses: {
        flight: 800,
        accommodation: 600,
        activities: 400,
        food: 300,
        transportation: 200,
        misc: 100
      },
      additionalInfo: [
        "Visa: Free 30-day visa on arrival for many nationalities",
        "Vaccinations: Routine vaccines, consider Hepatitis A and Typhoid",
        "Currency: Indonesian Rupiah (IDR)",
        "Language: Bahasa Indonesia (English widely spoken in tourist areas)",
        "Climate: Tropical, warm year-round with a dry season (April to October)"
      ]
    },
    {
      title: "European Adventure: 5 Countries in 10 Days",
      date: "10.10.2024",
      color: "bg-gradient-to-br from-blue-400 to-blue-600",
      description: "Experience the rich history and culture of Europe as you visit France, Italy, Spain, Germany, and the Netherlands.",
      duration: "10 days, 9 nights",
      itinerary: [
        { day: 1, activities: ["Arrival in Paris", "Visit Eiffel Tower", "Seine River cruise"], icon: "Plane" },
        { day: 2, activities: ["Louvre Museum", "Notre-Dame Cathedral", "Transfer to Rome"], icon: "Train" },
        { day: 3, activities: ["Colosseum tour", "Roman Forum", "Trevi Fountain"], icon: "Landmark" },
        { day: 4, activities: ["Vatican City", "Sistine Chapel", "Transfer to Barcelona"], icon: "Church" },
        { day: 5, activities: ["Sagrada Familia", "Park Güell", "Las Ramblas"], icon: "Sun" },
        { day: 6, activities: ["Transfer to Munich", "Marienplatz", "Hofbräuhaus"], icon: "Train" },
        { day: 7, activities: ["Neuschwanstein Castle day trip", "Munich beer garden experience"], icon: "Castle" },
        { day: 8, activities: ["Transfer to Amsterdam", "Canal tour", "Anne Frank House"], icon: "Train" },
        { day: 9, activities: ["Rijksmuseum", "Van Gogh Museum", "Farewell dinner"], icon: "Palette" },
        { day: 10, activities: ["Morning at Keukenhof Gardens (seasonal)", "Departure"], icon: "Plane" }
      ],
      bestSpots: [
        "Eiffel Tower, Paris",
        "Colosseum, Rome",
        "Sagrada Familia, Barcelona",
        "Neuschwanstein Castle, Germany",
        "Anne Frank House, Amsterdam"
      ],
      expenses: {
        flight: 1200,
        accommodation: 1000,
        activities: 600,
        food: 500,
        transportation: 400,
        misc: 200
      },
      additionalInfo: [
        "Visa: Schengen visa required for some nationalities",
        "Vaccinations: Routine vaccines",
        "Currency: Euro (EUR) in most countries",
        "Languages: Various, English widely spoken in tourist areas",
        "Climate: Varied, check seasonal weather for each destination"
      ]
    },
    {
      title: "Experience the Northern Lights in Norway",
      date: "15.11.2024",
      color: "bg-gradient-to-br from-purple-400 to-purple-600",
      description: "Witness the breathtaking aurora borealis in Tromsø, enjoy winter activities and explore Norwegian fjords.",
      duration: "6 days, 5 nights",
      itinerary: [
        { day: 1, activities: ["Arrival in Tromsø", "City tour", "Northern Lights seminar"], icon: "Plane" },
        { day: 2, activities: ["Dog sledding experience", "Evening Northern Lights chase"], icon: "Moon" },
        { day: 3, activities: ["Fjord cruise", "Visit to Sami camp", "Another chance for Northern Lights"], icon: "Ship" },
        { day: 4, activities: ["Snowmobiling adventure", "Ice fishing", "Aurora photography workshop"], icon: "Camera" },
        { day: 5, activities: ["Visit Tromsø Arctic-Alpine Botanic Garden", "Cable car to Storsteinen mountain", "Final Northern Lights chase"], icon: "Mountain" },
        { day: 6, activities: ["Morning at Polaria Arctic experience center", "Departure"], icon: "Plane" }
      ],
      bestSpots: [
        "Tromsø city center",
        "Lyngen Alps",
        "Sami camp",
        "Storsteinen mountain",
        "Norwegian fjords"
      ],
      expenses: {
        flight: 1000,
        accommodation: 800,
        activities: 1000,
        food: 400,
        transportation: 300,
        misc: 200
      },
      additionalInfo: [
        "Visa: Not required for many nationalities (Schengen area)",
        "Vaccinations: Routine vaccines",
        "Currency: Norwegian Krone (NOK)",
        "Language: Norwegian (English widely spoken)",
        "Climate: Cold winter, pack warm clothes"
      ]
    },
    {
      title: "Safari Adventure in Kenya",
      date: "05.12.2024",
      color: "bg-gradient-to-br from-yellow-400 to-yellow-600",
      description: "Embark on a thrilling safari adventure in Maasai Mara and experience the wildlife up close.",
      duration: "8 days, 7 nights",
      itinerary: [
        { day: 1, activities: ["Arrival in Nairobi", "Visit Giraffe Centre", "Welcome dinner"], icon: "Plane" },
        { day: 2, activities: ["Flight to Maasai Mara", "Afternoon game drive", "Sunset at the savannah"], icon: "Car" },
        { day: 3, activities: ["Full day game drive", "Big Five animal spotting", "Sundowner drinks"], icon: "Camera" },
        { day: 4, activities: ["Hot air balloon safari", "Visit Maasai village", "Evening game drive"], icon: "Wind" },
        { day: 5, activities: ["Transfer to Amboseli National Park", "Afternoon game drive with Kilimanjaro views"], icon: "Mountain" },
        { day: 6, activities: ["Full day in Amboseli", "Elephant herds viewing", "Bush dinner"], icon: "Utensils" },
        { day: 7, activities: ["Morning game drive", "Transfer back to Nairobi", "Farewell dinner at Carnivore Restaurant"], icon: "Car" },
        { day: 8, activities: ["Visit Nairobi National Park", "Departure"], icon: "Plane" }
      ],
      bestSpots: [
        "Maasai Mara National Reserve",
        "Amboseli National Park",
        "Nairobi National Park",
        "Giraffe Centre, Nairobi",
        "Traditional Maasai village"
      ],
      expenses: {
        flight: 1200,
        accommodation: 1600,
        activities: 1000,
        food: 400,
        transportation: 500,
        misc: 300
      },
      additionalInfo: [
        "Visa: Required for most nationalities, available online",
        "Vaccinations: Several required and recommended, consult your doctor",
        "Currency: Kenyan Shilling (KES)",
        "Language: Swahili and English",
        "Climate: Warm year-round, Dec-Feb is hot and dry"
      ]
    },
    {
      title: "Cruise the Mediterranean",
      date: "30.09.2024",
      color: "bg-gradient-to-br from-red-400 to-red-600",
      description: "Sail through the Mediterranean Sea and visit beautiful islands and historical cities along the coast.",
      duration: "10 days, 9 nights",
      itinerary: [
        { day: 1, activities: ["Embarkation in Barcelona", "Ship tour", "Welcome dinner"], icon: "Ship" },
        { day: 2, activities: ["Day at sea", "Onboard activities", "Gala night"], icon: "Waves" },
        { day: 3, activities: ["Port of call: Rome", "Colosseum tour", "Vatican visit"], icon: "Landmark" },
        { day: 4, activities: ["Port of call: Naples", "Pompeii excursion", "Pizza tasting"], icon: "UtensilsCrossed" },
        { day: 5, activities: ["Port of call: Santorini", "Oia village visit", "Sunset viewing"], icon: "Sun" },
        { day: 6, activities: ["Port of call: Athens", "Acropolis tour", "Greek dinner experience"], icon: "Building" },
        { day: 7, activities: ["Day at sea", "Spa treatments", "Cooking class"], icon: "Waves" },
        { day: 8, activities: ["Port of call: Dubrovnik", "Old Town walking tour", "Game of Thrones locations"], icon: "Castle" },
        { day: 9, activities: ["Port of call: Venice", "Gondola ride", "St. Mark's Basilica visit"], icon: "Boat" },
        { day: 10, activities: ["Disembarkation in Venice", "Departure"], icon: "Plane" }
      ],
      bestSpots: [
        "La Sagrada Familia, Barcelona",
        "Colosseum, Rome",
        "Santorini Caldera",
        "Acropolis, Athens",
        "St. Mark's Square, Venice"
      ],
      expenses: {
        cruise: 2500,
        flights: 800,
        excursions: 600,
        food: 300,
        misc: 400
      },
      additionalInfo: [
        "Visa: Schengen visa might be required for some nationalities",
        "Vaccinations: Routine vaccines",
        "Currency: Euro (EUR) in most ports",
        "Languages: Various, English widely spoken",
        "Climate: Mediterranean, warm and pleasant in September"
      ]
    },
    {
      title: "Explore the Ancient Ruins of Egypt",
      date: "15.03.2025",
      color: "bg-gradient-to-br from-orange-400 to-orange-600",
      description: "Discover the history of ancient Egypt by visiting the Pyramids of Giza, the Sphinx, and the temples of Luxor.",
      duration: "9 days, 8 nights",
      itinerary: [
        { day: 1, activities: ["Arrival in Cairo", "Visit Egyptian Museum", "Welcome dinner cruise on the Nile"], icon: "Plane" },
        { day: 2, activities: ["Pyramids of Giza tour", "Sphinx visit", "Camel ride"], icon: "Landmark" },
        { day: 3, activities: ["Fly to Luxor", "Karnak Temple Complex", "Luxor Temple at sunset"], icon: "Building" },
        { day: 4, activities: ["Valley of the Kings", "Hatshepsut Temple", "Colossi of Memnon"], icon: "Mountain" },
        { day: 5, activities: ["Nile cruise embarkation", "Edfu Temple visit"], icon: "Ship" },
        { day: 6, activities: ["Kom Ombo Temple", "Sail to Aswan", "Nubian village visit"], icon: "Anchor" },
        { day: 7, activities: ["Philae Temple", "High Dam", "Unfinished Obelisk"], icon: "Tool" },
        { day: 8, activities: ["Optional Abu Simbel excursion", "Fly back to Cairo", "Khan el-Khalili bazaar"], icon: "ShoppingBag" },
        { day: 9, activities: ["Old Cairo tour", "Departure"], icon: "Plane" }
      ],
      bestSpots: [
        "Pyramids of Giza",
        "The Sphinx",
        "Luxor Temple",
        "Valley of the Kings",
        "Abu Simbel"
      ],
      expenses: {
        flight: 700,
        accommodation: 600,
        activities: 500,
        food: 200,
        transportation: 300,
        misc: 200
      },
      additionalInfo: [
        "Visa: Required for most nationalities, available on arrival or online",
        "Vaccinations: Routine vaccines, consider Hepatitis A and Typhoid",
        "Currency: Egyptian Pound (EGP)",
        "Language: Arabic (English spoken in tourist areas)",
        "Climate: Hot and dry, Mar-Apr is a good time to visit"
      ]
    }
  ];
  
  export default tripPlans;