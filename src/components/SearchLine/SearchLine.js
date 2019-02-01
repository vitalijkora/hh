import React from 'react'
import './SearchLine.scss'
import SearchInput from '../UI/SearchInput/SearchInput'
import SearchType from '../UI/SearchType/SearchType'
import Button from '../UI/Button/Button'

export default ()=> (
	<div  className={'SearchLine'}>
		<SearchInput/>
		<SearchType/>
		<Button type="primary" size="big" cursor="pointer">Найти</Button>
	</div>
)