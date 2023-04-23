import configData from "../../../config.js";
import loadSqlQueries from "../../../utils.js";
import sql from "mssql";
import { generatePassword } from "../../utilities/generatePassword.js";
import { sendUserPassword } from "../../services/email.js";
let sqlQueries = await loadSqlQueries("data/users");
let generalSqlQueries = await loadSqlQueries("data/general");

export const createUserData = async (userData, hashedPassword) => {
    try {
        let date = new Date();
        let isoDateTime = new Date(date.getTime() - date.getTimezoneOffset() * 60000).toISOString();
        let pool = await sql.connect(configData.sql);
        let roleId = await pool.request().input('Name', sql.VarChar(20), userData.role).query(generalSqlQueries.getRoleId);
        let churchId = await pool.request().input('Name', sql.VarChar(100), userData.church).query(generalSqlQueries.getChurchId);
        const transaction = new sql.Transaction(pool);
        

        transaction.begin( err => {
          let rolledBack = false;

          transaction.on("rollback", (aborted) => {
            // emited with aborted === true

            rolledBack = true;
          });
          let uniqueId = `User${generatePassword(4)}`
          const request = new sql.Request(transaction);
          request
            .input("UniqueId", sql.VarChar(15), uniqueId)
            .input("RoleId", sql.TinyInt, roleId.recordset[0].Id)
            .input("ChurchId", sql.Int, churchId.recordset[0].Id)
            .input("FirstName", sql.VarChar(50), userData.firstName)
            .input("LastName", sql.VarChar(50), userData.lastName)
            .input("MiddleName", sql.VarChar(50), userData.middleName)
            .input("PhoneNumber", sql.VarChar(20), userData.phoneNumber)
            .input("Address", sql.VarChar(100), userData.address)
            .input("Gender", sql.VarChar(10), userData.gender)
            .input("MembershipDate", sql.DateTime2, isoDateTime)
            .input(
              "HasCompletedFoundationSchool",
              sql.Bit,
              userData.foundationSchool
            )
            .input("Email", sql.VarChar(50), userData.email)
            .input("Password", sql.VarChar(150), hashedPassword)
            .input("DateCreated", sql.DateTime2, isoDateTime)
            .query(sqlQueries.createMembers, (err, result) => {
              // ... error checks
              if (err) {
                if (!rolledBack) {
                  transaction.rollback((err) => {
                    // ... error checks
                  });
                }
                console.log(err)
              } else {
                transaction.commit((err) => {
                  // ... error checks

                  console.log("Transaction committed.");
                  
                });
              }
            });
        })
        await sendUserPassword(userData.email, );

    } catch (error) {
        return error.message;
    }

    
}



export const loginUserData = async (email, password) => {
    try {
       
        let pool = await sql.connect(configData.sql);
        const login = await pool
        .request()
        .input("Email", sql.VarChar(50), email)
        .input("Password", sql.VarChar(150), password)
        .query(sqlQueries.login);
        return login.recordset;
    } catch (error) {
        return error.message;
    }
};

export const listTotalMembersInZoneData = async(zone) => {
     try {
         let pool = await sql.connect(configData.sql);
         let zoneId = await pool.request().input('Name', sql.VarChar(100), zone).query(generalSqlQueries.getZoneId);
         
         let result = await pool.request()
         .input("ZoneId", sql.Int, zoneId.recordset[0].Id)
         .query(sqlQueries.listAllMembersInZone);
         pool.close();
         return result.recordset;
     } catch (error) {
         return error.message;
     }
 }
export const listTotalMembersInGroupData = async(zone, group) => {
    try {
        let pool = await sql.connect(configData.sql);
        let zoneId = await pool.request().input('Name', sql.VarChar(100), zone).query(generalSqlQueries.getZoneId);
        let groupId = await pool.request().input('Name', sql.VarChar(100), group).query(generalSqlQueries.getGroupId);
        let result = await pool.request()
        .input("ZoneId", sql.Int, zoneId.recordset[0].Id)
        .input("GroupId", sql.Int, groupId.recordset[0].Id)
        .query(sqlQueries.listAllMembersInGroup);
        pool.close()
        return result.recordset;
    } catch (error) {
          return error.message;
    }
}
export const listTotalMembersInChurchData = async(zone, group, church) => {
    try {
        let pool = await sql.connect(configData.sql);
        let zoneId = await pool.request().input('Name', sql.VarChar(100), zone).query(generalSqlQueries.getZoneId);
        let groupId = await pool.request().input('Name', sql.VarChar(100), group).query(generalSqlQueries.getGroupId);
        let churchId = await pool.request().input('Name', sql.VarChar(100), church).query(generalSqlQueries.getChurchId);
        let result = await pool.request()
        .input("ZoneId", sql.Int, zoneId.recordset[0].Id)
        .input("GroupId", sql.Int, groupId.recordset[0].Id)
        .input("ChurchId", sql.Int, churchId.recordset[0].Id)
        .query(sqlQueries.listAllMembersInChurch);
        pool.close()
        return result.recordset;
    } catch (error) {
          return error.message;
    }
}



// nested mssql transactions with node.js?