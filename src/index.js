import {setFilters} from './filters'
import {renderTodos} from './views'
import {createTodo, loadTodos} from './todos'

// Set up index.html to load the bundle
// Make sure to load uuid via an npm module when necessary

// --

// Add necessary imports

// Render initial todos
renderTodos()

// Set up search text handler
document.querySelector('#search-todo').addEventListener('input', (event) =>
{
    setFilters({
        m_SearchText: event.target.value.toLowerCase()
    })
    renderTodos()
})

// Set up checkbox handler
document.querySelector("#hide-completed").addEventListener('change', (event) =>
{
    setFilters({
        m_HideCompleted: event.target.checked
    })

    renderTodos()
})

// Set up form submission handler
document.querySelector('#add-todo-form').addEventListener('submit', (event) =>
{
    
    event.preventDefault()
    const todoText = event.target.elements.text.value.trim()
    if(todoText.length > 0)
    {
        createTodo(todoText)
        renderTodos()
        event.todos, event.target.elements.newTodoText.value = ''
    }
})

// Bonus: Add a watcher for local storage
window.addEventListener('storage', (event) =>
{
    if(event.key === 'todos') //to make sure the changed key is notes and not another data
    {
        loadTodos()
        renderTodos()
    }
})