const mongoose = require('mongoose');
require('dotenv').config();

const Article = require('./models/Article');
const Ticker = require('./models/Ticker');

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/global-news-hub';

const articles = [
  {
    title: {
      en: "Vinchur: Angry Farmers Block Road Over Onion Prices",
      mr: "विंचूरला संतप्त शेतकऱ्यांचा रास्ता रोको",
    },
    description: {
      en: "Farmers demand minimum support price for onions, threaten mass agitation if demands not met.",
      mr: "भाव वाढ न झाल्यास जन आंदोलन पुकारणार",
    },
    content: {
      en: "Vinchur: The Swabhimani Shetkari Sanghatana held a half-hour road blockade on the Sambhajinagar highway in front of the Vinchur Agricultural Produce Market Committee over the onion issue. A memorandum of demands was submitted to the government. The production cost of onion is Rs 2500 per quintal while it is being sold at Rs 700-800 per quintal. It was demanded that the government should give a subsidy of Rs 1500 per quintal to red onion producers. The central government should provide incentive subsidy for summer onions.\n\nNashik District President Nivruti Gare Patil warned that if the above demands are not met, representatives will not be allowed to move in the district. Krishna Ghumre, Chairman of Sinnar APMC, reacted that those who contest elections as farmer sons remain silent on farmers issues. Sinnar Taluka President Atmaram Pagar said despite working day and night onion farmers face disappointment. Yeola Taluka President Vilas Dargude said farmers could be affected when market committees reopen.\n\nPresent were Niphad Taluka President Gajanan Aba Ghotekar, Machhindra Jadhav, Sandeep Ghotekar, Balasaheb Gite, Dattu Gaikwad along with farmers and Sarpanch of Thokalwadi, Vinchur. The memorandum was given to Sub-Inspector Kiran Salunkhe.",
      mr: "विंचूर : कांदा प्रश्न वर स्वाभिमानी शेतकरी संघटनेचा संभाजीनगर महामार्गावर विंचूर कृषी उत्पन्न बाजार समिती समोर अर्धा तास रस्ता रोको आंदोलन करून शासनाला हमीभावाचा मागण्यांचे निवेदन देण्यात आले. रस्ता रोको वेळेस कांद्याला उत्पादन खर्च अडीच हजार रुपये येत असून आज सातशे आठशे रुपये क्विंटल ने कांदा विक्री होत आहे. शासनाने प्रतिक्विंटल पंधराशे रुपये अनुदान लाल कांदा उत्पादकांना द्यावी, अशी मागणी करण्यात आली. तसेच उन्हाळ कांद्यासाठी केंद्र सरकारने प्रोत्साहन अनुदान देऊन रब्बी हंगामातील उन्हाळ कांद्याला दिलासा द्यावा अशी मागणी करण्यात आली.\n\nवरील मागण्या मान्य न झाल्यास लोकप्रतिनिधींना जिल्ह्यात फिरु देणार नाही असा इशारा नाशिक जिल्हा अध्यक्ष निवृत्ती गारे पाटील यांनी दिला. केंद्र सरकारच्या निर्यातीत आयात निर्यातीच्या दरसोडीच्या धोरणामुळे कांदा उत्पादक देश जोडीला लागला असून शेतकऱ्यांचे लोकप्रतिनिधींचा आव अनणारे लोकप्रतिनिधी शेतकऱ्यांविषयी गप्प का बसले ते शेतकरी पुत्र म्हणून निवडणुका लढवतात आणि शेतकऱ्यांच्या प्रश्नावर मूक गिळून गप्प बसतात त्यांना मत मागण्याचा नैतिक अधिकार नाही, असे सिन्नर कृषी उत्पन्न बाजार समितीचे सभापती कृष्णा घुमरे यांनी यावेळी प्रतिक्रिया दिली. रात्रंदिवस कांदा उत्पादक शेतकऱ्यांना काम करूनही त्यांच्या पदरी निराशा असल्याचे सिन्नर तालुका अध्यक्ष आत्माराम पगार यांनी म्हटले. जिल्ह्यातील बाजार समिती चार-पाच दिवस बंद असल्यामुळे कांद्याचे आवक बाजार समिती चालू झाल्यास कांदा उत्पादकांना याचा फटका बसू शकतो शासनाने वेळेत उपाय योजना राबवण्यात अशी येवला तालुका अध्यक्ष विलास दरगुडे यांनी म्हटले.\n\nयावेळी निफाड तालुका अध्यक्ष गजानन आबा घोटेकर, मच्छिंद्र जाधव, संदीप घोटेकर, बाळासाहेब गीते, दत्तू गायकवाड यांनी आंदोलनासाठी परिश्रम घेतले. यावेळी ठोकळवाडी, विंचूरचे सरपंच यांसह शेतकरी उपस्थित होते. आंदोलनाचे निवेदन उपनिरीक्षक किरण साळुंखे यांना देण्यात आले."
    },
    author: "रोशन पवार",
    authorImage: "/images/writer_photo.png",
    category: "maharashtra",
    image: "/images/news_farmers.jpg",
    date: "2026-03-15",
    readTime: 5,
    views: 12500,
    isBreaking: true,
  },
  {
    title: {
      en: "Maharashtra Assembly Passes Historic Water Conservation Bill",
      mr: "महाराष्ट्र विधानसभेने ऐतिहासिक जलसंधारण विधेयक मंजूर केले",
    },
    description: {
      en: "The bill mandates rainwater harvesting for all new constructions and allocates ₹5,000 crore for drought-prone regions.",
      mr: "विधेयकात सर्व नवीन बांधकामांसाठी पावसाचे पाणी साठवणे अनिवार्य आणि दुष्काळग्रस्त भागांसाठी ₹5,000 कोटी वाटप.",
    },
    content: { en: "", mr: "" },
    author: "Rajesh Patil",
    authorImage: "/images/writer_photo.png",
    category: "maharashtra",
    image: "https://images.unsplash.com/photo-1504025468847-0e438279542c?w=800&h=500&fit=crop",
    date: "2026-03-13",
    readTime: 5,
    views: 32100,
  },
  {
    title: {
      en: "Global Markets Rally as Fed Signals Rate Cuts in Q2",
      mr: "फेडने Q2 मध्ये दर कपातीचे संकेत दिल्याने जागतिक बाजारात तेजी",
    },
    description: {
      en: "Wall Street surges as Federal Reserve hints at potential interest rate reductions, boosting investor confidence worldwide.",
      mr: "फेडरल रिझर्व्हने व्याजदर कपातीचे संकेत दिल्याने वॉल स्ट्रीटमध्ये तेजी, जगभरातील गुंतवणूकदारांचा विश्वास वाढला.",
    },
    content: { en: "", mr: "" },
    author: "Amit Desai",
    authorImage: "/images/writer_photo.png",
    category: "business",
    image: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=800&h=500&fit=crop",
    date: "2026-03-12",
    readTime: 6,
    views: 28700,
  },
  {
    title: {
      en: "SpaceX Successfully Launches Starship for Mars Mission Prep",
      mr: "SpaceX ने मंगळ मोहिमेच्या तयारीसाठी स्टारशिपचे यशस्वी प्रक्षेपण केले",
    },
    description: {
      en: "The latest Starship test flight marks a crucial milestone in humanity's journey toward Mars colonization.",
      mr: "स्टारशिपची नवीनतम चाचणी उड्डाण मानवजातीच्या मंगळ वसाहतीकरणाच्या प्रवासातील महत्त्वपूर्ण टप्पा.",
    },
    content: { en: "", mr: "" },
    author: "Sneha Kulkarni",
    authorImage: "/images/writer_photo.png",
    category: "science",
    image: "https://images.unsplash.com/photo-1516849841032-87cbac4d88f7?w=800&h=500&fit=crop",
    date: "2026-03-12",
    readTime: 7,
    views: 51300,
  },
  {
    title: {
      en: "India Wins Thrilling Cricket World Cup Qualifier Against Australia",
      mr: "भारताने ऑस्ट्रेलियाविरुद्ध रोमांचक क्रिकेट विश्वचषक पात्रता सामना जिंकला",
    },
    description: {
      en: "Virat Kohli's century guides India to a dramatic last-over victory in the ICC World Cup qualifiers.",
      mr: "विराट कोहलीच्या शतकाच्या जोरावर भारताने ICC विश्वचषक पात्रता फेरीत शेवटच्या षटकात नाट्यमय विजय मिळवला.",
    },
    content: { en: "", mr: "" },
    author: "Suresh Raina",
    authorImage: "/images/writer_photo.png",
    category: "sports",
    image: "https://images.unsplash.com/photo-1531415074968-036ba1b575da?w=800&h=500&fit=crop",
    date: "2026-03-11",
    readTime: 4,
    views: 67400,
  },
  {
    title: {
      en: "Pune's Tech Startup Ecosystem Valued at $50 Billion",
      mr: "पुण्याच्या टेक स्टार्टअप इकोसिस्टमचे मूल्यांकन $50 अब्ज",
    },
    description: {
      en: "Pune emerges as India's fastest-growing startup hub, surpassing Bangalore in growth rate for the first time.",
      mr: "पुणे भारतातील सर्वात वेगाने वाढणारे स्टार्टअप केंद्र म्हणून उदयास आले, प्रथमच बंगलोरला वाढीच्या दरात मागे टाकले.",
    },
    content: { en: "", mr: "" },
    author: "Meera Joshi",
    authorImage: "/images/writer_photo.png",
    category: "startups",
    image: "https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=800&h=500&fit=crop",
    date: "2026-03-11",
    readTime: 6,
    views: 23400,
  },
  {
    title: {
      en: "New Bollywood Film Breaks All-Time Box Office Records",
      mr: "नवीन बॉलिवूड चित्रपटाने सर्वकालीन बॉक्स ऑफिस विक्रम मोडला",
    },
    description: {
      en: "The highly anticipated action thriller crosses ₹1,000 crore worldwide in its opening week.",
      mr: "बहुप्रतीक्षित अॅक्शन थ्रिलरने पहिल्या आठवड्यातच जगभरात ₹1,000 कोटींचा टप्पा ओलांडला.",
    },
    content: { en: "", mr: "" },
    author: "Kavita Nair",
    authorImage: "/images/writer_photo.png",
    category: "entertainment",
    image: "https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=800&h=500&fit=crop",
    date: "2026-03-10",
    readTime: 4,
    views: 89200,
    isVideo: true,
    videoDuration: "3:45",
  },
  {
    title: {
      en: "Climate Summit: India Pledges Carbon Neutrality by 2060",
      mr: "हवामान शिखर परिषद: भारताने 2060 पर्यंत कार्बन तटस्थतेचे वचन दिले",
    },
    description: {
      en: "At the Global Climate Summit, India announces an ambitious roadmap to achieve net-zero emissions.",
      mr: "जागतिक हवामान शिखर परिषदेत भारताने शून्य उत्सर्जन साध्य करण्यासाठी महत्त्वाकांक्षी रोडमॅपची घोषणा केली.",
    },
    content: { en: "", mr: "" },
    author: "Dr. Anand Rao",
    authorImage: "/images/writer_photo.png",
    category: "world",
    image: "https://images.unsplash.com/photo-1611273426858-450d8e3c9fce?w=800&h=500&fit=crop",
    date: "2026-03-10",
    readTime: 9,
    views: 34500,
  },
  {
    title: {
      en: "Opposition Demands Joint Parliamentary Committee on Adani Issue",
      mr: "विरोधकांनी अदानी प्रकरणावर संयुक्त संसदीय समितीची मागणी केली",
    },
    description: {
      en: "Parliamentary session disrupted as opposition parties push for a thorough investigation into the Adani controversy.",
      mr: "विरोधी पक्षांनी अदानी वादाच्या सखोल चौकशीसाठी दबाव आणल्याने संसदीय अधिवेशन विस्कळीत झाले.",
    },
    content: { en: "", mr: "" },
    author: "Vikram Singh",
    authorImage: "/images/writer_photo.png",
    category: "politics",
    image: "https://images.unsplash.com/photo-1529107386315-e1a2ed48a620?w=800&h=500&fit=crop",
    date: "2026-03-09",
    readTime: 7,
    views: 41200,
  },
  {
    title: {
      en: "Opinion: Why India Must Embrace Nuclear Energy for a Sustainable Future",
      mr: "मत: शाश्वत भविष्यासाठी भारताने अणुऊर्जा का स्वीकारावी",
    },
    description: {
      en: "India's energy demands are soaring. Nuclear power offers a clean, reliable path forward — if we can overcome political resistance.",
      mr: "भारताच्या ऊर्जेच्या मागण्या वाढत आहेत. अणुऊर्जा एक स्वच्छ, विश्वसनीय मार्ग देते — जर आपण राजकीय प्रतिकार दूर करू शकलो तर.",
    },
    content: { en: "", mr: "" },
    author: "Prof. Sunita Naik",
    authorImage: "/images/writer_photo.png",
    category: "opinion",
    image: "https://images.unsplash.com/photo-1591696205602-2f950c417cb9?w=800&h=500&fit=crop",
    date: "2026-03-09",
    readTime: 10,
    views: 18900,
  },
  {
    title: {
      en: "Samsung Unveils AI-Powered Foldable Phone with Holographic Display",
      mr: "Samsung ने होलोग्राफिक डिस्प्लेसह AI-पावर्ड फोल्डेबल फोन सादर केला",
    },
    description: {
      en: "The Galaxy Z Fold 8 features a revolutionary holographic projection system and on-device AI capabilities.",
      mr: "Galaxy Z Fold 8 मध्ये क्रांतिकारी होलोग्राफिक प्रोजेक्शन सिस्टम आणि ऑन-डिव्हाइस AI क्षमता आहेत.",
    },
    content: { en: "", mr: "" },
    author: "Rohan Mehta",
    authorImage: "/images/writer_photo.png",
    category: "technology",
    image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=800&h=500&fit=crop",
    date: "2026-03-08",
    readTime: 5,
    views: 56700,
    isVideo: true,
    videoDuration: "5:20",
  },
  {
    title: {
      en: "Mumbai Metro Line 4 Inaugurated, Connecting Western Suburbs",
      mr: "मुंबई मेट्रो लाइन 4 चे उद्घाटन, पश्चिम उपनगरे जोडणार",
    },
    description: {
      en: "The new metro line is expected to reduce commute times by 40% for millions of daily commuters in Mumbai.",
      mr: "नवीन मेट्रो लाइनमुळे मुंबईतील लाखो दैनंदिन प्रवाशांच्या प्रवासाच्या वेळेत 40% कपात अपेक्षित आहे.",
    },
    content: { en: "", mr: "" },
    author: "Anil Sawant",
    authorImage: "/images/writer_photo.png",
    category: "maharashtra",
    image: "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=800&h=500&fit=crop",
    date: "2026-03-08",
    readTime: 4,
    views: 38900,
  },
];

