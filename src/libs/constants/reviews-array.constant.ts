import { FIRST_ARRAY_ELEMENT } from "./first-array-element.constant";

const REVIEWS = [
	{
		authorName: "Петро Коваленко",
		content: "Ваш онлайн словник - зручний і швидкий помічник у світі слів.",
		imageUrl: "/assets/images/default-review-profile-picture-1.png",
	},
	{
		authorName: "Ольга Сидоренко",
		content:
			"Цей онлайн словник є неоціненним ресурсом для вдосконалення лексичних навичок і розширення словникового запасу.",
		imageUrl: "/assets/images/default-review-profile-picture-6.png",
	},
	{
		authorName: "Анастасія Маляр",
		content:
			"Ця платформа допомагає не лише знаходити значення слів, а й розуміти їх вживання та контекст, що є ключовим для ефективного спілкування.",
		imageUrl: "/assets/images/default-review-profile-picture-5.png",
	},
	{
		authorName: "Андрій Ковальчук",
		content:
			"Завдяки цьому ресурсу я постійно розширюю свій словниковий запас та пізнаю нові цікаві слова. Неоціненна допомога для любителів іноземних мов!",
		imageUrl: "/assets/images/default-review-profile-picture-2.png",
	},
	{
		authorName: "Олександр Романенко",
		content:
			"Неймовірно корисний ресурс для вчителів, які прагнуть збагатити свої уроки цікавими словами та ідіомами. Значно полегшує підготовку до занять!",
		imageUrl: "/assets/images/default-review-profile-picture-3.png",
	},
	{
		authorName: "Вікторія Мельник",
		content:
			"Я захоплююсь багатством української мови, і цей словник дозволяє мені відкривати для себе нові слова та їх походження. Справжня знахідка для мовознавців!",
		imageUrl: "/assets/images/default-review-profile-picture-4.png",
	},
];

const REVIEWS_TO_RENDER = 2;
const HALF = 0.5;

interface Review {
	authorName: string;
	content: string;
	imageUrl: string;
}

function getRandomReviews(reviews: Review[], count: number) {
	const shuffledReviews = reviews.sort(() => HALF - Math.random());
	return shuffledReviews.slice(FIRST_ARRAY_ELEMENT, count);
}

export { REVIEWS, REVIEWS_TO_RENDER, getRandomReviews };
