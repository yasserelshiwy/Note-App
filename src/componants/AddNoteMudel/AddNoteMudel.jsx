import { useFormik } from "formik";
import { useContext, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { object, string } from "yup";
import { userContext } from "../../context/user.context";
import axios from "axios";
import { noteContext } from "../../context/note.context";
import { useNavigate } from "react-router-dom";

export default function AddNoteMudel() {
  let { getAllNotes } = useContext(noteContext);
  let Navigate = useNavigate();
  let { token } = useContext(userContext);

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const validationSchema = object({
    title: string()
      .required("Note title is required")
      .min(1, "Name must be at least 1 characters")
      .max(35, "Name can not be more than 35 characters"),
    content: string().required("content is required"),
  });
  async function addNote(values) {
    try {
      const options = {
        url: "https://note-sigma-black.vercel.app/api/v1/notes",
        method: "POST",
        headers: {
          token: `3b8ny__${token}`,
        },
        data: values,
      };
      let { data } = await axios.request(options);
      getAllNotes();
      handleClose();
    } catch (error) {
      console.log(error);
    }
  }

  let formik = useFormik({
    initialValues: {
      title: "",
      content: "",
    },
    validationSchema,
    onSubmit: addNote,
  });

  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        Add Note
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add Note</Modal.Title>
        </Modal.Header>
        <form className="d-flex px-1 gap-3 justify-content-center flex-column align-items-center align-content-center w-100">
          <div className="w-100 mt-3">
            <input
              type="text"
              className="form-control w-100"
              placeholder="please enter title"
              name="title"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.errors.title && formik.touched.title && (
              <p className="text-danger">*{formik.errors.title}</p>
            )}
          </div>
          <div className="w-100 mb-3">
            <textarea
              type="text"
              className="form-control w-100"
              placeholder="please enter content"
              name="content"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.errors.content && formik.touched.content && (
              <p className="text-danger">*{formik.errors.content}</p>
            )}
          </div>
          <Modal.Footer className="w-100">
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button variant="primary" onClick={formik.handleSubmit}>
              Add Note
            </Button>
          </Modal.Footer>
        </form>
      </Modal>
    </>
  );
}
