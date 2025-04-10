export interface Pet {
  id: number;
  name: string;
  age: string;
  gender: string;
  species: string;
  breeds: {
    primary: string;
    secondary?: string | null;
    mixed?: boolean;
    unknown?: boolean;
  };
  photos?: {
    small: string;
    medium: string;
    large: string;
    full: string;
  }[];
  primary_photo_cropped?: {
    small?: string;
    medium?: string;
    large?: string;
    full?: string;
  };
  contact: {
    email?: string | null;
    phone?: string | null;
    address: {
      address1?: string | null;
      address2?: string | null;
      city: string;
      state: string;
      postcode?: string;
      country?: string;
    };
  };
  url: string; 
}
  