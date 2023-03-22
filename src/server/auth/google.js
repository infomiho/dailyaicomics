export const getUserFields = (context, { profile }) => {
  return {
    username: profile.emails[0].value,
  };
};

export const getConfig = () => {
  return {
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    scope: ["profile", "email"],
  };
};
