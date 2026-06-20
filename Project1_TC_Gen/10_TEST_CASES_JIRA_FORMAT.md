# Restful-Booker API - 10 Test Cases in JIRA Format

## Test Case 1: Health Check - Happy Path

```
PROJECT: API Testing
ISSUE TYPE: Test Case
COMPONENT: PING Endpoint
LABELS: Smoke Test, Happy Path

TEST CASE ID: TC_PING_001
TITLE: Verify API Health Check - Happy Path
TYPE: Functional Test
PRIORITY: High
STATUS: Ready for Execution
CREATED: 2026-05-30

DESCRIPTION:
Verify that the API health check endpoint returns the expected response indicating the API is operational and responsive.

═══════════════════════════════════════════════════════════════════

PRECONDITIONS:
- API server is running at https://restful-booker.herokuapp.com
- Network connectivity is available and stable
- API is responding to HTTP requests
- Testing tool (Postman, Insomnia, or cURL) is configured

═══════════════════════════════════════════════════════════════════

STEPS TO REPRODUCE:

Step | Action | Expected Input | Expected Output
 1  | Open REST client tool | N/A | Tool is ready
 2  | Prepare HTTP request | GET method | Request prepared
 3  | Set request URL | https://restful-booker.herokuapp.com/ping | URL is set
 4  | Set request headers | Content-Type: application/json | Headers are set
 5  | Send GET request | Execute request | Request sent
 6  | Capture response | Wait for response | Response received
 7  | Verify status code | Record HTTP code | Code: 201
 8  | Verify response body | Record body content | Body: {"OK": "Created"}
 9  | Verify response time | Note milliseconds | Time < 2000ms
10  | Check content type | Verify header | Type: application/json

═══════════════════════════════════════════════════════════════════

EXPECTED RESULT:

✓ HTTP Status Code: 201 Created
✓ Response Content-Type: application/json; charset=utf-8
✓ Response Body: {"OK": "Created"} or similar confirmation message
✓ Response Time: Less than 2000 milliseconds
✓ No error messages in response
✓ Connection is successful without timeouts
✓ Response headers contain valid metadata

═══════════════════════════════════════════════════════════════════

ACTUAL RESULT:

HTTP Status Code: [____________]
Response Time (ms): [____________]
Response Content-Type: [____________]
Response Body: [____________]
Error Message: [____________]
Notes: [____________]

═══════════════════════════════════════════════════════════════════

TEST RESULT: [ ] PASS    [ ] FAIL    [ ] BLOCKED    [ ] SKIPPED

Executed By: _________________________
Execution Date: _________________________
Execution Time: _________________________

DEFECT REFERENCE (if failed): ___________
Severity (if failed): [ ] Critical  [ ] High  [ ] Medium  [ ] Low

COMMENTS:
This is a smoke test to verify basic API availability.
Essential as first step before running other tests.
```

---

## Test Case 2: Create Auth Token - Valid Credentials

```
PROJECT: API Testing
ISSUE TYPE: Test Case
COMPONENT: AUTH Endpoint
LABELS: Functional Test, Happy Path

TEST CASE ID: TC_AUTH_001
TITLE: Create Authentication Token - Valid Credentials
TYPE: Functional Test
PRIORITY: High
STATUS: Ready for Execution
CREATED: 2026-05-30

DESCRIPTION:
Verify that valid credentials generate a valid authentication token required for protected API operations.

═══════════════════════════════════════════════════════════════════

PRECONDITIONS:
- API server is running at https://restful-booker.herokuapp.com
- Default credentials are available: username=admin, password=password123
- Testing tool is configured with POST capability
- Request can accept and send JSON payloads

═══════════════════════════════════════════════════════════════════

STEPS TO REPRODUCE:

Step | Action | Details
 1  | Open REST client | Prepare new request
 2  | Set HTTP method | POST
 3  | Set endpoint URL | https://restful-booker.herokuapp.com/auth
 4  | Set Content-Type header | application/json
 5  | Prepare request body | {"username": "admin", "password": "password123"}
 6  | Send request | Execute POST request
 7  | Capture HTTP status | Record status code
 8  | Extract token from response | Parse JSON response
 9  | Validate token format | Check token is alphanumeric string
10  | Save token for later use | Store in environment variable

═══════════════════════════════════════════════════════════════════

REQUEST BODY:
```json
{
  "username": "admin",
  "password": "password123"
}
```

═══════════════════════════════════════════════════════════════════

EXPECTED RESULT:

✓ HTTP Status Code: 200 OK
✓ Response is valid JSON format
✓ Response contains "token" field
✓ Token value is non-empty string
✓ Token consists of alphanumeric characters
✓ Response Time: < 2000 milliseconds
✓ No error messages in response

Example Response:
```json
{
  "token": "abc123def456"
}
```

═══════════════════════════════════════════════════════════════════

ACTUAL RESULT:

HTTP Status Code: [____________]
Response Format: [____________]
Token Present: [ ] Yes  [ ] No
Token Value: [____________]
Response Time (ms): [____________]
Error Message: [____________]

═══════════════════════════════════════════════════════════════════

TEST RESULT: [ ] PASS    [ ] FAIL    [ ] BLOCKED    [ ] SKIPPED

Executed By: _________________________
Execution Date: _________________________

COMMENTS:
Token must be saved and used in subsequent requests for protected endpoints.
```

