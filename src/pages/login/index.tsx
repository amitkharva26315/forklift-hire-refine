import { AuthPage } from "@refinedev/mui";
// import { useLogin } from "@refinedev/core";

// type LoginVariables = {
//   username: string;
//   password: string;
// };

export const Login = () => {
  // const { mutate: login } = useLogin<LoginVariables>();

  // const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
  //   event.preventDefault();

  //   login({
  //     username: event.currentTarget.username.value,
  //     password: event.currentTarget.password.value,
  //   });
  // };
  console.log("Login");

  return (
    <AuthPage
      type="login"
      formProps={{
        defaultValues: { username: "admin", password: "Admin11@22" },
      }}
    />
  );
};
