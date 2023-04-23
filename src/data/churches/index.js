import configData from "../../../config.js";
import loadSqlQueries from "../../../utils.js";
import sql from "mssql";

let sqlQueries = await loadSqlQueries("data/churches")
let generalSqlQueries = await loadSqlQueries("data/general");

export const createChurchData = async (churchData) => {
     try {
          let pool = await sql.connect(configData.sql);
          let groupId = await pool.request().input('Name', sql.VarChar(100), churchData.group).query(generalSqlQueries.getGroupId);

          let result = await pool.request()
          .input('GroupId', sql.Int, groupId.recordset[0].Id)
          .input('Name', sql.VarChar(100), churchData.church)
          .input('Pastor', sql.VarChar(50), churchData.pastor)
          .input('Address', sql.VarChar(100), churchData.address)
          .query(sqlQueries.createChurch);
          pool.close();
          return result.recordset;
     } catch (error) {
          return error.message;
     }
}
export const getTotalChurchesInZoneData = async(name) => {
    try {
        let pool = await sql.connect(configData.sql);
        let zoneId = await pool.request().input('Name', sql.VarChar(100), name).query(generalSqlQueries.getZoneId);
        
        let result = await pool.request()
        .input("ZoneId", sql.Int, zoneId.recordset[0].Id)
        .query(sqlQueries.getAllChurchesInZone);
        pool.close();
        return result.recordset;
    } catch (error) {
        return error.message;
    }
}
export const getTotalMembersInZoneData = async(name) => {
    try {
        let pool = await sql.connect(configData.sql);
        let zoneId = await pool.request().input('Name', sql.VarChar(100), name).query(generalSqlQueries.getZoneId);
        let result = await pool.request()
        .input("ZoneId", sql.Int, zoneId.recordset[0].Id)
        .query(sqlQueries.getMembersInZone);
        pool.close()
        return result.recordset;
    } catch (error) {
          return error.message;
    }
}
export const getTotalChurchesInGroupData = async(name) => {
    try {
        let pool = await sql.connect(configData.sql);
        let groupId = await pool.request().input('Name', sql.VarChar(100), name).query(generalSqlQueries.getGroupId);
        
        let result = await pool.request()
        .input("GroupId", sql.Int, groupId.recordset[0].Id)
        .query(sqlQueries.getAllChurchesInGroup);
        pool.close();
        return result.recordset;
    } catch (error) {

        return error.message;
    }
}
export const getTotalMembersInGroupData = async(name) => {
    try {
        let pool = await sql.connect(configData.sql);
        let groupId = await pool.request().input('Name', sql.VarChar(100), name).query(generalSqlQueries.getGroupId);
        let result = await pool.request()
        .input("GroupId", sql.Int, groupId.recordset[0].Id)
        .query(sqlQueries.getMembersInGroup);
        pool.close()
        return result.recordset;
    } catch (error) {
          return error.message;
    }
}
export const listTotalGroupsInZoneData = async(zone) => {
     try {
         let pool = await sql.connect(configData.sql);
         let zoneId = await pool.request().input('Name', sql.VarChar(100), zone).query(generalSqlQueries.getZoneId);
         
         let result = await pool.request()
         .input("ZoneId", sql.Int, zoneId.recordset[0].Id)
         .query(sqlQueries.listAllGroupsInZone);
         pool.close();
         return result.recordset;
     } catch (error) {
         return error.message;
     }
 }

export const listTotalChurchesInZoneData = async(zone) => {
     try {
         let pool = await sql.connect(configData.sql);
         let zoneId = await pool.request().input('Name', sql.VarChar(100), zone).query(generalSqlQueries.getZoneId);
         
         let result = await pool.request()
         .input("ZoneId", sql.Int, zoneId.recordset[0].Id)
         .query(sqlQueries.listAllChurchesInZone);
         pool.close();
         return result.recordset;
     } catch (error) {
         return error.message;
     }
 }
export const listTotalChurchesInGroupData = async(zone, group) => {
    try {
        let pool = await sql.connect(configData.sql);
        let zoneId = await pool.request().input('Name', sql.VarChar(100), zone).query(generalSqlQueries.getZoneId);
        let groupId = await pool.request().input('Name', sql.VarChar(100), group).query(generalSqlQueries.getGroupId);
        let result = await pool.request()
        .input("ZoneId", sql.Int, zoneId.recordset[0].Id)
        .input("GroupId", sql.Int, groupId.recordset[0].Id)
        .query(sqlQueries.listAllChurchesInGroup);
        pool.close()
        return result.recordset;
    } catch (error) {
          return error.message;
    }
}
