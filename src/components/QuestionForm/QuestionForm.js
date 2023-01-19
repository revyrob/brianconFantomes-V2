import { Formik, Form } from "formik";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";

function QuestionForm() {
  //event handler for creating new comment
  const handleComment = (event) => {
    event.preventDefault();
    const question = event.target.question.value;
    if (question !== "") {
      event.preventDefault();
    }
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
        <Form className="form" method="post" onSubmit={handleComment}>
          <div className="form__form flex flex-col justify-between h-72 ">
            <TextField
              name="name"
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

export default QuestionForm;
