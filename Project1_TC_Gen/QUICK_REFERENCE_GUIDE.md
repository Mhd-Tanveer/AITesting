# Restful-Booker API - Quick Reference Guide

## API Base URL
```
https://restful-booker.herokuapp.com
```

---

## 1. Quick Test Execution Commands (cURL)

### PING Endpoint
```bash
# Health Check
curl -X GET https://restful-booker.herokuapp.com/ping
# Expected: HTTP 201, {"OK": "Created"}
```

### AUTH Endpoint
```bash
# Get Auth Token
curl -X POST https://restful-booker.herokuapp.com/auth \
  -H "Content-Type: application/json" \
  -d '{"username":"admin","password":"password123"}'
# Expected: HTTP 200, {"token":"<token_value>"}
```

### GET Booking IDs
```bash
# All bookings
curl -X GET https://restful-booker.herokuapp.com/booking

# Filter by first name
curl -X GET "https://restful-booker.herokuapp.com/booking?firstname=sally"

# Filter by last name
curl -X GET "https://restful-booker.herokuapp.com/booking?lastname=Brown"

# Filter by check-in date
curl -X GET "https://restful-booker.herokuapp.com/booking?checkin=2014-03-13"

# Multiple filters
curl -X GET "https://restful-booker.herokuapp.com/booking?firstname=Sally&lastname=Brown&checkin=2014-03-13"
```

### GET Booking Details
```bash
# Get specific booking
curl -X GET https://restful-booker.herokuapp.com/booking/1 \
  -H "Accept: application/json"

# Get as XML
curl -X GET https://restful-booker.herokuapp.com/booking/1 \
  -H "Accept: application/xml"
```

### CREATE Booking
```bash
# Create booking (JSON)
curl -X POST https://restful-booker.herokuapp.com/booking \
  -H "Content-Type: application/json" \
  -d '{
    "firstname":"Jim",
    "lastname":"Brown",
    "totalprice":111,
    "depositpaid":true,
    "bookingdates":{
      "checkin":"2018-01-01",
      "checkout":"2019-01-01"
    },
    "additionalneeds":"Breakfast"
  }'
# Expected: HTTP 200, Returns booking ID
```

### UPDATE Booking
```bash
# Update booking with token in cookie
curl -X PUT https://restful-booker.herokuapp.com/booking/1 \
  -H "Content-Type: application/json" \
  -b "token=<your_token>" \
  -d '{
    "firstname":"James",
    "lastname":"Brown",
    "totalprice":111,
    "depositpaid":true,
    "bookingdates":{
      "checkin":"2018-01-01",
      "checkout":"2019-01-01"
    },
    "additionalneeds":"Breakfast"
  }'
```

### PATCH Booking
```bash
# Partial update - change firstname only
curl -X PATCH https://restful-booker.herokuapp.com/booking/1 \
  -H "Content-Type: application/json" \
  -b "token=<your_token>" \
  -d '{"firstname":"James"}'
```

### DELETE Booking
```bash
# Delete booking with token
curl -X DELETE https://restful-booker.herokuapp.com/booking/1 \
  -H "Content-Type: application/json" \
  -b "token=<your_token>"
# Expected: HTTP 201 Created or 204 No Content
```

---

## 2. HTTP Status Codes Reference

| Code | Meaning | Common Use in API |
|------|---------|------------------|
| 200 | OK | Successful GET, PUT, PATCH |
| 201 | Created | Successful POST, sometimes DELETE |
| 204 | No Content | Successful DELETE (alternative) |
| 400 | Bad Request | Invalid input/format |
| 401 | Unauthorized | Missing/invalid auth |
| 403 | Forbidden | Auth token required |
| 404 | Not Found | Resource doesn't exist |
| 405 | Method Not Allowed | Wrong HTTP method |
| 422 | Unprocessable Entity | Validation failed |
| 500 | Internal Server Error | Server issue |

