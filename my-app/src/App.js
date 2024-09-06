import "./App.css";
import CustomerForm from "./components/CustomerForm";
import { Route, Switch } from "react-router-dom";
import CustomerList from "./components/CustomerList";
import Home from "./components/Home";
import Navbar from "./components/Navbar";
import NotFound from "./components/NotFound";
import EditForm from "./components/editForm";
function App() {
  return (
    <div>
      <Navbar />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/form" component={CustomerForm} />
        <Route exact path="/update/:id" component={EditForm} />
        <Route exact path="/list" component={CustomerList} />
        <Route path="*" component={NotFound} />
      </Switch>
    </div>
  );
}

export default App;
