import express from "express";
import rateLimit from 'express-rate-limit';
const app = express();
app.use(express.json());


const otpRateLimiter = rateLimit({
    windowMs: 5 * 60 * 1000, // 1 window - 5 minutes  
    max: 3, // Limit each IP to 3 OTP requests per windowMs
    message: 'Too many requests, please try again after 5 minutes',
    standardHeaders: true, 
    legacyHeaders: false
})

const resetPasswordLimiter = rateLimit({
  windowMs: 10 * 60 * 1000, 
    max: 4, 
    message: 'Too many requests, please try again after 10 minutes',
    standardHeaders: true, 
    legacyHeaders: false
})

//Let's cteate an in-memory object to store the otp

const otpStore : Record<string,string> = {};

app.post('/generate-otp',otpRateLimiter,(req,res):any=>{
    const email = req.body.email;
    if(!email){
        return res.status(400).json({
            message: "Enter a valid email."
        })
    }

    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    otpStore[email] = otp;
    console.log(`OTP for ${email}: ${otp}`); 
    return res.status(200).json({ message: "OTP generated and logged" });
})

//Reset-Password

  app.post('/password-reset',resetPasswordLimiter, (req, res):any => {
    const { email, otp, newPassword } = req.body;
    if (!email || !otp || !newPassword) {
      return res.status(400).json({ message: "Email, OTP, and new password are required" });
    }
    if (otpStore[email] === otp) {
      console.log(`Password for ${email} has been reset to: ${newPassword}`);
      delete otpStore[email];
      return res.status(200).json({ message: "Password has been reset successfully" });
    } else {
      res.status(401).json({ message: "Invalid OTP" });
    }
  });

app.listen(3000, () => {
    console.log(`Server running on http://localhost:${3000}`);
  });