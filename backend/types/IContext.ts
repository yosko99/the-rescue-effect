interface IContext {
  req: {
    headers: {
      authorization?: string;
    };
  };
}

export default IContext;
