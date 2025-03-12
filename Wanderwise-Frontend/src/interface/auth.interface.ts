interface ISignupBody {
  email: string;
  password: string;
  username: string;
}

interface ILoginBody {
  email: string;
  password: string;
}

export type { ISignupBody, ILoginBody };
