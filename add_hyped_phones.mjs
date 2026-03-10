import fs from 'fs';

const jsonPath = 'C:\\Users\\USER\\.gemini\\antigravity\\scratch\\triveni-store\\src\\data\\products.json';
const products = JSON.parse(fs.readFileSync(jsonPath, 'utf8'));

const hypedPhones = [
    {
        name: "Apple iPhone 18 Pro Max - PRE-ORDER",
        specs: [
            "Waitlist Pre-Order (Expected Sep 2026)",
            "Next-gen A20 Bionic AI Processor",
            "Periscope Telephoto with 10x Optical Zoom",
            "Under-display Face ID & Touch ID",
            "Advanced iOS 20 Agentic AI Built-in"
        ],
        brand: "Apple"
    },
    {
        name: "Samsung Galaxy S26 Ultra - PRE-ORDER",
        specs: [
            "Waitlist Pre-Order (Expected Jan 2026)",
            "Snapdragon 8 Gen 5 for Galaxy",
            "200MP Quad-Camera with AI Space Zoom",
            "Titanium Frame & Seamless Flat Edge",
            "Enhanced S-Pen Support"
        ],
        brand: "Samsung"
    },
    {
        name: "Google Pixel 11 Pro - PRE-ORDER",
        specs: [
            "Waitlist Pre-Order (Expected Oct 2026)",
            "Google Tensor G6 Chipset",
            "Ultimate Computational Photography",
            "Next-Gen Gemini AI Assistant Native",
            "7-Years OS Updates"
        ],
        brand: "Default" // General tech aesthetic
    },
    {
        name: "Xiaomi 17 Ultra - PRE-ORDER",
        specs: [
            "Leica Co-engineered Quad Cam System",
            "Massive 1-inch Primary Sensor",
            "120W HyperCharge Technology",
            "Snapdragon 8 Gen 5 Processor"
        ],
        brand: "Xiaomi"
    },
    {
        name: "Honor Robot Phone Concept - PRE-ORDER",
        specs: [
            "Most Viral Phone on the Internet",
            "Integrated Gimbal-Stabilized Robotic Camera Arm",
            "Multimodal AI Capabilities",
            "World's Thinnest Foldable Design"
        ],
        brand: "Retro" // For a unique futuristic look from the high-res mapped fallback
    }
];

// Fallback high-res dictionary from assign_hq_images
const fallbackImages = {
    "Samsung": "https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?auto=format&fit=crop&w=800&q=80",
    "Apple": "https://images.unsplash.com/photo-1603791440384-56cd371ee9a7?auto=format&fit=crop&w=800&q=80",
    "Xiaomi": "https://images.unsplash.com/photo-1598327105666-5b89351cb31b?auto=format&fit=crop&w=800&q=80",
    "Retro": "https://images.unsplash.com/photo-1533552755457-5b4812061619?auto=format&fit=crop&w=800&q=80",
    "Default": "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=800&q=80"
};

const newProducts = hypedPhones.map((phone, i) => {
    // Keeping prices around 9,990 - 9,999 to represent the peak of the 1000-10000 range allowed
    const priceNum = 9990 + Math.floor(Math.random() * 9);
    return {
        web_scraper_order: `mock-hyped-${Date.now()}-${i}`,
        web_scraper_start_url: "https://www.triveniworld.com/",
        data: phone.name,
        price: `Rs. ${priceNum.toLocaleString()}`,
        priceDisplay: `Rs. ${priceNum.toLocaleString()}`,
        priceNum: priceNum,
        specs: phone.specs,
        reviewsCount: Math.floor(Math.random() * 5000) + 1000, // Massive review counts for hype
        rating: (Math.random() * (5.0 - 4.8) + 4.8).toFixed(1), // Extreme high ratings
        image: fallbackImages[phone.brand] || fallbackImages["Default"]
    };
});

// Put newest hyped phones ON TOP
const combinedData = [...newProducts, ...products];

fs.writeFileSync(jsonPath, JSON.stringify(combinedData, null, 2));
console.log(`Successfully added ${newProducts.length} HYPED/UPCOMING phones. Total products is now ${combinedData.length}.`);
