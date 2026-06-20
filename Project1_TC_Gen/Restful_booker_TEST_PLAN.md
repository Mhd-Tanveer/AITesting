# Restful-Booker API Test Plan

## Document Information
- **Project**: Restful-Booker API Testing
- **API URL**: https://restful-booker.herokuapp.com
- **Test Plan Version**: 1.0
- **Date Created**: May 30, 2026
- **Document Owner**: QA Testing Team

---

## 1. Executive Summary

This document outlines the comprehensive test plan for the Restful-Booker API, a RESTful web service for managing hotel booking reservations. The API provides endpoints for authentication, creating, reading, updating, and deleting bookings. This test plan covers functional testing, including happy path scenarios, error scenarios, and edge cases.

---

## 2. Scope of Testing

### In-Scope:
- **PING Endpoint**: Health check endpoint
- **AUTH Endpoint**: Authentication and token generation
- **BOOKING Endpoints**: 
  - GET /booking (Get all booking IDs with optional filters)
  - GET /booking/{id} (Get specific booking details)
  - POST /booking (Create new booking)
  - PUT /booking/{id} (Update entire booking)
  - PATCH /booking/{id} (Partial update of booking)
  - DELETE /booking/{id} (Delete booking)

### Functional Test Coverage:
- Happy path scenarios (successful operations)
- Error scenarios (invalid inputs, missing authentication)
- Edge cases (boundary values, special characters, format variations)
- Data validation (required fields, data types, ranges)
- Authentication and authorization
- Response format validation (JSON/XML)
- HTTP status codes validation
- Response time validation

### Out-of-Scope:
- Performance/Load testing
- Security vulnerability assessment
- Database-level testing
- Infrastructure testing

---

## 3. Test Objectives

1. Verify all API endpoints function correctly according to specifications
2. Validate proper error handling and meaningful error messages
3. Ensure data consistency and integrity
4. Verify authentication and authorization mechanisms
5. Test boundary conditions and edge cases
6. Validate response formats (JSON and XML)
7. Verify HTTP status codes are appropriate for each scenario
8. Confirm response times are within acceptable limits

---

## 4. Testing Strategy

### 4.1 Test Approach
- **Manual Testing**: Execute test cases manually using REST client tools
- **Black Box Testing**: Test without knowledge of internal implementation
- **Functional Testing**: Verify each endpoint works as expected
- **Regression Testing**: Execute test cases to catch unintended side effects

### 4.2 Test Tools & Environment
- **REST Client**: Postman, Insomnia, or cURL
- **API Documentation**: Restful-Booker API documentation
- **Testing Platform**: https://restful-booker.herokuapp.com
- **Test Data**: Sample booking data for CRUD operations
- **Reporting**: JIRA format for test case documentation

### 4.3 Entry Criteria
- API is deployed and accessible
- API documentation is available and reviewed
- Testing environment is stable
- Test data is prepared

### 4.4 Exit Criteria
- All planned test cases have been executed
- No high-severity defects remain open
- Test coverage meets minimum 80%
- All test cases documented in JIRA format

---

## 5. Test Case Organization

### 5.1 PING Endpoint Test Cases (2 tests)
- **Purpose**: Verify API health check functionality
- **Test IDs**: TC_PING_001 to TC_PING_002
- **Coverage**: Happy path, timeout scenarios

### 5.2 AUTH Endpoint Test Cases (7 tests)
- **Purpose**: Validate authentication token generation
- **Test IDs**: TC_AUTH_001 to TC_AUTH_007
- **Coverage**: Valid credentials, invalid credentials, missing fields, special characters

### 5.3 GET Booking IDs Endpoint Test Cases (9 tests)
- **Purpose**: Retrieve and filter booking IDs
- **Test IDs**: TC_BOOKING_IDS_001 to TC_BOOKING_IDS_009
- **Coverage**: No filters, single filters, combined filters, invalid dates, case sensitivity

### 5.4 GET Booking Endpoint Test Cases (8 tests)
- **Purpose**: Retrieve specific booking details
- **Test IDs**: TC_BOOKING_GET_001 to TC_BOOKING_GET_008
- **Coverage**: Valid ID, different content types, invalid IDs, boundary values

### 5.5 CREATE Booking Endpoint Test Cases (15 tests)
- **Purpose**: Create new bookings with various data scenarios
- **Test IDs**: TC_BOOKING_CREATE_001 to TC_BOOKING_CREATE_015
- **Coverage**: Valid data (JSON/XML), missing required fields, invalid formats, boundary values, special characters

