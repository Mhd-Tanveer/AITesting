# Restful-Booker API - JIRA Test Case Format & Execution Guide

## Overview
This document provides detailed JIRA formatting examples for test case creation and execution, along with step-by-step instructions for running the Restful-Booker API test cases.

---

## 1. JIRA Test Case Template

### Basic Structure in JIRA

```
Project: [Project Key]
Issue Type: Test Case
Component: API Testing
Labels: restful-booker, api-testing, automation

Test Case ID: [Unique ID from TEST_PLAN]
Summary: [One-line description of test]
Description: [Detailed description]
Type: Automated / Manual
Priority: High / Medium / Low
Test Type: Functional / Regression / Sanity / Smoke
Status: Draft / Ready / In Progress / Passed / Failed / Blocked
```

---

## 2. Detailed JIRA Test Case Examples

### Example 1: Happy Path Test Case

```
=== TEST CASE DETAILS ===

Test ID: TC_PING_001
Title: Health Check - Happy Path
Component: PING Endpoint
Priority: High
Test Type: Smoke Test
Assignee: [QA Engineer Name]
Created Date: [Date]
Last Modified: [Date]

=== PRECONDITIONS ===
- API server is running at https://restful-booker.herokuapp.com
- Network connectivity is available
- API is responding to requests

=== STEPS TO REPRODUCE ===
Step | Action | Expected Input/Output
1 | Navigate to API health endpoint | N/A
2 | Send GET request | URL: https://restful-booker.herokuapp.com/ping
3 | Verify HTTP status code | Status Code: 201 Created
4 | Verify response structure | Content-Type: application/json
5 | Verify response body | Body: {"OK": "Created"}

=== EXPECTED RESULT ===
✓ HTTP Status Code: 201 Created
✓ Response Content-Type: application/json
✓ Response Body: {"OK": "Created"} or equivalent
✓ Response Time: < 2000 milliseconds
✓ No error messages or exceptions

=== ACTUAL RESULT ===
[To be filled during test execution]
HTTP Status Code: ___
Response Time: ___ ms
Response Body: ___
Error Message: ___

=== TEST RESULT ===
Pass / Fail / Blocked / Skipped
Executed By: [QA Engineer Name]
Execution Date: [Date]
Execution Time: [Time]

=== DEFECT REFERENCE ===
Defect ID: [If failed, reference defect ID]
Severity: [Critical/High/Medium/Low]
Description: [Brief description of failure]

=== NOTES & COMMENTS ===
[Any additional observations or issues encountered]
```

---

### Example 2: Error Scenario Test Case

```
=== TEST CASE DETAILS ===

Test ID: TC_AUTH_002
Title: Create Auth Token - Invalid Username
Component: AUTH Endpoint
Priority: High
Test Type: Functional Test
Assignee: [QA Engineer Name]

=== PRECONDITIONS ===
- API server is running and accessible
- API endpoint /auth is available
- Content-Type header can be set to application/json

=== STEPS TO REPRODUCE ===
Step | Action | Expected Value
1 | Prepare request headers | Content-Type: application/json
2 | Prepare request body | {"username": "invaliduser", "password": "password123"}
3 | Send POST request | https://restful-booker.herokuapp.com/auth
4 | Capture HTTP status code | Record: ___
5 | Capture response body | Record: ___
6 | Validate response format | Check: Is valid JSON?

=== EXPECTED RESULT ===
✓ HTTP Status Code: 200 OK (API returns 200 even for invalid credentials)
✓ Response Format: Valid JSON object
✓ Response should NOT contain a valid token OR contain error indication
✓ Response Time: < 2000 milliseconds

Acceptable Response Example:
{
  "reason": "Bad credentials"
}

Or no token field present:
{}

=== ACTUAL RESULT ===
[To be filled during execution]
HTTP Status Code: ___
Response Body: ___
Contains valid token: Yes / No / [Token value if present]
Error Message: ___

=== TEST RESULT ===
Pass / Fail / Blocked / Skipped
Reason for Failure: [If applicable]
Executed By: [Name]
Execution Date: [Date]

=== NOTES ===
This test verifies proper error handling when invalid credentials are provided.
```

---

### Example 3: Edge Case / Boundary Test

