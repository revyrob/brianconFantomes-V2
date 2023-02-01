import { Formik, Form } from "formik";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import React, { useRef } from "react";
import emailjs from "@emailjs/browser";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useEffect, useState, useContext } from "react";
import { LanguageContext } from "../../Language";

function QuestionForm() {
  const form = useRef();

  //use context to bring in the dictionary of the the two languages
  const { dictionary } = useContext(LanguageContext);

  const intialValues = { email: "", name: "", message: "" };
  const [formValues, setFormValues] = useState(intialValues);
  const [formErrors, setFormErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const SERVICE_ID = `${process.env.REACT_APP_SERVICE_ID}`;
  const TEMPLATE_ID = `${process.env.REACT_APP_TEMPLATE_ID}`;
  const PUBLIC_KEY = `${process.env.REACT_APP_PUBLIC_KEY}`;

  //no errors and pressed on submit
  const submit = () => {
    sendEmail();
  };

  //input change handler
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  //form submission handler
  const handleSubmit = (e) => {
    e.preventDefault();
    setFormErrors(validate(formValues));
    setIsSubmitting(true);
  };

  //form validation handler
  const validate = (values) => {
    let errors = {};
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;

    //validation for email that has numbers/letters + @ + .'somthing'
    if (!values.email) {
      errors.email = `${dictionary.blankError}`;
    } else if (!regex.test(values.email)) {
      errors.email = `${dictionary.invalidFormat}`;
    }

    return errors;
  };

  useEffect(() => {
    if (Object.keys(formErrors).length === 0 && isSubmitting) {
      submit();
    }
  }, [formErrors, isSubmitting]);

  //send email function for emailjs
  const sendEmail = (e) => {
    emailjs.sendForm(SERVICE_ID, TEMPLATE_ID, form.current, PUBLIC_KEY).then(
      (result) => {
        //put a module in here if it was successful
        setFormValues({ email: "", name: "", message: "" });
      },
      (error) => {
        //put a modal in here if it wasn't successful
        toast(`${dictionary.notSubmitted}`);
      }
    );
  };

  return (
    <div
      id="contact"
      className="bg-slate-50 p-4 flex flex-col justify-around rounded-md"
    >
      {Object.keys(formErrors).length === 0 && isSubmitting && (
        <span className="text-white bg-green-600 inline-block w-full align-center p-2 mb-2 rounded">
          {`${dictionary.submitted}`}
        </span>
      )}

      <Formik
        initialValues={{ user_name: "", user_email: "", message: "" }}
        onSubmit={async (values, { resetForm }) => {
          await new Promise((resolve) => setTimeout(resolve, 500));
          alert(JSON.stringify(values, null, 2));
          resetForm({ user_name: "", user_email: "", message: "" });
        }}
      >
        <Form className="form" method="post" ref={form} onSubmit={handleSubmit}>
          <div className="form__form flex flex-col justify-between h-72 ">
            <TextField
              name="name"
              value={formValues.name}
              onChange={handleChange}
              required
              fullWidth
              id="name"
              label={`${dictionary.form[0]}`}
            />
            <TextField
              name="email"
              value={formValues.email}
              onChange={handleChange}
              className={formErrors.email && "border-red-800"}
              required
              fullWidth
              id="email"
              label={`${dictionary.form[1]}`}
              type="email"
            />
            {formErrors.email && (
              <span className="text-red-700 flex items-start ml-2">
                {formErrors.email}
              </span>
            )}
            <TextField
              name="message"
              value={formValues.message}
              required
              fullWidth
              id="question"
              label={`${dictionary.form[2]}`}
              onChange={handleChange}
            />

            <Button
              type="submit"
              value="send"
              fullWidth
              variant="contained"
              style={{ backgroundColor: "#fcaf34", color: "white" }}
              sx={{ mt: 3, mb: 2 }}
            >
              {`${dictionary.form[3]}`}
            </Button>
            <ToastContainer />
          </div>
        </Form>
      </Formik>
    </div>
  );
}

export default QuestionForm;
