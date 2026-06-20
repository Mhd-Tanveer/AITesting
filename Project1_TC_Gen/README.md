# Restful-Booker API Test Suite - README

## 📋 Overview

This comprehensive test suite provides complete testing documentation for the **Restful-Booker API**. The suite includes 65 test cases covering all API endpoints with happy path scenarios, error scenarios, and edge cases. All test cases follow the JIRA format with clear steps to reproduce, expected results, and actual result fields.

---

## 📁 Document Structure

### 1. **TEST_PLAN.md** (Main Test Planning Document)
- **Purpose**: High-level test plan and strategy
- **Contents**:
  - Executive summary
  - Scope of testing (in-scope and out-of-scope items)
  - Testing objectives
  - Testing strategy and approach
  - Test case organization (65 tests across 8 endpoints)
  - Test data requirements
  - Execution steps
  - Metrics and reporting
  - Risk assessment
  - Approval and sign-off section

- **When to Use**: Review this document first for overall project understanding and testing strategy

### 2. **Restful_Booker_API_Test_Cases.md** (Test Cases Reference)
- **Purpose**: Detailed test cases for all API endpoints
- **Test Cases**: 65 total (organized by endpoint)
  - **PING Endpoint**: 2 tests (Health check, Timeout)
  - **AUTH Endpoint**: 7 tests (Valid/invalid credentials, missing fields, special characters)
  - **GET Booking IDs**: 9 tests (No filters, single/combined filters, edge cases)
  - **GET Booking**: 8 tests (Valid ID, different formats, invalid IDs)
  - **CREATE Booking**: 15 tests (JSON/XML, missing fields, validation, boundary values)
  - **UPDATE Booking**: 8 tests (Full updates, auth, validation, single field)
  - **PATCH Booking**: 6 tests (Partial updates, auth, edge cases)
  - **DELETE Booking**: 10 tests (Successful deletion, auth methods, verification)

