import React from "react";
import CustomerForm from "../CustomerForm";
import CustomerList from "../CustomerList";
import Navbar from "../Navbar";

class Home extends React.Component {
  render() {
    return (
      <div className="h-full">
        <div className="flex">
          <CustomerList />
          <CustomerForm />
        </div>
      </div>
    );
  }
}
export default Home;
