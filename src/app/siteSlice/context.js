export const getSiteData = async () => {
  const response = await fetch(`${process.env.PUBLIC_URL}/site.json`);
  const data = await response.json();
  return data;
};
