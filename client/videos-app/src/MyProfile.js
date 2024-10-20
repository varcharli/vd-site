import React, { useState } from 'react';
import './MyProfile.css';
import { useGlobal } from './GlobalContext';
import { logout } from './client/auth';
import models from './client/models';

const MyProfile = () => {
    const { user } = useGlobal();
    const [password, setPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [pwdInfo, setPwdInfo] = useState('');
    const [pwdVariant, setPwdVariant] = useState('');

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };

    const handleNewPasswordChange = (e) => {
        setNewPassword(e.target.value);
    };

    const handleConfirmPasswordChange = (e) => {
        setConfirmPassword(e.target.value);
    };

    const showSuccess = (info) => {
        setPwdVariant('success');
        setPwdInfo(info);
    };
    const showError = (info) => {
        setPwdVariant('danger');
        setPwdInfo(info);
    };



    const handleSubmit =async (e) => {
        // e.preventDefault();
        if (newPassword === confirmPassword) {
            const response=await models.user.changePassword({ oldPassword: password, newPassword });
            if(response.status===200){
                showSuccess('密码已更改');
                setPassword('');
                setNewPassword('');
                setConfirmPassword('');
            }
            else{
                showError('以前的密码无效');
            }
        } else {
            showError('新密码和确认密码不一致');
        }
    };

    const handleLogout = () => {
        logout();
    };

    return (
        <div className="container mt-5">
            <h1 className="mb-4">My Profile</h1>
            <div className="card p-4 mb-4">
                <p><strong>Name:</strong> {user.name}</p>
                {/* <p><strong>Email:</strong> {user.email}</p> */}
            </div>

            <h2 className="mb-4">Change Password</h2>
            <form onSubmit={handleSubmit} className="card p-4 mb-4">
                <div className="mb-3">
                    <label className="form-label">
                        Old Password:
                        <input type="password" className="form-control" 
                        autoComplete='current-password'
                        value={password} onChange={handlePasswordChange} />
                    </label>
                </div>
                <div className="mb-3">
                    <label className="form-label">
                        New Password:
                        <input type="password" className="form-control" 
                        autoComplete='new-password'
                        value={newPassword} onChange={handleNewPasswordChange} />
                    </label>
                </div>
                <div className="mb-3">
                    <label className="form-label">
                        Confirm Password:
                        <input type="password" className="form-control" 
                        autoComplete='new-password'
                        value={confirmPassword} onChange={handleConfirmPasswordChange} />
                    </label>
                </div>
                
                <button type="button" className="btn btn-primary"
                onClick={handleSubmit}
                >Change Password</button>
                {pwdInfo && <div className={`mt-3 alert alert-${pwdVariant}`}>{pwdInfo}</div>}
            </form>
            <h2 className="mb-4">Logout</h2>
            <button onClick={handleLogout} className="btn btn-danger">Logout</button>

            
        </div>
    );
};

export default MyProfile;