```
=== TEST CASE DETAILS ===

Test ID: TC_BOOKING_CREATE_011
Title: Create Booking - Very Long First Name
Component: CREATE Booking Endpoint
Priority: Medium
Test Type: Boundary Value Test
Assignee: [QA Engineer Name]

=== PRECONDITIONS ===
- API server is running
- POST /booking endpoint is operational
- Ability to send requests with large payloads

=== STEPS TO REPRODUCE ===
Step | Description | Test Data
1 | Prepare request headers | Content-Type: application/json; Accept: application/json
2 | Prepare request body | See "Test Data" section below
3 | Set firstname to very long value | 500+ characters (see payload below)
4 | Keep other fields as normal | Use standard valid values
5 | Send POST request | https://restful-booker.herokuapp.com/booking
6 | Record response | Note status code and body

Test Data (Payload):
{
  "firstname": "ABCDEFGHIJKLMNOPQRSTUVWXYZ...[500+ characters total]",
  "lastname": "Brown",
  "totalprice": 111,
  "depositpaid": true,
  "bookingdates": {
    "checkin": "2018-01-01",
    "checkout": "2019-01-01"
  },
  "additionalneeds": "Breakfast"
}

=== EXPECTED RESULT ===
Option 1 - API accepts the long name:
✓ HTTP Status Code: 200 OK
✓ Booking created successfully
✓ firstname field in response contains all characters

Option 2 - API rejects with validation error:
✓ HTTP Status Code: 400 Bad Request or 422 Unprocessable Entity
✓ Response contains error message about field length
✓ Booking is NOT created

=== ACTUAL RESULT ===
[To be filled during execution]
HTTP Status Code: ___
Booking Created: Yes / No
Error Message: ___
Firstname stored length: ___ characters

=== TEST RESULT ===
Pass / Fail / Blocked / Skipped
Executed By: [Name]
Execution Date: [Date]

=== OBSERVATIONS ===
- This test validates boundary conditions for text fields
- Important for security (prevent buffer overflows)
- Indicates maximum field length if applicable
```

---

## 3. Test Execution Checklist

Before executing any test cases, verify:

- [ ] API server is accessible and running
- [ ] API endpoint is responding to requests
- [ ] Test data is prepared and available
- [ ] Testing tools are configured (Postman, Insomnia, or REST client)
- [ ] Authentication credentials are ready if needed
- [ ] Network connectivity is stable
- [ ] Any dependent test cases have been executed first
- [ ] Environment is clean (no residual data from previous tests)

---

## 4. Step-by-Step Test Execution Guide

### Phase 1: PING Endpoint Testing (2 tests)
**Objective**: Verify API is healthy and responding

```
1. [TC_PING_001] Open REST client
   → GET https://restful-booker.herokuapp.com/ping
   → Record: Status code, Response time, Response body
   → Expected: 201 Created, {"OK": "Created"}

2. [TC_PING_002] Configure timeout
   → Set request timeout to 100ms
   → GET https://restful-booker.herokuapp.com/ping
   → Observe: Connection timeout error
   → Expected: Timeout exception or error response
```

### Phase 2: AUTH Endpoint Testing (7 tests)
**Objective**: Verify authentication token generation

```
Prerequisites: Complete PING tests first

1. [TC_AUTH_001] Valid Credentials
   → POST /auth with {"username": "admin", "password": "password123"}
   → Expected: HTTP 200, Token in response
   → Document the token for use in later tests

2. [TC_AUTH_002] Invalid Username
   → POST /auth with {"username": "invaliduser", "password": "password123"}
   → Expected: HTTP 200, No valid token

3. [TC_AUTH_003] Invalid Password
   → POST /auth with {"username": "admin", "password": "wrongpass"}
   → Expected: HTTP 200, No valid token

4. [TC_AUTH_004] Missing Username
   → POST /auth with {"password": "password123"} (no username)
   → Expected: HTTP 200 or 400, Error indication

5. [TC_AUTH_005] Missing Password
   → POST /auth with {"username": "admin"} (no password)
   → Expected: HTTP 200 or 400, Error indication

6. [TC_AUTH_006] Empty Credentials
   → POST /auth with {"username": "", "password": ""}
   → Expected: HTTP 200 or 400, Error indication

7. [TC_AUTH_007] Special Characters
   → POST /auth with {"username": "ad@min!#$", "password": "p@ss!"}
   → Expected: HTTP 200, No valid token
```

### Phase 3: GET Booking IDs Endpoint Testing (9 tests)
**Objective**: Verify filtering and retrieval of booking IDs

