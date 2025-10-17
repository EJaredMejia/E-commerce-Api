const getConfig = (token: string) => ({
  headers: { Authorization: `Bearer ${token}` },
});

export default getConfig;
