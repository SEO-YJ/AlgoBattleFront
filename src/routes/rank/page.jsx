import './page.css'
import React from 'react'

export default function RankPage() {
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
          <tr>
            <td>1</td>
            <td className='rankUser'>홍길동</td>
            <td>2승 1무</td>
            <td>66.6%</td>
          </tr>
          <tr>
            <td>2</td>
            <td className='rankUser'>홍길동</td>
            <td>1승 1무</td>
            <td>50%</td>
          </tr>
        </tbody>
      </table>
      </div>
    </div>
  )
}