---

## 3. Request Headers Reference

### Required Headers
```
Content-Type: application/json
```

### Optional Headers
```
Accept: application/json              # Response format
Accept: application/xml               # For XML response
Authorization: Basic <base64_creds>   # Basic auth
Cookie: token=<token_value>           # Token auth
```

### Header Values
```
Content-Type values:
  - application/json
  - text/xml
  - application/xml

Accept values:
  - application/json (default)
  - application/xml
```

---

## 4. Test Data Quick Reference

### Valid Booking Payload (Template)
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

### Auth Request
```json
{
  "username": "admin",
  "password": "password123"
}
```

### Date Format
- **Required Format**: YYYY-MM-DD
- **Example**: 2018-01-01
- **Invalid Format**: 01-01-2018 or 2018/01/01

---

## 5. Test Case ID Quick Lookup

| Test ID | Endpoint | Test Name | Type |
|---------|----------|-----------|------|
| TC_PING_001 | /ping | Health Check | Happy Path |
| TC_PING_002 | /ping | Connection Timeout | Error |
| TC_AUTH_001 | /auth | Valid Credentials | Happy Path |
| TC_AUTH_002-007 | /auth | Invalid Inputs | Error |
| TC_BOOKING_IDS_001-009 | /booking | Get IDs & Filter | CRUD |
| TC_BOOKING_GET_001-008 | /booking/{id} | Get Details | CRUD |
| TC_BOOKING_CREATE_001-015 | /booking | Create | CRUD |
| TC_BOOKING_UPDATE_001-008 | /booking/{id} | Update | CRUD |
| TC_BOOKING_PATCH_001-006 | /booking/{id} | Patch | CRUD |
| TC_BOOKING_DELETE_001-010 | /booking/{id} | Delete | CRUD |

---

## 6. Common Error Scenarios

### Authentication Required
```
Endpoint: DELETE, PUT, PATCH
Error: HTTP 403 Forbidden
Solution: Add token to request (cookie or auth header)
```

### Resource Not Found
```
Status: HTTP 404 Not Found
Cause: Invalid booking ID, deleted booking, or ID doesn't exist
Solution: Use existing booking ID or create one first
```

### Invalid Input
```
Status: HTTP 400 Bad Request or 422 Unprocessable Entity
Cause: Invalid field format, missing required fields, or invalid data type
Solution: Check field requirements and data format
```

### Missing Content-Type
```
Status: May cause parsing errors
Solution: Always include Content-Type: application/json header
```

---

## 7. Postman Setup Quick Guide

### 1. Create Collection
```
Name: Restful-Booker API Tests
Description: Complete API test suite
```

### 2. Add Environment Variables
```
baseUrl = https://restful-booker.herokuapp.com
token = (leave blank initially)
bookingId = (leave blank initially)
```

### 3. Create Requests (Example Structure)
```
PING Tests
├── Get Health Status (GET /ping)

AUTH Tests
├── Get Auth Token (POST /auth)

Booking Tests
├── GET All Bookings (GET /booking)
├── GET Booking by ID (GET /booking/{{bookingId}})
├── CREATE Booking (POST /booking)
├── UPDATE Booking (PUT /booking/{{bookingId}})
├── PATCH Booking (PATCH /booking/{{bookingId}})
└── DELETE Booking (DELETE /booking/{{bookingId}})
```

### 4. Use Environment Variables
```
URL: {{baseUrl}}/booking
Authorization Header: token={{token}}
```

### 5. Pre-request Script Example
```javascript
// Get token before protected operations
if (pm.request.method === "DELETE" || pm.request.method === "PUT" || pm.request.method === "PATCH") {
    // Token should already be set
    console.log("Token: " + pm.environment.get("token"));
}
```

### 6. Tests Script Example
```javascript
pm.test("Status code is 200", function() {
    pm.response.to.have.status(200);
});

pm.test("Response contains token", function() {
    var jsonData = pm.response.json();
    pm.expect(jsonData.token).to.exist;
});
```

