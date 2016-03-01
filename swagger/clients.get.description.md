Will take a number of parameters, search the CIRTS database, and
return a list of clients that match the given parameters.

**Important!**

A query must have at least one of the following parameters provided to be a valid query.
1. GivenNames (At least 3 characters, will match on partial) _This will also search aliases_
2. FamilyName (At least 3 characters, will match on partial)
3. CirtsId (Will match exact only, so provide full id if using)

Only one LWBLocation can be searched at once (per query), defaulting to Australia. **If you do not provide an LwbLocation only results from Australia will be returned.**

# Examples #

Given that the database contains the following **client** data.

**Note.** _This does not represent actual database structure, it represents
what an appropriate database query would return if looking for this information._

| cirtsID | firstName | familyName | dateOfBirth | lwbRegion        | gender | lwbLocation |state|sector               |active|
|:-------:|:---------:|:----------:|:-----------:|:----------------:|:------:|:-----------:|:---:|:-------------------:|:----:|
| 00001   | Jane      | Doe        | 19800101    | Parramatta       |Female  | Australia   |VIC  |Disability           |true  |
| 00002   | John      | Doe        | 19820202    | Bankstown        |Male    | Australia   |NSW  |Youth Justice        |true  |
| 00003   | Joe       | Bloggs     | 19991231    | Auckland         |Unknown | New Zealand |QLD  |Homelessness         |false |
| 00004   | Leroy     | Jenkins    | 19500101    | Lordaron         |Male    | Australia   |VIC  |Mental Health        |true  |
| 00005   | Jenny     | Gergich    | 19800101    | Darblock         |Female  | Australia   |QLD  |Home & Community Care|true  |
| 00006   | Sam       | Johns      | 19770101    | Hunter Disability|Unknown | New Zealand |WA   |Disability           |true  |
| 00007   | Opla      |            | 19200101    | Katherine        |None    | Australia   |VIC  |Homelessness         |true  |

The following example behaviour is expected . . .

#### Search by FamilyName, matching clients found ####

| Request URL | Expected Response Code |
|:-----------:|:----------------------:|
| /clients?familyName=Doe | 200 OK     |

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
|:-----------:|:----------------------:|
| /clients?familyName=Jenkins | 200 OK |

```javascript
{
  "clients": []
}
```

## Basic Parameter Examples ##

##### A search for a given cirtsId will return only the client with matching cirtsId #####
| Request URL | Expected Response Code |
|:-----------:|:----------------------:|
|/clients?cirtsId=CL00001|200 OK|
```json
{
  "clients": [
    { "cirtsID": "00001", "firstName": "Jane", "familyName": "Doe",  "dateOfBirth": "1980-01-01T00:00:00.000Z", "lwbRegion": "Parramatta" }]
}
```
##### A search for a given familyName will return clients iff they have a matching familyName #####
| Request URL | Expected Response Code |
|:-----------:|:----------------------:|
|/clients?familyName=Jenkins|200 OK|
```json
{
  "clients": [
    { "cirtsID": "00004", "firstName": "Leroy", "familyName": "Jenkins",  "dateOfBirth": "1950-01-01T00:00:00.000Z", "lwbRegion": "Lordaron" }]
}
```

##### A search for givenNames will return clients iff they have matching givenNames #####
| Request URL | Expected Response Code |
|:-----------:|:----------------------:|
|/clients?givenNames=Sam|200 OK|
```json
{
  "clients": [
    { "cirtsID": "00006", "firstName": "Sam", "familyName": "Johns",  "dateOfBirth": "1977-01-01T00:00:00.000Z", "lwbRegion": "Hunter Disability" }]
}
```

##### A search for a given lwbLocation will return clients iff they have a matching lwbLocation #####
| Request URL | Expected Response Code |
|:-----------:|:----------------------:|
|/clients?lwbLocation=Australia|200 OK|
```json
{
  "clients": [
    { "cirtsID": "00001", "firstName": "Jane", "familyName": "Doe",  "dateOfBirth": "1980-01-01T00:00:00.000Z", "lwbRegion": "Parramatta" },
    { "cirtsID": "00002", "firstName": "John", "familyName": "Doe",  "dateOfBirth": "1982-02-02T00:00:00.000Z", "lwbRegion": "Bankstown" },
    { "cirtsID": "00004", "firstName": "Leroy", "familyName": "Jenkins",  "dateOfBirth": "1950-01-01T00:00:00.000Z", "lwbRegion": "Lordaron" },
    { "cirtsID": "00005", "firstName": "Jenny", "familyName": "Gergich",  "dateOfBirth": "1980-01-01T00:00:00.000Z", "lwbRegion": "Darblock" },
    { "cirtsID": "00007", "firstName": "Opla", "familyName": " ",  "dateOfBirth": "1920-01-01T00:00:00.000Z", "lwbRegion": "Katherine" }]
}
```

##### A search for a given lwbRegion will return clients iff they have a matching lwbRegion #####
| Request URL | Expected Response Code |
|:-----------:|:----------------------:|
|/clients?lwbRegion=bankstown|200 OK|
```json
{
  "clients": [
    { "cirtsID": "00002", "firstName": "John", "familyName": "Doe",  "dateOfBirth": "1982-02-02T00:00:00.000Z", "lwbRegion": "Bankstown" }]
}
```

