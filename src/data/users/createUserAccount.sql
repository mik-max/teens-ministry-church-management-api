BEGIN

INSERT INTO [dbo].[UserAccounts]
    ([UserId]
      ,[Email]
      ,[Password]
      ,[DateCreated])

    VALUES(
        @userId,
        @email,
        @password,
        @dateCreated
    )
END