import { Slide } from "react-awesome-reveal";
import notnote from "../../assets/image/notes3.png";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";

export default function GetStart() {
  return (
    <>
      <Helmet>
        <title>Note App</title>
        <meta name="description" content="page to get start" />
      </Helmet>
      <section className="layout">
        <div className="continer ">
          <div className=" d-flex justify-content-start get-start align-items-center gap-3 layout flex-column">
            <img src={notnote} className=" get-img" alt="" />
            <h2 className="fs-2 fw-bold">
              Welcome to{" "}
              <span className="sami-blue">
                <i className="fa-regular fa-note-sticky "></i> NotesApp
              </span>
            </h2>
            <div className="btn-info"></div>

            <Link
              to={"/login"}
              className=" text-decoration-none  text-dark   fs-5 fw-semibold btn btn-outline-info px-5 py-2 "
            >
              {" "}
              Let's get started
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
