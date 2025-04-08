import { QuizParams } from '../models/user';  // Import the type if needed

// Helper function to build filters from the quiz parameters
export const buildFiltersFromQuiz = (quizParams: QuizParams) => {
  let filters: any = {};

  // Map quiz parameters to filters for pet search
  if (quizParams.allergies) {
    filters.allergies = { $notIn: quizParams.allergies };  // Assuming we filter out pets that match any allergies
  }

  if (quizParams.livingSituation) {
    // Assuming living situation maps to species/size compatibility
    if (quizParams.livingSituation === 'apartment') {
      filters.species = { $in: ['cat', 'small_dog'] };  // Example: apartments may only support cats and small dogs
    } else if (quizParams.livingSituation === 'house_no_yard') {
      filters.species = { $in: ['dog'] };  // Medium-sized dogs, for example
    } else if (quizParams.livingSituation === 'house_with_yard') {
      filters.species = { $in: ['dog', 'large_dog'] };  // Larger dogs may be okay
    }
  }

  if (quizParams.hasKids !== undefined) {
    filters.goodWithChildren = quizParams.hasKids;  // Only show pets that are good with children if the user has kids
  }

  if (quizParams.hasOtherPets !== undefined) {
    filters.goodWithDogs = quizParams.hasOtherPets;  // Similar logic for pets compatibility
    filters.goodWithCats = quizParams.hasOtherPets;
  }

  if (quizParams.availableTime) {
    // Map time to pet's age range: adjust based on your specific criteria
    if (quizParams.availableTime === 'low') {
      filters.age = { $in: ['adult', 'senior'] };  // Maybe low time = senior/adult pets
    } else if (quizParams.availableTime === 'medium') {
      filters.age = { $in: ['young'] };  // Medium time = young pets
    } else if (quizParams.availableTime === 'high') {
      filters.age = { $in: ['puppy', 'young'] };  // High time = puppies
    }
  }

  if (quizParams.activityLevel) {
    // Match activity level to pet size/activity requirements
    if (quizParams.activityLevel === 'low') {
      filters.activityLevel = 'low';  // Possibly filter based on pet activity level
    } else if (quizParams.activityLevel === 'medium') {
      filters.activityLevel = 'medium';
    } else if (quizParams.activityLevel === 'high') {
      filters.activityLevel = 'high';
    }
  }

  // Handle location and distance if necessary
  if (quizParams.location && quizParams.distance) {
    filters.location = { $near: quizParams.location, $maxDistance: quizParams.distance };
  }

  return filters;
};