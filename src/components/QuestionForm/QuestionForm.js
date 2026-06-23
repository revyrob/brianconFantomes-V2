import { Formik, Form } from "formik";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import React from "react";
import emailjs from "@emailjs/browser";

function QuestionForm() {
  const form = React.useRef();

  const sendEmail = (values, { resetForm }) => {
    emailjs
      .sendForm(
        process.env.REACT_APP_SERVICE_ID,
        process.env.REACT_APP_TEMPLATE_ID,
        form.current,
        process.env.REACT_APP_PUBLIC_KEY
      )
      .then(
        (result) => {
          console.log(result.text);
          resetForm();
        },
        (error) => {
          console.log(error.text);
        }
      );
  };

  return (
    <div
      id="contact"
      className="bg-slate-50 p-4 flex flex-col justify-around rounded-md"
    >
      <Formik
        initialValues={{ name: "", email: "", question: "" }}
        onSubmit={sendEmail}
      >
        {({ isSubmitting }) => (
          <Form ref={form} className="form" method="post">
            <div className="form__form flex flex-col justify-between h-72">
              <TextField
                name="name"
                required
                fullWidth
                id="name"
                label="Name"
              />
              <TextField
                name="email"
                required
                fullWidth
                id="email"
                label="Email"
              />
              <TextField
                name="question"
                required
                fullWidth
                id="question"
                label="Question"
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                style={{ backgroundColor: "#fcaf34", color: "white" }}
                sx={{ mt: 3, mb: 2 }}
                disabled={isSubmitting}
              >
                {isSubmitting ? "Submitting..." : "Submit"}
              </Button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
}

export default QuestionForm;
