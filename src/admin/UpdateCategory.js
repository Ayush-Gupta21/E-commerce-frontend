import React, { useState, useEffect } from "react"
import Base from "../core/Base"
import { isAuthenticated } from "../auth/helper"
import { Link } from "react-router-dom"
import { updateCategory, getCategory } from "./helper/adminapicall"

const UpdateCategory = ({match}) => {

    const [values, setValues] = useState({
        name: "",
        error: "",
        success: ""
    })
    
    const {name, error, success} = values
    const {user, token} = isAuthenticated()

    const goBack = () => (
        <div className="mt-5">
            <Link className="btn btn-sm btn-success mb-3" to="/admin/dashboard">Admin Home</Link>
        </div>
    )

    const preload = (categoryId) => {
        getCategory(categoryId).then(data => {
            if(data.err){
                console.log(data.err)
            } else{
                setValues({
                    ...values,
                    name: data.name
                })
            }
        })
    }

    useEffect(() => {
        preload(match.params.categoryId);
    }, [])

    const handleChange = name => event => {
        setValues({...values, error:false, [name]: event.target.value})
    }

    const onSubmit = (event) => {
        console.log(name)
        event.preventDefault();
        setValues({...values, error: false, success: false})

        //backend request fired
        updateCategory(match.params.categoryId, user._id, token, {name} )
        .then(data => {
            
            if(data.error){
                console.log(data.error)
                setValues({...values, error: data.error})
            } else{
                setValues({
                    ...values, 
                    error: false,
                    success: true,
                    name: ""
                })
            }
        })
    }

 



    const successMessage = () => {
        if(success){
            return <h4 className="text-success">Category Updated successfully</h4>
        }
    }

    const warningMessage = () => {
        if(error){
            return <h4 className="text-danger">Failed to Update category</h4>
        }
    }

    const myCategoryForm = () => (
        <form>
            <div className="form-group">
                <p className="lead">Update the category</p>
                <input type="text" 
                className="form-control my-3"
                name="name"
                onChange={handleChange("name")}
                value={name}
                autoFocus
                required
                />
                <p className="text-center">{JSON.stringify(values)}</p>
                <button type="submit" onClick={onSubmit} className="btn btn-outline-info">Update Category</button>
            </div>
        </form>
    )

    return(
        <Base 
        title="Crete a category here" 
        description="Add a new category for new tshirts"
        className="container bg-info p-4"
        >
            <div className="row bg-white rounded">
                <div className="col-md-8 offset-md-2">
                    {successMessage()}
                    {warningMessage()}
                    {myCategoryForm()}
                    {goBack()}
                </div>
            </div>
        </Base>
    )
}

export default UpdateCategory;