import './page.css'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { fetchUserRanking } from '../store/reducers/user';
import { Spinner } from 'react-bootstrap';

export default function RankPage() {
  const { loading } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [users, setUsers] = useState([]);

  useEffect(()=>{
    const action = fetchUserRanking();
    dispatch(action).then(data => {
      console.log(data.payload)
      setUsers(data.payload);
    }).catch(err => {
      console.log(err);
    })
  }, [dispatch]);

  return (
    <div className='rankPage'>
      <div className='rankPageTitle'>전체 랭킹</div>
      <div>
        <table>
        <thead>
          <tr>
            <th></th>
            <th>사용자</th>
            <th>전적</th>
            <th>승률</th>
          </tr>
        </thead>
        <tbody>
          {
            users.map((user, index) => (
              <tr key={user._id}>
                <td>{index+1}</td>
                <td className='rankUser'>{user.handle}</td>
                <td>{user.winCount}승 {user.loseCount}패</td>
                <td>{(user.winCount+user.loseCount ? ((user.winCount) /(user.winCount+user.loseCount))*100 : 0).toFixed(2)}%</td>
              </tr>
            ))
          }
        </tbody>
      </table>
      </div>
      {loading == "pending" ?
        <Spinner variant="primary" className="rankingPageSpinner"></Spinner>
      :<></>}
    </div>
  )
}
