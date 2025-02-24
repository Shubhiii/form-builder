
import { Question } from "../../types/formTypes";
import { UseFormRegister } from "react-hook-form";

interface FormFieldProps {
	question: Question;
	register: UseFormRegister<any>;
	errors: any;
}

const renderField = (question: Question, register: UseFormRegister<any>) => {
	switch (question.type) {
		case 'text':
			return <input type="text" {...register(question.id)} />
		case 'number':
			return <input type="number" {...register(question.id)} />
		case 'select':
			return (
				<select {...register(question.id)}>
					<option value="">Select an option</option>
					{question?.options?.map((option) => (
						<option key={option} value={option}>
							{option}
						</option>
					))}
				</select>
			)
		default: <></>
	}
}

const FormField = ({ question, register, errors }: FormFieldProps) => {
	return (
		<div key={question.id} className="form-group">
			<label htmlFor={question.id}>{question.label}</label>
			{renderField(question, register)}
			{errors[question.id] && (
				<span>{errors[question.id]?.message}</span>
			)}
		</div>
	);
};

export default FormField;