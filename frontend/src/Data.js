const products = [
    {

        "slug": "Oneplus_10_Pro",
        "image": "./images/oneplus_10_pro.webp",
        "title": 'OnePlus 10 Pro',
        "description": "Second-Generation Hasselbald Camera for Mobile, Snapdragon 8 Gen 1 mobile Platform 80W SUPERVOOC + 50W AIRVOOC",
        "price": 500,
        "Company": "OnePlus",
        "tabImg": 'images/oneplus_10_pro.webp',
        "images": ['images/PhonesColor/OnePlusColor/Black/back.jpg','images/PhonesColor/OnePlusColor/Black/front.webp'],
        "Operating": "Android 11",
        "Camera": "Rear - 48 MP, f / 1.8, 23mm(wide), 8 MP, f / 2.4, 77mm(telephoto), 50 MP, f / 2.2, 14mm(ultrawide), 2 MP, f / 2.4, (monochrome) Front - 16 MP, f / 2.4, (wide)",
        "Battery": "Talk Time Up to 86 Hours",
        "Dimensions": "63.2 x 73.6 x 8.7 mm",
        "Weight": "197 g",
        "Connectivity": "WiFi, Bluetooth, GPS, NFC, USB Type - C",
        "Signal": "2G, 3G, 4G, 5G, LTE, WiFi",
        "ScreenSize": "6.7 inches",
        "Processor": "Octa - core",
        "SimType": "Nano - Sim",
        "MemoryCard": "No",

        color:['white','black'],
       
        variants: [{ color: "Black", storage: '128GB', price: 500.00, id:1 },
            { color: "Black", storage: '258GB', price: 600.00, id:2 },
            { color: "White", storage: '128GB', price: 500.00, id:3 },
            { color: "White", storage: '258GB', price: 600.00, id:4 },
        ],
    },

    {

        "slug": "Pixel_6",
        "image": './images/pixel6.png',
        "title": "Google Pixel 6",
        "price":500,
        "tabImg": 'images/pixel6.png',
        "images": ['images/PhonesColor/PixelColor/Black/back.png', 'images/pixel6.png'],
        "Company": "Google",
        "description": "Google's new custom-built chip keeps your phone fast, your games rich and your personal info safe.",
        "Operating": "Android 12",
        "Camera": "50 MP, f/1.9, 25mm (wide), 1/1.31, 1.2µm, Dual Pixel PDAF, Laser AF, OIS 48 MP, f/3.5, 104mm (telephoto), 1/2, 0.8µm, PDAF, OIS, 4x optical zoom 12 MP, f/2.2, 17mm, 114˚ (ultrawide), 1.25µm",
        "Battery": "Talk Time Up to 86 Hours",
        "Dimensions": "163.9 x 75.9 x 8.9 mm (6.45 x 2.99 x 0.35 in)",
        "Weight": "210 g (7.41 oz)",
        "Connectivity": "Bluetooth, WiFi, USB",
        "Signal": " 	GSM / CDMA / HSPA / EVDO / LTE / 5G",
        "ScreenSize": "6.71 inches",
        "Processor": "Google Tensor (5nm)",
        "SimType": "Nano - Sim and /or eSIM",
        "MemoryCard": "No",


        variants: [{ color: "Black", storage: '128GB', price: 500.00 },
            { color: "Black", storage: '258GB', price: 600.00 },
            { color: "White", storage: '128GB', price: 500.00 },
            { color: "White", storage: '258GB', price: 600.00 },
        ],
    },

    {

        "slug": "Samsung_Galaxy_S20",
        "image": './images/s20.png',
        "title": "Samsung Galaxy S20",
        "price": 500,

        "Company": "Samsung",
        "description": "Samsung Galaxy S20 4G: the phone to make every moment, an epic moment",

        "tabImg": 'images/s20.png',
        "images": ['images/PhonesColor/SamsungColor/White/back.webp', 'images/PhonesColor/SamsungColor/White/front.webp'],

        "Operating": "Android 10.0; One UI 2",
        "Camera": "1/1.72, 0.8µm, PDAF, OIS, 3x hybrid optical zoom 12 MP, f/2.2, 13mm (ultrawide), 1.4µm, Super Steady video",
        "Battery": "Li-Ion 4000 mAh, non-removable, Fast Charging 25W",
        "Dimensions": "151.7 x 69.1 x 7.9 mm (5.97 x 2.72 x 0.31 in)",
        "Weight": "163 g (5.75 oz)",
        "Connectivity": "Bluetooth, Wifi, GPS, NFC, USB (Type C)",
        "Signal": "GSM / CDMA / HSPA / EVDO / LTE",
        "ScreenSize": "6.2 inches",
        "Processor": "Exynos 990 (7 nm+)",
        "SimType": "Nano - Sim",
        "MemoryCard": "microSDXC",

        variants: [{ color: "Black", storage: '128GB', price: 500.00 },
            { color: "Black", storage: '258GB', price: 600.00 },
            { color: "White", storage: '128GB', price: 500.00 },
            { color: "White", storage: '258GB', price: 600.00 },
        ]
    },

    {

        "slug": "Huawei_P50_Pro",
        "image": './images/p-50.png',
        "title": "Huawei P50 Pro",

        "images": ['images/PhonesColor/HuaweiColor/Black/back.jpg', 'images/p-50.png'],
        "tabImg": 'images/p-50.png',
        "price": 1058,
        "Company": "Huawei",
        "description": "The Huawei P50 Pro is the most advanced smartphone in the P50 series. With a 6.6-inch OLED screen at 1228p resolution and 120Hz refresh rate",
        "Operating": "HarmonyOS 2.0 (China), EMUI 12 (Europe), no Google Play Services",
        "Camera": "Rear - 48 MP, f / 1.8, 23mm(wide), 8 MP, f / 2.4, 77mm(telephoto), 50 MP, f / 2.2, 14mm(ultrawide), 2 MP, f / 2.4, (monochrome) Front - 16 MP, f / 2.4, (wide)",
        "Battery": "66W SuperCharge refills the phone to over 80% charge in just 30 minutes",
        "Dimensions": "158.8 x 72.8 x 8.5 mm (6.25 x 2.87 x 0.33 in)",
        "Weight": "195 g (6.88 oz)",
        "Connectivity": "WiFi, Bluetooth, GPS, NFC, USB Type - C",
        "Signal": "2G, 3G, 4G, 5G, LTE, WiFi",
        "ScreenSize": "6.6 inches",
        "Processor": "Snapdragon 888 4G",
        "SimType": "Nano - Sim",
        "MemoryCard": "NM (Nano Memory), up to 256GB (uses shared SIM slot)",

        variants: 
        [{ color: "Black", storage: '128GB', price: 1058.00 },
            { color: "Black", storage: '258GB', price: 1150.00 },
            { color: "White", storage: '128GB', price: 1058.00 },
            { color: "White", storage: '258GB', price: 1150.00 },
        ]
    }
    ]


    export default products;