---

## Test Case 3: Create Auth Token - Invalid Password

```
PROJECT: API Testing
ISSUE TYPE: Test Case
COMPONENT: AUTH Endpoint
LABELS: Error Scenario

TEST CASE ID: TC_AUTH_003
TITLE: Create Auth Token - Invalid Password
TYPE: Negative Test
PRIORITY: High
STATUS: Ready for Execution
CREATED: 2026-05-30

DESCRIPTION:
Verify that invalid password is rejected and appropriate error response is returned.

═══════════════════════════════════════════════════════════════════

PRECONDITIONS:
- API server is running at https://restful-booker.herokuapp.com
- Valid username "admin" is known
- Invalid password "wrongpassword" will be used
- Testing tool is ready with POST capability

═══════════════════════════════════════════════════════════════════

STEPS TO REPRODUCE:

Step | Action | Input
 1  | Open REST client | New POST request
 2  | Set endpoint | https://restful-booker.herokuapp.com/auth
 3  | Set Content-Type | application/json
 4  | Set request body | {"username": "admin", "password": "wrongpassword"}
 5  | Send POST request | Execute request
 6  | Observe HTTP response | Record status code
 7  | Examine response body | Check for error indication
 8  | Verify no token | Confirm token field is absent or invalid
 9  | Check error message | Document error details
10  | Note response time | Record timing

═══════════════════════════════════════════════════════════════════

EXPECTED RESULT:

✓ HTTP Status Code: 200 OK (API returns 200 but no valid token)
✓ Response does NOT contain valid "token" field
✓ Response either:
  - Contains error message: {"reason": "Bad credentials"}
  - Or returns empty object: {}
  - Or has no token key
✓ Response Time: < 2000 milliseconds
✓ No authentication token is created

═══════════════════════════════════════════════════════════════════

ACTUAL RESULT:

HTTP Status Code: [____________]
Response Body: [____________]
Token Generated: [ ] Yes  [ ] No
Error Message: [____________]
Response Time (ms): [____________]

═══════════════════════════════════════════════════════════════════

TEST RESULT: [ ] PASS    [ ] FAIL    [ ] BLOCKED    [ ] SKIPPED

Executed By: _________________________
Execution Date: _________________________

COMMENTS:
Verifies that API properly rejects invalid credentials and does not create tokens.
```

---

## Test Case 4: Create Booking - Happy Path (JSON)

