const router = require("express").Router();
const Pin = require("../models/Pin");


//Agregar un documento
router.post("/", async(req, res) => {
  console.log(req.body)

  const newPin = new Pin(req.body);
  
  try {
    const savePin = await newPin.save();
    res.status(200).json(savePin);
  } catch (error) {
    res.status(500).json(error);
  }
});

//Traer un documento 
router.get("/",async(req,res)=>{ 
  try{
    const getPins=await Pin.find()
    res.status(200).json(getPins)
  }catch(e){ 
    res.status(404).json(e)

  }
})


module.exports=router