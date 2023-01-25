import { Formik, Form } from "formik";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import React, { useRef } from "react";
import emailjs from "@emailjs/browser";

function QuestionForm() {
  const form = useRef();

  //event handler for creating new comment
  // const handleComment = (event) => {
  //   event.preventDefault();
  //   const question = event.target.question.value;
  //   if (question !== "") {
  //     event.preventDefault();
  //   }
  // };

  //const apiKey = `${process.env.REACT_APP_APIKEY}`;
  const SERVICE_ID = `${process.env.REACT_APP_SERVICE_ID}`;
  const TEMPLATE_ID = `${process.env.REACT_APP_TEMPLATE_ID}`;
  const PUBLIC_KEY = `${process.env.REACT_APP_PUBLIC_KEY}`;

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs.sendForm(SERVICE_ID, TEMPLATE_ID, form.current, PUBLIC_KEY).then(
      (result) => {
        console.log(result.text);
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
        initialValues={{ question: "" }}
        onSubmit={async (values) => {
          await new Promise((resolve) => setTimeout(resolve, 500));
          alert(JSON.stringify(values, null, 2));
        }}
      >
        <Form className="form" method="post" ref={form} onSubmit={sendEmail}>
          <div className="form__form flex flex-col justify-between h-72 ">
            <TextField
              name="user_name"
              required
              fullWidth
              id="name"
              label="Name"
            />
            <TextField
              name="user_email"
              required
              fullWidth
              id="email"
              label="Email"
            />
            <TextField
              name="message"
              required
              fullWidth
              id="question"
              label="Question"
            />

            <Button
              type="submit"
              value="send"
              fullWidth
              variant="contained"
              style={{ backgroundColor: "#fcaf34", color: "white" }}
              sx={{ mt: 3, mb: 2 }}
            >
              Submit
            </Button>
          </div>
        </Form>
      </Formik>
    </div>
  );
}

export default QuestionForm;
