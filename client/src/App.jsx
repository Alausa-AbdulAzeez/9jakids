import { useState, useRef } from "react";
import "./app.css";
import FormInput from "./components/FormInput";
import axios from "axios";

const App = () => {
  const successRef = useRef();

  const [values, setValues] = useState({
    firstName: "",
    lastName: "",
    age: "",
    gender: "",
    state: "",
    parentEmail: "",
    church: " ABC CHURCH",
  });

  const [msg, setMsg] = useState("");

  const inputs = [
    {
      id: 1,
      name: "firstName",
      type: "text",
      placeholder: "FirstName",
      errorMessage: "Please input the required detail",
      label: "FirstName",
      required: true,
    },
    {
      id: 2,
      name: "lastName",
      type: "text",
      placeholder: "LastName",
      errorMessage: "Please input the required detail",
      label: "LastName",
      required: true,
    },
    {
      id: 3,
      name: "age",
      type: "text",
      placeholder: "Age",
      label: "Age",
      errorMessage: "Age should be between ages 5 - 15",
      pattern: "^(0?[5-9]|[1-1][0-5])$",
      required: true,
    },
    {
      id: 4,
      name: "gender",
      type: "text",
      placeholder: "Male or Female",
      errorMessage: "Allowed inputs F, M, female, male, Female, Male",
      pattern: "^(?:m|M|male|Male|f|F|female|Female)$",
      label: "Gender",
      required: true,
    },
    {
      id: 5,
      name: "state",
      type: "text",
      placeholder: "State",
      errorMessage: "Please input the required detail",
      label: "State",
      required: true,
    },

    {
      id: 6,
      name: "parentEmail",
      type: "email",
      placeholder: "Parents' Email",
      errorMessage: "It should be a valid email address!",
      label: "Parents' Email",
      required: true,
    },
  ];

  const showMsg = (msg) => {
    msg === "aa" && successRef.current.classList.add("closeSuccessMsg");
    msg === "ab" && successRef.current.classList.add("successMsgWrapperRed");
  };
  const removeMsg = (msg) => {
    if (msg === "aa") {
      setTimeout(() => {
        successRef.current.classList.remove("closeSuccessMsg");
      }, 2000).then(
        setTimeout(() => {
          window.location.reload();
        }, 2000)
      );
    }
    if (msg === "ab") {
      setTimeout(() => {
        successRef.current.classList.remove("successMsgWrapperRed");
      }, 2000);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await axios
      .post("/", {
        firstName: values.firstName,
        lastName: values.lastName,
        age: values.age,
        gender: values.gender,
        state: values.state,
        parentEmail: values.parentEmail,
        church: " ABC CHURCH",
      })
      .then(
        (res) => {
          console.log(res.status);
          if (res.status === 200) {
            setMsg("aa");
            showMsg(msg);
            removeMsg(msg);
          }
        },
        (err) => {
          console.log("ab");
          setMsg("ab");
          showMsg(msg);
          removeMsg(msg);
        }
      );
  };

  const onChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  return (
    <>
      <div className="successMsgWrapper " ref={successRef}>
        {msg === "aa" && "Successfully registered"}
        {msg === "ab" && "User exists!"}
      </div>
      <div className="app">
        <form onSubmit={handleSubmit}>
          <h1>Register</h1>
          {inputs.map((input) => (
            <FormInput
              key={input.id}
              {...input}
              value={values[input.name]}
              onChange={onChange}
            />
          ))}
          <button>Submit</button>
        </form>
      </div>
    </>
  );
};

export default App;
