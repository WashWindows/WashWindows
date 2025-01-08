import React, { useState, useEffect } from 'react';
import '../style/index.css';
import { asyncPut } from '../utils/fetch';
import { user_api } from '../enum/api';
import Header from '../component/ui/Header';
import { handleLogout } from '../utils/logoutHandler';
import RankList from '../component/ui/RankList';
import Scoreboard from '../component/ui/Scoreboard';
import GameArea from '../component/game/GameArea';
import { useAuth } from '../hooks/useAuth';

export const Game: React.FC = () => {
  const { token, user, isLoggedIn, setUser, onLogout } = useAuth();
    
  const [points, setPoints] = useState<number>(0);
  const [pointsBuffer, setPointsBuffer] = useState<number>(0);
  const [clicked, setClicked] = useState<number>(0);
  const [clickedBuffer, setClickedBuffer] = useState<number>(0);
  const [isUpdating, setIsUpdating] = useState<boolean>(false);
  const [updateStatus, setUpdateStatus] = useState<string>("");
  const [isPanelOpen, setIsPanelOpen] = useState(false);
  const [isExiting, setIsExiting] = useState<boolean>(false);

  useEffect(() => {
      if (user) {
          setPoints(user.points);
          setClicked(user.clicked || 0);
          setPointsBuffer(user.points);
          setClickedBuffer(user.clicked || 0);
      }
  }, [user]);
  
  const togglePanel = () => {
      setIsPanelOpen(!isPanelOpen);
  };

  const throttledUpdatePoints = async () => {
      if (points === pointsBuffer && clicked === clickedBuffer) {
          return;
      }
      if (!user?._id || !token) {
          setUpdateStatus("請先登入！");
          return;
      }

      setIsUpdating(true);
      try {
          const response = await asyncPut(user_api.updatePoints, {
              headers: {
                  Authorization: `Bearer ${token}`
              },
              body: {
                  _id: user._id,
                  points: points,
                  clicked: clicked
              }
          });

          if (response.status === 200) {
              setPointsBuffer(points);
              setClickedBuffer(clicked);
              setUpdateStatus("分數已更新！");
              const updatedUser = { ...user, points: points, clicked: clicked };
              localStorage.setItem('user', JSON.stringify(updatedUser));
              setUser(updatedUser);
              
              setTimeout(() => {
                  setIsExiting(true);
                  setTimeout(() => {
                      setUpdateStatus("");
                      setIsExiting(false);
                  }, 300);
              }, 2000);
          }
      } catch (error) {
          console.error('Error updating points:', error);
          setUpdateStatus("更新失敗，請稍後再試");
      } finally {
          setIsUpdating(false);
      }
  };

  useEffect(() => {
      const interval = setInterval(() => {
          if (!isUpdating) {
              throttledUpdatePoints();
          }
      }, 1000);
      return () => clearInterval(interval);
  }, [points, clicked, isUpdating]);

  const handleScoreIncrease = () => {
      setPoints(prev => prev + 1);
      setClicked(prev => prev + 1);
  };

  const handleWrongAttempt = () => {
      setClicked(prev => prev + 1);
  };

  return (
    <div className="index-container">
        <Header isLoggedIn={isLoggedIn} user={user} onLogout={() => handleLogout(onLogout)} />
        <RankList isOpen={isPanelOpen} togglePanel={togglePanel} />
        <GameArea 
            points={points}
            clicked={clicked}
            onScoreIncrease={handleScoreIncrease}
            onWrongAttempt={handleWrongAttempt}
            updateStatus={updateStatus}
            isExiting={isExiting}
        />
        <Scoreboard points={points} clicked={clicked} />
    </div>
  );
};