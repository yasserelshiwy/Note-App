import { useContext, useEffect } from "react";
import AddNoteMudel from "../../componants/AddNoteMudel/AddNoteMudel";
import CardNote from "../../componants/CardNote/CardNote";
import { noteContext } from "../../context/note.context";
import notnote from "../../assets/image/notes3.png";
import { Slide } from "react-awesome-reveal";
import { Helmet } from "react-helmet";
export default function Home() {
  let { getAllNotes, allNotes, deleteNote } = useContext(noteContext);

  useEffect(() => {
    getAllNotes();
  }, [allNotes]);

  return (
    <>
      <Helmet>
        <title>Note App</title>
        <meta name="description" content="home page" />
      </Helmet>
      <section className=" row layout all-sit ">
        <div className=" col-2 section-home-left px-0   ">
          <p className="text-white fs-3 text-center mt-3">
            <span>
              <i className="fa-regular fa-note-sticky text-info"></i>
            </span>
            Notes
          </p>
          <ul key={allNotes} className="px-0 note-lists d-block">
            <li>
              <p className="text-white  p-2  list-text ">
                notes :{" "}
                <span className="text-info fs-5 fw-bold">
                  {allNotes.length}
                </span>
              </p>
            </li>
            {allNotes.map((note) => (
              <>
                <Slide direction="up">
                  <li key={note._id}>
                    <p className="text-white  p-2  list-text d-flex gap-3 align-items-center ">
                      <i className="fa-solid fa-caret-right sami-blue"></i>
                      <span>{note.title}</span>
                      <i
                        onClick={() => {
                          deleteNote({ id: note._id });
                        }}
                        className="fa-solid fa-trash   icon fs-6 "
                      ></i>
                    </p>
                  </li>
                </Slide>
              </>
            ))}
          </ul>
        </div>

        {allNotes.length == [] ? (
          <div className="col-10  section-home-right px-0 d-flex justify-content-center align-items-center flex-column ">
            <div className="d-flex justify-content-end my-3 pe-4 px-0 ">
              <AddNoteMudel />
            </div>
            <img src={notnote} className="w-50 h-50" alt="" />
            <p className="fs-4">You do not have any Notes</p>
          </div>
        ) : (
          <>
            <div className=" col-10  section-home-right px-0 ">
              <div className="d-flex justify-content-end my-3 pe-4 px-0 ">
                <AddNoteMudel />
              </div>
              <div className=" row notes-section ms-4 ">
                {allNotes.map((note) => (
                  <CardNote key={note._id} noteInfo={note} />
                ))}
              </div>
            </div>
          </>
        )}
      </section>
    </>
  );
}
