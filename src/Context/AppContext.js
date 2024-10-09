import { createContext, useState } from "react";
import { baseUrl } from "../baseUrl";
import axios from "axios";

export const AppContext = createContext();

function AppContextProvider({ children }) {
  const [loding, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(null);
  const [posts, setPosts] = useState([]);

  async function fetchblogs(page = 1) {
    setLoading(true);
    let url = `${baseUrl}?page=${page}`;
    try {
      const response = await axios.get(url);
      const data = response.data;
      setPage(data.page);
      setTotalPages(data.totalPages);
      setPosts(data.posts || []);
    } catch (e) {
      console.log("Error");
      setPage(1);
      setPosts([]);
      setTotalPages(null);
    }
    setLoading(false);
  }

  function handlerPageChange(page) {
    setPage(page);
    fetchblogs(page);
  }

  const value = {
    loding,
    setLoading,
    page,
    setPage,
    totalPages,
    setTotalPages,
    posts,
    setPosts,
    fetchblogs,
    handlerPageChange,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export default AppContextProvider;
