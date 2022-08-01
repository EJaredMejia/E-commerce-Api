const getConfig = (token) => ({
    headers: { Authorization: `Bearer ${token}` },
  });

export default getConfig;