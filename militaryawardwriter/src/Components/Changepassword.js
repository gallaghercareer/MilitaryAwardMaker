import React, {useState,useEffect,useContext} from 'react'
import {AccountContext} from './Account'

const Changepassowrd = () => {
    const [password, setPassword] = useState('')
    const [newpassword, setNewpassword] = useState('')

    const {getSession} = useContext(AccountContext);
    
    const onSubmit = (e) => {
        e.preventDefault();
        getSession().then(({user}) => {
        user.changePassword(password, newpassword, (err, result) => {
            if (err) {
                console.log(err);
            }
            console.log(result);
        
        })    
    })};


    return (
        <div>
            <form>
                <input
                    type="text"
                    placeholder="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <input
                    type="text"
                    placeholder="new password"
                    value={newpassword}
                    onChange={(e) => setNewpassword(e.target.value)}
                />
                <button type="submit" onClick={onSubmit}>Change Password</button>
            </form>
        </div>
    )
}

export default Changepassowrd;