```
Prerequisites: Complete AUTH tests, have valid token

1. [TC_BOOKING_IDS_001] Get All Booking IDs
   → GET /booking (no parameters)
   → Expected: HTTP 200, Array of booking objects

2. [TC_BOOKING_IDS_002] Filter by First Name
   → GET /booking?firstname=sally
   → Expected: HTTP 200, Array of matching bookings

3. [TC_BOOKING_IDS_003] Filter by Last Name
   → GET /booking?lastname=Brown
   → Expected: HTTP 200, Matching bookings

4. [TC_BOOKING_IDS_004] Filter by Check-in Date
   → GET /booking?checkin=2014-03-13
   → Expected: HTTP 200, Bookings on/after date

5. [TC_BOOKING_IDS_005] Filter by Check-out Date
   → GET /booking?checkout=2014-03-15
   → Expected: HTTP 200, Bookings on/after date

6. [TC_BOOKING_IDS_006] Combined Filters
   → GET /booking?firstname=Sally&lastname=Brown&checkin=2014-03-13
   → Expected: HTTP 200, Bookings matching ALL criteria

7. [TC_BOOKING_IDS_007] Invalid Date Format
   → GET /booking?checkin=2014/03/13 (wrong format)
   → Expected: HTTP 200, Empty array or error

8. [TC_BOOKING_IDS_008] No Matches
   → GET /booking?firstname=NonExistentName
   → Expected: HTTP 200, Empty array []

9. [TC_BOOKING_IDS_009] Case Sensitivity
   → GET /booking?firstname=SALLY (uppercase)
   → Expected: HTTP 200, Document case handling
```

### Phase 4: GET Booking Endpoint Testing (8 tests)
**Objective**: Verify retrieval of individual booking details

```
Prerequisites: Verify at least one booking exists

1. [TC_BOOKING_GET_001] Get Booking - Happy Path
   → GET /booking/1
   → Expected: HTTP 200, Booking object with all fields

2. [TC_BOOKING_GET_002] Accept JSON Header
   → GET /booking/1 with Accept: application/json
   → Expected: HTTP 200, JSON response

3. [TC_BOOKING_GET_003] Accept XML Header
   → GET /booking/1 with Accept: application/xml
   → Expected: HTTP 200, XML response

4. [TC_BOOKING_GET_004] Non-Existent ID
   → GET /booking/99999
   → Expected: HTTP 404 Not Found

5. [TC_BOOKING_GET_005] Invalid ID Format
   → GET /booking/abc
   → Expected: HTTP 400 or 404

6. [TC_BOOKING_GET_006] Negative ID
   → GET /booking/-1
   → Expected: HTTP 404 or 400

7. [TC_BOOKING_GET_007] Zero ID
   → GET /booking/0
   → Expected: HTTP 404 or 400

8. [TC_BOOKING_GET_008] Very Large ID
   → GET /booking/9999999999999999
   → Expected: HTTP 404
```

### Phase 5: CREATE Booking Endpoint Testing (15 tests)
**Objective**: Verify booking creation with various data scenarios

```
Prerequisites: API accessible, token available

1. [TC_BOOKING_CREATE_001] Create Booking - JSON
   → POST /booking with valid JSON payload
   → Expected: HTTP 200, Booking ID in response

2. [TC_BOOKING_CREATE_002] Create Booking - XML
   → POST /booking with valid XML payload
   → Expected: HTTP 200, Booking ID in response

3-6. [TC_BOOKING_CREATE_003 to 006] Missing Required Fields
   → Test each missing field: firstname, lastname, totalprice, bookingdates
   → Expected: HTTP 400 or 200 (API-dependent), Error message

7. [TC_BOOKING_CREATE_007] Invalid Date Format
   → POST with date format "01-01-2018" instead of "2018-01-01"
   → Expected: HTTP 400 or 200, Error or acceptance

8. [TC_BOOKING_CREATE_008] Checkout Before Checkin
   → POST with checkout earlier than checkin
   → Expected: HTTP 400 or 200, Validation error

9. [TC_BOOKING_CREATE_009] Negative Total Price
   → POST with totalprice: -100
   → Expected: HTTP 400 or 200, Validation or acceptance

10. [TC_BOOKING_CREATE_010] Zero Total Price
    → POST with totalprice: 0
    → Expected: HTTP 200 or 400

11. [TC_BOOKING_CREATE_011] Very Long First Name
    → POST with firstname of 500+ characters
    → Expected: HTTP 400 (length limit) or 200 (accepted)

12. [TC_BOOKING_CREATE_012] Special Characters
    → POST with special characters: !@#$%^&*()
    → Expected: HTTP 200, Accepted

13. [TC_BOOKING_CREATE_013] Unicode Characters
    → POST with unicode: José García
    → Expected: HTTP 200, Characters preserved

14. [TC_BOOKING_CREATE_014] Decimal Total Price
    → POST with totalprice: 111.50
    → Expected: HTTP 200, Decimal preserved

15. [TC_BOOKING_CREATE_015] Optional Field Missing
    → POST without additionalneeds field
    → Expected: HTTP 200, Booking created
```

