import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { FormSchema, FormData, Question } from "../../types/formTypes";
import { toast } from "react-toastify";
import FormField from "./FormField";
import { getFormDataSchema } from "../../utils/validations";
import { useState } from "react";
import Button from "../../shared/Button";
import { saveQuestion } from "../../utils/api";
import NO_DATA from "../../images/no-data.png";

interface FormRendererProps {
	schema: FormSchema;
}

const FormRenderer = ({ schema }: FormRendererProps) => {
	const [submittedData, setSubmittedData] = useState<FormSchema | null>(null);
	const {
		register,
		handleSubmit,
		formState: { errors },
		reset
	} = useForm({
		resolver: yupResolver(getFormDataSchema(schema.questions)),
	});


	const onSubmit: SubmitHandler<FormData> = async (data) => {
		try {
			const updatedQuestions: any = schema.questions.map((question) => {
				const matchedValue = data[question.id];
				return matchedValue !== undefined ? { ...question, value: matchedValue } : question;
			});
			await Promise.all(updatedQuestions.map((q: Question) => saveQuestion(q)));
			setSubmittedData(updatedQuestions);
			toast.success("Form submitted successfully!");

			reset();
		} catch (error) {
			toast.error("Failed to save questions.");
		}
	};

	if (!schema?.questions?.length) {
		return (
			<div className="no-data">
				<img src={NO_DATA} alt="no-data-found" />
				<p>No Data Found!</p>
			</div>
		)
	}


	return (
		<section className="form-data">
			<form onSubmit={handleSubmit(onSubmit)}>
				<h2>{schema.title}</h2>
				<div className="form-wrapper">
					{schema.questions.map((question) => (
						<FormField
							key={question.id}
							question={question}
							register={register}
							errors={errors}
						/>
					))}
				</div>
				<Button type="submit">Submit</Button>
			</form>

			{submittedData && (
				<div className="saved-data">
					<h2>Data</h2>
					<pre>{JSON.stringify(submittedData, null, 2)}</pre>
				</div>
			)}
		</section>
	);
};

export default FormRenderer;