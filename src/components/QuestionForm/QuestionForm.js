import { Formik, Form } from "formik";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import React, { useRef } from "react";
import emailjs from "@emailjs/browser";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function QuestionForm() {
  const form = useRef();

  //const apiKey = `${process.env.REACT_APP_APIKEY}`;
  const SERVICE_ID = `${process.env.REACT_APP_SERVICE_ID}`;
  const TEMPLATE_ID = `${process.env.REACT_APP_TEMPLATE_ID}`;
  const PUBLIC_KEY = `${process.env.REACT_APP_PUBLIC_KEY}`;

  //function to clearForm after it has been successful
  const clearForm = (e) => {
    e.target.user_name.value = "";
    e.target.user_email.value = "";
    e.target.message.value = "";
  };

  //function to validate Email
  function validateEmail(value) {
    let errorMessage;
    if (!value) {
      errorMessage = "Email Required";
      toast("Email Required");
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)) {
      errorMessage = "Invalid email address";
      toast("Invalid email address");
    }
    return errorMessage;
  }

  //send email function for emailjs
  const sendEmail = (e) => {
    e.preventDefault();
    const email = e.target.user_email.value;
    if (validateEmail(email)) {
      emailjs.sendForm(SERVICE_ID, TEMPLATE_ID, form.current, PUBLIC_KEY).then(
        (result) => {
          //put a module in here if it was successful
          toast("Your question has been sent!");
          clearForm(e);
          //console.log(result.text);
        },
        (error) => {
          //put a modal in here if it wasn't successful
          toast("Sorry your question was not sent😟");
          //console.log(error.text);
        }
      );
    } else {
      toast("Invalid Email");
    }
  };
  return (
    <div
      id="contact"
      className="bg-slate-50 p-4 flex flex-col justify-around rounded-md"
    >
      <Formik
        initialValues={{ user_name: "", user_email: "", message: "" }}
        onSubmit={async (values, { resetForm }) => {
          await new Promise((resolve) => setTimeout(resolve, 500));
          alert(JSON.stringify(values, null, 2));
          resetForm({ user_name: "", user_email: "", message: "" });
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
              validate={validateEmail}
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
            <ToastContainer />
          </div>
        </Form>
      </Formik>
    </div>
  );
}

export default QuestionForm;
