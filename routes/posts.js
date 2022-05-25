const router = require("express").Router()
const verify = require("./verifyToken")
const UserModel = require("../model/user")

router.get("/", verify, async (req, res) => {
    const userId = req.user._id
    const userData = await UserModel.findById({ _id: userId })
    res.send({
        user: {
            id: userData._id,
            name: userData.name,
            email: userData.email
        },
        posts: {
            title: "football",
            description: "another uefa champ for real madrid"
        }
    })
})

module.exports = router