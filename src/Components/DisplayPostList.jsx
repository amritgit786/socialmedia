import DisplayPost from "./DisplayPost";

import WelcomeMessage from "./WelcomeMessage";
import LoadingSpinner from "./LoadingSpinner";
import { useEffect, useState } from "react";
import axios from "axios";

const DisplayPostList = () => {
  const [postListData, setPostListData] = useState([]);
  const [fetching, setFetching] = useState(true);

  useEffect(() => {
    async function getAllProductsData() {
      try {
        const res = await axios.get(
          "http://localhost/social_media/post/get_all_post.php"
        );
        setPostListData(Array.isArray(res.data) ? res.data : []);
      } catch (error) {
        console.error("Failed to fetch posts", error);
        setPostListData([]);
      } finally {
        setFetching(false);
      }
    }
    getAllProductsData();
  }, []);

  return (
    <>
      {fetching && <LoadingSpinner />}

      <div className="post-grid">
        {!fetching && (!postListData || postListData.length === 0) && (
          <WelcomeMessage />
        )}
        {!fetching &&
          Array.isArray(postListData) &&
          postListData.length > 0 &&
          postListData.map((post) => (
            <DisplayPost
              key={post.post_id}
              post={post}
              setPostListData={setPostListData}
              postListData={postListData}
            />
          ))}
      </div>
    </>
  );
};

export default DisplayPostList;