```
PROJECT: API Testing
ISSUE TYPE: Test Case
COMPONENT: CREATE Booking Endpoint
LABELS: Happy Path, Functional

TEST CASE ID: TC_BOOKING_CREATE_001
TITLE: Create Booking - Happy Path with Valid JSON Data
TYPE: Functional Test
PRIORITY: High
STATUS: Ready for Execution
CREATED: 2026-05-30

DESCRIPTION:
Verify that a valid booking is successfully created with all required fields and correct data types.

═══════════════════════════════════════════════════════════════════

PRECONDITIONS:
- API server is running and accessible
- Content-Type header support for application/json
- Valid booking data structure is prepared
- No existing booking with same details

═══════════════════════════════════════════════════════════════════

STEPS TO REPRODUCE:

Step | Action | Details
 1  | Open REST client | New POST request
 2  | Set endpoint | https://restful-booker.herokuapp.com/booking
 3  | Set HTTP method | POST
 4  | Set Content-Type | application/json
 5  | Set Accept header | application/json
 6  | Prepare request body | Valid booking JSON payload
 7  | Send POST request | Execute request
 8  | Capture response status | Record HTTP code
 9  | Extract booking ID | Parse response JSON
10  | Verify all fields | Check booking data returned
11  | Note response time | Record milliseconds

REQUEST BODY:
```json
{
  "firstname": "Jim",
  "lastname": "Brown",
  "totalprice": 111,
  "depositpaid": true,
  "bookingdates": {
    "checkin": "2018-01-01",
    "checkout": "2019-01-01"
  },
  "additionalneeds": "Breakfast"
}
```

═══════════════════════════════════════════════════════════════════

EXPECTED RESULT:

✓ HTTP Status Code: 200 OK
✓ Response contains "bookingid" field with numeric value
✓ Booking ID is > 0
✓ Response contains full booking object with all submitted fields
✓ firstname: "Jim"
✓ lastname: "Brown"
✓ totalprice: 111
✓ depositpaid: true
✓ bookingdates.checkin: "2018-01-01"
✓ bookingdates.checkout: "2019-01-01"
✓ additionalneeds: "Breakfast"
✓ Response Time: < 2000 milliseconds

═══════════════════════════════════════════════════════════════════

ACTUAL RESULT:

HTTP Status Code: [____________]
Booking ID: [____________]
Response Body: [____________]
All Fields Match: [ ] Yes  [ ] No
Response Time (ms): [____________]
Errors: [____________]

═══════════════════════════════════════════════════════════════════

TEST RESULT: [ ] PASS    [ ] FAIL    [ ] BLOCKED    [ ] SKIPPED

Executed By: _________________________
Execution Date: _________________________

COMMENTS:
Verify booking ID is saved for use in subsequent GET/UPDATE/DELETE operations.
```

---

## Test Case 5: Get Booking - Non-Existent ID

```
PROJECT: API Testing
ISSUE TYPE: Test Case
COMPONENT: GET Booking Endpoint
LABELS: Error Scenario, Edge Case

TEST CASE ID: TC_BOOKING_GET_004
TITLE: Get Booking - Non-Existent Booking ID
TYPE: Negative Test
PRIORITY: High
STATUS: Ready for Execution
CREATED: 2026-05-30

DESCRIPTION:
Verify API properly handles request for booking ID that does not exist with appropriate error response.

═══════════════════════════════════════════════════════════════════

PRECONDITIONS:
- API server is running at https://restful-booker.herokuapp.com
- Testing tool is configured for GET requests
- Booking ID 99999 does not exist in system
- No bookings were created with this ID

═══════════════════════════════════════════════════════════════════

STEPS TO REPRODUCE:

Step | Action | Input
 1  | Open REST client | New GET request
 2  | Set endpoint | https://restful-booker.herokuapp.com/booking/99999
 3  | Set HTTP method | GET
 4  | Set Accept header | application/json
 5  | Send GET request | Execute request
 6  | Capture HTTP status | Record status code
 7  | Examine response body | Check for error message
 8  | Check response headers | Note content type
 9  | Verify no data returned | Confirm empty/error response
10  | Note response time | Record timing

═══════════════════════════════════════════════════════════════════

EXPECTED RESULT:

✓ HTTP Status Code: 404 Not Found
✓ Response indicates resource not found
✓ Response does NOT contain booking data
✓ Response time: < 2000 milliseconds
✓ Response is either:
  - Empty body
  - Or contains error message
  - Or contains "null"

═══════════════════════════════════════════════════════════════════

ACTUAL RESULT:

HTTP Status Code: [____________]
Response Body: [____________]
Error Message: [____________]
Contains Booking Data: [ ] Yes  [ ] No
Response Time (ms): [____________]

═══════════════════════════════════════════════════════════════════

TEST RESULT: [ ] PASS    [ ] FAIL    [ ] BLOCKED    [ ] SKIPPED

Executed By: _________________________
Execution Date: _________________________

COMMENTS:
API should properly handle non-existent resources without returning false positives.
```

