import axios from "axios";
import React from "react";
import { Component } from "react";
import { withRouter } from "react-router-dom/cjs/react-router-dom.min";
import ListItem from "../ListItem";
import Navbar from "../Navbar";

class CustomerList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      customers: [],
      searchTerm: "",
      originalCustomers: [],
    };
  }

  editButton = (id) => {
    const { history } = this.props;
    history.push(`/update/${id}`);
  };

  deleteButton = async (id) => {
    try {
      await axios.delete(`http://localhost:8000/customer/delete/${id}`);
      this.getAllCustomerDetails();
    } catch (e) {
      console.log(e);
    }
  };

  handleInputChange = (e) => {
    this.setState({ searchTerm: e.target.value });
  };

  handleSearch = () => {
    const { searchTerm, originalCustomers } = this.state;
    const filteredCustomers = originalCustomers.filter((customer) =>
      customer.firstName.toLowerCase().includes(searchTerm.toLowerCase())
    );
    this.setState({ customers: filteredCustomers });
  };

  resetSearch = () => {
    const { originalCustomers } = this.state;
    this.setState({ searchTerm: "", customers: originalCustomers });
  };

  componentDidMount() {
    this.getAllCustomerDetails();
  }

  getAllCustomerDetails = async () => {
    try {
      const resp = await axios.get("http://localhost:8000/customer/all");
      const newData = resp.data.map((each) => ({
        id: each.id,
        address1: each.address1,
        address2: each.address2,
        firstName: each.first_name,
        lastName: each.last_name,
        phoneNumber: each.phone_number,
        email: each.email,
        country: each.country,
        zip: each.zip,
      }));
      this.setState({ customers: newData, originalCustomers: newData });
    } catch (e) {
      console.log(e);
    }
  };

  render() {
    const { customers, searchTerm } = this.state;
    console.log(customers);
    return (
      <div className="m-5 w-screen">
        <div className="border-solid rounded-md border-gray-700 p-4 border-2">
          <div className="flex justify-between">
            <h1>Customer List</h1>
            <div className="flex items-center justify-center">
              <div className="relative">
                <input
                  type="text"
                  className="px-4 py-2 pr-10 rounded-full bg-gray-200 text-gray-700 focus:outline-none focus:bg-white focus:shadow-md transition-colors duration-300 ease-in-out"
                  placeholder="Search..."
                  value={searchTerm}
                  onChange={this.handleInputChange}
                />
                <button
                  className="absolute right-0 top-0 mt-2 mr-4 text-gray-500 hover:text-gray-700 focus:outline-none"
                  onClick={this.handleSearch}
                >
                  <svg
                    className="h-5 w-5"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                  </svg>
                </button>
              </div>
              <button
                className="ml-4 bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded inline-flex items-center"
                onClick={this.resetSearch}
              >
                <svg
                  className="fill-current w-4 h-4 mr-2"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                >
                  <path d="M10 3v2a5 5 0 0 0-3.54 8.54l-1.41 1.41A7 7 0 0 1 10 3zm4.95 2.05A7 7 0 0 1 10 17v-2a5 5 0 0 0 3.54-8.54l1.41-1.41zM10 20l-4-4 4-4v8zm0-12V0l4 4-4 4z" />
                </svg>
                Reset
              </button>
            </div>
          </div>

          <ul className="overflow-y-auto max-h-96">
            {customers.map((each) => (
              <ListItem
                each={each}
                editButton={this.editButton}
                deleteButton={this.deleteButton}
                key={each.id}
              />
            ))}
          </ul>
        </div>
      </div>
    );
  }
}

export default withRouter(CustomerList);
