import "./App.css";
import CustomerForm from "./components/CustomerForm";
import { Route, Switch } from "react-router-dom";
import CustomerList from "./components/CustomerList";
import Home from "./components/Home";
import EditForm from "./editForm";
import Navbar from "./components/Navbar";
function App() {
  return (
    <>
      <Navbar />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/form" component={CustomerForm} />
        <Route exact path="/update/:id" component={EditForm} />
        <Route exact path="/list" component={CustomerList} />
      </Switch>
    </>
  );
}

export default App;
