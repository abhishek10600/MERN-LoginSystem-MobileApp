import User from "../models/userModel.js";

export const createToken = async (res, user) => {
    const newToken = user.getJwtToken();
    if (user.token.length) {
        user.token.pop();
        const token = [
            {
                token: newToken,
                signedAt: Date.now().toString()
            }
        ]
        await User.findByIdAndUpdate(user._id, { token })
    } else {
        const token = [{
            token: newToken,
            signedAt: Date.now().toString()
        }]
        await User.findByIdAndUpdate(user._id, { token })
    }
    user.password = undefined;
    res.json({
        success: true,
        token: newToken,
        user
    })
}