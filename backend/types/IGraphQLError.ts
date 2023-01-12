interface IGraphQLError {
  message: string;
  location: [any];
  path: [any];
  extentions: {
    code: string;
  };
}

export default IGraphQLError;
