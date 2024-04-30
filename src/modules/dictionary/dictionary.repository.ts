import { capitalize } from "~/libs/helpers/helpers.js";
import { Word, WordView } from "~/libs/modules/db/models/models.js";

import { type WordRecordDto } from "./libs/types/types.js";

class DictionaryRepository {
	public async addWord({ partOfSpeech, word }: WordRecordDto): Promise<number> {
		const newWord = await Word.create({
			partOfSpeech,
			word: capitalize(word),
		});

		return newWord.id;
	}

	public findWord(word: string): Promise<Word | null> {
		return Word.findOne({ where: { word } });
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

		return await Word.findAll({
			where: {
				id: wordIds,
			},
		});
	}

	public async incrementWordViewCount({
		userId,
		wordId,
	}: {
		userId: number;
		wordId: number;
	}): Promise<WordView> {
		const existingWordView = await WordView.findOne({
			where: {
				userId,
				wordId,
			},
		});

		if (existingWordView) {
			existingWordView.count += 1;
			await existingWordView.save();
			return existingWordView;
		}
		const newWordView = await WordView.create({
			userId,
			wordId,
		});
		return newWordView;
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
