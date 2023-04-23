INSERT INTO [dbo].[Churches]
           ([GroupId]
           ,[Name]
           ,[Pastor]
           ,[Address])

 VALUES(
        @groupId,
        @name,
        @pastor,
        @address
    );