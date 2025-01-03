export default function Footer() {
  return (
    <>
      <footer className="bg-info py-1">
        <div className="container-fluid">
          <div className="text-center  ">
            <h2 className="text-black mb-0 mt-3 fs-3  text-decoration-none fw-bold text-2xl d-flex gap-2 justify-content-center align-items-center">
              <i className="fa-regular fa-note-sticky  fs-1"></i>
              NotesApp
            </h2>
            <div>
              <p className="text-secondary fs-5 mt-2">
                You can safely record your notes today here.
              </p>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
