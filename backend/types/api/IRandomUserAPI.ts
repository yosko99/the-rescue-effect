interface IRandomUserAPI {
  results: [
    {
      picture: {
        large: string;
        medium: string;
        thumbnail: string;
      };
    }
  ];
}

export default IRandomUserAPI;
