# Test Cases for Profile Access and Data Retrieval Functionality - Adopto

This document outlines test cases for verifying the **Profile Access and Data Retrieval Functionality** in the Adopto, ensuring that users can view, edit, and retrieve their profile data effectively.

---

## Test Scenarios

### **Scenario 1: Viewing Profile Data**
**GIVEN**: A user is logged in and navigates to their profile page.  
**WHEN**: The profile page loads.  
**THEN**: The system display the user’s saved quiz results, including the filters applied and any favorited pets.

---

### **Scenario 2: Editing Profile Data**
**GIVEN**: A user visits their profile.  
**WHEN**: They view their data.  
**THEN**: They be able to see and edit their personal details, such as username, email, and their pet preferences (quiz results, favorited pets).

---

## Test Cases

| **Test ID** | **Scenario**                              | **Steps**                                                                                                   | **Expected Result**                                                                 |
|-------------|-------------------------------------------|------------------------------------------------------------------------------------------------------------|-------------------------------------------------------------------------------------|
| TC01        | Profile Page Load                        | 1. Log in as a user. <br> 2. Navigate to the "Profile" page.                                                | The profile page loads successfully and displays the user's saved quiz results, filters, and favorited pets. |
| TC02        | View Saved Quiz Results                  | 1. Navigate to the "Profile" page. <br> 2. Locate the "Quiz Results" section.                               | The saved quiz results are displayed, showing the filters applied based on the user’s answers.              |
| TC03        | View Favorited Pets                     | 1. Navigate to the "Profile" page. <br> 2. Locate the "Favorited Pets" section.                             | The favorited pets are listed with details such as name, species, and breed.                                |
| TC04        | Edit Personal Details                   | 1. Navigate to the "Profile" page. <br> 2. Click the "Edit" button in the "Personal Details" section. <br> 3. Update the username or email. <br> 4. Save the changes. | The system updates and saves the new username or email, and the changes persist upon reloading the page.     |
| TC05        | Edit Pet Preferences (Quiz Results)     | 1. Navigate to the "Profile" page. <br> 2. Click the "Edit" button in the "Quiz Results" section. <br> 3. Update answers or preferences. <br> 4. Save the changes. | The system updates and saves the new quiz results, and the filters are updated accordingly.                  |
| TC06        | Remove Favorited Pets                   | 1. Navigate to the "Profile" page. <br> 2. Locate the "Favorited Pets" section. <br> 3. Click the "Unfavorite" button for a specific pet. | The pet is removed from the favorited list and no longer appears in the "Favorited Pets" section.            |
| TC07        | Validation for Editing Personal Details | 1. Navigate to the "Profile" page. <br> 2. Try to enter invalid details (e.g., an improperly formatted email). <br> 3. Save the changes. | The system displays a validation error and prevents saving invalid personal details.                         |
| TC08        | Error Handling for Profile Data Retrieval | 1. Simulate a server error or network failure while loading the "Profile" page.                             | An error message is displayed, and the user is prompted to retry or check their connection.                   |
| TC09        | Data Persistence After Update           | 1. Edit personal details or quiz results. <br> 2. Log out and log back in. <br> 3. Navigate to the "Profile" page. | The updated personal details and quiz results persist after logging out and back in.                         |

---

## Bug Reporting

If any test case fails during execution, please provide the following details when reporting the bug:
1. **Summary**: Brief description of the issue (e.g., "Favorited pets not displayed in profile").
2. **Steps to Reproduce**: List the exact steps taken to encounter the issue.
3. **Expected Result**: What should have happened.
4. **Actual Result**: What actually happened, including error messages or logs.
5. **Environment**: Include browser, OS, and app version details.
6. **Severity**: Indicate the impact of the issue (e.g., Critical, Major, Minor).

---

## Notes

1. Ensure the profile page is responsive and functional across different devices and browsers.
2. Validate that all data retrieval and updates are secure and persist in the database.
3. Test error handling and retry mechanisms for scenarios where data retrieval or updates fail.

---

Happy Testing!