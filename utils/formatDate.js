export function convertDateforUser(db_date) {
  let formattedDate = new Date(db_date);

  formattedDate = formattedDate.toISOString().split("T")[0];
  return formattedDate; // YYYY-MM-DD
}

export function convertDateforDB(user_date) {
  const formatedDate = new Date(user_date);
  return formatedDate;
}
