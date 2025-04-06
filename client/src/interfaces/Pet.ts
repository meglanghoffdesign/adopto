export interface Pet {
    id: number;
    name: string;
    age: string;
    gender: string;
    species: string;
    breeds: {
      primary: string;
      secondary?: string;
      mixed?: boolean;
      unknown?: boolean;
    };
    photos: {
      small: string;
      medium: string;
      large: string;
      full: string;
    }[];
    contact: {
      email?: string;
      phone?: string;
      address: {
        city: string;
        state: string;
        postcode?: string;
        country?: string;
      };
    };
  }
  