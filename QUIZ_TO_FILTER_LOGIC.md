# Quiz-to-Filter Logic Documentation

This document explains how quiz answers are mapped to pet search filters and how the quiz data is used to create queries for the **Petfinder API**. It provides a clear mapping between quiz responses and filter criteria, along with examples to help developers understand the logic.

---

## Table of Contents

1. [Overview](#overview)
2. [Quiz-to-Filter Mapping](#quiz-to-filter-mapping)
3. [Petfinder API Query Logic](#petfinder-api-query-logic)
4. [Examples](#examples)
5. [Notes and Limitations](#notes-and-limitations)

---

## Overview

The Adopt-A-Pet Quiz is designed to personalize pet recommendations by translating user input into meaningful search filters for the Petfinder API. The goal is to connect potential adopters with animals that best suit their lifestyle, preferences, and home environment. This document outlines how each quiz answer is converted into filter criteria and used to create API queries that return relevant pet matches.

The quiz collects information such as:

-Allergies

Living situation

Presence of kids or other pets

Available time for care

Desired activity level

Geographic location and search radius
---

## Quiz-to-Filter Mapping

The quiz collects user preferences and lifestyle information to tailor pet adoption search results. Here's how each quiz answer is mapped to search filters:

Quiz Field	Petfinder Filter Field(s)	Mapping Logic
allergies	allergies (custom logic)	Excludes pets that trigger the user's allergies using $notIn.
livingSituation	species	Maps housing type to appropriate pet species based on space and noise.
hasKids	goodWithChildren	Filters pets based on compatibility with children.
hasOtherPets	goodWithDogs, goodWithCats	Filters pets based on compatibility with other pets.
availableTime	age	Maps available time to pet age (lower time → older pets).
activityLevel	activityLevel	Directly maps to pet activity level requirements.
location + distance	location	Filters pets based on geographic proximity using $near and $maxDistance.
## Petfinder API Query Logic

The function buildFiltersFromQuiz(quizParams: QuizParams) processes the quiz responses and constructs a filter object for querying the Petfinder API or a similar database. Logic includes:

Species selection based on living environment (e.g., apartments yield cats or small dogs).

Age filtering using time availability (e.g., busy users get senior pets).

Boolean filtering for hasKids and hasOtherPets, to only show compatible animals.

Proximity search using location and distance, ideal for users wanting to adopt locally.

The logic ensures that returned pets match the adopter’s lifestyle and limitations.
---

## Examples


---

Example 1: Apartment Dweller with Allergies and Kids
ts
Copy
Edit
{
  allergies: ['dander'],
  livingSituation: 'apartment',
  hasKids: true,
  hasOtherPets: false,
  availableTime: 'low',
  activityLevel: 'low',
  location: { lat: 39.7392, lng: -104.9903 },
  distance: 20
}
Generated Filters:

ts
Copy
Edit
{
  allergies: { $notIn: ['dander'] },
  species: { $in: ['cat', 'small_dog'] },
  goodWithChildren: true,
  goodWithDogs: false,
  goodWithCats: false,
  age: { $in: ['adult', 'senior'] },
  activityLevel: 'low',
  location: { $near: { lat: 39.7392, lng: -104.9903 }, $maxDistance: 20 }
}
Example 2: Active Homeowner with No Kids or Pets
ts
Copy
Edit
{
  livingSituation: 'house_with_yard',
  hasKids: false,
  hasOtherPets: false,
  availableTime: 'high',
  activityLevel: 'high'
}
Generated Filters:


{
  species: { $in: ['dog', 'large_dog'] },
  goodWithChildren: false,
  goodWithDogs: false,
  goodWithCats: false,
  age: { $in: ['puppy', 'young'] },
  activityLevel: 'high'
}

---

## Notes and Limitations

1. **Default Behavior**:
   - If a user skips a question, no filter is applied for that criteria (e.g., no size preference means the `size` filter is excluded).

2. **Exclusion Logic**:
   - Ensure pets that do not meet the user's requirements are filtered out (e.g., pets not good with children).


3. **Extensibility**:
   - The logic is designed to be extensible. If new quiz questions are added, update the mapping table and API logic accordingly.

---

This documentation should help developers understand how quiz data is connected to pet search filters and how to work with the logic effectively. Let me know if you need further clarification or additional examples!