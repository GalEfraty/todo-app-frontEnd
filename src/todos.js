import uuidv4 from 'uuid/v4'

// Setup the empty todos array
let todos = []

// loadTodos
// Arguments: none
// Return value: none
const loadTodos = ()=>
{
    const todosJSON = localStorage.getItem('todos')
    try {
        todos = todosJSON ? JSON.parse(todosJSON) : []
    } catch (error) {
        window.alert('there was a problem with the website DATA')
        todos = []
    }
}

// saveTodos
// Arguments: none
// Return value: none
const saveTodos = () =>
{
    localStorage.setItem('todos', JSON.stringify(todos))
}

// getTodos
// Arguments: none
// Return value: todos array
const getTodos = () => todos

// createTodo
// Arguments: todo text
// Return value: none
const createTodo = (i_TodoText) =>
{
    i_TodoText.trim()
    if(i_TodoText.length > 0)
    {
        todos.push(
            {
                m_Id: uuidv4(),
                m_Text: i_TodoText,
                m_IsCompleted: false
            }
        )

        saveTodos(todos)
    }
}

// removeTodo
// Arguments: id of todo to remove
// Return value: none
const removeTodo = (i_TodoIdToRemove) =>
{
    const todoIndex = todos.findIndex((currentTodo) => currentTodo.m_Id === i_TodoIdToRemove)

    if(todoIndex > -1)
    {
        todos.splice(todoIndex, 1)
        saveTodos()
    }
}

// toggleTodo
// Arguments: id of todo to toggle
// Return value: none
const toggleTodo = (i_TodoId) =>
{
    const todo = todos.find((currentTodo) => currentTodo.m_Id === i_TodoId)

    if(todo)
    {
        todo.m_IsCompleted = !todo.m_IsCompleted
        saveTodos()
    }
}

// Make sure to call loadTodos and setup the exports
loadTodos()

export {loadTodos, saveTodos, getTodos, createTodo, removeTodo, toggleTodo}