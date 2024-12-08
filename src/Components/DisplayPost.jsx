import { FaTrash } from "react-icons/fa";
import { useEffect, useState } from "react";
import axios from "axios";
import "./DisplayPost.css";
import { useNavigate } from "react-router-dom";

const DisplayPost = ({ post, setPostListData, postListData }) => {
  const [regId, setRegId] = useState("");
  const [commentText, setCommentText] = useState("");
  const [comments, setComments] = useState([]);
  const [showComments, setShowComments] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const reg_id1 = localStorage.getItem("reg_id");
    if (reg_id1) {
      const reg_id2 = JSON.parse(reg_id1);
      setRegId(reg_id2);
    } else {
      navigate("/login");
    }
  }, [navigate]);

  const getCommentsForPost = async (postId) => {
    try {
      const res = await axios.get(
        `http://localhost/social_media/post/get_comments.php?post_id=${postId}`
      );
      setComments(res.data);
    } catch (error) {
      console.log("Something went wrong", error);
    }
  };

  const deletePost = async (postId) => {
    try {
      await axios.get(
        `http://localhost/social_media/post/delete_post_data.php?post_id=${postId}`
      );
      const newData = postListData.filter((item) => item.post_id !== postId);
      setPostListData(newData);
    } catch (error) {
      console.log("Something went wrong", error);
    }
  };

  const deleteComment = async (commentId) => {
    try {
      await axios.get(
        `http://localhost/social_media/post/delete_comment.php?comment_id=${commentId}`
      );
      setComments(
        comments.filter((comment) => comment.comment_id !== commentId)
      );
    } catch (error) {
      console.log("Something went wrong", error);
    }
  };

  const handleOnChange = (e) => {
    setCommentText({
      ...commentText,
      [e.target.name]: e.target.value,
    });
  };

  const handleCommentSubmit = async (e) => {
    e.preventDefault();

    try {
      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      };
      const formData = new FormData();
      formData.append("comment_desc", commentText.comment_desc);
      formData.append("reg_id", regId);
      formData.append("post_id", post.post_id);

      await axios.post(
        `http://localhost/social_media/post/add_comments.php`,
        formData,
        config
      );

      setCommentText(""); // reset comment text
      getCommentsForPost(post.post_id);
    } catch (error) {
      console.log("Something went wrong", error);
    }
  };

  const handleCommentButtonClick = () => {
    if (!showComments) {
      getCommentsForPost(post.post_id);
    }
    setShowComments(!showComments);
  };

  return (
    <div className="post-card">
      <div className="post-header">
        <div></div>
        <FaTrash
          className="delete-icon"
          onClick={() => deletePost(post.post_id)}
        />
      </div>
      <div className="post-body">
        <p>{post.post_desc}</p>
        {post.img && (
          <img
            src={`http://localhost/social_media/post/images/${post.img}`}
            alt="Post"
            className="post-image d-block w-100"
          />
        )}
      </div>
      <div className="post-actions">
        <button>Like</button>
        <button onClick={handleCommentButtonClick}>Comment</button>
        <button>Share</button>
      </div>
      {showComments && (
        <div className="post-comments">
          <form onSubmit={handleCommentSubmit}>
            <input
              type="text"
              placeholder="Add a comment..."
              value={commentText.comment_desc || ""}
              name="comment_desc"
              onChange={handleOnChange}
            />
            <button type="submit" className="btn btn-primary">
              Post
            </button>
          </form>
          {comments.map((comment) => (
            <div
              key={comment.comment_id}
              className="comment d-flex justify-content-center align-items-center"
            >
              <p>{comment.comment_desc}</p>
              <FaTrash
                className="delete-icon"
                onClick={() => deleteComment(comment.comment_id)}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default DisplayPost;
