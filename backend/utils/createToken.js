export const createToken = (res, user) => {
    const token = user.getJwtToken();
    user.password = undefined;
    res.json({
        success: true,
        token,
        user
    })
}