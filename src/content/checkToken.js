import jwt_decode from "jwt-decode";

export function checkToken(token) {
  if (!token) {
    return false; // Return false if token is undefined or null
  }

  try {
    const decodedToken = jwt_decode(token);
    if (!decodedToken || !decodedToken.exp) {
      return false; // Return false if the decoded token is invalid or missing expiration
    }

    const expirationTime = decodedToken.exp * 1000;
    const isExpired = Date.now() > expirationTime;
    return !isExpired;
  } catch (error) {
    console.error("Error decoding token:", error);
    return false; // Return false if there's an error decoding the token
  }
}
