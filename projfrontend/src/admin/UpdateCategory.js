import React, {useState, useEffect} from 'react'
import Base from '../core/Base';
import { isAuthenticated } from '../auth/helper';
import { Link } from 'react-router-dom';
import { getCategory, updateCategory } from './helper/adminapicall';

const UpdateCategory = ({match}) => {

    const {user, token} = isAuthenticated();

    const [name, setName] = useState("")
    const [error, setError] = useState(false)
    const [success, setSucces] = useState(false)
    
    const preload = (categoryId) => {
        getCategory(categoryId)
        .then(data => {
            // console.log(data)
            if(data.error){
                setName("")
            }else{
                setName(data.name);
            }
        });
    };
    useEffect(() => {
        preload(match.params.categoryId);   
    }, []);

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
            updateCategory(match.params.categoryId, user._id, token, {name})
            .then(data => {
                if(data.error){
                    console.log(data.error)
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
            return <h4 className="text-success">Category updated successfully</h4>
        }
    }

    const warningMessage = () => {
        if(error){
            return <h4 className="text-danger">Failed to update category</h4>
        }
    }


    const myCategoryForm = () => {
        return(
        <form>
            <div className="form-group">
                <p className="lead">Enter the category</p>
                <input 
                    type="text" 
                    onChange={handleChange}
                    value={name}
                    className="form-control my-3" 
                    autoFocus 
                    required 
                    placeholder="" />
                <button onClick={onSubmit} className="btn btn-outline-info">Submit</button>
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
export default UpdateCategory;