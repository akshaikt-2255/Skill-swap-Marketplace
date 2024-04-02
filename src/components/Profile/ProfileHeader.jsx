import { useState } from "react";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import { Link } from "react-router-dom";
import { getImageUrl } from "../../utils";
import {
  unfollow,
  removeFollower,
  getUserByIdThunk,
  fetchUsersWithSkills,
} from "../../data/reducer/api/userThunk";
import { useDispatch } from "react-redux";
import { unwrapResult } from "@reduxjs/toolkit";

const ProfileHeader = ({ user, allUsers }) => {
  const dispatch = useDispatch();
  const userId = user?._id;
  const followersCount = user?.followers?.length || 0;
  const followingCount = user?.following?.length || 0;

  // State to control the modals visibility
  const [isFollowersModalOpen, setFollowersModalOpen] = useState(false);
  const [isFollowingModalOpen, setFollowingModalOpen] = useState(false);

  // Function to open the modals
  const handleOpenFollowersModal = () => {
    setFollowersModalOpen(true);
  };
  const handleOpenFollowingModal = () => {
    setFollowingModalOpen(true);
  };

  // Function to close the modals
  const handleCloseFollowersModal = () => {
    setFollowersModalOpen(false);
  };
  const handleCloseFollowingModal = () => {
    setFollowingModalOpen(false);
  };

  // Function to get follower and following details
  const getFollowersDetails = () => {
    return allUsers.filter((userItem) =>
      user?.followers?.includes(userItem._id)
    );
  };
  const getFollowingDetails = () => {
    return allUsers.filter((userItem) =>
      user?.following?.includes(userItem._id)
    );
  };

  const followersList = getFollowersDetails();
  const followingList = getFollowingDetails();

  const remove = (followerId) => {
    dispatch(removeFollower({ userId, followerId }))
      .then(unwrapResult)
      .then(() => {
        dispatch(getUserByIdThunk(userId));
        dispatch(fetchUsersWithSkills());
      })
      .catch((error) => console.error("Failed to remove follower:", error));
  };

  const unfollowUser = (followingId) => {
    dispatch(unfollow({ userId, followingId }))
      .then(unwrapResult)
      .then(() => {
        dispatch(getUserByIdThunk(userId));
        dispatch(fetchUsersWithSkills());
      })
      .catch((error) => console.error("Failed to unfollow user:", error));
  };

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        flexDirection: "column",
        mb: 2,
      }}
    >
      <Avatar
        alt="Profile Picture"
        src={
          user?.profilePicture &&
          (typeof user?.profilePicture === "string"
            ? getImageUrl(user.profilePicture)
            : URL.createObjectURL(user.profilePicture))
        }
        sx={{ width: 300, height: 300, mb: 1 }}
      />
      <Box sx={{ mt: 2, textAlign: "center" }}>
        <Typography
          variant="h4"
          component="div"
          sx={{ fontWeight: "bold", mb: 1 }}
        >
          {user?.name}
        </Typography>
        <Typography variant="body2" color="textSecondary">
          Primary Skill: {user?.primarySkill}
        </Typography>
      </Box>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          mt: 2,
        }}
      >
        <Button onClick={handleOpenFollowersModal}>
          <Typography variant="subtitle1" sx={{ marginRight: 2 }}>
            {followersCount} Followers
          </Typography>
        </Button>
        <Button onClick={handleOpenFollowingModal}>
          <Typography variant="subtitle1">
            {followingCount} Following
          </Typography>
        </Button>
      </Box>
      <Link
        to="/editprofile"
        style={{ textDecoration: "none", marginTop: "30px" }}
      >
        <Button type="submit" fullWidth variant="contained" className="submit">
          Edit Profile
        </Button>
      </Link>

      <Modal
        open={isFollowersModalOpen}
        onClose={handleCloseFollowersModal}
        aria-labelledby="followers-modal-title"
        aria-describedby="followers-modal-description"
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 300,
            bgcolor: "background.paper",
            boxShadow: 24,
            p: 4,
          }}
        >
          <Typography id="followers-modal-title" variant="h6" component="h2">
            Followers
          </Typography>
          <Box id="followers-modal-description" sx={{ mt: 2 }}>
            {followersList.length ? (
              followersList.map((follower) => (
                <Box key={follower._id} className="follower-item">
                  <Box className="follower-info">
                    <Avatar
                      src={getImageUrl(follower.profilePicture)}
                      alt={follower.name}
                      className="follower-avatar"
                    />
                    <Typography variant="body1">{follower.name}</Typography>
                  </Box>
                  <Button
                    color="primary"
                    variant="contained"
                    onClick={() => remove(follower._id)}
                  >
                    Remove
                  </Button>
                </Box>
              ))
            ) : (
              <Typography>No Followers found.</Typography>
            )}
          </Box>
        </Box>
      </Modal>

      <Modal
        open={isFollowingModalOpen}
        onClose={handleCloseFollowingModal}
        aria-labelledby="following-modal-title"
        aria-describedby="following-modal-description"
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 300,
            bgcolor: "background.paper",
            boxShadow: 24,
            p: 4,
          }}
        >
          <Typography id="following-modal-title" variant="h6" component="h2">
            Following
          </Typography>
          <Box id="following-modal-description" sx={{ mt: 2 }}>
            {followingList.length ? (
              followingList.map((following) => (
                <Box key={following._id} className="user-item">
                  <Box className="user-info">
                    <Avatar
                      src={getImageUrl(following.profilePicture)}
                      alt={following.name}
                      className="user-avatar"
                    />
                    <Typography variant="body1">{following.name}</Typography>
                  </Box>
                  <Button
                    color="primary"
                    variant="contained"
                    onClick={() => unfollowUser(following._id)}
                  >
                    Unfollow
                  </Button>
                </Box>
              ))
            ) : (
              <Typography>You are not following anyone.</Typography>
            )}
          </Box>
        </Box>
      </Modal>
    </Box>
  );
};

export default ProfileHeader;