---

## Test Case 6: Update Booking - Without Authentication

```
PROJECT: API Testing
ISSUE TYPE: Test Case
COMPONENT: UPDATE Booking Endpoint
LABELS: Error Scenario, Security

TEST CASE ID: TC_BOOKING_UPDATE_004
TITLE: Update Booking - Missing Authentication
TYPE: Negative Test
PRIORITY: High
STATUS: Ready for Execution
CREATED: 2026-05-30

DESCRIPTION:
Verify that booking update is rejected when authentication token is not provided.

═══════════════════════════════════════════════════════════════════

PRECONDITIONS:
- API server is running at https://restful-booker.herokuapp.com
- Booking ID 1 exists in system
- No authentication token will be provided
- Testing tool configured for PUT requests

═══════════════════════════════════════════════════════════════════

STEPS TO REPRODUCE:

Step | Action | Details
 1  | Open REST client | New PUT request
 2  | Set endpoint | https://restful-booker.herokuapp.com/booking/1
 3  | Set HTTP method | PUT
 4  | Set Content-Type | application/json
 5  | SKIP setting Cookie/Authorization | No authentication
 6  | Prepare request body | Valid booking update data
 7  | Send PUT request | Execute request WITHOUT token
 8  | Capture response status | Record HTTP code
 9  | Examine error message | Check response body
10  | Verify booking unchanged | Confirm update failed

REQUEST BODY:
```json
{
  "firstname": "UpdatedName",
  "lastname": "Brown",
  "totalprice": 111,
  "depositpaid": true,
  "bookingdates": {
    "checkin": "2018-01-01",
    "checkout": "2019-01-01"
  },
  "additionalneeds": "Breakfast"
}
```

═══════════════════════════════════════════════════════════════════

EXPECTED RESULT:

✓ HTTP Status Code: 403 Forbidden OR 401 Unauthorized
✓ Response indicates authentication is required
✓ Response message indicates missing/invalid token
✓ Booking is NOT updated
✓ No data is modified in system
✓ Response time: < 2000 milliseconds

═══════════════════════════════════════════════════════════════════

ACTUAL RESULT:

HTTP Status Code: [____________]
Error Message: [____________]
Booking Updated: [ ] Yes  [ ] No
Response Time (ms): [____________]
Auth Required: [ ] Yes  [ ] No

═══════════════════════════════════════════════════════════════════

TEST RESULT: [ ] PASS    [ ] FAIL    [ ] BLOCKED    [ ] SKIPPED

Executed By: _________________________
Execution Date: _________________________

COMMENTS:
Security test: Ensures API enforces authentication for protected operations.
```

---

## Test Case 7: Create Booking - Invalid Date Format

```
PROJECT: API Testing
ISSUE TYPE: Test Case
COMPONENT: CREATE Booking Endpoint
LABELS: Edge Case, Validation

TEST CASE ID: TC_BOOKING_CREATE_007
TITLE: Create Booking - Invalid Check-in Date Format
TYPE: Negative Test
PRIORITY: Medium
STATUS: Ready for Execution
CREATED: 2026-05-30

DESCRIPTION:
Verify API rejects booking creation when date format does not match required YYYY-MM-DD format.

═══════════════════════════════════════════════════════════════════

PRECONDITIONS:
- API server is running at https://restful-booker.herokuapp.com
- Valid booking data is prepared except for date format
- API requires dates in YYYY-MM-DD format
- Testing tool ready for POST requests

═══════════════════════════════════════════════════════════════════

STEPS TO REPRODUCE:

Step | Action | Input
 1  | Open REST client | New POST request
 2  | Set endpoint | https://restful-booker.herokuapp.com/booking
 3  | Set HTTP method | POST
 4  | Set Content-Type | application/json
 5  | Prepare payload | Booking with invalid date format
 6  | Set checkin date | "01-01-2018" (invalid format)
 7  | Set checkout date | "2019-01-01" (valid format)
 8  | Send POST request | Execute request
 9  | Capture response status | Record HTTP code
10  | Check validation error | Examine error message

REQUEST BODY:
```json
{
  "firstname": "Jim",
  "lastname": "Brown",
  "totalprice": 111,
  "depositpaid": true,
  "bookingdates": {
    "checkin": "01-01-2018",
    "checkout": "2019-01-01"
  },
  "additionalneeds": "Breakfast"
}
```

═══════════════════════════════════════════════════════════════════

EXPECTED RESULT:

✓ HTTP Status Code: 400 Bad Request OR 200 OK (API behavior dependent)
✓ Response indicates date format error
✓ Error message mentions required format: YYYY-MM-DD
✓ Booking is NOT created (if validation enforced)
✓ OR Booking is created but with warning (if lenient)
✓ Response time: < 2000 milliseconds

═══════════════════════════════════════════════════════════════════

ACTUAL RESULT:

HTTP Status Code: [____________]
Error Message: [____________]
Booking Created: [ ] Yes  [ ] No
Format Error Indicated: [ ] Yes  [ ] No
Response Time (ms): [____________]

═══════════════════════════════════════════════════════════════════

TEST RESULT: [ ] PASS    [ ] FAIL    [ ] BLOCKED    [ ] SKIPPED

Executed By: _________________________
Execution Date: _________________________

COMMENTS:
Tests API's date format validation. Documents API behavior with invalid formats.
```