---

## 8. Endpoint Summary Table

| Endpoint | Method | Auth Required | Purpose |
|----------|--------|---------------|---------|
| /ping | GET | No | Health check |
| /auth | POST | No | Get auth token |
| /booking | GET | No | Get all booking IDs |
| /booking?[filters] | GET | No | Get filtered bookings |
| /booking/{id} | GET | No | Get booking details |
| /booking | POST | No | Create booking |
| /booking/{id} | PUT | **Yes** | Full update |
| /booking/{id} | PATCH | **Yes** | Partial update |
| /booking/{id} | DELETE | **Yes** | Delete booking |

---

## 9. Troubleshooting Quick Guide

### Issue: "Connection refused"
```
Possible Causes:
- API server is down
- Wrong base URL
- Network connectivity issue

Solution:
- Check API status
- Verify URL: https://restful-booker.herokuapp.com
- Test connectivity
```

### Issue: "401 Unauthorized" on protected endpoints
```
Possible Causes:
- Missing token in request
- Invalid/expired token
- Wrong token value

Solution:
- Call /auth endpoint to get valid token
- Add token to Cookie header: token=<value>
- Or use in Authorization header
```

### Issue: "400 Bad Request"
```
Possible Causes:
- Invalid JSON format
- Missing required fields
- Invalid field data type
- Invalid date format (use YYYY-MM-DD)

Solution:
- Validate JSON syntax
- Check required fields
- Verify data types
- Use correct date format
```

### Issue: "404 Not Found"
```
Possible Causes:
- Booking ID doesn't exist
- Booking was deleted
- Wrong endpoint URL

Solution:
- Create a booking first
- Use existing booking ID
- Verify endpoint URL
```

### Issue: "Response timeout"
```
Possible Causes:
- API is slow/overloaded
- Network latency
- Request timeout too short

Solution:
- Increase timeout setting
- Retry request
- Check API status
- Try during off-peak hours
```

---

## 10. Test Execution Workflow

```
START
  ↓
[1] Verify API Accessibility
  └─→ GET /ping
  └─→ Expected: 201 Created
  ↓
[2] Get Authentication Token
  └─→ POST /auth
  └─→ Save token for later use
  ↓
[3] Execute Read Tests
  └─→ GET /booking
  └─→ GET /booking/{id}
  ↓
[4] Execute Create Tests
  └─→ POST /booking
  └─→ Save booking IDs
  ↓
[5] Execute Update Tests
  └─→ PUT /booking/{id}
  └─→ PATCH /booking/{id}
  ↓
[6] Execute Delete Tests
  └─→ DELETE /booking/{id}
  └─→ Verify deletion with GET
  ↓
[7] Log All Results
  └─→ Document Pass/Fail
  └─→ Log any defects
  ↓
[8] Generate Report
  └─→ Calculate metrics
  └─→ Summarize findings
  ↓
END
```

---

## 11. Test Case Execution Summary (65 Total Tests)

