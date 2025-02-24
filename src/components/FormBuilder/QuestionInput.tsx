import { Question, QuestionType } from "../../types/formTypes";

interface QuestionInputProps {
	question: Partial<Question>;
	onChange: (question: Partial<Question>) => void;
}

const QuestionInput = ({ question, onChange }: QuestionInputProps) => {
	return (
		<>
			<div className="form-group">
				<select
					value={question.type || ""}
					onChange={(e) =>
						onChange({ ...question, type: e.target.value as QuestionType })
					}
				>
					<option value="">Select Type</option>
					<option value="text">Text</option>
					<option value="number">Number</option>
					<option value="select">Select</option>
				</select>
			</div>

			{question.type && (
				<div className="form-group">
					<label>Question Label</label>
					<input
						type="text"
						placeholder="Enter here..."
						value={question.label || ""}
						onChange={(e) => onChange({ ...question, label: e.target.value })}
					/>
				</div>
			)}

			{question.type === "select" && (
				<div className="form-group">
					<label>Options</label>
					<input
						type="text"
						placeholder="Options (comma separated)"
						onChange={(e) =>
							onChange({ ...question, options: e.target.value.split(",") })
						}
					/>
				</div>
			)}
		</>
	);
};

export default QuestionInput;