BEGIN
Select COUNT(dbo.[Users].[Id]) as TotalMembers

from [dbo].[Users]
inner join [dbo].[Churches] on [dbo].[Users].[ChurchId] = [dbo].[Churches].[Id]
inner join [dbo].[Groups] on [dbo].[Churches].[GroupId] = [dbo].[Groups].[Id]
Where [dbo].[Churches].[GroupId] = @groupId
END