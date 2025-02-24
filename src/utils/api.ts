import { Question } from "../types/formTypes";

export function saveQuestion(question: Question): Promise<Question> {
	return new Promise((resolve, reject) => {
		setTimeout(() => {
			try {
				const savedQuestions: Question[] = JSON.parse(localStorage.getItem("questions") || "[]");
				const id = Math.random().toString(36).substring(2);
				const newQuestion = { ...question, id };
				localStorage.setItem("questions", JSON.stringify([...savedQuestions, newQuestion]));
				resolve(newQuestion);
			} catch (error) {
				reject(error);
			}
		}, 1000);
	});
}