##### A search for a given state will return clients iff they have a matching state #####
| Request URL | Expected Response Code |
|:-----------:|:----------------------:|
|/clients?state=VIC|200 OK|
```json
{
  "clients": [
    { "cirtsID": "00001", "firstName": "Jane", "familyName": "Doe",  "dateOfBirth": "1980-01-01T00:00:00.000Z", "lwbRegion": "Parramatta" },
    { "cirtsID": "00004", "firstName": "Leroy", "familyName": "Jenkins",  "dateOfBirth": "1950-01-01T00:00:00.000Z", "lwbRegion": "Lordaron" },
    { "cirtsID": "00007", "firstName": "Opla", "familyName": " ",  "dateOfBirth": "1920-01-01T00:00:00.000Z", "lwbRegion": "Katherine" }]
}
```

##### A search for a given sector will return clients iff they have a matching sector #####

**Note** _Some characters mean special things in Urls, so they must be replaced with codes instead.
Here '&' must be replaced with %26 and ' '(A space) must be replaced with '+'.

| Request URL | Expected Response Code |
|:-----------:|:----------------------:|
|/clients?sector=Home+%26+Community+Care|200 OK|
```json
{
  "clients": [
    { "cirtsID": "00005", "firstName": "Jenny", "familyName": "Gergich",  "dateOfBirth": "1980-01-01T00:00:00.000Z", "lwbRegion": "Home & Community Care" }]
}
```

##### A search for a given active will return clients iff they have a matching active #####
| Request URL | Expected Response Code |
|:-----------:|:----------------------:|
|/clients?active=true|200 OK|
**Note** _Even though Sam Johns is active, they are not in the default LwbLocation(Australia) and their LwbLocation (New Zealand)
was not specified. (See dateOfBirthLow example for an example)_


```json
{
  "clients": [
    { "cirtsID": "00001", "firstName": "Jane", "familyName": "Doe",  "dateOfBirth": "1980-01-01T00:00:00.000Z", "lwbRegion": "Parramatta" },
    { "cirtsID": "00002", "firstName": "John", "familyName": "Doe",  "dateOfBirth": "1982-02-02T00:00:00.000Z", "lwbRegion": "Bankstown" },
    { "cirtsID": "00004", "firstName": "Leroy", "familyName": "Jenkins",  "dateOfBirth": "1950-01-01T00:00:00.000Z", "lwbRegion": "Lordaron" },
    { "cirtsID": "00005", "firstName": "Jenny", "familyName": "Gergich",  "dateOfBirth": "1980-01-01T00:00:00.000Z", "lwbRegion": "Darblock" },
    { "cirtsID": "00007", "firstName": "Opla", "familyName": " ",  "dateOfBirth": "1920-01-01T00:00:00.000Z", "lwbRegion": "Katherine" }
    ]
}
```

##### A search for a given dateOfBirthLow will return clients iff they were born on or after dateOfBirthLow #####
| Request URL | Expected Response Code |
|:-----------:|:----------------------:|
|/clients?dateOfBirthLow=19800101|200 OK|
**Note** _Even though Joe Bloggs meets the date criteria, he is not in the default LwbLocation (Australia) and his LwbLocation(New Zealand)
was not specified._
```json
{
  "clients": [
    { "cirtsID": "00001", "firstName": "Jane", "familyName": "Doe",  "dateOfBirth": "1980-01-01T00:00:00.000Z", "lwbRegion": "Parramatta" },
    { "cirtsID": "00002", "firstName": "John", "familyName": "Doe",  "dateOfBirth": "1982-02-02T00:00:00.000Z", "lwbRegion": "Bankstown" },
    { "cirtsID": "00005", "firstName": "Jenny", "familyName": "Gergich",  "dateOfBirth": "1980-01-01T00:00:00.000Z", "lwbRegion": "Darblock" }]
}
```
**Note** _This query will return with Joe Bloggs, but not the others because they are in lwbLocation Australia._

| Request URL | Expected Response Code |
|:-----------:|:----------------------:|
|/clients?dateOfBirthLow=19800101&lwbLocation=new+zealand|200 OK|
```json
{
  "clients": [
    { "cirtsID": "00003", "firstName": "Joe", "familyName": "Bloggs",  "dateOfBirth": "1999-12-31T00:00:00.000Z", "lwbRegion": "Auckland" }]
}
```

##### A search for a given dateOfBirthHigh will return clients iff they were born before or on dateOfBirthHigh #####
| Request URL | Expected Response Code |
|:-----------:|:----------------------:|
|/clients?dateOfBirthHigh=19300101|200 OK|
```json
{
  "clients": [
    { "cirtsID": "00007", "firstName": "Opla", "familyName": " ",  "dateOfBirth": "1920-01-01T00:00:00.000Z", "lwbRegion": "Katherine" }]
}
```

##### A search for a given gender will return clients iff they have a matching gender #####
| Request URL | Expected Response Code |
|:-----------:|:----------------------:|
|/clients?gender=male| 200 OK|
```json
{
  "clients": [
    { "cirtsID": "00002", "firstName": "John", "familyName": "Doe",  "dateOfBirth": "1982-02-02T00:00:00.000Z", "lwbRegion": "Bankstown" },
    { "cirtsID": "00004", "firstName": "Leroy", "familyName": "Jenkins",  "dateOfBirth": "1950-01-01T00:00:00.000Z", "lwbRegion": "Lordaron" }]
}
```