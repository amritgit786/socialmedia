import "bootstrap/dist/css/bootstrap.min.css";
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const CreatePost = () => {
  const [postList, setPostList] = useState({
    post_desc: "",
    reg_id: "",
  });
  const [file, setFile] = useState(null);
  const [regId, setRegId] = useState("");
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

  const handleOnChange = (e) => {
    setPostList((prev_post) => ({
      ...prev_post,
      [e.target.name]: e.target.value,
      reg_id: regId,
    }));
  };

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    const newData = new FormData();
    for (const key in postList) {
      newData.append(key, postList[key]);
    }
    newData.append("file", file);
    try {
      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      };
      await axios.post(
        `http://localhost/social_media/post/insert_post_data.php`,
        newData,
        config
      );
      // Reset the form data here
      setPostList({
        post_desc: "",
        reg_id: "",
      });
      setFile(null);
    } catch (error) {
      console.log("Something went wrong", error);
    }
  };

  return (
    <form className="create-post" onSubmit={handleOnSubmit}>
      <div className="mb-3">
        <input
          type="hidden"
          className="form-control"
          id="userId"
          placeholder="Please Enter Your User ID"
          onChange={(e) => handleOnChange(e)}
        />
      </div>

      <div className="mb-3">
        <label htmlFor="desc" className="form-label">
          Post Content
        </label>
        <textarea
          name="post_desc"
          id="desc"
          className="form-control"
          rows={4}
          placeholder="Tell Us more about it."
          onChange={(e) => handleOnChange(e)}
        ></textarea>
      </div>

      <div className="mb-3">
        <label htmlFor="pimage" className="form-label">
          Upload Post Image
        </label>
        <input
          type="file"
          className="form-control"
          id="pimage"
          name="img"
          onChange={(e) => setFile(e.target.files[0])}
        />
      </div>

      <button type="submit" className="btn btn-primary">
        Post
      </button>
    </form>
  );
};

export default CreatePost;
