import React, { useEffect, useState } from 'react';
import "./profile.css";
import Sidebar from '../../component/sidebar/Sidebar';
import Topbar from '../../component/topbar/Topbar';
import Feed from '../../component/feed/Feed';
import Rightbar from '../../component/rightbar/Rightbar';
import axios from 'axios';
import { useParams } from "react-router";

export default function Profile() {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const [user, setUser] = useState({});
  const { username } = useParams();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get(`http://localhost:8800/api/users?username=${username}`);
        setUser(res.data);
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    };
    if (username) {
      fetchUser();
    }
  }, [username]);

  return (
    <>
      <Topbar />
      <div className="profile">
        <Sidebar />
        <div className="profileRight">
          <div className="profileRightTop">
            <div className="profileCover">
              <img className='profileCoverImg' src={ user.coverPicture
                    ? PF + user.coverPicture
                    : PF + "person/unnamed.png"} alt="" />
              <img className='profileUserImg' src={ user.profilePicture
                    ? PF + user.profilePicture
                    :  PF + "person/noavatar.png"} alt="" />
            </div>
            <div className="profileInfo">
              <h4 className='profileInfoName'>{user.username}</h4>
              <span className='profileInfoDesc'>{user.desc}</span>
            </div>
          </div>
          <div className="profileRightBottom">
            <Feed />
            <Rightbar user={user} />
          </div>
        </div>
      </div>
    </>
  );
}
