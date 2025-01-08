import React, { useState, useEffect } from 'react';
import '../style/Manager.css';
import Header from '../component/Header';
import { User } from '../interface/User';
import { asyncGet, asyncDelete, asyncPut } from '../utils/fetch';
import { admin_api } from '../enum/api';
import { handleLogout } from '../utils/logoutHandler';
import PageContainer from '../component/pageContainer';

const Manager: React.FC = () => {
    const [players, setPlayers] = useState<User[]>([]);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [user, setUser] = useState<User | null>(null);
    const token = localStorage.getItem('token');
    const savedUser = localStorage.getItem('user');

    const [sortIndex, setSortIndex] = useState(0);
    const sortKeys: (keyof User | 'accuracy')[] = ['username', 'points', 'clicked', 'accuracy'];
    const sortKeyLabels: { [key: string]: string } = {
        username: '名稱',
        points: '分數',
        clicked: '點擊數',
        accuracy: '準確率'
    };
    const onLogout = () => {
        setIsLoggedIn(false);
        setUser(null);
    };
    
    useEffect(() => {
        if (token && savedUser) {
            setIsLoggedIn(true);
            setUser(JSON.parse(savedUser));

            const fetchData = async () => {
                try {
                    const response = await asyncGet(admin_api.getAllUser, {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    });
                    setPlayers(response.body);
                } catch (error) {
                    console.error('Error fetching data:', error);
                }
            };
            fetchData();
        }
    }, [token]);

    const handleResetScore = async (id: string) => {
        try {
            const response = await asyncPut(`${admin_api.resetUserPoints}?_id=${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            if (response.ok) {
                alert('玩家分數已成功重置！');
                setPlayers((prevPlayers) =>
                    prevPlayers.map((player) =>
                        player._id === id ? { ...player, points: 0, clicked: 0 } : player
                    )
                );
            } else {
                alert('重置分數失敗，請稍後再試。');
            }
        } catch (error) {
            console.error('Error resetting score:', error);
            alert('重置分數時發生錯誤，請稍後再試。');
        }
    };

    const handleDelete = async (id: string) => {
        if (!window.confirm('您確定要刪除該玩家嗎？此操作無法恢復。')) {
            return;
        }

        try {
            const response = await asyncDelete(`${admin_api.revokeUser}?_id=${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            if (response.ok) {
                alert('玩家已成功刪除！');
                setPlayers((prevPlayers) => prevPlayers.filter((player) => player._id !== id));
            } else {
                alert('刪除玩家失敗，請稍後再試。');
            }
        } catch (error) {
            console.error('Error deleting player:', error);
            alert('刪除玩家時發生錯誤，請稍後再試。');
        }
    };

    const calculateAccuracy = (points: number, clicked: number): number => {
        if (!clicked) return 0;
        return Number(((points / clicked) * 100).toFixed(2));
    };

    const handleSort = () => {
        const nextIndex = (sortIndex + 1) % sortKeys.length;
        const key = sortKeys[nextIndex];
    
        setSortIndex(nextIndex);
    
        setPlayers((prevPlayers) => {
            return [...prevPlayers].sort((a, b) => {
                if (key === 'accuracy') {
                    const aAccuracy = calculateAccuracy(a.points, a.clicked);
                    const bAccuracy = calculateAccuracy(b.points, b.clicked);
                    return bAccuracy - aAccuracy;
                }
    
                if (key === 'username') {
                    return a[key].localeCompare(b[key]);
                }
    
                return (b[key] as number) - (a[key] as number);
            });
        });
    };

    return (
        <>
            <Header isLoggedIn={isLoggedIn} user={user} onLogout={() => handleLogout(onLogout)} />
            <PageContainer variant="dashboard">
                <div className="manager-page">
                    <h1>玩家管理</h1>
                    <button className="toggle-sort-btn" onClick={handleSort}>
                        排序依據：{sortKeyLabels[sortKeys[(sortIndex) % sortKeys.length]]}
                    </button>
                    <div className="player-list">
                        {players.map((player) => (
                            <div key={player._id} className="player-card">
                                <h4>{player.username}</h4>
                                <p>ID: {player._id}</p>
                                <p>{sortKeyLabels.points}: {player.points}</p>
                                <p>{sortKeyLabels.clicked}: {player.clicked}</p>
                                <p>{sortKeyLabels.accuracy}: {calculateAccuracy(player.points, player.clicked)}%</p>
                                <button onClick={() => handleResetScore(player._id)}>重置分數</button>
                                <button className="deleteButton" onClick={() => handleDelete(player._id)}>刪除</button>
                            </div>
                        ))}
                    </div>
                </div>
            </PageContainer>
        </>
    );
};

export default Manager;