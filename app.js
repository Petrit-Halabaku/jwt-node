const express = require("express");
const mongoose = require("mongoose");
const authRouter = require("./routes/authRouter");
const cookieParser = require("cookie-parser");
const { requireAuth,checkUser } = require("./middleware/authMiddleware");

const app = express();
const PORT = 5000;

app.use(express.static("public"));
app.use(express.json());
app.use(cookieParser());

app.set("view engine", "ejs");

const dbURI = "mongodb://localhost:27017/jwt-node";
mongoose
	.connect(dbURI, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
		useCreateIndex: true,
	})
	.then((result) =>
		app.listen(PORT, () => {
			console.log(`Listening on port ${PORT}`);
		})
	)
	.catch((err) => console.error(err.message));

app.get("*", checkUser);
app.get("/", (req, res) => {
	res.render("home");
});
app.get("/smoothies", requireAuth, (req, res) => {
	res.render("smoothies");
});
app.use(authRouter);
