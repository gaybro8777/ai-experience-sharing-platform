/* istanbul ignore file */
const ROOT_URL = process.env.REACT_APP_API_URL;

export const getSiteData = async () => {
  let data;
  try {
    const response = await fetch(`${ROOT_URL}/api-settings`);
    data = await response.json();
  } catch (e) {
    throw new Error(e);
  }

  return data;
};

export const getMenus = async () => {
  let data;
  try {
    const response = await fetch(`${ROOT_URL}/api-menus`);
    data = await response.json();
  } catch (e) {
    throw new Error(e);
  }

  if (!data) {
    throw new Error(`No active menus were returned.`);
  }
  if (!Array.isArray(data)) {
    throw new Error(`Expected "array", received "${typeof data}".`);
  }
  return data;
};
