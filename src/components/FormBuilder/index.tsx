import { useState } from "react";
import { toast } from "react-toastify";
import { Question } from "../../types/formTypes";
import { saveQuestion } from "../../utils/api";
import QuestionInput from "./QuestionInput";
import { questionSchema } from "../../utils/validations";
import Button from "../../shared/Button";

interface FormBuilderProps {
	onAddQuestion: (question: Question) => void;
}

const FormBuilder = ({ onAddQuestion }: FormBuilderProps) => {
	const [currentQuestion, setCurrentQuestion] = useState<Partial<Question>>({});

	const handleAddQuestion = async () => {
		try {
			await questionSchema.validate(currentQuestion);
			const newQuestion = await saveQuestion(currentQuestion as Question);
			onAddQuestion(newQuestion);
			setCurrentQuestion({});
			toast.success("Question added successfully!");
		} catch (error: any) {
			toast.error("Validation failed: " + error?.errors?.join(", "));
		}
	};

	return (
		<>
			<QuestionInput question={currentQuestion} onChange={setCurrentQuestion} />
			<Button onClick={handleAddQuestion}>Add Question</Button>
		</>
	);
};

export default FormBuilder;