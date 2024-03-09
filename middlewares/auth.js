
import jwt from 'jsonwebtoken';

const auth = (req, res, next) => {
  

  let token;

  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      token = req.headers.authorization.split(' ')[1];

      //decodes token id
      const decoded = jwt.verify(token, "test");
     
      console.log("::============================= ")
      console.log(":: ", decoded)
      req.userId = decoded?.id
      next();
    } catch (error) {
      res.status(401);
      throw new Error('Not authorized!');
    }
  }

  if (!token) {
    res.status(401);
    throw new Error('Please provide a token');
  }
}

export default auth;