---

## Test Case 8: Delete Booking - Verify Deletion

```
PROJECT: API Testing
ISSUE TYPE: Test Case
COMPONENT: DELETE Booking Endpoint
LABELS: Functional Test, Data Integrity

TEST CASE ID: TC_BOOKING_DELETE_007
TITLE: Delete Booking - Verify Resource Deleted
TYPE: Functional Test
PRIORITY: High
STATUS: Ready for Execution
CREATED: 2026-05-30

DESCRIPTION:
Verify that a deleted booking cannot be retrieved, confirming the deletion was successful.

═══════════════════════════════════════════════════════════════════

PRECONDITIONS:
- API server is running at https://restful-booker.herokuapp.com
- Valid authentication token is obtained
- A test booking has been created and booking ID is known
- Testing tool configured for DELETE and GET requests

═══════════════════════════════════════════════════════════════════

STEPS TO REPRODUCE:

Step | Action | Details
 1  | Create test booking | Use TC_BOOKING_CREATE_001
 2  | Note booking ID | Save from creation response
 3  | Obtain auth token | Use TC_AUTH_001
 4  | Open REST client | New DELETE request
 5  | Set endpoint | https://restful-booker.herokuapp.com/booking/<ID>
 6  | Set HTTP method | DELETE
 7  | Set Content-Type | application/json
 8  | Add Cookie header | token=<valid_token>
 9  | Send DELETE request | Execute deletion
10  | Capture response status | Record HTTP code (expect 201)
11  | Send GET request | GET /booking/<ID>
12  | Verify 404 response | Confirm booking deleted

═══════════════════════════════════════════════════════════════════

EXPECTED RESULT - DELETE:

✓ HTTP Status Code: 201 Created OR 204 No Content
✓ Response indicates successful deletion
✓ Response body contains "OK" message or is empty

EXPECTED RESULT - GET (after delete):

✓ HTTP Status Code: 404 Not Found
✓ Booking is no longer accessible
✓ Response does NOT contain booking data
✓ Confirms deletion was permanent

═══════════════════════════════════════════════════════════════════

ACTUAL RESULT:

Step 1-10 (DELETE):
HTTP Status Code: [____________]
Response Body: [____________]
Deletion Successful: [ ] Yes  [ ] No

Step 11-12 (GET after delete):
HTTP Status Code: [____________]
Booking Still Exists: [ ] Yes  [ ] No
Response Body: [____________]

═══════════════════════════════════════════════════════════════════

TEST RESULT: [ ] PASS    [ ] FAIL    [ ] BLOCKED    [ ] SKIPPED

Executed By: _________________________
Execution Date: _________________________

COMMENTS:
This test verifies data integrity by confirming permanent deletion of resources.
```

---

## Test Case 9: Get Booking IDs - Filter by Name