### 5.6 UPDATE Booking Endpoint Test Cases (8 tests)
- **Purpose**: Update entire booking records
- **Test IDs**: TC_BOOKING_UPDATE_001 to TC_BOOKING_UPDATE_008
- **Coverage**: Valid updates, missing auth, invalid IDs, partial updates, date validation

### 5.7 PATCH Booking Endpoint Test Cases (6 tests)
- **Purpose**: Partially update booking records
- **Test IDs**: TC_BOOKING_PATCH_001 to TC_BOOKING_PATCH_006
- **Coverage**: Single field updates, missing auth, non-existent records, empty body

### 5.8 DELETE Booking Endpoint Test Cases (10 tests)
- **Purpose**: Delete booking records
- **Test IDs**: TC_BOOKING_DELETE_001 to TC_BOOKING_DELETE_010
- **Coverage**: Successful deletion, auth methods, missing auth, invalid IDs, verification of deletion

---

## 6. Test Data Requirements

### 6.1 Sample Booking Data
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

### 6.2 Authentication Credentials
- **Default Username**: admin
- **Default Password**: password123

### 6.3 Test Scenarios Data
- Valid booking data
- Invalid credentials
- Boundary value data (empty strings, special characters, unicode)
- Invalid date formats
- Negative and zero prices
- Very large ID values

---

## 7. Test Execution Steps

### 7.1 Pre-Test Activities
1. Verify API is accessible at base URL
2. Prepare test environment and tools
3. Gather sample test data
4. Review API documentation
5. Create baseline for expected responses

### 7.2 During Test Execution
1. Execute test cases in sequence (grouped by endpoint)
2. Document actual results for each test case
3. Take screenshots of failures
4. Note any deviations from expected behavior
5. Log defects in JIRA immediately upon discovery

### 7.3 Post-Test Activities
1. Compile test execution report
2. Analyze test coverage
3. Document lessons learned
4. Archive test evidence
5. Plan regression tests

---

## 8. Test Metrics & Reporting

### 8.1 Metrics to Track
- **Test Case Execution Rate**: % of planned tests executed
- **Pass Rate**: % of tests that passed
- **Fail Rate**: % of tests that failed
- **Defect Detection Rate**: Number of defects found
- **Test Coverage**: % of endpoints covered

### 8.2 Defect Classification
- **Critical**: API non-functional, missing core features
- **High**: Incorrect HTTP status codes, security issues
- **Medium**: Missing validation, incorrect error messages
- **Low**: Minor UI/message issues, documentation gaps

### 8.3 Test Summary Report Template
| Endpoint | Total Tests | Passed | Failed | Pass Rate |
|----------|------------|--------|--------|-----------|
| PING | 2 | | | |
| AUTH | 7 | | | |
| GET Booking IDs | 9 | | | |
| GET Booking | 8 | | | |
| CREATE Booking | 15 | | | |
| UPDATE Booking | 8 | | | |
| PATCH Booking | 6 | | | |
| DELETE Booking | 10 | | | |
| **TOTAL** | **65** | | | |

---

## 9. Risk Assessment

### 9.1 Identified Risks
| Risk | Probability | Impact | Mitigation |
|------|-------------|--------|-----------|
| API downtime during testing | Medium | High | Test during off-peak hours; have backup environment |
| Test data inconsistency | Medium | Medium | Use fresh data for each test run |
| Missing API documentation | Low | High | Request complete documentation upfront |
| Timeout issues | Low | Medium | Configure appropriate timeout values |

### 9.2 Assumptions
- API is in stable state and suitable for testing
- Default authentication credentials are valid
- API supports both JSON and XML formats
- Response times are acceptable (< 2000 ms)

---

## 10. Approval & Sign-off

| Role | Name | Signature | Date |
|------|------|-----------|------|
| QA Lead | | | |
| Development Lead | | | |
| Project Manager | | | |

---

## 11. Test Case Reference

All detailed test cases are documented in: **Restful_Booker_API_Test_Cases.md**

Test cases include:
- Test ID (unique identifier)
- Summary (brief description)
- Preconditions (prerequisites)
- Steps to Reproduce (numbered steps)
- Expected Result (what should happen)
- Actual Result (to be filled during execution)
- Status (PASS/FAIL)

---

## 12. Revision History

| Version | Date | Author | Changes |
|---------|------|--------|---------|
| 1.0 | 2026-05-30 | QA Team | Initial test plan creation |
| | | | |

---

**END OF DOCUMENT**
