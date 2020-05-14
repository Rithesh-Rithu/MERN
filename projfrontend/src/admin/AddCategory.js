import React, {useState} from 'react'
import Base from '../core/Base';
import { isAuthenticated } from '../auth/helper';
import { Link } from 'react-router-dom';
import { createCategory } from './helper/adminapicall';

const AddCategory = () => {

    const [name, setName] = useState("")
    const [error, setError] = useState(false)
    const [success, setSucces] = useState(false)

    const {user, token} = isAuthenticated();

    const goBack = () => {
        return(
            <div className="mt-5">
                <Link className="btn btn-sm btn-info mb-3" to="/admin/dashboard">
                Admin Home
                </Link>
            </div>
        )
    }


    const handleChange = event => {
            setError("");
            setName(event.target.value)
    };
    const onSubmit = (event) => {
            event.preventDefault();
            setError("");
            setSucces(false);

            //BACKEND REQUEST FIRED
            createCategory(user._id, token, {name})
            .then(data => {
                if(data.error){
                    setError(true);
                }else{
                    setError("");
                    setSucces(true);
                    setName("");
                }
            }
            )
    }

    const succesMessage = () => {
        if(success){
            return <h4 className="text-success">Category created successfully</h4>
        }
    }

    const warningMessage = () => {
        if(error){
            return <h4 className="text-danger">Failed to create category</h4>
        }
    }


    const myCategoryForm = () => {
        return(
        <form>
            <div class="form-group">
                <p className="lead">Enter the category</p>
                <input 
                    type="text" 
                    onChange={handleChange}
                    value={name}
                    className="form-control my-3" 
                    autoFocus 
                    required 
                    placeholder="For Ex. Summer" />
                <button onClick={onSubmit} className="btn btn-outline-info">Create Category</button>
            </div>
        </form>
        )};




    return (
        <Base title="Create a category here" description="Add a new category for new t-shirts" className="container bg-info p-4">
            <div className="row bg-white rounded">
                <div className="col-md-8 offset-md-2">
                    {succesMessage()}
                    {warningMessage()}
                    {myCategoryForm()}
                    {goBack()}
                </div>
            </div>
        </Base>
    )
}
export default AddCategory;