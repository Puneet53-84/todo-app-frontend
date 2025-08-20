import { useState } from "react";
import { callCreateAPI, callGetAllAPI } from "./BackendAPI";

function AddToDoPage(props) {
    let todo = props.todo;
    let setTodo = props.setTodo;

    let [formData, setFormData] = useState({
        todoTitle: "",
        dueDate: "",
        status: "pending"
    })

    function handleChange(e) {
        let inputName = e.target.name;
        let inputValue = e.target.value;

        setFormData(prev => ({
            ...prev,
            [inputName]: inputValue // 🛠 fixed this: removed square brackets
        }))
    }

    async function handleSubmit(e) {
        // preventDefault function prevent website from reload because,reloaded our state go into default 
        e.preventDefault();
        // stringify is function json file which take parameter as object/json and return string of it 
        alert("form submitted, data" + JSON.stringify(formData));

        let newTodo ={
            ...formData,
            todoId: Date.now().toString(),
                
            }
            await callCreateAPI('/create-todo',newTodo)

            // get our todo again
            const todoList = await callGetAllAPI('/read-todos');
            setTodo(todoList);
    }

    return (
        <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-blue-100 to-indigo-200 p-4">
            <div className="bg-white p-6 rounded-xl shadow-lg max-w-md w-full border border-gray-200">
                <form onSubmit={(e) => handleSubmit(e)}>
                    <div className="space-y-4">

                        <div>
                            <label className="block text-gray-700 font-semibold mb-1">📝 Todo Title</label>
                            <input
                                type="text"
                                placeholder="Enter todo title"
                                className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                name="todoTitle"
                                value={formData.todoTitle}
                                onChange={(e) => handleChange(e)}
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-gray-700 font-semibold mb-1">📅 Due Date</label>
                            <input
                                type="date"
                                className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                name="dueDate"
                                value={formData.dueDate}
                                onChange={(e) => handleChange(e)}
                                required
                            />
                        </div>
                    </div>
                    <br />

                    <div className="flex justify-center">
                        <button
                            type="submit"
                            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition duration-200"
                        >
                            Submit
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default AddToDoPage;