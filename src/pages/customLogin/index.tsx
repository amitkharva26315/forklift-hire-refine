import { AuthPage } from "@refinedev/mui";
import { Button, Card, CardContent, TextField, Typography } from "@mui/material";
import { useForm } from "@refinedev/react-hook-form";
import { useLogin } from "@refinedev/core";

export const CustomLogin = () => {
    const { mutate: login, isLoading } = useLogin(); // useLogin hook to call authProvider.login

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        defaultValues: {
            username: "admin",
            password: "Admin11@22",
        },
    });

    const onSubmit = (data:any) => {
        login({
            username: data.username,
            password: data.password,
        });
    };

    return (
        <AuthPage
            type="login"
            renderContent={(formProps) => (
                <Card>
                    <CardContent>
                        <Typography variant="h5" component="div">
                            Login
                        </Typography>
                        <form onSubmit={handleSubmit(onSubmit)}>
                            {/* Username Field */}
                            <TextField
                                label="Username"
                                {...register("username", { required: true })}
                                fullWidth
                                margin="normal"
                                error={!!errors.username}
                                helperText={errors.username ? "Username is required" : ""}
                            />

                            {/* Password Field */}
                            <TextField
                                label="Password"
                                type="password"
                                {...register("password", { required: true })}
                                fullWidth
                                margin="normal"
                                error={!!errors.password}
                                helperText={errors.password ? "Password is required" : ""}
                            />

                            {/* Submit Button */}
                            <Button fullWidth variant="contained" type="submit" disabled={isLoading}>
                                {isLoading ? "Logging in..." : "Login"}
                            </Button>
                        </form>
                    </CardContent>
                </Card>
            )}
        />
    );
};
