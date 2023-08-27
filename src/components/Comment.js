import React from "react";
import { useState, useEffect, useRef } from "react";
import { ReactComponent as DownArrow } from "../assets/down-arrow.svg";
import { ReactComponent as UpArrow } from "../assets/up-arrow.svg";

import UnLiked from "../assets/unliked.png";
import Liked from "../assets/liked.png";
import Action from "./Action";
import Avatar from "./Avatar";

const Comment = ({
  comments,
  handleInsertNode,
  handleEditNode,
  handleDeleteNode,
}) => {
  const [input, setInput] = useState("");
  const [editMode, setEditMode] = useState(false);
  const [showInput, setShowInput] = useState(false);
  const [expand, setExpand] = useState(false);
  const [liked, setLiked] = useState(false)
  const inputRef = useRef(null);

  const onAddComment = () => {
    
    if(input.length > 200){
        alert("comment cann't be more than 200 character long. reduce your comment length.")
        return;
    }

    if (editMode) {
      handleEditNode(comments.id, inputRef?.current?.innerText);
    } else {
      setExpand(true);
      handleInsertNode(comments.id, input);
      setInput("");
      setShowInput(false);
    }

    if (editMode) setEditMode(false);
  };

  const handleNewComment = () => {
    setExpand(!expand);
    setShowInput(true);
  };

  const handleDelete = () => {
    handleDeleteNode(comments.id);
  };

  useEffect(() => {
    inputRef?.current?.focus();
  }, [editMode]);

  return (
    <>
      {comments.id === 1 ? (
        <div style={{ display: "flex", alignItems: "center", gap: "5px" }}>
          <Avatar />
          <div className="inputContainer">
            <input
              type="text"
              className="inputContainer__input first_input"
              autoFocus
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="What are your thoughts ?"
            />
            <Action
              className="reply comment"
              type="COMMENT"
              handleClick={onAddComment}
            />
          </div>
        </div>
      ) : (
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            marginTop: "10px",
            gap: "5px",
          }}
        >
          <Avatar />
          <div className="commentContainer">
            <span style={{marginBottom:"2px", textDecorationColor:"blue"}}>Hirak Mahata</span>
            <span
              contentEditable={editMode}
              suppressContentEditableWarning={editMode}
              ref={inputRef}
              style={{ wordWrap: "break-word", fontWeight: "bolder" }}
            >
              {comments.name}
            </span>
            <div style={{ display: "flex", marginTop: "2px" }}>
              {editMode ? (
                <>
                  <Action
                    className="reply"
                    type="SAVE"
                    handleClick={onAddComment}
                  />
                  <Action
                    className="reply"
                    type="CANCEL"
                    handleClick={() => {
                      if (inputRef.current)
                        inputRef.current.innerText = comments.name;
                      setEditMode(false);
                    }}
                  />
                </>
              ) : (
                <>
                  <Action
                    className="reply"
                    type={
                      <>
                        {expand ? (
                          <UpArrow width="10px" height="10px" />
                        ) : (
                          <DownArrow width="10px" height="10px" />
                        )}{" "}
                        REPLY
                      </>
                    }
                    handleClick={handleNewComment}
                  />
                  <Action
                    className="reply"
                    type={
                        <>
                          {liked ? (
                            <img src={Liked} alt="Like" style={{height: "20px"}} />
                          ) : (
                            <>
                            <img src={UnLiked} alt="Like" style={{height: "20px"}} />
                            </>
                          )}
                        </>
                      }
                      handleClick={() => {
                        setLiked(!liked);
                      }}
                  />
                  <Action
                    className="reply"
                    type="EDIT"
                    handleClick={() => {
                      setEditMode(true);
                    }}
                  />
                  <Action
                    className="reply"
                    type="DELETE"
                    handleClick={handleDelete}
                  />
                </>
              )}
            </div>
          </div>
        </div>
      )}
      {/* </div> */}

      <div style={{ display: expand ? "block" : "none", paddingLeft: 25 }}>
        {showInput && (
          <div className="inputContainer">
            <input
              type="text"
              className="inputContainer__input"
              autoFocus
              onChange={(e) => setInput(e.target.value)}
            />
            <Action className="reply" type="REPLY" handleClick={onAddComment} />
            <Action
              className="reply"
              type="CANCEL"
              handleClick={() => {
                setShowInput(false);
                if (!comments?.items?.length) setExpand(false);
              }}
            />
          </div>
        )}
        {comments?.items?.map((comment) => {
          return (
            <Comment
              key={comment.id}
              comments={comment}
              handleInsertNode={handleInsertNode}
              handleEditNode={handleEditNode}
              handleDeleteNode={handleDeleteNode}
            />
          );
        })}
      </div>
    </>
  );
};

export default Comment;
