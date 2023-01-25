const TOKEN_HEADER = {
  headers: { authorization: `Bearer ${localStorage.getItem('token')}` }
};

export default TOKEN_HEADER;
