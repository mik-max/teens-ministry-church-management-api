import { createUserData, loginUserData, listTotalMembersInChurchData, listTotalMembersInGroupData, listTotalMembersInZoneData } from "../data/users/index.js";
import { sendUserPassword } from "../services/email.js";
import { generatePassword } from "../utilities/generatePassword.js";
import { encrypt } from "../utilities/hashing.js";
import { validateEmail } from "../utilities/emailValidattion.js";
import  Jwt  from "jsonwebtoken";
export const createUser = async (req, res) => {
    try {
          if(req.body.email && req.body.firstName && req.body.lastName && req.body.gender && req.body.role){
               let validatedEmail = validateEmail(req.body.email);
               if(validatedEmail){
                    let password = generatePassword(8);
                    console.log(password);
                    const hashedPassword = encrypt(password);
                    let data = await createUserData(req.body, hashedPassword);
                    await sendUserPassword(req.body.email, password);
                    res.status(200).send({status : 'Ok', data: null, message:"User created"})
               }else{
                    res.status(400).send({status:'Failed', data: null, message: 'Invalid email address!'});
               }
          }else{
               res.status(400).send({status:'Failed', data: null, message: 'Request body is missing  important properties ooo '});
          }
    } catch (error) {
          res.status(500).send({status : 'Failed', data: null, message:error.message})
    }
}

export const loginUser = async (req, res) => {
  try {
    let validatedEmail = validateEmail(req.body.email);
    let hashedPassword = encrypt(req.body.password);
    if (validatedEmail) {
      const data = await loginUserData(req.body.email, hashedPassword);
        if (data[0] === undefined) {
            res.status(400).send({status: "failed", data: null, message: "email or password is incorect"});
        } else {
            const token = Jwt.sign(
            {
                code: "yabbberrishstatement$$!)987&::+rttwv#b%%",
            },
            "prolificTeens!!$$"
            );
            let claims = {
            firstName: data[0].FirstName,
            lastName: data[0].LastName,
            email: req.body.email,
            userId: data[0].UserId,
            gender: data[0].Gender,
            role: data[0].UserRole,
            church: data[0].Church,
            group: data[0].GroupName,
            zone: data[0].ZoneName
            };
            res.status(200).send({status: "Ok", data: { token: token, claims: claims }, message: "successfully logged in",});
        }
    } else {
      res.status(400).send({ status: "Failed", data: null, message: "Email is invalid" });
    }
  } catch (error) {
        res.status(500).send({ status: "Failed", data: null, message: error.message });
    } 
};

export const getUsers = async (req, res) => {
     try {
          if(!req.query.role){
               res.status(400).send({status:'Failed', data: null, message: 'Empty role query'});
          }else{
               if(req.query.role === 'Zonal Admin' && req.query.zone !== ''){
                    let data = await listTotalMembersInZoneData(req.query.zone)
                    res.status(200).send({status : 'Ok', data: data, message:"Successful"})
               }else if(req.query.role === 'Group Admin' && req.query.group !== ''){
                    let data = await listTotalMembersInGroupData(req.query.zone, req.query.group)
                    res.status(200).send({status : 'Ok', data: data, message:"Successful"})
               }else if(req.query.role === 'Church Admin' && req.query.group !== '' && req.query.church !== ''){
                    let data = await listTotalMembersInChurchData(req.query.zone, req.query.group, req.query.church)
                    res.status(200).send({status : 'Ok', data: data, message:"Successful"})
               }else{
                    res.status(400).send({status:'Failed', data: null, message: 'Invalid user role'})
               }
          }
         
     } catch (error) {
          res.status(500).send({status : 'Failed', data: null, message:error.message})
     }
}