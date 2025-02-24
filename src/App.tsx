import React, { useState } from "react";
import FormBuilder from "./components/FormBuilder";
import FormRenderer from "./components/FormRenderer";
import { FormSchema, Question } from "./types/formTypes";
import useLocalStorage from "./hooks/useLocalStorage";
import LOGO from './images/logo.png';
import Button from "./shared/Button";
import { isSmartphone } from "./utils/common";

export const initialSchema: FormSchema = {
  id: "form-1",
  title: "Form Preview",
  questions: [],
};

function App() {
  const [showForm, setShowForm] = useState(false);
  const [formSchema, setFormSchema] = useLocalStorage<FormSchema>(
    "formSchema",
    initialSchema
  );

  const handleAddQuestion = (question: Question) => {
    setFormSchema((prevSchema) => ({
      ...prevSchema,
      questions: [...prevSchema.questions, question],
    }));
    if (isSmartphone() && showForm) setShowForm(false);
  };

  return (
    <section className="main-wrapper">
      <aside className="sidebar">
        <img src={LOGO} alt="logo" />
        <Button onClick={() => setShowForm(!showForm)}>{showForm ? 'Close' : 'Create'}</Button>
      </aside>

      <section className="body">
        <section className="body-wrapper">
          <FormRenderer schema={formSchema} />
        </section>
      </section>

      {showForm && (
        <>
          {isSmartphone() && <div className="overlay" role="button" onClick={() => setShowForm(!showForm)} />}
          <aside className="form-builder">
            <h3>Create Your Form</h3>
            <FormBuilder onAddQuestion={handleAddQuestion} />
          </aside>
        </>
      )}
    </section>
  );
}

export default App;