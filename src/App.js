import React from "react";
import {Container, Box} from "@mui/material";
import {Switch, Route, BrowserRouter as Router, Redirect} from "react-router-dom";
import {
    login,
    editUserInfo,
    register, createRack, createPallet, createTransaction, updateCriticalValue
} from "./utils/Server";
import Login from "./pages/session/Login";
import {AppBarMenu} from "./components/AppBarMenu";
import {AuthProvider} from "./contexts/AuthContext";
import ModifyUser from "./pages/user/ModifyUser";
import Register from "./pages/session/Register";
import CreateRack from "./pages/rack/CreateRack";
import HomePage from "./pages/home/HomePage";
import PrivateRoute from "./contexts/PrivateRoute";
import PrivateAdminRoute from "./contexts/PrivateAdminRoute";
import RackList from "./pages/rack/RackList";
import CreatePallet from "./pages/pallet/CreatePallet";
import PalletList from "./pages/pallet/PalletList";
import CreateTransaction from "./pages/transaction/CreateTransaction";
import TransactionList from "./pages/transaction/TransactionList";
import SetCriticalValues from "./pages/critical-value/SetCriticalValues";
import DownloadCSV from "./pages/csv/DownloadCSV";

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
                                <RackList title="Rack List" subtitle="All the created racks loaded in the system"/>
                            </PrivateRoute>
                            <PrivateRoute path="/pallets">
                                <PalletList title="Pallet List"
                                            subtitle="All the created pallets loaded in the system"/>
                            </PrivateRoute>
                            <PrivateAdminRoute path="/add-rack">
                                <CreateRack title="Create Rack" subtitle="" submit={createRack}/>
                            </PrivateAdminRoute>
                            <PrivateAdminRoute path="/critical-values">
                                <SetCriticalValues title="Set Critical Values" subtitle=""
                                                   submit={updateCriticalValue}/>
                            </PrivateAdminRoute>
                            <PrivateAdminRoute path="/add-user">
                                <Register
                                    title="Add User"
                                    subtitle="Enter the data to register a user to the Quilmes SIG app"
                                    submit={register}
                                />
                            </PrivateAdminRoute>
                            <PrivateRoute path="/add-pallet">
                                <CreatePallet title="Create Pallet" subtitle="" submit={createPallet}/>
                            </PrivateRoute>
                            <PrivateRoute path="/add-transaction">
                                <CreateTransaction title="Create Transaction" subtitle="" submit={createTransaction}/>
                            </PrivateRoute>
                            <PrivateRoute path="/transactions">
                                <TransactionList title="Transaction List"
                                                 subtitle="All the created transactions in the system"/>
                            </PrivateRoute>
                            <PrivateRoute path="/csv">
                                <DownloadCSV title="Download CSV"
                                             subtitle="See and download the available reports"/>
                            </PrivateRoute>
                        </Switch>
                    </Router>
                </Box>
            </Container>
        </AuthProvider>
    );
}

export default App;
