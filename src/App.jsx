import { useState, useEffect, useMemo } from 'react'
import './App.css'
import CardList from './components/CardList'
import SearchBox from './components/SearchBox'

function App() {
  const [monsters, setMonsters] = useState([])
  const [searchField, setSearchField] = useState('')

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/users')
      .then((response) => response.json())
      .then((users) => setMonsters(users))
  }, [])

  const filteredMonsters = useMemo(() => {
    return monsters.filter((monster) => {
      return monster.name.toLocaleLowerCase().includes(searchField)
    })
  }, [monsters, searchField])

  const onSearchChange = (event) => {
    const searchFieldString = event.target.value.toLocaleLowerCase()
    setSearchField(searchFieldString)
  }

  return (
    <div className="App">
      <h1 className="app-title">Monsters Rolodex</h1>
      <SearchBox
        className="monsters-search-box"
        onChangeHandler={onSearchChange}
        placeholder="search monsters"
      />
      <CardList monsters={filteredMonsters} />
    </div>
  )
}

export default App
