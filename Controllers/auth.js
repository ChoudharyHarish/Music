import User from '../Models/User';
const signUp = async (req, res) => {
    const { username, email, password } = req.body;

//     if (confirmPassword !== password) res.status(404).json({ msg: "Password not matches" })
    try {
        const user = await User.create({username, email, password });
        const token = user.createJWT();
        res.status(200).json({ name: user.username, userId: user._id, token });
    }
    catch (error) {
        res.status(500).json({ msg: "Internal Server Error" })
    }
}


const logIn = async (req, res) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
        res.status(202).json({ msg: "Invalid Credentials" });
    }
    const isCorrect = user.comparePassword(password);
    if (!isCorrect) {
        res.status(202).json({ msg: "Invalid Credentials" });
    }
    const token = user.createJWT();
    res.status(200).json({ name: user.name, userId: user._id, token })
}

module.exports = {signUp,logIn};