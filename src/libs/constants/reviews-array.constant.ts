import { FIRST_ARRAY_ELEMENT } from "./first-array-element.constant";

const REVIEWS = [
	{
		authorName: "Петро Коваленко",
		content: "Ваш онлайн словник - зручний і швидкий помічник у світі слів.",
		imageUrl:
			"https://img.freepik.com/free-photo/portrait-white-man-isolated_53876-40306.jpg?t=st=1712052613~exp=1712056213~hmac=2f387a29385de3c444aa2ffe7f3e4320668ee6f9c5dffd29ac675eae984a3714&w=996",
	},
	{
		authorName: "Ольга Сидоренко",
		content:
			"Цей онлайн словник є неоціненним ресурсом для вдосконалення лексичних навичок і розширення словникового запасу.",
		imageUrl:
			"https://img.freepik.com/free-photo/portrait-young-blonde-woman_273609-11526.jpg?t=st=1712052429~exp=1712056029~hmac=9d87b6447e163da1427077c4426a18fb3639d17e3df33646db8b753abff840a2&w=1380",
	},
	{
		authorName: "Анастасія Маляр",
		content:
			"Ця платформа допомагає не лише знаходити значення слів, а й розуміти їх вживання та контекст, що є ключовим для ефективного спілкування.",
		imageUrl:
			"https://img.freepik.com/free-photo/female-looking-directly-into-camera_273609-12389.jpg?t=st=1712052573~exp=1712056173~hmac=c5860f69b9acc9118b5351b9217fe889cea89b8a3c806cf9c16935a32c71737f&w=1380",
	},
	{
		authorName: "Андрій Ковальчук",
		content:
			"Завдяки цьому ресурсу я постійно розширюю свій словниковий запас та пізнаю нові цікаві слова. Неоціненна допомога для любителів іноземних мов!",
		imageUrl:
			"https://img.freepik.com/free-photo/young-bearded-man-with-striped-shirt_273609-5677.jpg?t=st=1712052382~exp=1712055982~hmac=9a5a09891ffadbfd863413ab4346b26cdffc9c127fa19b11fadc6afbff4400eb&w=1380",
	},
	{
		authorName: "Олександр Романенко",
		content:
			"Неймовірно корисний ресурс для вчителів, які прагнуть збагатити свої уроки цікавими словами та ідіомами. Значно полегшує підготовку до занять!",
		imageUrl:
			"https://img.freepik.com/free-photo/handsome-young-cheerful-man-with-arms-crossed_171337-1073.jpg?t=st=1712052498~exp=1712056098~hmac=24d4f6a912d17c27cff8888284208f96f0ae7afdcf5fabcad0725152fdd0f596&w=1380",
	},
	{
		authorName: "Вікторія Мельник",
		content:
			"Я захоплююсь багатством української мови, і цей словник дозволяє мені відкривати для себе нові слова та їх походження. Справжня знахідка для мовознавців!",
		imageUrl:
			"https://img.freepik.com/free-photo/pretty-smiling-joyfully-female-with-fair-hair-dressed-casually-looking-with-satisfaction_176420-15187.jpg?t=st=1712052469~exp=1712056069~hmac=adb9a84b344d4765f3aa6cf72498e18205ee589402366302d77ae214e6721736&w=1380",
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
