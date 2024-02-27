import { Button, FormSelect } from 'react-bootstrap'
import './Search.css'
import React, { useEffect, useState } from 'react'
import { algorithmList } from '~/routes/modal/room/create/algorithmList'

export default function Search({changeSearchCondition}) {
  const [condition, setCondition] = useState({
    status : "",
    algorithm : ""
  })

  useEffect(()=>{
    changeSearchCondition(condition);
  }, [condition])

  return (
    <div className='search'>
      <div className='searchStatus'>
        <FormSelect
          onChange={(e) => setCondition({...condition, status:e.target.value})}
        >
          <option value={""}>상태</option>
          <option value={"대기중"}>대기중</option>
          <option value={"준비중"}>준비중</option>
          <option value={"게임중"}>게임중</option>
        </FormSelect>
      </div>
      <div className='searchAlgorithm'>
        <FormSelect
          onChange={(e) => setCondition({...condition, algorithm:e.target.value})}
        >
          <option value={""}>알고리즘 선택</option>
          {algorithmList.map((level, index) => (
            <option value={level.name} key={index}>
              {level.name}
            </option>
          ))}
        </FormSelect>
      </div>
      <div className='searchButton'>검색</div>
    </div>
  )
}