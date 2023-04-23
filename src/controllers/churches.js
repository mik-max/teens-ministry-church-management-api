import { getTotalChurchesInZoneData, getTotalMembersInZoneData, getTotalChurchesInGroupData, getTotalMembersInGroupData, listTotalChurchesInZoneData, listTotalChurchesInGroupData, createChurchData, listTotalGroupsInZoneData} from "../data/churches/index.js";


export const createChurch = async (req, res) => {
     try {
          if(req.body.church !== '' && req.body.pastor !== '' && req.body.address !== '' && req.body.group !== ''){
               await createChurchData(req.body);
               res.status(201).send({status: 'Ok', data: null, message: 'Church Created'});
          }else{
               res.status(400).send({status:'Failed', data: null, message: 'Kindly supply all information!'});  
          }
     } catch (error) {
          res.status(500).send({status : 'Failed', data: null, message:error.message})
     }
}
export const getChurchesAnalytics = async (req, res) => {
    try {
          if(req.query.role === 'Zonal Admin'){
               let churchData = await getTotalChurchesInZoneData(req.query.zone);
               let memberData = await getTotalMembersInZoneData(req.query.zone);
               res.status(200).send({status : 'Ok', data: {totalMembers: memberData[0].TotalMembers, totalChurches: churchData[0].TotalChurches}, message:"Successful"})
          }else if (req.query.role === 'Group Admin'){
               let churchData = await getTotalChurchesInGroupData(req.query.group);
               let memberData = await getTotalMembersInGroupData(req.query.group);
               res.status(200).send({status : 'Ok', data: {totalMembers: memberData[0].TotalMembers, totalChurches: churchData[0].TotalChurches}, message:"Successful"})
          }else if (req.query.role === 'Church Admin'){
               let churchData = await getTotalChurchesInZoneData(req.query.zone);
               let memberData = await getTotalMembersInZoneData(req.query.zone);
               res.status(200).send({status : 'Ok', data: {totalMembers:1000, totalChurches: 500}, message:"Successful"})
          }else{
               res.status(400).send({status:'Failed', data: null, message: 'Invalid or empty role query'})
          }
       
    } catch (error) {
        res.status(500).send({status : 'Failed', data: null, message:error.message})
    }
}

export const getChurches = async (req, res) => {
     try {
          if(!req.query.role){
               res.status(400).send({status:'Failed', data: null, message: 'Empty role query'});
          }else{
               if(req.query.role === 'Zonal Admin' && req.query.zone !== ''){
                    let data = await listTotalChurchesInZoneData(req.query.zone)
                    res.status(200).send({status : 'Ok', data: data, message:"Successful"})
               }else if(req.query.role === 'Group Admin' && req.query.group !== ''){
                    let data = await listTotalChurchesInGroupData(req.query.zone, req.query.group)
                    res.status(200).send({status : 'Ok', data: data, message:"Successful"})
               }else if(req.query.role === 'Church Admin' && req.query.group !== ''){
                    let data = await listTotalChurchesInGroupData(req.query.zone, req.query.group)
                    res.status(200).send({status : 'Ok', data: data, message:"Successful"})
               }
               else{
                    res.status(400).send({status:'Failed', data: null, message: 'Invalid user role'})
               }
          }
     } catch (error) {
          res.status(500).send({status : 'Failed', data: null, message:error.message})
     }
}

export const getGroups = async (req, res) => {
     try {
          if(!req.query.role){
               res.status(400).send({status:'Failed', data: null, message: 'Empty role query'});
          }else{
               if(req.query.role === 'Zonal Admin' && req.query.zone !== ''){
                    let data = await listTotalGroupsInZoneData(req.query.zone)
                    res.status(200).send({status : 'Ok', data: data, message:"Successful"});
               }else{
                    res.status(400).send({status:'Failed', data: null, message: 'Invalid user role'});
               }
          }
     } catch (error) {
          res.status(500).send({status : 'Failed', data: null, message:error.message});
     }
}

