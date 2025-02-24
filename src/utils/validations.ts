import * as yup from "yup";
import { Question } from "../types/formTypes";

export const questionSchema = yup.object({
	type: yup.string().oneOf(["text", "number", "select"]).required("Type is required"),
	label: yup.string().required("Label is required"),
	options: yup.array().of(yup.string()).optional(),
});

export const getFormDataSchema = (questions: Question[]) => {
	return yup.object().shape(
		questions.reduce((acc, question) => {
			let fieldSchema;
			switch (question.type) {
				case "text":
					fieldSchema = yup.string().required("This field is required");
					break;
				case "number":
					fieldSchema = yup
						.number()
						.required("This field is required")
						.typeError("Must be a number");
					break;
				case "select":
					fieldSchema = yup.string().required("This field is required");
					break;
				default:
					fieldSchema = yup.string();
			}
			acc[question.id] = fieldSchema;
			return acc;
		}, {} as { [key: string]: yup.AnySchema })
	);
};