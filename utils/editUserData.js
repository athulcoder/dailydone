export async function saveUserChanges(field, value) {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
  const reqUrl = `${baseUrl}/api/user`;
  const res = await fetch(`${reqUrl}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ field: field, value: value }),
  });

  const data = await res.json();

  return data;
}
