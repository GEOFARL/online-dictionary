import { capitalize } from "~/libs/helpers/helpers.js";
import { db } from "~/libs/modules/db/db.js";
import { Word, WordView } from "~/libs/modules/db/models/models.js";

import { type WordRecordDto } from "./libs/types/types.js";

class DictionaryRepository {
	public async addWord({ partOfSpeech, word }: WordRecordDto): Promise<number> {
		const result = await db.transaction(async (transaction) => {
			const newWord = await Word.create(
				{
					partOfSpeech,
					word: capitalize(word),
				},
				{ transaction },
			);

			return newWord.id;
		});

		return result;
	}

	public async checkIsLiked({
		userId,
		word,
	}: {
		userId: number;
		word: string;
	}): Promise<boolean> {
		const wordRecord = await Word.findOne({
			where: { word: capitalize(word) },
		});

		if (!wordRecord) {
			return false;
		}

		const favorite = await db.models.favorite_words.findOne({
			where: {
				userId,
				wordId: wordRecord.id,
			},
		});

		return Boolean(favorite);
	}

	public async findOrCreateWord(word: string) {
		const [wordObject] = await Word.findOrCreate({
			defaults: { word: capitalize(word) },
			where: { word: capitalize(word) },
		});

		return wordObject;
	}

	public findWord(word: string): Promise<Word | null> {
		return Word.findOne({ where: { word: capitalize(word) } });
	}

	public async getWordsViewedByUser(
		userId: number,
		numberOfWords: number,
	): Promise<Word[]> {
		const wordViews = await WordView.findAll({
			attributes: ["wordId"],
			limit: numberOfWords,
			order: [["updatedAt", "DESC"]],
			where: { userId },
		});

		const wordIds = wordViews.map((view) => view.wordId);

		if (!wordIds.length) return [];

		const words = await Word.findAll({
			where: {
				id: wordIds,
			},
		});

		return wordIds
			.map((id) => words.find((word) => word.id === id))
			.filter((word) => word !== undefined);
	}

	public incrementWordViewCount({
		userId,
		wordId,
	}: {
		userId: number;
		wordId: number;
	}): Promise<WordView> {
		return db.transaction(async (transaction) => {
			const existingWordView = await WordView.findOne({
				transaction,
				where: { userId, wordId },
			});

			if (existingWordView) {
				existingWordView.count += 1;
				await existingWordView.save({ transaction });
				return existingWordView;
			}

			const newWordView = await WordView.create(
				{
					userId,
					wordId,
				},
				{ transaction },
			);

			return newWordView;
		});
	}

	public async saveWordOfTheDay({
		partOfSpeech,
		word,
	}: {
		partOfSpeech: string;
		word: string;
	}) {
		const transaction = await Word.sequelize.transaction();

		try {
			await Word.update(
				{ isWordOfTheDay: false },
				{ transaction, where: { isWordOfTheDay: true } },
			);

			const existingWord = await Word.findOne({
				transaction,
				where: { word: capitalize(word) },
			});

			if (existingWord) {
				existingWord.isWordOfTheDay = true;
				await existingWord.save({ transaction });
			} else {
				await Word.create(
					{
						isWordOfTheDay: true,
						partOfSpeech,
						word: capitalize(word),
					},
					{ transaction },
				);
			}

			await transaction.commit();
		} catch (error) {
			await transaction.rollback();
			throw error;
		}
	}
}

export { DictionaryRepository };
