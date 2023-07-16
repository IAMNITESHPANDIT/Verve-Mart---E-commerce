const { Address } = require("../sequelize");

exports.getCountries = async (req, res) => {
  const countries = [
    { id: 1, name: "India" },
    // Add more countries here
  ];

  res.json(countries);
};

// GET /states/:countryId

exports.getState = async (req, res) => {
  const { countryId } = req.params;

  if (countryId === "1") {
    // Assuming countryId 1 is India
    const states = [
      { id: 1, name: "Andhra Pradesh" },
      { id: 2, name: "Arunachal Pradesh" },
      { id: 3, name: "Assam" },
      { id: 4, name: "Bihar" },
      { id: 5, name: "Chhattisgarh" },
      { id: 6, name: "Goa" },
      { id: 7, name: "Gujarat" },
      { id: 8, name: "Haryana" },
      { id: 9, name: "Himachal Pradesh" },
      { id: 10, name: "Jharkhand" },
      { id: 11, name: "Karnataka" },
      { id: 12, name: "Kerala" },
      { id: 13, name: "Madhya Pradesh" },
      { id: 14, name: "Maharashtra" },
      { id: 15, name: "Manipur" },
      { id: 16, name: "Meghalaya" },
      { id: 17, name: "Mizoram" },
      { id: 18, name: "Nagaland" },
      { id: 19, name: "Odisha" },
      { id: 20, name: "Punjab" },
      { id: 21, name: "Rajasthan" },
      { id: 22, name: "Sikkim" },
      { id: 23, name: "Tamil Nadu" },
      { id: 24, name: "Telangana" },
      { id: 25, name: "Tripura" },
      { id: 26, name: "Uttar Pradesh" },
      { id: 27, name: "Uttarakhand" },
      { id: 28, name: "West Bengal" },
      { id: 29, name: "Andaman and Nicobar Islands" },
      { id: 30, name: "Chandigarh" },
      { id: 31, name: "Dadra and Nagar Haveli and Daman and Diu" },
      { id: 32, name: "Delhi" },
      { id: 33, name: "Ladakh" },
      { id: 34, name: "Lakshadweep" },
      { id: 35, name: "Puducherry" },
    ];

    res.json(states);
  } else {
    res.json([]);
  }
};

// GET /districts/:stateId