- **Format**: Each test case includes:
  - Test ID (unique identifier: TC_ENDPOINT_###)
  - Summary (brief description)
  - Preconditions (prerequisites)
  - Steps to Reproduce (numbered steps)
  - Expected Result (clear expectations)
  - Actual Result (field for execution)
  - Status (PASS/FAIL/BLOCKED)

- **When to Use**: Use this as your primary reference during test execution

### 3. **JIRA_FORMAT_AND_EXECUTION_GUIDE.md** (Execution Instructions)
- **Purpose**: Detailed guide for executing tests and creating JIRA tickets
- **Contents**:
  - JIRA test case template (standard format)
  - 3 detailed examples (happy path, error scenario, boundary test)
  - Test execution checklist
  - Phase-by-phase execution guide (8 phases)
  - Test execution status tracking table
  - Defect logging template
  - Test metrics and reporting
  - Tool recommendations
  - QA checklist

- **When to Use**: Reference this document during test execution for JIRA formatting and step-by-step guidance

### 4. **QUICK_REFERENCE_GUIDE.md** (Fast Lookup)
- **Purpose**: Quick reference for rapid test execution
- **Contents**:
  - API base URL
  - cURL commands for all endpoints
  - HTTP status codes reference
  - Request headers reference
  - Test data templates
  - Test case ID quick lookup
  - Common error scenarios
  - Postman setup guide
  - Endpoint summary table
  - Troubleshooting guide
  - Test workflow diagram
  - Complete test summary

- **When to Use**: Use this during active testing for quick command reference and troubleshooting

---

## 🎯 Test Coverage Summary

```
TOTAL TEST CASES: 65

Coverage by Endpoint:
├── PING Endpoint:           2 tests  (100% coverage)
├── AUTH Endpoint:           7 tests  (100% coverage)
├── GET Booking IDs:         9 tests  (100% coverage)
├── GET Booking:             8 tests  (100% coverage)
├── CREATE Booking:         15 tests  (100% coverage)
├── UPDATE Booking:          8 tests  (100% coverage)
├── PATCH Booking:           6 tests  (100% coverage)
└── DELETE Booking:         10 tests  (100% coverage)

Coverage by Scenario Type:
├── Happy Path Tests:       20 tests  (30.8%)
├── Error Scenario Tests:   25 tests  (38.5%)
├── Edge Case Tests:        20 tests  (30.8%)
└── TOTAL:                  65 tests  (100%)
```

---

## 🚀 Quick Start Guide

### Step 1: Understanding the API
1. Read the **TEST_PLAN.md** document
2. Review API base URL and endpoints
3. Understand authentication requirements

### Step 2: Prepare for Testing
1. Set up testing tools (Postman, Insomnia, or cURL)
2. Verify API is accessible
3. Prepare test environment
4. Create JIRA project for test tracking

### Step 3: Execute Tests
1. Follow **JIRA_FORMAT_AND_EXECUTION_GUIDE.md**
2. Execute tests phase by phase:
   - Phase 1: PING (2 tests) - ~5 minutes
   - Phase 2: AUTH (7 tests) - ~15 minutes
   - Phase 3: GET IDs (9 tests) - ~20 minutes
   - Phase 4: GET Detail (8 tests) - ~20 minutes
   - Phase 5: CREATE (15 tests) - ~45 minutes
   - Phase 6: UPDATE (8 tests) - ~25 minutes
   - Phase 7: PATCH (6 tests) - ~20 minutes
   - Phase 8: DELETE (10 tests) - ~25 minutes
   - **Total estimated time**: 2-3 hours

### Step 4: Document Results
1. Record actual results in test cases
2. Log failures as JIRA defects
3. Take screenshots of errors
4. Calculate test metrics

### Step 5: Generate Report
1. Compile test execution summary
2. Analyze results by endpoint
3. Document defects and recommendations
4. Present findings to stakeholders

---

## 📊 Test Metrics to Track

### Coverage Metrics
- **Test Execution Rate**: % of tests executed
- **Pass Rate**: % of tests that passed
- **Fail Rate**: % of tests that failed
- **Endpoint Coverage**: % of endpoints tested

### Defect Metrics
- **Total Defects Found**: Number of bugs discovered
- **Defect Severity**: Critical, High, Medium, Low
- **Defect Resolution Rate**: % of defects fixed

### Efficiency Metrics
- **Test Execution Time**: Actual vs. estimated
- **Time per Test**: Average execution time
- **Defect Detection Rate**: Defects found per test hour

---

## 📝 Test Case Details by Endpoint

### PING Endpoint (2 tests)
- Tests API health and availability
- Validates basic connectivity
- Estimated time: 5 minutes

### AUTH Endpoint (7 tests)
- Tests authentication token generation
- Validates error handling for invalid credentials
- Tests missing and special character inputs
- Estimated time: 15 minutes

### GET Booking IDs (9 tests)
- Tests retrieval of all booking IDs
- Tests filtering by name and dates
- Tests combined filter criteria
- Tests edge cases (invalid dates, no matches)
- Estimated time: 20 minutes

### GET Booking (8 tests)
- Tests retrieval of individual booking details
- Tests different content types (JSON/XML)
- Tests error scenarios (invalid ID, non-existent)
- Estimated time: 20 minutes

### CREATE Booking (15 tests)
- Tests booking creation with valid data
- Tests both JSON and XML formats
- Tests missing required fields
- Tests validation (dates, prices, character limits)
- Tests special characters and unicode
- Estimated time: 45 minutes

### UPDATE Booking (8 tests)
- Tests full booking updates
- Tests authentication requirements
- Tests single field updates
- Tests invalid data scenarios
- Estimated time: 25 minutes

### PATCH Booking (6 tests)
- Tests partial booking updates
- Tests single field modifications
- Tests authentication
- Tests edge cases (empty body, non-existent)
- Estimated time: 20 minutes

### DELETE Booking (10 tests)
- Tests booking deletion
- Tests different authentication methods
- Tests verification of deletion
- Tests invalid IDs and repeated deletions
- Estimated time: 25 minutes

---

## 🔧 Required Tools & Setup

### Testing Tools (Choose One)
- **Postman** (Recommended) - Feature-rich with collections
- **Insomnia** - Simple and elegant interface
- **Thunder Client** - VS Code extension
- **cURL** - Command line (for quick tests)
- **REST Client** - VS Code extension

### Required Credentials
- Default Username: `admin`
- Default Password: `password123`

### Software Requirements
- REST client tool
- JIRA account (for test tracking)
- Text editor (for response analysis)
- Browser (for documentation)

### Environment Setup
- API URL: https://restful-booker.herokuapp.com
- Base URL: https://restful-booker.herokuapp.com
- Ensure network connectivity
- Verify API accessibility before testing

---

## 🔍 Execution Best Practices

1. **Sequential Execution**: Execute tests in order (especially dependent ones)
2. **Fresh Auth Tokens**: Get new tokens for each test session
3. **Isolation**: Keep test data separate and clean after each phase
4. **Documentation**: Record all results immediately
5. **Screenshots**: Capture failed responses with full details
6. **Status Updates**: Update JIRA in real-time during execution
7. **Time Tracking**: Log actual execution time for metrics
8. **Issue Tracking**: Log defects immediately upon discovery

---

## 📌 Common Test Scenarios Covered

### Happy Path Testing
- Successful API calls
- Valid data submission
- Expected responses
- Proper status codes

### Error Scenario Testing
- Invalid credentials
- Missing authentication
- Invalid input formats
- Non-existent resources
- Invalid HTTP methods

### Edge Case Testing
- Boundary values (very large/small numbers)
- Special characters and unicode
- Empty/null values
- Invalid date formats
- Maximum field lengths
- Case sensitivity
- Concurrent operations

---

## 🎓 How to Use Each Document

### For Test Planning
→ **Use TEST_PLAN.md**
- Understand testing scope and objectives
- Review test organization
- Check risk assessment
- Plan resource allocation

### For Test Execution
→ **Use Restful_Booker_API_Test_Cases.md**
- Execute tests step by step
- Record actual results
- Document failures
- Track test status

### For JIRA Formatting
→ **Use JIRA_FORMAT_AND_EXECUTION_GUIDE.md**
- Create JIRA test cases
- Use proper JIRA format
- Follow execution phases
- Create defect tickets

### For Quick Reference
→ **Use QUICK_REFERENCE_GUIDE.md**
- Get cURL commands
- Look up HTTP codes
- Find test data templates
- Troubleshoot issues

---

## ✅ Pre-Execution Checklist

Before starting test execution:
- [ ] API is accessible and running
- [ ] Testing tool is installed and configured
- [ ] JIRA project is created
- [ ] Test data is prepared
- [ ] Authentication credentials are available
- [ ] All documents are reviewed
- [ ] Team members are assigned
- [ ] Baseline responses are documented
- [ ] Reporting template is ready
- [ ] Communication plan is established

---

## 📊 Expected Test Results

After executing all 65 test cases, you should document:

```
Test Execution Summary
├── Total Tests: 65
├── Total Passed: [X]
├── Total Failed: [X]
├── Total Blocked: [X]
├── Overall Pass Rate: [X%]
├── Defects Found: [X]
├── Defects by Severity:
│   ├── Critical: [X]
│   ├── High: [X]
│   ├── Medium: [X]
│   └── Low: [X]
└── Recommendations: [List key recommendations]
```

---

## 🤝 Support & Questions

### For Test Case Questions
- Review **Restful_Booker_API_Test_Cases.md** for detailed test specifications
- Check **JIRA_FORMAT_AND_EXECUTION_GUIDE.md** for examples

### For Execution Issues
- Consult **QUICK_REFERENCE_GUIDE.md** troubleshooting section
- Check API accessibility first
- Verify request format and headers

### For JIRA Integration
- See **JIRA_FORMAT_AND_EXECUTION_GUIDE.md** for JIRA formatting
- Use provided templates for consistency
- Follow naming conventions (TC_ENDPOINT_###)

---

## 📚 Related Documentation

- Official Restful-Booker API Documentation
- JIRA Best Practices Guide
- Postman Documentation
- REST API Testing Guide

---

## 📝 Version History

| Version | Date | Changes |
|---------|------|---------|
| 1.0 | 2026-05-30 | Initial release - 65 test cases across 8 endpoints |
| | | Complete TEST_PLAN.md, Test Cases, JIRA Guide, Quick Reference |

---

## ✨ Summary

This comprehensive test suite provides:
- ✅ **65 detailed test cases** covering all API endpoints
- ✅ **JIRA-formatted documentation** for easy tracking
- ✅ **Happy path, error, and edge case coverage**
- ✅ **Step-by-step execution guide** with examples
- ✅ **Quick reference** for rapid testing
- ✅ **Defect tracking templates**
- ✅ **Metrics and reporting guidelines**
- ✅ **Troubleshooting guide**

**Total Test Coverage: 100% of API endpoints**
**Estimated Execution Time: 2-3 hours (including analysis)**

---

**Happy Testing! 🎉**

For detailed information, refer to the individual documents:
1. [TEST_PLAN.md](TEST_PLAN.md)
2. [Restful_Booker_API_Test_Cases.md](Restful_Booker_API_Test_Cases.md)
3. [JIRA_FORMAT_AND_EXECUTION_GUIDE.md](JIRA_FORMAT_AND_EXECUTION_GUIDE.md)
4. [QUICK_REFERENCE_GUIDE.md](QUICK_REFERENCE_GUIDE.md)
