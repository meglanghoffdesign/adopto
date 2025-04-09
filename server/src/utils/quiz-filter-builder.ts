import { QuizParams } from '../models/user';  // Import the type if needed

// Helper function to build filters from the quiz parameters
export const buildFiltersFromQuiz = (quizParams: QuizParams) => {
  let filters: any = {};

  // Map quiz parameters to filters for pet search
  if (quizParams.allergies) {
    filters.allergies = { $notIn: quizParams.allergies };
  }

  if (quizParams.livingSituation) {
    if (quizParams.livingSituation === 'apartment') {
      filters.species = { $in: ['cat', 'small_dog'] };
    } else if (quizParams.livingSituation === 'house_no_yard') {
      filters.species = { $in: ['dog'] };
    } else if (quizParams.livingSituation === 'house_with_yard') {
      filters.species = { $in: ['dog', 'large_dog'] };
    }
  }

  // If the user has kids, only show pets that are good with children
  if (quizParams.hasKids !== undefined) {
    filters.goodWithChildren = quizParams.hasKids === true ? true : false;  // Explicitly set to true or false
  }

  // If the user has other pets, only show pets that are good with other pets (dogs or cats)
  if (quizParams.hasOtherPets !== undefined) {
    filters.goodWithDogs = quizParams.hasOtherPets === true ? true : false;  // Explicitly set to true or false
    filters.goodWithCats = quizParams.hasOtherPets === true ? true : false;  // Explicitly set to true or false
  }

  if (quizParams.availableTime) {
    if (quizParams.availableTime === 'low') {
      filters.age = { $in: ['adult', 'senior'] };
    } else if (quizParams.availableTime === 'medium') {
      filters.age = { $in: ['young'] };
    } else if (quizParams.availableTime === 'high') {
      filters.age = { $in: ['puppy', 'young'] };
    }
  }

  if (quizParams.activityLevel) {
    if (quizParams.activityLevel === 'low') {
      filters.activityLevel = 'low';
    } else if (quizParams.activityLevel === 'medium') {
      filters.activityLevel = 'medium';
    } else if (quizParams.activityLevel === 'high') {
      filters.activityLevel = 'high';
    }
  }

  if (quizParams.location && quizParams.distance) {
    filters.location = { $near: quizParams.location, $maxDistance: quizParams.distance };
  }

  return filters;
};