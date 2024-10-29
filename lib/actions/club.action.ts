// Sample JSON data
const clubs = [
  {
    name: "Drama",
    email: "dramaclub@students.iitmandi.ac.in",
  },
  {
    name: "UDC Dance",
    email: "danceclub@students.iitmandi.ac.in",
  },
  {
    name: "Designauts",
    email: "designauts@students.iitmandi.ac.in",
  },
  {
    name: "PMC",
    email: "pmc@students.iitmandi.ac.in",
  },
  {
    name: "Artgeeks",
    email: "artgeeks@students.iitmandi.ac.in",
  },
  {
    name: "Music",
    email: "musicclub@students.iitmandi.ac.in",
  },
  {
    name: "SPICMACAY",
    email: "spicmacay@students.iitmandi.ac.in",
  },
  {
    name: "EBSB",
    email: "ebsb@students.iitmandi.ac.in",
  },
  {
    name: "Cult Council",
    email: "cultural_secretary@students.iitmandi.ac.in",
  },
];

// Function to get the club name based on the email
export const getClubNameByEmail = (email: string) => {
  const club = clubs.find((club) => club.email === email);
  return club ? club.name : null;
};