import fs from 'fs';

const jsonPath = 'C:\\Users\\USER\\.gemini\\antigravity\\scratch\\triveni-store\\src\\data\\products.json';

const existingData = JSON.parse(fs.readFileSync(jsonPath, 'utf8'));

const moreClassicPhones = [
    // Nokia Classics
    "Nokia 3310",
    "Nokia 1100",
    "Nokia 6600",
    "Nokia N95",
    "Nokia N-Gage",
    "Nokia 8110",
    "Nokia 5310 XpressMusic",
    "Nokia E71",
    "Nokia 7610",

    // Motorola Classics
    "Motorola Razr V3",
    "Motorola StarTAC",
    "Motorola DynaTAC 8000X",
    "Motorola Rokr E1",
    "Motorola Pebl U6",
    "Motorola Slvr L7",

    // Samsung/LG Classics
    "Samsung E700",
    "Samsung D500",
    "LG Chocolate",
    "LG Shine"
];

const newProducts = moreClassicPhones.map((phone, i) => {
    const priceNum = Math.floor(Math.random() * (9999 - 1000 + 1) + 1000);
    return {
        web_scraper_order: `mock-vintage-${Date.now()}-${i}`,
        web_scraper_start_url: "https://www.triveniworld.com/",
        data: `${phone} - Refurbished Unlocked Retro Vintage Classic`,
        price: `Rs. ${priceNum.toLocaleString()}`,
        priceDisplay: `Rs. ${priceNum.toLocaleString()}`,
        priceNum: priceNum,
        specs: [
            "Unlocked to any network",
            "Vintage Retro Design",
            "Thoroughly tested & fully functional",
            "Original battery replaced"
        ],
        reviewsCount: Math.floor(Math.random() * 500) + 50,
        rating: (Math.random() * (5.0 - 4.5) + 4.5).toFixed(1), // Vintage phones get higher nostalgia ratings :)
        image: "" // Will be determined by fetch_images.mjs 
    };
});

const combinedData = [...existingData, ...newProducts];

fs.writeFileSync(jsonPath, JSON.stringify(combinedData, null, 2));
console.log(`Successfully added ${newProducts.length} more vintage phones. Total products is now ${combinedData.length}.`);
