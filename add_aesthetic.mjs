import fs from 'fs';

const jsonPath = 'C:\\Users\\USER\\.gemini\\antigravity\\scratch\\triveni-store\\src\\data\\products.json';

const existingData = JSON.parse(fs.readFileSync(jsonPath, 'utf8'));

const aestheticPhones = [
    "Unihertz Titan 2 Elite",
    "Unihertz Titan 2",
    "Unihertz Titan Pocket",
    "Unihertz Titan Slim",
    "Light Phone II",
    "Punkt MP02",
    "Nothing Phone (1)",
    "Essential Phone PH-1",
    "Palm Phone",
    "Balmuda Phone"
];

const newProducts = aestheticPhones.map((phone, i) => {
    const priceNum = Math.floor(Math.random() * (9999 - 1000 + 1) + 1000);
    return {
        web_scraper_order: `mock-aesthetic-${Date.now()}-${i}`,
        web_scraper_start_url: "https://www.triveniworld.com/",
        data: `${phone} - Refurbished Unlocked Aesthetic Device`,
        price: `Rs. ${priceNum.toLocaleString()}`,
        priceDisplay: `Rs. ${priceNum.toLocaleString()}`,
        priceNum: priceNum,
        specs: [
            "Unique Aesthetic Design",
            "Unlocked to any network",
            "Thoroughly tested & fully functional",
            "Premium Refurbished"
        ],
        reviewsCount: Math.floor(Math.random() * 800) + 100,
        rating: (Math.random() * (5.0 - 4.2) + 4.2).toFixed(1),
        image: "" // Will be fetched via fetch_images.mjs 
    };
});

const combinedData = [...existingData, ...newProducts];

fs.writeFileSync(jsonPath, JSON.stringify(combinedData, null, 2));
console.log(`Successfully added ${newProducts.length} aesthetic phones. Total products is now ${combinedData.length}.`);
