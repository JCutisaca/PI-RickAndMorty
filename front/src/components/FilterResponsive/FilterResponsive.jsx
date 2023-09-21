import style from './FilterResponsive.module.css'
import { useDispatch } from 'react-redux'
import { useState, useEffect, useDebugValue } from 'react'
import { filterCards, orderCards } from '../Redux/actions'
import { filterCharacters, orderCharacters } from '../Redux/reducer'


const FilterResponsive = () => {

    const dispatch = useDispatch()
    
    const [orderValue, setOrderValue] = useState('A');
    const [filterValue, setFilterValue] = useState('AllCharacters');

    useEffect(() => {
        if (orderCharacters.length) {
            setOrderValue(orderCharacters)
        }
        if (filterCharacters.length) {
            setFilterValue(filterCharacters)
        }
    }, [])

    const handleOrder = (event) => {
        dispatch(orderCards(event.target.value))
        setOrderValue(event.target.value)
    }
    const handleFilter = (event) => {
        dispatch(filterCards(event.target.value))
        setFilterValue(event.target.value)
    }

    return (
        <div className={style.filterContainer}>
            <div className={style.containerSelectors}>
                <h2 className={style.h2}>Filters</h2>
                <label className={style.label}>Order by:</label>
                <select value={orderValue} onChange={handleOrder} className={style.options}>
                    <optgroup label="Name">
                        <option value="A">Ascending</option>
                        <option value="D">Descending</option>
                    </optgroup>
                    <optgroup label='Id'>
                        <option value="AId">Ascending</option>
                        <option value="DId">Descending</option>
                    </optgroup>
                </select>
                <label className={style.label}>Filter by Genre:</label>
                <select value={filterValue} onChange={handleFilter} className={style.options}>
                    <option value="AllCharacters">All Characters</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Genderless">Genderless</option>
                    <option value="unknown">unknown</option>
                </select>
            </div>
        </div>
    )
}

export default FilterResponsive;