```
PROJECT: API Testing
ISSUE TYPE: Test Case
COMPONENT: GET Booking IDs Endpoint
LABELS: Functional Test, Filtering

TEST CASE ID: TC_BOOKING_IDS_002
TITLE: Get Booking IDs - Filter by First Name
TYPE: Functional Test
PRIORITY: Medium
STATUS: Ready for Execution
CREATED: 2026-05-30

DESCRIPTION:
Verify that booking IDs can be filtered by guest first name and only matching records are returned.

═══════════════════════════════════════════════════════════════════

PRECONDITIONS:
- API server is running at https://restful-booker.herokuapp.com
- Bookings exist with firstname "Sally"
- Testing tool configured for GET requests with query parameters
- No existing bookings for non-existent names

═══════════════════════════════════════════════════════════════════

STEPS TO REPRODUCE:

Step | Action | Input
 1  | Open REST client | New GET request
 2  | Set endpoint base | https://restful-booker.herokuapp.com/booking
 3  | Add query parameter | ?firstname=sally
 4  | Complete URL | https://restful-booker.herokuapp.com/booking?firstname=sally
 5  | Set HTTP method | GET
 6  | Set Accept header | application/json
 7  | Send GET request | Execute request
 8  | Capture response | Record complete response
 9  | Parse response array | Extract booking objects
10  | Verify all matches | Check all returned bookings have firstname="Sally"
11  | Note response time | Record milliseconds
12  | Verify array structure | Confirm valid JSON array

═══════════════════════════════════════════════════════════════════

EXPECTED RESULT:

✓ HTTP Status Code: 200 OK
✓ Response body is valid JSON array
✓ Array contains booking objects
✓ Each object has "bookingid" field (numeric)
✓ All returned bookings have firstname="Sally" (case-insensitive)
✓ No bookings without firstname="Sally" are included
✓ Response time: < 2000 milliseconds
✓ If no matches: returns empty array []

Example Response:
```json
[
  {"bookingid": 1},
  {"bookingid": 5},
  {"bookingid": 12}
]
```

═══════════════════════════════════════════════════════════════════

ACTUAL RESULT:

HTTP Status Code: [____________]
Response Format: [ ] Valid JSON Array  [ ] Invalid
Number of Results: [____________]
All Match Criteria: [ ] Yes  [ ] No
Response Time (ms): [____________]
Sample Response: [____________]

═══════════════════════════════════════════════════════════════════

TEST RESULT: [ ] PASS    [ ] FAIL    [ ] BLOCKED    [ ] SKIPPED

Executed By: _________________________
Execution Date: _________________________

COMMENTS:
Tests filtering functionality. Verify case sensitivity behavior if applicable.
```

---

## Test Case 10: Create Booking - Special Characters

```
PROJECT: API Testing
ISSUE TYPE: Test Case
COMPONENT: CREATE Booking Endpoint
LABELS: Edge Case, Data Handling

TEST CASE ID: TC_BOOKING_CREATE_012
TITLE: Create Booking - Special Characters in Guest Name
TYPE: Functional Test
PRIORITY: Medium
STATUS: Ready for Execution
CREATED: 2026-05-30

DESCRIPTION:
Verify that bookings can be created with special characters in guest names and data is preserved correctly.

═══════════════════════════════════════════════════════════════════

PRECONDITIONS:
- API server is running at https://restful-booker.herokuapp.com
- Testing tool supports JSON with special characters
- Character encoding is set to UTF-8
- API should accept or validate special characters

═══════════════════════════════════════════════════════════════════

STEPS TO REPRODUCE:

Step | Action | Input
 1  | Open REST client | New POST request
 2  | Set endpoint | https://restful-booker.herokuapp.com/booking
 3  | Set HTTP method | POST
 4  | Set Content-Type | application/json; charset=utf-8
 5  | Set Accept header | application/json
 6  | Prepare request body | Booking with special characters
 7  | Firstname field | "Jim!@#$%"
 8  | Lastname field | "Brown&*()"
 9  | Send POST request | Execute request
10  | Capture response | Record full response
11  | Extract booking ID | Note ID for verification
12  | Verify data preservation | Check all characters retained

REQUEST BODY:
```json
{
  "firstname": "Jim!@#$%",
  "lastname": "Brown&*()",
  "totalprice": 111,
  "depositpaid": true,
  "bookingdates": {
    "checkin": "2018-01-01",
    "checkout": "2019-01-01"
  },
  "additionalneeds": "Breakfast"
}
```

═══════════════════════════════════════════════════════════════════

EXPECTED RESULT:

✓ HTTP Status Code: 200 OK
✓ Booking is created successfully
✓ Response contains valid bookingid
✓ Response contains booking object
✓ firstname in response: "Jim!@#$%" (all special characters preserved)
✓ lastname in response: "Brown&*()" (all special characters preserved)
✓ Response time: < 2000 milliseconds
✓ All data integrity maintained

═══════════════════════════════════════════════════════════════════

ACTUAL RESULT:

HTTP Status Code: [____________]
Booking Created: [ ] Yes  [ ] No
Booking ID: [____________]
Firstname Preserved: [ ] Yes  [ ] No
Lastname Preserved: [ ] Yes  [ ] No
Character Encoding Issues: [ ] Yes  [ ] No
Response Time (ms): [____________]

═══════════════════════════════════════════════════════════════════

TEST RESULT: [ ] PASS    [ ] FAIL    [ ] BLOCKED    [ ] SKIPPED

Executed By: _________________________
Execution Date: _________________________

COMMENTS:
Tests API's handling of special characters. Important for international names and special data.
Verify GET /booking/<ID> also returns special characters correctly.
```

