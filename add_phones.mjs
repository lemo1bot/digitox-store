import fs from 'fs';

const jsonPath = 'C:\\Users\\USER\\.gemini\\antigravity\\scratch\\triveni-store\\src\\data\\products.json';

const existingData = JSON.parse(fs.readFileSync(jsonPath, 'utf8'));

const classicPhones = [
    // BlackBerry
    "BlackBerry Bold 9900",
    "BlackBerry Curve 9320",
    "BlackBerry Passport",
    "BlackBerry Classic (Q20)",
    "BlackBerry Z30",
    "BlackBerry Priv",
    "BlackBerry Q10",
    // Lumia
    "Nokia Lumia 1020",
    "Nokia Lumia 1520",
    "Nokia Lumia 930",
    "Nokia Lumia 920",
    "Nokia Lumia 520",
    "Nokia Lumia 720",
    "Microsoft Lumia 950 XL",
    // Sony Ericsson
    "Sony Ericsson Walkman W995",
    "Sony Ericsson Xperia Arc S",
    "Sony Ericsson K800i",
    "Sony Ericsson W800i",
    "Sony Ericsson P990i",
    "Sony Ericsson Xperia Play",
    "Sony Ericsson T610"
];

const newProducts = classicPhones.map((phone, i) => {
    const priceNum = Math.floor(Math.random() * (9999 - 1000 + 1) + 1000);
    return {
        web_scraper_order: `mock-${Date.now()}-${i}`,
        web_scraper_start_url: "https://www.triveniworld.com/",
        data: `${phone} - Refurbished Unlocked Retro Classic`,
        price: `Rs. ${priceNum.toLocaleString()}`,
        priceDisplay: `Rs. ${priceNum.toLocaleString()}`,
        priceNum: priceNum,
        specs: [
            "Unlocked to any network",
            "Classic Retro Design",
            "Thoroughly tested & fully functional",
            "Battery health optimal"
        ],
        reviewsCount: Math.floor(Math.random() * 200) + 10,
        rating: (Math.random() * (5.0 - 4.0) + 4.0).toFixed(1),
        image: "https://images.unsplash.com/photo-1544866092-1935c5ef2a8f?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80" // using a generic retro phone placeholder
    };
});

const combinedData = [...existingData, ...newProducts];

fs.writeFileSync(jsonPath, JSON.stringify(combinedData, null, 2));
console.log(`Successfully added ${newProducts.length} classic phones. Total products is now ${combinedData.length}.`);
