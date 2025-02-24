export type QuestionType = "text" | "number" | "select";

export interface Question {
	id: string;
	type: QuestionType;
	label: string;
	required?: boolean;
	options?: string[];
}

export interface FormSchema {
	id: string;
	title: string;
	questions: Question[];
	value?: string | number;
}

export interface FormData {
	[key: string]: string | number;
}