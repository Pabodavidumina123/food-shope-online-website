import jwt from "jsonwebtoken";


export default function AuthorizationUser(req, res, next) {
    const header = req.header("Authorization");

    if(header != null) {
        const token=header.replace("Bearer ","");

        jwt.verify(token, "i-computer 500!", (err, decoded) => {
            if(decoded==null) {
                 res.status(401).json({ message: "plz loging againg" });
            }else{
             req.User = decoded;
            next();
            }
           
        });
    }else{
        next();
    }
}