const tickerItems = {
  en: [
    "Breaking: Vinchur - Angry Farmers Block Road Over Onion Prices",
    "Maharashtra passes historic water conservation bill",
    "Global markets rally on Fed rate cut signals",
    "India wins thrilling cricket qualifier against Australia",
    "Pune's startup ecosystem valued at $50 billion",
    "Mumbai Metro Line 4 inaugurated today",
  ],
  mr: [
    "ब्रेकिंग: विंचूरला संतप्त शेतकऱ्यांचा रास्ता আলোको",
    "महाराष्ट्राने ऐतिहासिक जलसंधारण विधेयक मंजूर केले",
    "फेड दर कपातीच्या संकेतांवर जागतिक बाजारात तेजी",
    "भारताने ऑस्ट्रेलियाविरुद्ध रोमांचक पात्रता सामना जिंकला",
    "पुण्याच्या स्टार्टअप इकोसिस्टमचे मूल्यांकन $50 अब्ज",
    "मुंबई मेट्रो लाइन 4 चे आज उद्घाटन",
  ],
};

mongoose.connect(MONGODB_URI)
  .then(async () => {
    console.log('MongoDB connected successfully');
    
    // Clear existing data
    await Article.deleteMany({});
    await Ticker.deleteMany({});
    console.log('Cleared existing data');

    // Insert Articles
    await Article.insertMany(articles);
    console.log('Articles inserted successfully');

    // Insert Ticker
    const ticker = new Ticker(tickerItems);
    await ticker.save();
    console.log('Ticker items inserted successfully');

    mongoose.connection.close();
    console.log('Database seeded and connection closed');
  })
  .catch((err) => {
    console.error('MongoDB connection error:', err);
    process.exit(1);
  });
