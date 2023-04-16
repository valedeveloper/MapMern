const router = require("express").Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");

router.post("/register", async (req, res) => {
  const { username, email, password } = req.body;
  console.log({ username, email, password });
  try {
    //Generar contraseña
    //Creo una variable
    const salt = await bcrypt.genSalt(10);

    //Apartir de la contraseña que creò el usuario, esta librerìa la tasnsfotma
    const hashedPasswaord = await bcrypt.hash(password, salt);

    //Pasar los paràmetros del modelo
    const newUser = new User({
      username: username,
      email: email,
      password: hashedPasswaord,
    });

    //Guardar los datos. Segùn los datos que pasè en el modelo, con el mètodo .save se guardan
    const saveUser = await newUser.save();
    res.status(200).json(saveUser);
    
  } catch (e) {
    res.status(500).json(e);
  }
});

router.get("/login", async (req, res) => {
  //Verificar que exista ese usuario
  const { username, password } = req.body;

  try {
    const userLogin = await User.findOne({ username: username }) //El findOne, dependiento de la key que le de, asì mismo me trae el valor.

      //Validar password
    const validatePassword=await bcrypt.compare(password,userLogin.password) //Comparar la contraseña que llega con la que tenfo en la base de datos.
   
    !userLogin && res.status(404).json("Usuario y/o  Incorrecto");
    !validatePassword && res.status(404).json("Usuario y/o  Incorrecto");

    res.status(200).json({_id:userLogin._id,username:userLogin.username}) //Le decimos cuales son las keys que queremos que devulva

  } catch (e) {
    console.log(e)
    res.status(500).json(e);
  }

});








router.get("/", async (req, res) => {
  try {
    const allUsers = await User.find(); //Con el find me trae todas los registros, es decir, los documentos de la colecciòn 
    res.status(200).json(allUsers);
  } catch (e) {
    res.status(500).json(e);
  }
});

//Delete
router.delete("/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const deleteUser = await User.findByIdAndRemove(id);
    res.status(200).json(deleteUser);

    if (!deleteUser) {
      res.status(404);
    }
  } catch (e) {
    res.status(500).json(e);
  }
});

module.exports = router;