exports.getDistricts = async (req, res) => {
  const { stateId } = req.params;

  let districts = [];

  // Assuming stateId 1 is Andhra Pradesh
  if (stateId === "1") {
    const districts = [
      { id: 1, name: "Anantapur" },
      { id: 2, name: "Chittoor" },
      { id: 3, name: "East Godavari" },
      { id: 4, name: "Guntur" },
      { id: 5, name: "Krishna" },
      { id: 6, name: "Kurnool" },
      { id: 7, name: "Nellore" },
      { id: 8, name: "Prakasam" },
      { id: 9, name: "Srikakulam" },
      { id: 10, name: "Visakhapatnam" },
      { id: 11, name: "Vizianagaram" },
      { id: 12, name: "West Godavari" },
      { id: 13, name: "YSR Kadapa" },
    ];

    res.json(districts);
  } else if (stateId === "2") {
    // Assuming stateId 2 is Arunachal Pradesh
    const districts = [
      { id: 14, name: "Anjaw" },
      { id: 15, name: "Changlang" },
      { id: 16, name: "Dibang Valley" },
      { id: 17, name: "East Kameng" },
      { id: 18, name: "East Siang" },
      { id: 19, name: "Kamle" },
      { id: 20, name: "Kra Daadi" },
      { id: 21, name: "Kurung Kumey" },
      { id: 22, name: "Lepa Rada" },
      { id: 23, name: "Lohit" },
      { id: 24, name: "Longding" },
      { id: 25, name: "Lower Dibang Valley" },
      { id: 26, name: "Lower Siang" },
      { id: 27, name: "Lower Subansiri" },
      { id: 28, name: "Namsai" },
      { id: 29, name: "Pakke Kessang" },
      { id: 30, name: "Papum Pare" },
      { id: 31, name: "Shi Yomi" },
      { id: 32, name: "Siang" },
      { id: 33, name: "Tawang" },
      { id: 34, name: "Tirap" },
      { id: 35, name: "Upper Siang" },
      { id: 36, name: "Upper Subansiri" },
      { id: 37, name: "West Kameng" },
      { id: 38, name: "West Siang" },
    ];

    res.json(districts);
  } else if (stateId === 26) {
    // Uttar Pradesh
    districts = [
      { id: 1, name: "Agra" },
      { id: 2, name: "Aligarh" },
      { id: 3, name: "Allahabad" },
      { id: 4, name: "Ambedkar Nagar" },
      { id: 5, name: "Amethi" },
      { id: 6, name: "Amroha" },
      { id: 7, name: "Auraiya" },
      { id: 8, name: "Azamgarh" },
      { id: 9, name: "Baghpat" },
      { id: 10, name: "Bahraich" },
      { id: 11, name: "Ballia" },
      { id: 12, name: "Balrampur" },
      { id: 13, name: "Banda" },
      { id: 14, name: "Barabanki" },
      { id: 15, name: "Bareilly" },
      { id: 16, name: "Basti" },
      { id: 17, name: "Bhadohi" },
      { id: 18, name: "Bijnor" },
      { id: 19, name: "Bulandshahr" },
      { id: 20, name: "Chandauli" },
      { id: 21, name: "Chitrakoot" },
      { id: 22, name: "Deoria" },
      { id: 23, name: "Etah" },
      { id: 24, name: "Etawah" },
      { id: 25, name: "Faizabad" },
      { id: 26, name: "Farrukhabad" },
      { id: 27, name: "Fatehpur" },
      { id: 28, name: "Firozabad" },
      { id: 29, name: "Gautam Buddha Nagar" },
      { id: 30, name: "Ghaziabad" },
      { id: 31, name: "Ghazipur" },
      { id: 32, name: "Gonda" },
      { id: 33, name: "Gorakhpur" },
      { id: 34, name: "Hamirpur" },
      { id: 35, name: "Hapur" },
      { id: 36, name: "Hardoi" },
      { id: 37, name: "Hathras" },
      { id: 38, name: "Jalaun" },
      { id: 39, name: "Jaunpur" },
      { id: 40, name: "Jhansi" },
      { id: 41, name: "Kannauj" },
      { id: 42, name: "Kanpur Dehat" },
      { id: 43, name: "Kanpur Nagar" },
      { id: 44, name: "Kasganj" },
      { id: 45, name: "Kaushambi" },
      { id: 46, name: "Kheri" },
      { id: 47, name: "Kushinagar" },
      { id: 48, name: "Lalitpur" },
      { id: 49, name: "Lucknow" },
      { id: 50, name: "Maharajganj" },
      { id: 51, name: "Mahoba" },
      { id: 52, name: "Mainpuri" },
      { id: 53, name: "Mathura" },
      { id: 54, name: "Mau" },
      { id: 55, name: "Meerut" },
      { id: 56, name: "Mirzapur" },
      { id: 57, name: "Moradabad" },
      { id: 58, name: "Muzaffarnagar" },
      { id: 59, name: "Pilibhit" },
      { id: 60, name: "Pratapgarh" },
      { id: 61, name: "Raebareli" },
      { id: 62, name: "Rampur" },
      { id: 63, name: "Saharanpur" },
      { id: 64, name: "Sambhal" },
      { id: 65, name: "Sant Kabir Nagar" },
      { id: 66, name: "Shahjahanpur" },
      { id: 67, name: "Shamli" },
      { id: 68, name: "Shravasti" },
      { id: 69, name: "Siddharthnagar" },
      { id: 70, name: "Sitapur" },
      { id: 71, name: "Sonbhadra" },
      { id: 72, name: "Sultanpur" },
      { id: 73, name: "Unnao" },
      { id: 74, name: "Varanasi" },
    ];
    res.json({ message: "data Aviliable", data: districts });
  } else {
    res.json({ message: "Not Aviliable", data: [] });
  }
};

// addressController.js

// Save address
exports.saveAddress = async (req, res) => {
  try {
    const { name, street, country, state, dist, pincode } = req.body;
    const userId = req.user.userId; // Assuming you have the authenticated user ID

    // Create the address in the database
    const address = await Address.create({
      name,
      street,
      country,
      state,
      dist,
      pincode,
      userId,
    });

    res.status(201).json({ message: "Address saved successfully", address });
  } catch (error) {
    console.log("Error saving address:", error);
    res.status(500).json({ error: "Failed to save address" });
  }
};

exports.getSavedAddress = async (req, res) => {
  try {
    const { userId } = req.body;

    // Retrieve the addresses for the specified user
    const addresses = await Address.findAll({
      where: { userId },
    });

    res.json({ addresses });
  } catch (error) {
    console.log("Error retrieving addresses:", error);
    res.status(500).json({ error: "Failed to retrieve addresses" });
  }
};