```
┌─────────────────────────────────────────┐
│ PING Endpoint: 2 Tests                  │
├─────────────────────────────────────────┤
│ ✓ Health Check - Happy Path             │
│ ✓ Health Check - Connection Timeout     │
└─────────────────────────────────────────┘

┌─────────────────────────────────────────┐
│ AUTH Endpoint: 7 Tests                  │
├─────────────────────────────────────────┤
│ ✓ Create Token - Valid Credentials      │
│ ✓ Create Token - Invalid Username       │
│ ✓ Create Token - Invalid Password       │
│ ✓ Create Token - Missing Username       │
│ ✓ Create Token - Missing Password       │
│ ✓ Create Token - Empty Credentials      │
│ ✓ Create Token - Special Characters     │
└─────────────────────────────────────────┘

┌─────────────────────────────────────────┐
│ GET Booking IDs: 9 Tests                │
├─────────────────────────────────────────┤
│ ✓ Get All Booking IDs                   │
│ ✓ Filter by First Name                  │
│ ✓ Filter by Last Name                   │
│ ✓ Filter by Check-in Date               │
│ ✓ Filter by Check-out Date              │
│ ✓ Combined Filters                      │
│ ✓ Invalid Date Format                   │
│ ✓ No Matches Found                      │
│ ✓ Case Sensitivity                      │
└─────────────────────────────────────────┘

┌─────────────────────────────────────────┐
│ GET Booking: 8 Tests                    │
├─────────────────────────────────────────┤
│ ✓ Get Booking - Happy Path              │
│ ✓ Accept JSON Header                    │
│ ✓ Accept XML Header                     │
│ ✓ Non-Existent ID                       │
│ ✓ Invalid ID Format                     │
│ ✓ Negative ID                           │
│ ✓ Zero ID                               │
│ ✓ Very Large ID                         │
└─────────────────────────────────────────┘

┌─────────────────────────────────────────┐
│ CREATE Booking: 15 Tests                │
├─────────────────────────────────────────┤
│ ✓ Happy Path (JSON)                     │
│ ✓ Happy Path (XML)                      │
│ ✓ Missing First Name                    │
│ ✓ Missing Last Name                     │
│ ✓ Missing Total Price                   │
│ ✓ Missing Booking Dates                 │
│ ✓ Invalid Check-in Date Format          │
│ ✓ Checkout Before Checkin               │
│ ✓ Negative Total Price                  │
│ ✓ Zero Total Price                      │
│ ✓ Very Long First Name                  │
│ ✓ Special Characters in Name            │
│ ✓ Unicode Characters                    │
│ ✓ Decimal Total Price                   │
│ ✓ Optional Additional Needs Missing     │
└─────────────────────────────────────────┘

┌─────────────────────────────────────────┐
│ UPDATE Booking: 8 Tests                 │
├─────────────────────────────────────────┤
│ ✓ Full Update with Cookie Auth          │
│ ✓ Full Update with Basic Auth           │
│ ✓ Update Multiple Fields                │
│ ✓ Update Without Authentication         │
│ ✓ Update Non-Existent ID                │
│ ✓ Invalid ID Format                     │
│ ✓ Update Single Field                   │
│ ✓ Invalid Date Format                   │
└─────────────────────────────────────────┘

┌─────────────────────────────────────────┐
│ PATCH Booking: 6 Tests                  │
├─────────────────────────────────────────┤
│ ✓ Update First Name Only                │
│ ✓ Update Last Name Only                 │
│ ✓ Update Total Price Only               │
│ ✓ Patch Without Authentication          │
│ ✓ Patch Non-Existent ID                 │
│ ✓ Patch Empty Body                      │
└─────────────────────────────────────────┘

┌─────────────────────────────────────────┐
│ DELETE Booking: 10 Tests                │
├─────────────────────────────────────────┤
│ ✓ Delete with Cookie Auth               │
│ ✓ Delete with Basic Auth                │
│ ✓ Delete Without Authentication         │
│ ✓ Delete with Invalid Token             │
│ ✓ Delete Non-Existent Booking           │
│ ✓ Delete Invalid ID Format              │
│ ✓ Verify Booking Deleted                │
│ ✓ Delete with Expired Token             │
│ ✓ Delete Negative ID                    │
│ ✓ Delete Already Deleted Booking        │
└─────────────────────────────────────────┘

TOTAL: 65 TEST CASES
```

---

## 12. Notes

- Always verify API is accessible before starting tests
- Get auth token early and store for use in protected operations
- Create test bookings early and save IDs for later operations
- Document all test results in JIRA format
- Report any failures immediately with defect details
- Clean up test data after execution

---

**QUICK REFERENCE - END OF DOCUMENT**