### Phase 6: UPDATE Booking Endpoint Testing (8 tests)
**Objective**: Verify full booking update functionality

```
Prerequisites: Have valid token, have existing booking to update

1. [TC_BOOKING_UPDATE_001] Update with Cookie Auth
   → PUT /booking/1 with valid token in cookie
   → Expected: HTTP 200, Updated booking data

2. [TC_BOOKING_UPDATE_002] Update with Basic Auth
   → PUT /booking/1 with Basic Authorization header
   → Expected: HTTP 200, Updated booking data

3. [TC_BOOKING_UPDATE_003] Update Multiple Fields
   → PUT /booking/1 with all fields changed
   → Expected: HTTP 200, All fields updated

4. [TC_BOOKING_UPDATE_004] Update Without Authentication
   → PUT /booking/1 without auth
   → Expected: HTTP 403 Forbidden

5. [TC_BOOKING_UPDATE_005] Update Non-Existent ID
   → PUT /booking/99999
   → Expected: HTTP 404 Not Found

6. [TC_BOOKING_UPDATE_006] Invalid ID Format
   → PUT /booking/abc
   → Expected: HTTP 400 or 404

7. [TC_BOOKING_UPDATE_007] Update Single Field
   → PUT with only firstname changed
   → Expected: HTTP 200, Other fields unchanged

8. [TC_BOOKING_UPDATE_008] Invalid Date Format
   → PUT with date format "01/01/2018"
   → Expected: HTTP 400 or 200, Error or acceptance
```

### Phase 7: PATCH Booking Endpoint Testing (6 tests)
**Objective**: Verify partial booking update functionality

```
Prerequisites: Have valid token, have existing booking

1. [TC_BOOKING_PATCH_001] Patch First Name Only
   → PATCH /booking/1 with {"firstname": "James"}
   → Expected: HTTP 200, firstname updated, others unchanged

2. [TC_BOOKING_PATCH_002] Patch Last Name Only
   → PATCH /booking/1 with {"lastname": "Smith"}
   → Expected: HTTP 200, lastname updated, others unchanged

3. [TC_BOOKING_PATCH_003] Patch Total Price Only
   → PATCH /booking/1 with {"totalprice": 250}
   → Expected: HTTP 200, totalprice updated, others unchanged

4. [TC_BOOKING_PATCH_004] Patch Without Authentication
   → PATCH /booking/1 without auth header
   → Expected: HTTP 403 Forbidden

5. [TC_BOOKING_PATCH_005] Patch Non-Existent ID
   → PATCH /booking/99999
   → Expected: HTTP 404 Not Found

6. [TC_BOOKING_PATCH_006] Patch Empty Body
   → PATCH /booking/1 with empty {} body
   → Expected: HTTP 200 or 400
```

### Phase 8: DELETE Booking Endpoint Testing (10 tests)
**Objective**: Verify booking deletion functionality

```
Prerequisites: Have valid token, have bookings to delete

1. [TC_BOOKING_DELETE_001] Delete with Cookie Auth
   → DELETE /booking/1 with valid token in cookie
   → Expected: HTTP 201 Created or 204 No Content

2. [TC_BOOKING_DELETE_002] Delete with Basic Auth
   → DELETE /booking/1 with Basic Authorization
   → Expected: HTTP 201 or 204, Booking deleted

3. [TC_BOOKING_DELETE_003] Delete Without Authentication
   → DELETE /booking/1 without auth
   → Expected: HTTP 403 Forbidden

4. [TC_BOOKING_DELETE_004] Delete with Invalid Token
   → DELETE /booking/1 with invalid token
   → Expected: HTTP 403 Forbidden or 401 Unauthorized

5. [TC_BOOKING_DELETE_005] Delete Non-Existent Booking
   → DELETE /booking/99999
   → Expected: HTTP 404 Not Found

6. [TC_BOOKING_DELETE_006] Delete Invalid ID Format
   → DELETE /booking/abc
   → Expected: HTTP 400 or 404

7. [TC_BOOKING_DELETE_007] Verify After Deletion
   → DELETE then GET same booking ID
   → Expected: DELETE returns 201, GET returns 404

8. [TC_BOOKING_DELETE_008] Delete with Expired Token
   → DELETE with expired token
   → Expected: HTTP 403 Forbidden

9. [TC_BOOKING_DELETE_009] Delete Negative ID
   → DELETE /booking/-1
   → Expected: HTTP 404 or 400

10. [TC_BOOKING_DELETE_010] Delete Already Deleted
    → DELETE same booking twice
    → Expected: First 201, Second 404
```

