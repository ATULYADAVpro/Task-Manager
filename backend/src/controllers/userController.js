import User from "../models/userModel.js";
import CustomErrorHandler from "../utils/CustomErrorHandler.js";
import JwtService from "../utils/JwtService.js";
import bcrypt from 'bcrypt'
import validator from 'validator'

const userController = {
    home(req, res, next) {
        //    return next(CustomErrorHander.RequiredField(100,"i am passing"))
        // res.send('Working')
        next(CustomErrorHandler.RequiredField(100, "i am passing"))
    },

    // User Registration
    async userRegister(req, res, next) {
        try {
            const { name, email, password } = req.body;
            // Basic validation
            if (!name || !email || !password) {
                return next(CustomErrorHandler.RequiredField(400, "All fields are required"));
            }

            if (!validator.isEmail(email)) {
                return next(CustomErrorHandler.RequiredField(400, "Invalid email address"));
            }

            if (password.length < 8) {
                return next(CustomErrorHandler.RequiredField(400, "Password must be at least 8 characters"));
            }

            // Check user existence
            const userExists = await User.find({ email });
            if (!userExists) {
                return next(CustomErrorHandler.AlreadyExists("User already registered"));
            }

            const hashPassword = await bcrypt.hash(password, 10)

            // Save user
            const userData = new User({ name, email, password: hashPassword })
            await userData.save()
            const token = JwtService.sign({ id: userData._id })

            res.status(201).json({ message: "Registration successful", id: userData._id, name: userData.name, email: userData.email, token });

        } catch (error) {
            next(error);
        }
    },

    // User Login
    async userLogin(req, res, next) {
        try {
            const { email, password } = req.body;
            // Basic validation
            if (!email || !password) {
                return next(CustomErrorHandler.RequiredField(400, "All fields are required"));
            }

            // Check user existence
            const user = await User.findOne({ email });
            if (!user) return next(CustomErrorHandler.NotFound("User not found"))

            // Check user existence password valide
            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch) return next(CustomErrorHandler.Invalid('Invaild credentials '))

            const token = JwtService.sign({ id: user._id })

            res.json({ message: 'Login successful', id: user._id, email: user.email, name: user.name, token })
            
        } catch (error) {
            next(error)
        }

    },

    // Get Current User
    async getCurrentUser(req, res, next) {
        try {
            const user = await User.findById(req.user.id).select("name email")
            if (!user) { return next(CustomErrorHandler.NotFound("User not found")) }

            res.json({ user })
        } catch (error) {
            next(error)
        }
    },

    // Update User Profile
    async updateUserProfile(req, res, next) {
        try {
            const { name, email } = req.body;
            if (!name || !email || validator.isEmail(email)) { return next(CustomErrorHandler.RequiredField()) }

            const exists = await User.findOne({ name, email })
            if (!exists) { return next(CustomErrorHandler.NotFound("User does not exists")) }

            const user = await User.findByIdAndUpdate(req.user.id, { email, name }, { new: true, runValidators: true, select: "name email" })

            res.json(user)
        } catch (error) {
            next(error)
        }
    },

    // Change password
    async updateUserPassword(req, res, next) {
        try {
            const { currentPassword, newPassword } = req.body;
            if (!currentPassword || !newPassword || newPassword.length < 8) { return next(CustomErrorHandler.RequiredField()) }

            const user = await User.findById(req.user.id).select("password")
            if (!user) return next(CustomErrorHandler.NotFound("User not found"))

            const match = await bcrypt.compare(currentPassword, user.password)
            if (!match) return next(CustomErrorHandler.Invalid("Current  Password invalid"))

            user.password = await bcrypt.hash(newPassword, 10)

            await user.save();

            res.json({ message: "Password Change" })

        } catch (error) {
            next(error)
        }
    }
}

export default userController