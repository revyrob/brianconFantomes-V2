import { useState } from "react";
import { Formik, Form } from "formik";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
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
    <>
      <Formik
        initialValues={{ question: "" }}
        onSubmit={async (values) => {
          await new Promise((resolve) => setTimeout(resolve, 500));
          alert(JSON.stringify(values, null, 2));
        }}
      >
        <Form className="form" method="post" onSubmit={handleComment}>
          <div className="form__form">
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

      {/* <Modal show={show} onHide={handleShow}>
        <Modal.Header closeButton>
          <Modal.Title>Thanks for your question!</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Check back tomorrow for an answer to your question.
        </Modal.Body>
        <Modal.Footer>
          <Button1 variant="primary" onClick={handleClose}>
            Ok👌
          </Button1>
        </Modal.Footer>
      </Modal> */}
    </>
  );
}

export default AskQuestions;
