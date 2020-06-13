import React from 'react';
import './App.css';
import { Route, Switch } from "react-router";
import JoinPage from "./pages/join/join.page";
import ChatPage from "./pages/chat/chat.page";

function App() {
  return (
    <div className="App">
      <Switch>
        <Route exact path='/' component={JoinPage} />
        <Route exact path='/chat' component={ChatPage} />
      </Switch>
    </div>
  );
}

export default App;
