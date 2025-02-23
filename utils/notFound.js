import path from "path";
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const typeOfSend=(req,res)=>{
    res.status(404)
    if(req.accepts("html")){
      res.sendFile(path.join(__dirname,'..',"views","404.html"))
    }
    else if(req.accepts("json")){
      res.json({message:"404 not found"});
    }
    else{
      res.type("txt").json({message:"404 not found"});
    }
  }
  export default typeOfSend