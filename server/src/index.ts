import express from "express";
const app = express();
app.use(express.json());

//Let's cteate an in-memory object to store the otp

const otpStore : Record<string,string> = {};

app.post('/generate-otp',(req,res):any=>{
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

  app.post('/password-reset', (req, res):any => {
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