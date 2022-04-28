import React from "react";
import {
  ApolloProvider,
  ApolloClient,
  InMemoryCache,
  createHttpLink,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "./components/Home";
import LoginForm from "./components/LoginForm";
import Apiary from "./components/Apiary";
import SavedApiary from './components/SavedApiary';
import Navbar from "./components/Navbar";
import Donate from "./components/Donate";
import Success from "./components/Success";
import Cancel from "./components/Cancel";
import Hive from "./components/Hive";
import ShareFeeder from "./components/ShareFeeder";


const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem("id_token");
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  };
});

const httpLink = createHttpLink({
  uri: "/graphql",
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

function App() {
  return (
    <ApolloProvider client={client}>
      <Router>
        <>
          <Navbar />
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/" component={LoginForm} />
            <Route exact path="/saved" component={Apiary} />
            <Route exact path="/saved" component={SavedApiary} />
            <Route exact path="/saved" component={Hive} />
            <Route exact path="/saved" component={ShareFeeder} />
            <Route path="/" component={Donate} />
            <Route path="/" component={Success} />
            <Route path="/" component={Cancel}/>

            <Route render={() => <h1 className="display-2">Wrong page!</h1>} />
          </Switch>
        </>
      </Router>
    </ApolloProvider>
  );
}

export default App;
