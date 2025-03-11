interface ISignupBody {
  email: string;
  username: string;
  password: string;
}

interface ILoginBody {
  email: string;
  password: string;
}

export { ISignupBody, ILoginBody };
