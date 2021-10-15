import React from "react";
import {Container, Box} from "@mui/material";
import {Switch, Route, BrowserRouter as Router} from "react-router-dom";
import {
    login,
    editUserInfo,
    register, createRack
} from "./utils/Server";
import Login from "./pages/session/Login";
import {AppBarMenu} from "./components/AppBarMenu";
import {AuthProvider} from "./contexts/AuthContext";
import ModifyUser from "./pages/user/ModifyUser";
import {Register} from "./pages/session/Register";
import CreateRack from "./pages/rack/CreateRack";
import HomePage from "./pages/home/HomePage";
import PrivateRoute from "./contexts/PrivateRoute";
import PrivateAdminRoute from "./contexts/PrivateAdminRoute";
import RackList from "./pages/rack/RackList";

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
                            <PrivateRoute path="/home">
                                <HomePage
                                    title="Home"
                                />
                            </PrivateRoute>
                            <PrivateRoute path="/profile">
                                <ModifyUser title="Profile" subtitle="" submit={editUserInfo}/>
                            </PrivateRoute>
                            <PrivateRoute path="/racks">
                                <RackList title="Rack List" subtitle="All the created racks loaded in the system"
                                          submit={editUserInfo}/>
                            </PrivateRoute>
                            <PrivateAdminRoute path="/add-rack">
                                <CreateRack title="Create Rack" subtitle="" submit={createRack}/>
                            </PrivateAdminRoute>
                            <PrivateAdminRoute path="/add-user">
                                <Register
                                    title="Add User"
                                    subtitle="Enter the data to register a user to the Quilmes SIG app"
                                    submit={register}
                                />
                            </PrivateAdminRoute>
                        </Switch>
                    </Router>
                </Box>
            </Container>
        </AuthProvider>
    );
}

export default App;
