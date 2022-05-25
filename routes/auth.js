const router = require("express").Router()
const UserModel = require("../model/user")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")

router.post("/register", async (req, res) => {
    const body = req.body

    // check user already exist or not 
    const userExist = await UserModel.findOne({ email: body.email })
    if(userExist) return res.status(400).send("Email already exist !")

    // hashing password 
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(body.password, salt)

    const newUser = new UserModel({
        name: body.name,
        email: body.email,
        password: hashedPassword
    })
    try {
        const result = await newUser.save()
        res.send({ status: "success", data: result }) 
    } catch (error) {
        console.log(error)
    }
})

router.post("/login", async (req, res) => {
    const body = req.body

    try {
        // check user already exist or not 
        const userExist = await UserModel.findOne({ email: body.email })
        if(!userExist) return res.status(400).send("Email or password is incorrect !")
    
        //check password 
        const validPass = await bcrypt.compare(body.password, userExist.password)
        if (!validPass) return res.status(400).send("Email or password is incorrect !")
    
        // sign jwt
        const token = jwt.sign({ _id: userExist._id}, process.env.TOKEN_SECRET)
        res.header('auth-token', token).send(token)

        res.send({ status: "success", data: {
            id: userExist._id, 
            name: userExist.namem, 
            email: userExist.email 
            }
        })

    } catch (error) {
        console.log(error)
    }
})

module.exports = router