const useFixtures = false;

export default {
  useFixtures,
  ignoreAllLogs: true,
  useReactotron: __DEV__,
  prefillLogin:
    __DEV__ && useFixtures
      ? {
          username: 'testh@test.fr',
          password: 'test1234',
        }
      : undefined,
  useWidYouRender: __DEV__ && false,
};