---

## 5. Test Execution Status Tracking

Use this table to track test execution:

| Test ID | Test Name | Status | Pass/Fail | Notes | Date | Executed By |
|---------|-----------|--------|-----------|-------|------|-------------|
| TC_PING_001 | Health Check | [Ready] | | | | |
| TC_PING_002 | Timeout Check | [Ready] | | | | |
| TC_AUTH_001 | Valid Credentials | [Ready] | | | | |
| TC_AUTH_002 | Invalid Username | [Ready] | | | | |
| | | | | | | |

Status Options: Ready / In Progress / Passed / Failed / Blocked / Skipped

---

## 6. Defect Logging Template

When a test fails, create a JIRA defect with:

```
Issue Type: Bug / Defect
Summary: [Short description of issue]
Severity: Critical / High / Medium / Low
Priority: P0 / P1 / P2 / P3

Description:
[Describe the defect clearly]

Affected Endpoint: [e.g., /booking]
Affected Test Case: [TC_ID]

Steps to Reproduce:
1. [Step 1]
2. [Step 2]
3. [Step 3]

Expected Behavior:
[What should happen]

Actual Behavior:
[What actually happened]

Environment:
- API URL: https://restful-booker.herokuapp.com
- API Version: [Version if known]
- Testing Tool: [Postman/Insomnia/etc.]

Screenshots/Logs:
[Attach any evidence]

Workaround:
[If any temporary workaround exists]
```

---

## 7. Test Metrics & Reporting

### Key Metrics to Track

```
Total Test Cases: 65
- PING: 2
- AUTH: 7
- GET Booking IDs: 9
- GET Booking: 8
- CREATE Booking: 15
- UPDATE Booking: 8
- PATCH Booking: 6
- DELETE Booking: 10

Test Coverage by Endpoint:
- Ping Endpoint: 100% (2/2)
- Auth Endpoint: 100% (7/7)
- Booking IDs: 100% (9/9)
- Booking Get: 100% (8/8)
- Booking Create: 100% (15/15)
- Booking Update: 100% (8/8)
- Booking Patch: 100% (6/6)
- Booking Delete: 100% (10/10)

Overall Coverage: 100% (65/65)
```

### Sample Test Report

```
TEST EXECUTION REPORT
Date: [Date Range]
Executed By: [Team Members]

SUMMARY
-------
Total Test Cases: 65
Passed: [Count]
Failed: [Count]
Blocked: [Count]
Skipped: [Count]
Pass Rate: [%]

RESULTS BY ENDPOINT
-------------------
PING Endpoint:
- Total: 2
- Passed: 2
- Failed: 0
- Pass Rate: 100%

AUTH Endpoint:
- Total: 7
- Passed: 6
- Failed: 1
- Pass Rate: 85.7%
- Failed Test: TC_AUTH_006

[Continue for each endpoint...]

DEFECTS FOUND
-------------
1. Defect ID: [DEFECT-123]
   Test: TC_AUTH_006
   Severity: Medium
   Description: [Brief description]

[List all defects found...]

RECOMMENDATIONS
---------------
1. [Recommendation 1]
2. [Recommendation 2]
3. [Recommendation 3]
```

---

## 8. Tools & Resources

### Recommended Tools for REST API Testing
- **Postman** (https://www.postman.com) - Feature-rich REST client
- **Insomnia** (https://insomnia.rest) - Simple and elegant
- **Thunder Client** (VS Code extension) - Lightweight
- **cURL** (Command line) - Quick testing
- **REST Client** (VS Code extension) - Built-in IDE testing

### Required Software
- REST client (any of above)
- JIRA account for test case management
- Text editor for response analysis
- Browser for API documentation

### API Documentation Reference
- Base URL: https://restful-booker.herokuapp.com
- Documentation: [Check Restful-Booker official documentation]
- Postman Collection: [Import if available]

---

## 9. Quality Assurance Checklist

Before marking test execution as complete:

- [ ] All test cases have been executed
- [ ] Results documented in JIRA
- [ ] All failures investigated
- [ ] Defects logged with proper severity
- [ ] Screenshots/evidence attached to failed tests
- [ ] Test metrics calculated
- [ ] Test report generated
- [ ] Defects assigned to development team
- [ ] Regression test suite identified
- [ ] Sign-off obtained from stakeholder

---

**END OF EXECUTION GUIDE**
