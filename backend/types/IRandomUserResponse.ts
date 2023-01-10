interface IRandomUserResponse {
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

export default IRandomUserResponse;
