import React, { useState, useEffect, useContext } from 'react';
import "./post.css";
import { MoreVert } from '@mui/icons-material';
import axios from "axios";
import { format } from "timeago.js";
import { Link } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';

export default function Post({ post }) {
  const [like, setLike] = useState(post.likes.length);
  const [isLiked, setIsLiked] = useState(false);
  const [user, setUser] = useState({});
  const { user: currentUser } = useContext(AuthContext);

  useEffect(() => {
    setIsLiked(post.likes.includes(currentUser._id));
  }, [currentUser._id, post.likes]);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get(`/users?userId=${post.userId}`);
        setUser(res.data);
        console.log(res);
      } catch (error) {
        console.error('Response from the server:', error.response);
      }
    };
    fetchUser();
  }, [post.userId]);

  const likeHandler = async () => {
    try {
      await axios.put(`/posts/${post._id}/like`, { userId: currentUser._id });
    } catch (err) {
      console.error('Error liking post:', err);
    }
    setLike(isLiked ? like - 1 : like + 1);
    setIsLiked(!isLiked);
  };

  const PF = process.env.REACT_APP_PUBLIC_FOLDER;

  return (
    <div className='post'>
      <div className="postWrapper">
        <div className="postTop">
          <div className="postTopLeft">
            <Link to={`/profile/${user.username}`}>
              <img className='postProfileImg' src={user.profilePicture ? `${PF}${user.profilePicture}` : `${PF}person/noavatar.png`} alt="" />
            </Link>
            <span className="postUsername">{user.username}</span>
            <span className="postDate">{format(post.createdAt)}</span>
          </div>
          <div className="postTopRight">
            <MoreVert />
          </div>
        </div>
        <div className="postCenter">
          <span className="postText">{post?.desc} </span>
          <img className='postImg' src={`${PF}${post.img}`} alt="" />
        </div>
        <div className="postBottom">
          <div className="postBottomleft">
            <img className="likeIcon" src={`${PF}/linke-removebg-preview.png`} onClick={likeHandler} alt="" />
            <img className="heartIcon" src={`${PF}/heart-removebg-preview.png`} alt="" />
            <span className="postLikeCounter">{like} people like it </span>
          </div>
          <div className="postBottomRight">
            <span className="postCommentText">{post.comment} comments</span>
          </div>
        </div>
      </div>
    </div>
  );
}
