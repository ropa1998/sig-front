import React from "react";
import {Container, Box} from "@mui/material";
import {Switch, Route, BrowserRouter as Router} from "react-router-dom";
import {
    login,
    editUserInfo,
    register
} from "./utils/Projects";
import Login from "./pages/session/Login";
import {AppBarMenu} from "./components/AppBarMenu";
import {AuthProvider} from "./contexts/AuthContext";
import ModifyUser from "./pages/user/ModifyUser";
import {Register} from "./pages/session/Register";

function App() {
    return (
        <AuthProvider>
            <AppBarMenu/>

            <Container>
                <Box mt={6} mb={4}>
                    <Router>
                        <Switch>
                            <Route path="/login">
                                <Login
                                    title="Login"
                                    subtitle="Please enter your credentials to login into the app"
                                    submit={login}
                                />
                            </Route>
                            <Route path="/profile">
                                <ModifyUser title="Profile" subtitle="" submit={editUserInfo}/>
                            </Route>
                            <Route path="/register">
                                <Register
                                    title="Register"
                                    subtitle="Enter the data to register a user to the A2 app"
                                    submit={register}
                                />
                            </Route>
                        </Switch>
                    </Router>
                </Box>
            </Container>
        </AuthProvider>
    );
}

export default App;
