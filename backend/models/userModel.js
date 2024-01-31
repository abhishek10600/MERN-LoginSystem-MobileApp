import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, "Name is a required field."],
        },
        email: {
            type: String,
            unique: true,
            required: [true, "Email is a required field."],
            validate: [validator.isEmail, "Please enter email correctly."]
        },
        photo: {
            public_id: {
                type: String
            },
            secure_url: {
                type: String
            }
        },
        password: {
            type: String
        }
    },
    {
        timestamps: true
    }
)

userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) {
        return next();
    }
    this.password = await bcrypt.hash(this.password, 10);
})

userSchema.methods.isPasswordValidated = function (password) {
    return bcrypt.compare(password, this.password);
}

userSchema.methods.getJwtToken = function () {
    return jwt.sign({ id: this._id }, process.env.JWT_SECRET);
}

const User = mongoose.model("User", userSchema);

export default User;