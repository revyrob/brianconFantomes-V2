import { useState } from "react";
import { Formik, Form } from "formik";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Textarea from "@mui/joy/Textarea";
//import Modal from "react-bootstrap/Modal";
//import Button1 from "react-bootstrap/Button";

function AskQuestions() {
  const [show, setShow] = useState(false);
  const refreshPage = () => {
    window.location.reload();
  };

  const handleClose = () => {
    refreshPage();
  };
  const handleShow = () => setShow(true);

  //event handler for creating new comment
  const handleComment = (event) => {
    event.preventDefault();
    const question = event.target.question.value;
    if (question !== "") {
      setShow(true);
      event.preventDefault();
    }
  };

  return (
    <div className="bg-white p-4 flex flex-col justify-around">
      <Formik
        initialValues={{ question: "" }}
        onSubmit={async (values) => {
          await new Promise((resolve) => setTimeout(resolve, 500));
          alert(JSON.stringify(values, null, 2));
        }}
      >
        <Form className="form" method="post" onSubmit={handleComment}>
          <div className="form__form flex flex-col justify-around ">
            <TextField
              name="Name"
              required
              fullWidth
              id="name"
              label="Name"
              autoFocus
            />
            <TextField
              name="email"
              required
              fullWidth
              id="email"
              label="Email"
              autoFocus
            />
            <TextField
              name="question"
              required
              fullWidth
              id="question"
              label="Question"
              autoFocus
            />

            <Button
              type="submit"
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

export default AskQuestions;
