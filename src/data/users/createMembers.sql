BEGIN
DECLARE @userId INT
INSERT INTO [dbo].[Users]
    ([UniqueId]
    ,[RoleId]
    ,[ChurchId]
    ,[FirstName]
    ,[LastName]
    ,[MiddleName]
    ,[PhoneNumber]
    ,[Address]
    ,[Gender]
    ,[MembershipDate]
    ,[HasCompletedFoundationSchool])

VALUES(
     @uniqueId,
     @roleId,
     @churchId,
     @firstName,
     @lastName,
     @middleName,
     @phoneNumber,
     @address,
     @gender,
     @membershipDate,
     @hasCompletedFoundationSchool
)

set @userId = @@IDENTITY
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
    );
END    