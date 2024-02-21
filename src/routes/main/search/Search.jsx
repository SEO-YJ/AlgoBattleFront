import './Search.css'
import React, { useState } from 'react'

function Search() {
  const changeInput = (inputText) => {
    //TODO 검색어가 변함에 따라서 방 리스트가 달라지게 설정
    //main > page.jsx에서 roomList을 변경시키는 함수를 받아오게 해야할 것 같음
  }

  return (
    <div className='search'>
      <input
        placeholder='원하는 방 이름을 입력해주세요'
        onChange={(e)=>changeInput(e.target.value)}
      />
      <img
        src='/src/assets/svgs/input_search.svg'
      />
    </div>
  )
}

export default Search