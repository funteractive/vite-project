import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
// import './App.css'

function App() {
  // Stateの定義
  const [taskName, setTaskName] = useState('')
  const [date, setDate] = useState('')
  const [tasks, setTasks] = useState([])
  const [completedTasks, setCompletedTasks] = useState([])

  // 初回表示で行う処理
  useEffect(() => {
    const today = new Date()
    const dateString = today.toISOString().slice(0, 10) // Format as YYYY-MM-DD
    setDate(dateString)
  }, [])

  // イベントが発火した時に動く処理
  const handleTaskNameChange = (event) => {
    setTaskName(event.target.value)
  }

  const handleDateChange = (event) => {
    setDate(event.target.value)
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    const newTask = {
      name: taskName,
      date: date
    }
    setTasks([...tasks, newTask])
    setTaskName('')
  }

  const handleComplete = (index) => {
    // 未完了のタスクのn番目のデータを取得
    // 完了のタスクの一番下に入れる
    const completedTask = tasks[index]
    setCompletedTasks([...completedTasks, completedTask])
    // 未完了のタスクのn番目のデータを削除
    const newTasks = tasks.filter((_, i) => i !== index)
    setTasks(newTasks)
  }

  // 出力するHTML
  return (
    <div className="App">
      <h1>ToDo App</h1>
      <div>
        <form id="form" onSubmit={handleSubmit}>
          <input type="text" id="inputText" value={taskName} onChange={handleTaskNameChange} placeholder="タスクの名前" />
          <input type="date" id="inputDate" value={date} onChange={handleDateChange} />
          <input type="submit" value="登録" />
        </form>
      </div>
      <div>
        <h2>未完了のタスク</h2>
        {tasks.length > 0 ? (
          <ul>
            {tasks.map((task, index) => (
              <li key={index}>{task.name} 期限：{task.date}<button onClick={() => handleComplete(index)}>完了</button></li>
            ))}
          </ul>
        ) : (
          <p>未完了のタスクはありません</p>
        )}
      </div>
      <div>
        <h2>完了したタスク</h2>
        {completedTasks.length > 0 ? (
          <ul>
            {completedTasks.map((task, index) => (
              <li key={index}>{task.name} 期限：{task.date}</li>
            ))}
          </ul>
        ) : (
          <p>完了したタスクはありません</p>
        )}
      </div>
    </div>
  )
}

export default App
