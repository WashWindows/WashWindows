import React, { useEffect, useState } from 'react';
import { User } from '../interface/User';
import userPng from "../assets/user.jpg";
import '../style/Profile.css';
import Header from '../component/Header';
import { asyncDelete, asyncPost, asyncPut } from '../utils/fetch';
import { auth_api, user_api } from '../enum/api';
import { useNavigate } from 'react-router-dom';
const ProfilePage: React.FC = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [user, setUser] = useState<User | null>(null);
    const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [isEditingUsername, setIsEditingUsername] = useState(false); // 控制 username 編輯狀態
    const [editedUsername, setEditedUsername] = useState(''); // 儲存編輯中的 username
    const [passwordInput, setPasswordInput] = useState({
        oldPassword: '',
        newPassword: '',
        confirmPassword: '',
    });
    const token = localStorage.getItem('token');
    const savedUser = localStorage.getItem('user');
    const navigate = useNavigate();
    useEffect(() => {
        if (token && savedUser) {
            setIsLoggedIn(true);
            setUser(JSON.parse(savedUser));
        }
    }, [token, savedUser]);

    const handleLogout = async () => {
        try {
            await asyncPost(auth_api.logout, {
                headers: {
                    Authorization: `Bearer ${token}`
                },
            })
        } catch (error) {
            console.log("logout error: ", error);
        }
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        setIsLoggedIn(false);
        setUser(null);
    };

    const handleUsernameEdit = async () => {
        if (!editedUsername.trim()) {
            alert('使用者名稱不可為空白！');
            return;
        }
        if (editedUsername.length < 6 || editedUsername.length > 12) {
            alert("使用者名稱需介於6至12字元");
            return;
        }

        try {
            const response = await asyncPut(user_api.updateUser, {
                headers: { 
                    Authorization: `Bearer ${token}`
                },
                body: {
                    _id: user?._id,
                    username: editedUsername
                },
            });

            if (response.ok) {
                alert('使用者名稱已更新！');
                setUser((prevUser) => (prevUser ? { ...prevUser, username: editedUsername } : null));
                setIsEditingUsername(false); 
                localStorage.setItem(
                    'user',
                    JSON.stringify({ ...user, username: editedUsername })
                );
            } else if (response.status === 304) {
                alert("新名稱與舊名稱相同")
                setEditedUsername("");
            } else {
                alert('使用者名稱更新失敗，請稍後再試');
            }
        } catch (error) {
            console.error('更新使用者名稱時發生錯誤：', error);
            alert('更新失敗，請稍後再試。');
        }
    };

    const validPassword = (): boolean => {
        if (passwordInput.newPassword === passwordInput.oldPassword) {
            alert('新密碼不能與舊密碼相同！');
            return false;
        }
        if (passwordInput.newPassword !== passwordInput.confirmPassword) {
            alert('新密碼與確認密碼不一致！');
            return false;
        }
        return true;
    };

    const handlePasswordSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!validPassword()) {
            alert('新密碼與確認密碼不一致！');
            return;
        }

        try {
            const response = await asyncPost(user_api.updatePassword, {
            headers: {
                Authorization: `Bearer ${token}`
            },
            body: {
                _id: user?._id,
                password: passwordInput.oldPassword,
                new_password: passwordInput.newPassword
            }
            });

            if (response.ok) {
                alert('密碼修改成功！請重新登入');
                setIsPasswordModalOpen(false);
                handleLogout();
                navigate("/Login")
            } else {
                alert('密碼修改失敗，請檢查舊密碼是否正確。');
            }
        } catch (error) {
            console.error('修改密碼時發生錯誤：', error);
            alert('修改密碼失敗，請稍後再試。');
        }
    };
    const handleAletToLogin = () => {
        alert("請先登入");
    }
    const handleDeleteAccount = async () => {
        if (!window.confirm('您確定要刪除帳號嗎？此操作無法恢復。')) {
            return;
        }
    
        if (!passwordInput.oldPassword) {
            alert('請輸入密碼確認刪除帳號。');
            return;
        }
    
        try {
            const response = await asyncDelete(user_api.deleteUser, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
                body: {
                    _id: user?._id,
                    password: passwordInput.oldPassword,
                },
            });
    
            if (response.ok) {
                alert('帳號已刪除，將自動登出。');
                handleLogout();
                navigate('/');
            } else {
                const errorData = await response.json();
                alert(`帳號刪除失敗：${errorData.message || '未知錯誤'}`);
            }
        } catch (error) {
            console.error('刪除帳號時發生錯誤：', error);
            alert('刪除帳號失敗，請稍後再試。');
        }
    };

    return (
        <>
            <Header isLoggedIn={isLoggedIn} user={user} onLogout={handleLogout} />
            <div className="profile-page">
                <div className="profile-container">
                    <div className="image-container">
                        <label htmlFor="image-upload" className="image-label">
                            <img src={userPng} alt="user" className="user" />
                        </label>
                    </div>
                    <div className="user-info">
                        <span className="username">
                            {isEditingUsername ? (
                                <>
                                    <input
                                        type="text"
                                        value={editedUsername}
                                        placeholder={user?.username}
                                        onChange={(e) => setEditedUsername(e.target.value)}
                                    />
                                     <span
                                        className="check-icon"
                                        onClick={() => {
                                            setIsEditingUsername(false);
                                            handleUsernameEdit()
                                        }}
                                    >
                                        ✔
                                    </span>
                                </>
                            ) : (
                                <>
                                    {isLoggedIn ? user?.username : "遊客"}
                                    <span
                                        className="edit-icon"
                                        onClick={() => isLoggedIn ? setIsEditingUsername(true) : handleAletToLogin()}
                                    >
                                        🖊
                                    </span>
                                </>
                            )}
                        </span>
                        <div className="stats">
                            <span>Points: {isLoggedIn ? user?.points : 0}</span>
                        </div>
                    </div>
                    <div className="action-buttons">
                        <button className="button" onClick={() => isLoggedIn ? setIsPasswordModalOpen(true) : handleAletToLogin()}>修改密碼</button>
                        <button className="button" onClick={() => isLoggedIn ? setIsDeleteModalOpen(true) : handleAletToLogin()}>刪除帳號</button>
                    </div>
                </div>
            </div>

            {/* 修改密碼 Modal */}
            {isPasswordModalOpen && (
                <div className="modal">
                    <div className="modal-content">
                        <h3>修改密碼</h3>
                        <form onSubmit={handlePasswordSubmit}>
                            <div className="modal-input-group">
                                <label>舊密碼</label>
                                <input
                                    type="password"
                                    value={passwordInput.oldPassword}
                                    onChange={(e) => setPasswordInput({ ...passwordInput, oldPassword: e.target.value })}
                                    required
                                />
                            </div>
                            <div className="modal-input-group">
                                <label>新密碼</label>
                                <input
                                    type="password"
                                    value={passwordInput.newPassword}
                                    onChange={(e) => setPasswordInput({ ...passwordInput, newPassword: e.target.value })}
                                    required
                                />
                            </div>
                            <div className="modal-input-group">
                                <label>確認密碼</label>
                                <input
                                    type="password"
                                    value={passwordInput.confirmPassword}
                                    onChange={(e) => setPasswordInput({ ...passwordInput, confirmPassword: e.target.value })}
                                    required
                                />
                            </div>
                            <div className="modal-actions">
                                <button type="submit" className="button">確定</button>
                                <button type="button" className="button cancel" onClick={() => setIsPasswordModalOpen(false)}>取消</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* 刪除帳號 Modal */}
            {isDeleteModalOpen && (
                <div className="modal">
                    <div className="modal-content">
                        <h3>確認刪除帳號</h3>
                        <p>您確定要刪除帳號嗎？此操作無法恢復。</p>
                        <div className="modal-input-group">
                            <label>請輸入密碼以確認</label>
                            <input
                                type="password"
                                value={passwordInput.oldPassword}
                                onChange={(e) => setPasswordInput({ ...passwordInput, oldPassword: e.target.value })}
                                placeholder="請輸入密碼"
                            />
                        </div>
                        <div className="modal-actions">
                            <button className="button" onClick={handleDeleteAccount}>刪除</button>
                            <button className="button cancel" onClick={() => setIsDeleteModalOpen(false)}>取消</button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default ProfilePage;
