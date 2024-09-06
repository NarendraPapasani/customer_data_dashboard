import React from "react";
import { CSSTransition } from "react-transition-group";
import axios from "axios";
import Navbar from "../Navbar";
class CustomerForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      formData: {
        firstName: "",
        lastName: "",
        phoneNumber: "",
        email: "",
        address1: "",
        address2: "",
        zipCode: "",
        country: "",
      },
      errors: {},
      showSuccess: false,
      countries: [],
      trueResponse: false,
    };
  }

  fetchCountryList = async () => {
    try {
      const url = "https://restcountries.com/v3.1/all";
      const resp = await fetch(url);
      if (resp.ok === true) {
        const respdata = await resp.json();
        const countries = respdata.map((country) => ({
          name: country.name.common,
          code: country.cca3,
        }));
        this.setState({ countries });
      } else {
        console.log("Error fetching countries");
      }
    } catch (e) {
      console.log(e);
    }
  };

  componentDidMount() {
    this.fetchCountryList();
  }

  handleChange = (e) => {
    const { name, value } = e.target;
    this.setState((prevState) => ({
      formData: {
        ...prevState.formData,
        [name]: value,
      },
    }));
  };

  validateForm = () => {
    const { formData } = this.state;
    let errors = {};
    const nameRegex = /^[a-zA-Z]+$/;
    const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

    if (!formData.firstName || !nameRegex.test(formData.firstName)) {
      errors.firstName = "First name must contain only alphabetical characters";
    }
    if (!formData.lastName || !nameRegex.test(formData.lastName)) {
      errors.lastName = "Last name must contain only alphabetical characters";
    }
    if (
      !formData.phoneNumber ||
      formData.phoneNumber.length !== 10 ||
      isNaN(formData.phoneNumber)
    ) {
      errors.phoneNumber = "Phone number must be a 10-digit number";
    }
    if (!formData.email || !emailRegex.test(formData.email)) {
      errors.email = "Invalid email address";
    }
    if (!formData.address1) {
      errors.address1 = "Address is required";
    }

    return errors;
  };

  handleSubmit = async (e) => {
    e.preventDefault();
    const errors = this.validateForm();

    if (Object.keys(errors).length === 0) {
      this.setState({ showSuccess: true });
      const resp = await axios.post(
        "http://localhost:8000/customer/create",
        this.state.formData
      );
      if (resp.status === 201) {
        this.setState({ trueResponse: true });
      }
    } else {
      this.setState({ errors });
      console.log("Validation errors:", errors);
    }
  };
  addMoreButt = () => {
    this.setState({
      formData: {
        firstName: "",
        lastName: "",
        phoneNumber: "",
        email: "",
        address1: "",
        address2: "",
        zipCode: "",
        country: "",
      },
      errors: {},
      showSuccess: false,
      countries: [],
      trueResponse: false,
    });
  };
  render() {
    const { formData, errors, showSuccess, countries, trueResponse } =
      this.state;
    return (
      <div className="w-2/4 mr-5">
        <h1 className="font-mono text-2xl mb-3 text-center mt-3">
          Add New Customer Detail Here....
        </h1>
        <div className="flex justify-center items-center h-max mt-8 overflow-y-auto max-h-100">
          <CSSTransition
            in={!showSuccess}
            timeout={300}
            classNames="fade"
            unmountOnExit
          >
            <form
              onSubmit={this.handleSubmit}
              className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 max-w-md w-full"
            >
              <div className="mb-4">
                <label
                  className="block text-gray-700 font-bold mb-2"
                  htmlFor="firstName"
                >
                  First Name
                </label>
                <input
                  className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
                    errors.firstName ? "border-red-500" : ""
                  }`}
                  id="firstName"
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={this.handleChange}
                />
                {errors.firstName && (
                  <p className="text-red-500 text-xs italic">
                    {errors.firstName}
                  </p>
                )}
              </div>
              <div className="mb-4">
                <label
                  className="block text-gray-700 font-bold mb-2"
                  htmlFor="lastName"
                >
                  Last Name
                </label>
                <input
                  className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
                    errors.lastName ? "border-red-500" : ""
                  }`}
                  id="lastName"
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={this.handleChange}
                />
                {errors.lastName && (
                  <p className="text-red-500 text-xs italic">
                    {errors.lastName}
                  </p>
                )}
              </div>
              <div className="mb-4">
                <label
                  className="block text-gray-700 font-bold mb-2"
                  htmlFor="phoneNumber"
                >
                  Phone Number
                </label>
                <input
                  className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
                    errors.phoneNumber ? "border-red-500" : ""
                  }`}
                  id="phoneNumber"
                  type="tel"
                  name="phoneNumber"
                  value={formData.phoneNumber}
                  onChange={this.handleChange}
                  pattern="[0-9]*"
                />
                {errors.phoneNumber && (
                  <p className="text-red-500 text-xs italic">
                    {errors.phoneNumber}
                  </p>
                )}
              </div>

              <div className="mb-4">
                <label
                  className="block text-gray-700 font-bold mb-2"
                  htmlFor="email"
                >
                  Email Address
                </label>
                <input
                  className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
                    errors.email ? "border-red-500" : ""
                  }`}
                  id="email"
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={this.handleChange}
                />
                {errors.email && (
                  <p className="text-red-500 text-xs italic">{errors.email}</p>
                )}
              </div>

              <div className="mb-4">
                <label
                  className="block text-gray-700 font-bold mb-2"
                  htmlFor="address1"
                >
                  Address 1
                </label>
                <input
                  className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
                    errors.address1 ? "border-red-500" : ""
                  }`}
                  id="address1"
                  type="text"
                  name="address1"
                  value={formData.address1}
                  onChange={this.handleChange}
                />
                {errors.address1 && (
                  <p className="text-red-500 text-xs italic">
                    {errors.address1}
                  </p>
                )}
              </div>

              <div className="mb-4">
                <label
                  className="block text-gray-700 font-bold mb-2"
                  htmlFor="address2"
                >
                  Address 2 (Optional)
                </label>
                <input
                  className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline`}
                  id="address2"
                  type="text"
                  name="address2"
                  value={formData.address2}
                  onChange={this.handleChange}
                />
              </div>

              <div className="mb-4">
                <label
                  className="block text-gray-700 font-bold mb-2"
                  htmlFor="country"
                >
                  Country
                </label>
                <select
                  className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
                    errors.country ? "border-red-500" : ""
                  }`}
                  id="country"
                  name="country"
                  value={formData.country}
                  onChange={this.handleChange}
                >
                  <option value="">Select a country</option>
                  {countries.map((country) => (
                    <option key={country.code} value={country.code}>
                      {country.name}
                    </option>
                  ))}
                </select>
                {errors.country && (
                  <p className="text-red-500 text-xs italic">
                    {errors.country}
                  </p>
                )}
              </div>

              <div className="mb-4">
                <label
                  className="block text-gray-700 font-bold mb-2"
                  htmlFor="zipCode"
                >
                  Zip Code
                </label>
                <input
                  className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
                    errors.zipCode ? "border-red-500" : ""
                  }`}
                  id="zipCode"
                  type="text"
                  name="zipCode"
                  value={formData.zipCode}
                  onChange={this.handleChange}
                  pattern="[0-9]*"
                />
                {errors.zipCode && (
                  <p className="text-red-500 text-xs italic">
                    {errors.zipCode}
                  </p>
                )}
              </div>

              <div className="flex items-center justify-between">
                <button
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                  type="submit"
                >
                  Submit
                </button>
              </div>
            </form>
          </CSSTransition>
          {trueResponse && (
            <div className="inset-0 flex items-center justify-center border-solid rounded-md bg-opacity-50 text-green-700">
              <div className="bg-slate-300 rounded-lg p-8">
                <h2 className="text-2xl font-bold mb-4">Success!</h2>
                <p>Details has been saved successfully.</p>
                <button
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                  type="submit"
                  onClick={this.addMoreButt}
                >
                  Add More
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }
}

export default CustomerForm;
