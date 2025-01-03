import { useContext, useEffect, useState } from "react";
import { noteContext } from "../../context/note.context";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

import axios from "axios";
import { userContext } from "../../context/user.context";
import { useFormik } from "formik";
import { object, string } from "yup";
import { Slide } from "react-awesome-reveal";

export default function CardNote({ noteInfo }) {
  let { title, content, _id } = noteInfo;
  let { deleteNote } = useContext(noteContext);
  let { token } = useContext(userContext);
  let { getAllNotes } = useContext(noteContext);

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
  async function UpdateNote(values) {
    try {
      const options = {
        url: `https://note-sigma-black.vercel.app/api/v1/notes/${_id}`,
        method: "PUT",
        headers: {
          token: `3b8ny__${token}`,
        },
        data: values,
      };
      let { data } = axios.request(options);
      getAllNotes();
      handleClose();
    } catch (error) {
      console.log(error);
    }
  }
  let formik = useFormik({
    initialValues: {
      title: title,
      content: content,
    },
    validationSchema,
    onSubmit: UpdateNote,
  });

  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Update Note</Modal.Title>
        </Modal.Header>
        <form
          onSubmit={formik.handleSubmit}
          className="d-flex px-1 gap-3 justify-content-center flex-column align-items-center align-content-center w-100"
        >
          <div className="w-100 mt-3">
            <input
              type="text"
              className="form-control w-100"
              placeholder="please enter title"
              name="title"
              id="title"
              value={formik.values.title}
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
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
              id="content"
              value={formik.values.content}
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
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
              Update Note
            </Button>
          </Modal.Footer>
        </form>
      </Modal>
      <Slide
        direction="up"
        className="col-md-5 py-3 m-3 bg-white card rounded-3 shadow-card"
      >
        <div className=" ">
          <div>
            <h2 className="fs-5  fw-medium fw-bold sami-blue border-bottom pb-2">
              Note title :
              <span className="fs-5 fw-medium   text-black "> {title}</span>
            </h2>
            <p className="fs-5 border-bottom py-2  ">
              <i className="fa-solid fa-caret-right sami-blue"></i>
              <span className="ms-2">{content}</span>
            </p>
          </div>
          <div>
            <i
              onClick={handleShow}
              className="fa-regular fa-pen-to-square m-3 fa-xl icon text-success"
            ></i>

            <i
              onClick={() => {
                deleteNote({ id: _id });
              }}
              className="fa-solid fa-trash m-3 fa-xl icon text-danger"
            ></i>
          </div>
        </div>
      </Slide>
    </>
  );
}
