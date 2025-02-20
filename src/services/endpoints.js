const express = require("express");
const admin = require("firebase-admin");
const cors = require("cors");
const serviceAccount = require("../serviceAccountKey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const app = express();

app.use(cors({ origin: "http://localhost:3000" }));

app.get("/api/users", async (req, res) => {
  const idToken = req.headers.authorization?.split(" ")[1];
  if (!idToken) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  try {
    const listUsersResult = await admin.auth().listUsers();
    const users = listUsersResult.users.map((user) => ({
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
      photoURL: user.photoURL,
    }));
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch users" });
  }
});

app.listen(3001, () => {
  console.log("Server is running on port 3001");
});
