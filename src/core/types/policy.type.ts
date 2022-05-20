export type Policy<User, Args> = (
  user: User,
  args: Args
) => void | Promise<void>;
