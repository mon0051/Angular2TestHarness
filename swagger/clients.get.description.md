Will take a number of parameters, search the CIRTS database, and
return a list of clients that match the given parameters.

**Important!**

A query must have at least one of the following parameters provided to be a valid query.
1. GivenNames (At least 3 characters, will match on partial) _This will also search aliases_
2. FamilyName (At least 3 characters, will match on partial)
3. CirtsId (Will match exact only, so provide full id if using)

Only one LWBLocation can be searched at once (per query), defaulting to Australia. **If you do not provide an LwbLocation only results from Australia will be returned.**

#### Example Usage ####

Given that the database contains the following **client** data.

**Note.** _This does not represent actual database structure, it represents
what an appropriate database query would return if looking for this information._

| cirtsID | firstName | familyName | dateOfBirth | lwbRegion | gender |
|:---:|:---:|:---:|:---:|:---:|:---:|
| 00001 | Jane | Doe | 19800101 | Parramatta |Female|
| 00002 | John | Doe | 19820202 | Bankstown |Male|
| 00003 | Joe | Bloggs | 19991231 | Surry Hills |Unknown|

The following example behaviour is expected . . .

#### Search by FamilyName, matching clients found ####

| Request URL | Expected Response Code |
|:---:|:---:|
| /clients?familyName=Doe | 200 OK |

```javascript
{
  "clients": [
    { "cirtsID": "00001", "firstName": "Jane", "familyName": "Doe",  "dateOfBirth": "1980-01-01T00:00:00.000Z", "lwbRegion": "Parramatta" },
    { "cirtsID": "00002", "firstName": "John", "familyName": "Doe", "dateOfBirth": "1982-02-02T00:00:00.000Z", "lwbRegion": "Bankstown" }
  ]
}
```

#### Search by FamilyName, matching clients NOT found ####

| Request URL | Expected Response Code |
|:------|:---:|
| /clients?familyName=Jenkins | 200 OK |

```javascript
{
  "clients": []
}
```