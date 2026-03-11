import fs from 'fs';

const jsonPath = 'C:\\Users\\USER\\.gemini\\antigravity\\scratch\\triveni-store\\src\\data\\products.json';

const existingData = JSON.parse(fs.readFileSync(jsonPath, 'utf8'));

const japanesePhones = [
    {
        name: "Sony Xperia 1 V",
        desc: "Premium 4K OLED Flagship",
        image: "https://images.unsplash.com/photo-1628126235206-5260b9ea6441?auto=format&fit=crop&q=80&w=800",
        specs: [
            "6.5\" 4K HDR OLED 120Hz display",
            "Snapdragon 8 Gen 2 processor",
            "Triple camera with Exmor T sensor",
            "3.5mm headphone jack & microSD support"
        ]
    },
    {
        name: "Sharp Aquos R8 Pro",
        desc: "Photography Centric Masterpiece",
        image: "https://images.unsplash.com/photo-1549439602-43ebca2327af?auto=format&fit=crop&q=80&w=800",
        specs: [
            "6.6\" IGZO OLED 240Hz display",
            "Leica customized 1-inch sensor",
            "Snapdragon 8 Gen 2 processor",
            "Integrated lens cooling technology"
        ]
    },
    {
        name: "Kyocera DuraForce Pro 3",
        desc: "Ultra Rugged Smartphone",
        image: "https://images.unsplash.com/photo-1585060544812-6b45742d762f?auto=format&fit=crop&q=80&w=800",
        specs: [
            "MIL-STD-810H & IP68 drop-proof rating",
            "Sapphire Shield display protection",
            "Programmable push-to-talk button",
            "Dual-band Wi-Fi 6 & 5G support"
        ]
    },
    {
        name: "Sony Xperia 5 IV",
        desc: "Compact Creator Smartphone",
        image: "https://images.unsplash.com/photo-1598327105654-36e352514120?auto=format&fit=crop&q=80&w=800",
        specs: [
            "6.1\" HDR OLED 120Hz display",
            "Real-time Eye AF & subject tracking",
            "5000mAh battery in compact body",
            "Wireless charging & reverse wireless charging"
        ]
    },
    {
        name: "FCNT Arrows N (F-51C)",
        desc: "Sustainable Recycled Smartphone",
        image: "https://images.unsplash.com/photo-1565536421961-1f165e0c50fa?auto=format&fit=crop&q=80&w=800",
        specs: [
            "Made from 67% recycled materials",
            "6.24\" OLED display",
            "IPX5/8 waterproof & IP6X dustproof",
            "Long-lasting battery degradation protection"
        ]
    }
];

const newProducts = japanesePhones.map((phone, i) => {
    const priceNum = Math.floor(Math.random() * (120000 - 45000 + 1) + 45000);
    return {
        web_scraper_order: `mock-jp-${Date.now()}-${i}`,
        web_scraper_start_url: "https://www.triveniworld.com/",
        data: `${phone.name} - ${phone.desc}`,
        price: `Rs. ${priceNum.toLocaleString()}`,
        priceDisplay: `Rs. ${priceNum.toLocaleString()}`,
        priceNum: priceNum,
        specs: phone.specs,
        reviewsCount: Math.floor(Math.random() * 50) + 1,
        rating: (Math.random() * (5.0 - 4.4) + 4.4).toFixed(1),
        image: phone.image,
        category: "japanese-import"
    };
});

const combinedData = [...existingData, ...newProducts];

fs.writeFileSync(jsonPath, JSON.stringify(combinedData, null, 2));
console.log(`Successfully added ${newProducts.length} Japanese phones. Total products is now ${combinedData.length}.`);
