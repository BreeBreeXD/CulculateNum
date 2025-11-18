import { useState, useEffect } from 'react'
import './App.css'

function App() {
  const [allNumbers, setAllNumbers] = useState('')
  const [processedNumbers, setProcessedNumbers] = useState('')
  const [filteredNumbers, setFilteredNumbers] = useState([])
  const [copySuccess, setCopySuccess] = useState(false)

  const parseNumbers = (text) => {
    if (!text.trim()) return []
    const numbers = text
      .split('\n')
      .map(line => line.trim())
      .filter(line => line.length > 0)
    return [...new Set(numbers)]
  }

  useEffect(() => {
    const allNumbersSet = new Set(parseNumbers(allNumbers))
    const processedNumbersSet = new Set(parseNumbers(processedNumbers))
    
    const filtered = Array.from(allNumbersSet).filter(
      number => !processedNumbersSet.has(number)
    )
    
    setFilteredNumbers(filtered)
  }, [allNumbers, processedNumbers])

  const handleFileUpload = (event, setterFunction) => {
    const file = event.target.files[0]
    if (file && file.type === 'text/plain') {
      const reader = new FileReader()
      reader.onload = (e) => {
        setterFunction(e.target.result)
      }
      reader.readAsText(file)
    }
  }

  const handleCopy = async () => {
    const text = filteredNumbers.join('\n')
    try {
      await navigator.clipboard.writeText(text)
      setCopySuccess(true)
      setTimeout(() => setCopySuccess(false), 2000)
    } catch (err) {
      console.error('Ошибка копирования:', err)
    }
  }

  const handleDownload = () => {
    const text = filteredNumbers.join('\n')
    const blob = new Blob([text], { type: 'text/plain' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'filtered_numbers.txt'
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  return (
    <div className="app">
      <header className="header">
        <h1>📱 Фильтр Мобильных Номеров</h1>
        <p>Найдите номера, которые еще не были в работе</p>
      </header>

      <div className="container">
        <div className="input-section">
          <div className="input-card">
            <h2>Все номера</h2>
            <div className="file-input-wrapper">
              <label htmlFor="file-all" className="file-label">
                📁 Загрузить .txt файл
              </label>
              <input
                id="file-all"
                type="file"
                accept=".txt"
                onChange={(e) => handleFileUpload(e, setAllNumbers)}
                className="file-input"
              />
            </div>
            <textarea
              value={allNumbers}
              onChange={(e) => setAllNumbers(e.target.value)}
              placeholder="Вставьте номера сюда (каждый с новой строки)&#10;или загрузите файл .txt"
              className="textarea"
            />
            <div className="counter">Уникальных номеров: {parseNumbers(allNumbers).length}</div>
          </div>

          <div className="input-card">
            <h2>Успешные номера</h2>
            <div className="file-input-wrapper">
              <label htmlFor="file-processed" className="file-label">
                📁 Загрузить .txt файл
              </label>
              <input
                id="file-processed"
                type="file"
                accept=".txt"
                onChange={(e) => handleFileUpload(e, setProcessedNumbers)}
                className="file-input"
              />
            </div>
            <textarea
              value={processedNumbers}
              onChange={(e) => setProcessedNumbers(e.target.value)}
              placeholder="Вставьте успешные номера&#10;(каждый с новой строки) или загрузите файл .txt"
              className="textarea"
            />
            <div className="counter">Уникальных номеров: {parseNumbers(processedNumbers).length}</div>
          </div>
        </div>

        <div className="result-section">
          <div className="result-card">
            <div className="result-header">
              <h2>✨ Результат</h2>
              <div className="result-counter">
                Новых номеров: <strong>{filteredNumbers.length}</strong>
              </div>
            </div>
            
            <textarea
              value={filteredNumbers.join('\n')}
              readOnly
              placeholder="Здесь появятся номера, которые еще не были успешными"
              className="textarea result-textarea"
            />
            
            <div className="button-group">
              <button 
                onClick={handleCopy} 
                className={`btn btn-primary ${copySuccess ? 'btn-success' : ''}`}
                disabled={filteredNumbers.length === 0}
              >
                {copySuccess ? '✓ Скопировано!' : '📋 Копировать'}
              </button>
              <button 
                onClick={handleDownload} 
                className="btn btn-secondary"
                disabled={filteredNumbers.length === 0}
              >
                💾 Скачать .txt
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
