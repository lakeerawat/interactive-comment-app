import { useState,useEffect } from "react";
import Comment from "./components/Comment";
import useNode from "./hooks/useNode";
import "./styles.css";

const comments = {
  id: 1,
  items: [],
};
const App = () => {
  // const [commentsData, setCommentsData] = useState(comments);
  const [commentsData, setCommentsData] = useState(
    JSON.parse(localStorage.getItem("comment")) || comments
  );

  const { insertNode, editNode, deleteNode } = useNode();

  const handleInsertNode = (folderId, item) => {
    const finalStructure = insertNode(commentsData, folderId, item);
    setCommentsData(finalStructure);
  };

  const handleEditNode = (folderId, value) => {
    const finalStructure = editNode(commentsData, folderId, value);
    setCommentsData(finalStructure);
  };

  const handleDeleteNode = (folderId) => {
    const finalStructure = deleteNode(commentsData, folderId);
    const temp = { ...finalStructure };
    setCommentsData(temp);
  };
  useEffect(() => {
    localStorage.setItem("comment", JSON.stringify(commentsData));
  }, [commentsData]);
  return (
    <div className="App">
      <div className="headerDiv"><p> Welcome to Comment App </p></div>
      <div className="commentDiv">
      <Comment
        handleInsertNode={handleInsertNode}
        handleEditNode={handleEditNode}
        handleDeleteNode={handleDeleteNode}
        comment={commentsData}
      />
      </div>
    </div>
  );
};

export default App;
