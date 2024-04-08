const express= require('express');
const router=express.Router()
const {authController}=require("../controller")
const {userValidationRules, validate ,loginMiddleware}=require ('../middlewares/auth.middleware');
const {jwtTokenVerify}=require('../middlewares/jwt.middleware')

router.post('/self-register',userValidationRules(),validate,authController.resgisterUser)
router.post('/login',loginMiddleware,authController.login)
router.get('/protected', jwtTokenVerify, (req, res) => {
    // If the control reaches here, it means the token is valid
    res.status(200).json({ message: 'Welcome to the protected route!' });
});
module.exports = router