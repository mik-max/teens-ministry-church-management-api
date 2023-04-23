BEGIN
Select COUNT(dbo.[Churches].[Id]) as TotalChurches

from [dbo].[Churches]
inner join [dbo].[Groups] on [dbo].[Churches].[GroupId] = [dbo].[Groups].[Id]
Where [dbo].[Churches].[GroupId] = @groupId

END