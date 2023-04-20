export function parseCookie(cookies: string) {
  const allCookies: Record<string, string | boolean> = {};

  cookies.split(';').forEach((cookie) => {
    const [cookieName, cookieValue] = cookie.split('=');

    allCookies[cookieName.trim()] = cookieValue ? cookieValue.trim() : true;
  });

  return allCookies;
}
