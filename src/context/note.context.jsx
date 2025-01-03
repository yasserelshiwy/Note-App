import { createContext, useContext, useState } from "react";
import { userContext } from "./user.context";
import axios from "axios";

export const noteContext = createContext(null);

export default function NoteProvider({ children }) {
  let { token } = useContext(userContext);

  let [allNotes, setAllNotes] = useState([]);
  let [deletNotes, setDeleteNotes] = useState(null);

  async function getAllNotes() {
    try {
      const options = {
        url: "https://note-sigma-black.vercel.app/api/v1/notes",
        method: "GET",
        headers: {
          token: `3b8ny__${token}`,
        },
      };
      let { data } = await axios.request(options);

      setAllNotes(data.notes);
    } catch (error) {
      console.log(error);
    }
  }
  async function deleteNote({ id }) {
    try {
      const options = {
        url: `https://note-sigma-black.vercel.app/api/v1/notes/${id}`,
        method: "DELETE",
        headers: {
          token: `3b8ny__${token}`,
        },
      };
      let { data } = await axios.request(options);

      setDeleteNotes(data);
      getAllNotes();
    } catch (error) {
      console.log(error);
    } finally {
      getAllNotes();
    }
  }

  return (
    <noteContext.Provider
      value={{
        getAllNotes,
        allNotes,
        deleteNote,
        setAllNotes,
        deletNotes,
      }}
    >
      {children}
    </noteContext.Provider>
  );
}
