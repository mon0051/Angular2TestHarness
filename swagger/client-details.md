## Example Data ##
Given the following data is in the database

**Note.** _This does not represent the database structure. This is not the same as client search sample data. For readability this has been split into two tables._

### Client Data Part 1 ###

|CirtsId|FirstName|LastName  |Alias |LwbStatus|Medicare    |PrimaryServiceType|
|:-----:|:-------:|:--------:|:----:|:-------:|:----------:|:----------------:|
|CL0001 |Jane     |Doe       |Dagger|TRUE	  |0000-00001-1|Disability        |
|CL0002 |John     |Doe       |	    |TRUE	  |0000-00002-1|Youth Justice     |
|CL0003 |Joe      |Bloggs    |	    |FALSE	  |0000-00001-2|Homelessness      |
|CL0004 |Leroy    |Jenkins   |Smitty|TRUE	  |0000-00002-2|Mental Health     |
|CL0005 |Sara     |Gergich   |		|TRUE     |0000-00001-3|Disability        |
|CL0006 |Sam      |Johns     |		|TRUE     |0000-00002-3|Disability        |
|CL0007 |Opla     |          |Aaron |TRUE     |0000-00001-4|Homelessness      |

### Client Data Part 2 ###

|CirtsId|PhoneNumber   |LwbRegion    |IndigenousStatus         |Gender      |PrimaryLanguage     |DateOfBirth    |DobEstimated  |
|:-----:|:------------:|:-----------:|:-----------------------:|:----------:|:------------------:|:-------------:|:------------:|
|CL0001 |(03) 5555 5555|Parramatta	 |Not disclosed            |Female      |English             |19800101       |FALSE         |
|CL0002 |(02) 6666 5555|Bankstown	 |Not disclosed	           |Male        |English	         |19820202       |FALSE         |
|CL0003 |+64 5656 9898 |Auckland     |None                     |Unknown     |Haka                |19991231       |FALSE         |
|CL0004 |(03) 6565 9898|Lordaron	 |Torres Strait Islander   |Male        |Romanian            |19500101       |TRUE          |
|CL0005 |(07) 5454 9898|Darblock	 |Aboriginal	           |Female      |English	         |19800101	     |FALSE         |
|CL0006 |              |Auckland     |Not Disclosed	           |Unknown     |Sign Language       |19770101       |TRUE          |
|CL0007 |	           |Katherine	 |Torres Strait Islander   |None        |Invented Languages  |19200101       |TRUE          |

## Example Queries ##

#### Valid client example ####

**Query** clients\CL0001

**Expected Response**
Status: 200 OK

```json
{
    "client":{
      "cirtsId":"CL0001",
      "clientName":"Jane Doe (Dagger)",
      "lwbStatus":"true",
      "medicare":"0000-00001-1",
      "primaryServiceType":"Disability",
      "phoneNumber":"(03) 5555 5555",
      "lwbRegion":"Parramatta",
      "indigenousStatus":"Not disclosed ",
      "gender":"Female",
      "primaryLanguage":"English",
      "dateOfBirth":"19800101",
      "dobEstimated":"false"
    }
}
```

_Notice that although firstName, familyName, and alias are seperate in the database, they will be returned as a single "clientName" value.
This reflects the behaviour of the desktop client._

#### Valid client example, missing data ####

**Query** clients\CL0007

**Expected Response**
Status: 200 OK

```json
{
    "client":{
      "cirtsId":"CL0007",
      "clientName":"Opla (Aaron)",
      "lwbStatus":"true",
      "medicare":"0000-00001-4",
      "primaryServiceType":"Homelessness",
      "lwbRegion":"Katherine",
      "indigenousStatus":"Torres Strait Islander",
      "primaryLanguage":"Invented Languages",
      "dateOfBirth":"19200101",
      "dobEstimated":"true"
    }
}
```

_Notice that no phone number or gender parameter is returned. This means that no information exists about these values in the database_

#### Client doesn't exist example ####

**Query** clients\CL0009

**Expected Response**
Status: 404 NOT FOUND

```json
{
    "readyState": 4,
    "responseJSON": {
        "error": "Client with CirtsId CL0009 was not found"
    },
    "status": 404,
    "statusText": "Not Found"
}
```

#### Missing cirtsId prefix example ####

**Query** clients\0001

**Expected Response**
Status: 400 BAD REQUEST

```json
{
    "readyState": 4,
    "responseJSON": {
        "message": "Given CirtsId does not have a CL prefix (For Client).Please ensure you are using the correct CirtsId and the correct URL."
    },
    "status": 400,
    "statusText": "Bad Request"
}
```