---

## Summary Table

| # | Test Case ID | Title | Type | Status |
|---|---|---|---|---|
| 1 | TC_PING_001 | Health Check - Happy Path | Smoke | Ready |
| 2 | TC_AUTH_001 | Create Token - Valid Credentials | Happy Path | Ready |
| 3 | TC_AUTH_003 | Create Token - Invalid Password | Error | Ready |
| 4 | TC_BOOKING_CREATE_001 | Create Booking - Happy Path | Happy Path | Ready |
| 5 | TC_BOOKING_GET_004 | Get Booking - Non-Existent ID | Error | Ready |
| 6 | TC_BOOKING_UPDATE_004 | Update Booking - No Auth | Error | Ready |
| 7 | TC_BOOKING_CREATE_007 | Create Booking - Invalid Date | Edge Case | Ready |
| 8 | TC_BOOKING_DELETE_007 | Delete Booking - Verify | Functional | Ready |
| 9 | TC_BOOKING_IDS_002 | Get Bookings - Filter by Name | Functional | Ready |
| 10 | TC_BOOKING_CREATE_012 | Create Booking - Special Chars | Edge Case | Ready |

---

## Coverage Analysis

**Happy Path Tests: 3**
- TC_PING_001: API health check
- TC_AUTH_001: Authentication success
- TC_BOOKING_CREATE_001: Booking creation

**Error Scenario Tests: 3**
- TC_AUTH_003: Invalid credentials
- TC_BOOKING_GET_004: Non-existent resource
- TC_BOOKING_UPDATE_004: Missing authentication

**Edge Case Tests: 4**
- TC_BOOKING_CREATE_007: Invalid date format
- TC_BOOKING_DELETE_007: Verify deletion
- TC_BOOKING_IDS_002: Filtering functionality
- TC_BOOKING_CREATE_012: Special characters

**Total Coverage: 10 test cases across 7 API endpoints**

---

## JIRA Format Guidelines Used

Each test case follows this JIRA format structure:

1. **Header Information**
   - PROJECT, ISSUE TYPE, COMPONENT, LABELS
   - TEST CASE ID, TITLE, TYPE, PRIORITY, STATUS
   - CREATED date

2. **Description Section**
   - Clear, concise description of what is being tested

3. **Preconditions**
   - All prerequisites that must be met before execution
   - Environment setup requirements
   - Data or state requirements

4. **Steps to Reproduce**
   - Numbered steps (1-12)
   - Clear action-input-output format
   - Easy to follow sequentially
   - Specific values and expected inputs

5. **Expected Result**
   - Checkmarks (✓) for all expected outcomes
   - Specific values (status codes, messages, etc.)
   - Clear success criteria
   - Response format examples where applicable

6. **Actual Result**
   - Fields for recording actual outcomes
   - Placeholder format [____________]
   - Checkboxes for Yes/No decisions
   - Space for error messages and notes

7. **Test Result**
   - Status options: PASS, FAIL, BLOCKED, SKIPPED
   - Execution tracking (date, time, tester)
   - Defect reference if applicable

8. **Comments**
   - Additional notes for tester
   - Dependencies on other tests
   - Important observations

---

**END OF 10 JIRA FORMAT TEST CASES**
