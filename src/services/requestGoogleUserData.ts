export async function requestGoogleUserData(token: string) {
  if (!token) return;
  try {
    const authUrl = 'https://www.googleapis.com/userinfo/v2/me';
    const response = await fetch(authUrl, {
      headers: { Authorization: `Bearer ${token}` },
    });

    const user = await response.json();

    return user;
  } catch (error) {
    console.log(error);
  }
}
