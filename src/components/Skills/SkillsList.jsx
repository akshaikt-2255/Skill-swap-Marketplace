import { useEffect,useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUsersWithSkills } from "../../data/reducer/api/userThunk";
import {
  Box,
  Grid,
  Card,
  CardMedia,
  CardContent,
  Typography,
  CardActions,
  Button,
  Alert,
  FormControl,
  Select,
  MenuItem,
  InputLabel,
} from "@mui/material";
import { getImageUrl } from "../../utils";
import nouser from "../../assets/nouser.png";

const SkillsNotFoundBanner = () => (
  <Alert severity="info">No skills found. Check back later!</Alert>
);

const SkillsPage = () => {
  const dispatch = useDispatch();
  const { usersWithSkills, status, error,user } = useSelector((state) => state.user);
  const currentUserId = user?._id;
  const [skillFilter, setSkillFilter] = useState('All Skills');

  useEffect(() => {
    dispatch(fetchUsersWithSkills());
  }, [dispatch]);

  const skills = Array.from(new Set(usersWithSkills.map((user) => user.primarySkill)));

  const handleFilterChange = (event) => {
    setSkillFilter(event.target.value);
  };

  const handleSendMessage = (personId) => {
    console.log("Message person with id:", personId);
  };

  if (status === "loading") {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error fetching users: {error}</p>;
  }

  if (usersWithSkills.length === 0) {
    return <SkillsNotFoundBanner />;
  }

  const filteredUsers = usersWithSkills
    .filter((user) => user._id !== currentUserId)
    .filter((user) => skillFilter === 'All Skills' || user.primarySkill === skillFilter);

  if (filteredUsers.length === 0) {
    return <SkillsNotFoundBanner />;
  }

  return (
    <Box sx={{ flexGrow: 1, p: 2 }}>
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 2 }}>
        <FormControl sx={{ width: '100%', maxWidth: '300px' }}>
          <InputLabel id="skill-filter-label">Filter by Skill</InputLabel>
          <Select
            labelId="skill-filter-label"
            id="skill-filter"
            value={skillFilter}
            label="Filter by Skill"
            onChange={handleFilterChange}
          >
            <MenuItem value="All Skills">All Skills</MenuItem>
            {skills.map((skill, index) => (
              <MenuItem key={index} value={skill}>{skill}</MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>

      <Grid container spacing={2} sx={{ display: 'flex', alignItems: 'stretch' }}>
        {filteredUsers.map((person) => (
           <Grid item xs={12} sm={6} md={4} lg={3} key={person._id} sx={{ display: 'flex' }}>
            <Card sx={{ width: '100%', display: 'flex', flexDirection: 'column' }}>
              <CardMedia
                component="img"
                sx={{
                    height: '350px',
                    objectFit: 'cover',
                    width: '100%'
                  }}
                image={
                  (person?.profilePicture &&
                    (typeof person?.profilePicture === "string"
                      ? getImageUrl(person?.profilePicture)
                      : nouser)) ||
                  nouser
                }
                alt={person.name}
              />
              <CardContent sx={{ flexGrow: 1 }}>
                <Typography gutterBottom variant="h5" component="div">
                  {person.name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Skill: {person.primarySkill}
                </Typography>
                {/* <Rating name="read-only" value={person.rating} readOnly /> */}
              </CardContent>
              <CardActions sx={{ justifyContent: 'center' }}>
                <Button
                  size="small"
                  sx={{
                    width: "100%",
                    bgcolor: "#61dafb",
                    "&:hover": {
                      bgcolor: "#60d0ea",
                      color: "#fff"
                    },
                  }}
                  onClick={() => handleSendMessage(person.id)}
                >
                  Message
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default SkillsPage;
