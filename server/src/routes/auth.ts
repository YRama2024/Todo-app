import jwt from "jsonwebtoken";
import express from "express";
import { authenticateJwt, SECRET } from "../middleware";
import { User } from "../db";

const router = express.Router();

router.post("/signup", async (req, res) => {
  const { username, password } = req.body;
  
  const user = await User.findOne({username});
  if(user){
    res.status(403).json({message:'user already exists'});
  } else {
    const userId = Math.floor(Math.random()*1000);
    const newUser = new User({ username, password, userId });
    await newUser.save();
    const token = jwt.sign({id:newUser._id} ,SECRET,{ expiresIn : '10h'});
    res.json({ message: 'user crated succesfully ',token , userId });
  }
});

router.post('/login', async(req,res)=>{
    const { username, password } = req.body;
    try {
      const user = await User.findOne({username});
      if(user) {
        if(user.password === password){
          const token = jwt.sign({id:user.userId},SECRET,{ expiresIn: '10h'});
          res.json({message: 'user logged in ', token:token, userId: user.userId });
        } else{
          res.status(403).json({message:'wrong password'});
        }
      } else {
          res.status(403).json({message:'Invalid credentials'});
      }
    } catch (error) {
      console.error('error during login:',error);
      res.status(500).json({message:'internal server error'});
    }
    
});

router.get('/me', authenticateJwt, async (req,res) =>{
    const userId = req.headers.userId;
    const user = await User.findOne({ userId: userId });
    if(user) {
        res.json({ username: user.username, userId: user.userId });
    } else {
        res.status(403).json({ message: 'user not logged in'});
    }
});

export default router;
