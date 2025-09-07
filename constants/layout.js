const navLinks = [
 {
	id: "alcohol",
	title: "Alcohols",
 },
 {
	id: "about",
	title: "About Us",
 },
 {
	id: "work",
	title: "Globe Bar",
 },
 {
	id: "contact",
	title: "Contact",
 },
];

const cocktailLists = [
 {
	name: "Johnnie Walker",
	country: "AU",
	detail: "Battle",
	price: "$10",
 },
 {
	name: "Bacardi",
	country: "AU",
	detail: "Battle",
	price: "$49",
 },
 {
	name: "Moët and Chandon",
	country: "CA",
	detail: "750 ml",
	price: "$20",
 },
 {
	name: "Corona (Beer)",
	country: "IE",
	detail: "600 ml",
	price: "$29",
 },
];

const mockTailLists = [
 {
	name: "Johnnie Walker ",
	country: "US",
	detail: "Battle",
	price: "$10",
 },
 {
	name: "Smirnoff Vodka",
	country: "US",
	detail: "Battle",
	price: "$49",
 },
 {
	name: "Bacardi",
	country: "CA",
	detail: "750 ml",
	price: "$20",
 },
 {
	name: "Hennessy",
	country: "IE",
	detail: "600 ml",
	price: "$29",
 },
];

const profileLists = [
 {
	imgPath: "/images/profile1.png",
 },
 {
	imgPath: "/images/profile2.png",
 },
 {
	imgPath: "/images/profile3.png",
 },
 {
	imgPath: "/images/profile4.png",
 },
];

const featureLists = [
 "Diverse Types",
 "Alcohol Content",
 "Flavor Profiles",
 "Cultural Significance",
];

const goodLists = [
 "Handpicked ingredients",
 "Signature techniques",
 "Bartending artistry in action",
 "Freshly muddled flavors",
];

const storeInfo = {
 heading: "Where to Find Us",
 address: "456, Raq Blvd. #404, Los Angeles, CA 90210",
 contact: {
	phone: "(555) 987-6543",
	email: "hello@jsmcocktail.com",
 },
};

const openingHours = [
 { day: "Mon-Fri", time: "11:00am – 12am" },
 { day: "Sat-Sun", time: "11:00am – 02am" },
//  { day: "Wed", time: "11:00am – 12am" },
//  { day: "Thu", time: "11:00am – 12am" },
//  { day: "Fri", time: "11:00am – 02am" },
//  { day: "Sat", time: "09:00am – 02am" },
//  { day: "Sun", time: "09:00am – 01am" },
];

const socials = [
 {
	name: "Instagram",
	icon: "/images/insta.png",
	url: "#",
 },
 {
	name: "X (Twitter)",
	icon: "/images/x.png",
	url: "#",
 },
 {
	name: "Facebook",
	icon: "/images/fb.png",
	url: "#",
 },
];

const allCocktails = [
 {
	id: 1,
	name: "Classic Mojito",
	image: "/images/drink1.png",
	title: "Simple Ingredients, Bold Flavor",
	description:
	 "Made with tequila, lime juice, and orange liqueur, the Margarita is easy to make and full of character. Add a salted rim for the perfect drink on summer nights.",
 },
 {
	id: 2,
	name: "Raspberry Mojito",
	image: "/images/drink2.png",
	title: "A Zesty Classic That Never Fails",
	description:
	 "The Margarita is a classic that balances tangy lime, smooth tequila, and a touch of sweetness. Shaken, frozen, or on the rocks—it’s always crisp & refreshing.",
 },
 {
	id: 3,
	name: "Violet Breeze",
	image: "/images/drink3.png",
	title: "Simple Ingredients, Bold Flavor",
	description:
	 "Made with tequila, lime juice, and orange liqueur, the Margarita is easy to make and full of character. Add a salted rim for the perfect drink on summer nights.",
 },
 {
	id: 4,
	name: "Curacao Mojito",
	image: "/images/drink4.png",
	title: "Crafted With Care, Poured With Love",
	description:
	 "Each cocktail is made with fresh ingredients and a passion for perfecting every pour, whether you're celebrating or simply relaxing.",
 },
];

export {
 navLinks,
 cocktailLists,
 mockTailLists,
 profileLists,
 featureLists,
 goodLists,
 openingHours,
 storeInfo,
 socials,
 allCocktails,
};