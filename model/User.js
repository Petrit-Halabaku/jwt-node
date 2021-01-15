const mongoose = require("mongoose");
const { isEmail } = require("validator");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema({
	email: {
		type: String,
		required: [true, "Email is required"],
		unique: true,
		lowercase: true,
		validate: [(val) => isEmail(val), "Please enter a valid email"],
	},
	password: {
		type: String,
		required: [true, "Password is required"],
		minlength: [6, "Password should have at least 6 characters"],
	},
});

//fire a funcion after doc saved to db
userSchema.post("save", function (doc, next) {
	console.log("new user was saved", doc);
	next();
});

//fire a funcion before doc saved to db
userSchema.pre("save", async function (next) {
	const salt = await bcrypt.genSalt(10);
	this.password = await bcrypt.hash(this.password, salt);
	next();
});

//static method to login user
userSchema.statics.login = async function (email, password) {
	const user = await this.findOne({ email });
	if (user) {
		const auth = await bcrypt.compare(password, user.password);
		if (auth) {
			return user;
		}
		throw Error("incorrect password");
	}
	throw Error("incorrect email");
};

module.exports = User = mongoose.model("user", userSchema);
