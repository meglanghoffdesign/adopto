import fetch from 'node-fetch';

export const getPublicKey = async (kid: string) => {
  try {
    const response = await fetch('https://YOUR_AUTH0_DOMAIN/.well-known/jwks.json');
    const data = await response.json() as { keys: { kid: string; n: string; e: string; }[] };
    
    // Find the public key from the JWKS response that matches the 'kid'
    const key = data.keys.find((key: any) => key.kid === kid);
    if (!key) {
      throw new Error('Public key not found');
    }
    
    // The key's n (modulus) and e (exponent) are needed for verifying the JWT
    return key;
  } catch (error) {
    console.error('Error fetching public key:', error);
    throw new Error('Unable to fetch public key');
  }
};