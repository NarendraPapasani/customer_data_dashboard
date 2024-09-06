import React from "react";
import { CSSTransition } from "react-transition-group";
import axios from "axios";
import { Link } from "react-router-dom/cjs/react-router-dom";
class EditForm extends React.Component {
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
      isSubmitted: false,
    };
    this.formRef = React.createRef();
    this.nodeRef = React.createRef();
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
    this.getFormData();
  }

  getFormData = async () => {
    const { id } = this.props.match.params;
    try {
      const res = await axios.get(`http://localhost:8000/customer/${id}`);
      const newFormData = {
        firstName: res.data.first_name,
        lastName: res.data.last_name,
        phoneNumber: res.data.phone_number,
        email: res.data.email,
        address1: res.data.address1,
        address2: res.data.address2,
        zipCode: res.data.zip,
        country: res.data.country,
      };
      this.setState({ formData: newFormData });
    } catch (error) {
      console.log(error);
    }
  };

  handleUpdate = () => {
    this.setState({ isSubmitted: false });
  };

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
    const { id } = this.props.match.params;
    try {
      if (Object.keys(errors).length === 0) {
        this.setState({ showSuccess: true });
        const resp = await axios.put(
          `http://localhost:8000/customer/update/${id}`,
          this.state.formData
        );
        console.log("Data updated successfully");
        this.setState({
          trueResponse: true,
          isSubmitted: true,
          isEditing: false,
        });
      }
    } catch (error) {
      this.setState({ errors });
      console.log("Validation errors:", errors);
    }
  };

  render() {
    const {
      formData,
      errors,
      showSuccess,
      countries,
      trueResponse,
      isSubmitted,
      isEditing,
    } = this.state;
    return (
      <div className="">
        <h1 className="font-mono text-2xl mb-3 text-center">
          Update Customer Detail Here....
        </h1>
        <div className="flex justify-center items-center h-max mt-8 overflow-y-auto max-h-100">
          <CSSTransition
            in={!showSuccess}
            timeout={300}
            classNames="fade"
            nodeRef={this.nodeRef}
          >
            <form
              onSubmit={this.handleSubmit}
              ref={this.formRef}
              className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 max-w-md w-full"
            >
              <div className="mb-4" ref={this.nodeRef}>
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
                  readOnly={isSubmitted}
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
                  readOnly={isSubmitted}
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
                  readOnly={isSubmitted}
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
                  readOnly={isSubmitted}
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
                  readOnly={isSubmitted}
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
                  readOnly={isSubmitted}
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
                  readOnly={isSubmitted}
                >
                  <option value="">Select a country</option>
                  {countries.map((country) => (
                    <option
                      key={country.code}
                      value={country.code}
                      readOnly={isSubmitted}
                    >
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
                  readOnly={isSubmitted}
                />
                {errors.zipCode && (
                  <p className="text-red-500 text-xs italic">
                    {errors.zipCode}
                  </p>
                )}
              </div>
              {trueResponse ? (
                <div className="">
                  <button
                    disabled={true}
                    className="bg-gray-500  text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    type="submit"
                  >
                    Saved
                  </button>
                  {trueResponse && (
                    <p className="text-green-500 text-xl italic">
                      Data updated successfully...
                    </p>
                  )}
                </div>
              ) : (
                <div className="flex items-center justify-between">
                  <button
                    className="bg-blue-500 hover:bg-blue-700  text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    type="submit"
                  >
                    Save
                  </button>
                  <Link
                    to="/"
                    className="inline-block align-baseline font-bold text-sm text-black-500 hover:text-black-800"
                  >
                    Cancel
                  </Link>
                </div>
              )}
            </form>
          </CSSTransition>
        </div>
      </div>
    );
  }
}

export default EditForm;
