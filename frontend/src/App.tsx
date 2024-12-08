import React, {useState} from "react";
import ItemsList from "./components/ItemsList";
import ItemForm from "./components/ItemForm";

const App: React.FC = () => {
    const [showForm, setShowForm] = useState(false);

    const toggleForm = () => setShowForm(!showForm);

    return (
        <div>
            <button onClick={toggleForm}>{showForm ? "Close Form" : "Add Item"}</button>
            {showForm && <ItemForm onClose={toggleForm}/>}
            <ItemsList/>
        </div>
    );
};

export default App;
