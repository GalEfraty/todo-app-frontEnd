import {getTodos, saveTodos, toggleTodo, removeTodo} from './todos'
import {getFilters} from './filters'
// renderTodos
// Arguments: none
// Return value: none
let renderTodos = () =>
{
    const todos = getTodos()
    const filters = getFilters()

    const todoElement = document.querySelector('#todos')

    //create filter list
    const filteredTodos = todos.filter((currentTodo) =>
    {
        const searchTextMatch = currentTodo.m_Text.toLowerCase().includes(filters.m_SearchText.toLowerCase())
        const hideCompletedMach = ((!filters.m_HideCompleted) || (!currentTodo.m_IsCompleted)) //if not hide 

        return hideCompletedMach && searchTextMatch
    })

    const incomletedTodos = todos.filter((currentTodo) => currentTodo.m_IsCompleted === false)

    //clean div
    todoElement.innerHTML = ''

    //print summary
    const summaryParagraph = getSummaryDOM(incomletedTodos)  
    document.querySelector('#todos').appendChild(summaryParagraph)

    //add filtered list to div
    if(filteredTodos.length > 0)
    {
        filteredTodos.forEach((currentTodo) =>
        {
            const newTodoElement = generatedTodoDOM(currentTodo) 
            todoElement.appendChild(newTodoElement)
        })
    }
    else
    {
        const emptyMessage = document.createElement('p')
        emptyMessage.textContent = 'No Todos to show'
        emptyMessage.classList.add('empty-message')
        todoElement.appendChild(emptyMessage)
    }

}

// generateTodoDOM
// Arguments: todo
// Return value: the todo element
const generatedTodoDOM = (i_Todo) =>
{
    const todoElement = document.createElement('label')
    const containerElement = document.createElement('div')

    //checbox
    const CheckboxElement = document.createElement('input')
    CheckboxElement.setAttribute('type', 'checkbox') 
    CheckboxElement.checked = i_Todo.m_IsCompleted
    containerElement.appendChild(CheckboxElement)
    CheckboxElement.addEventListener('change', (event) =>
    {
        console.log(event.target.checked)
        toggleTodo(i_Todo.m_Id)
        saveTodos()
        renderTodos()
    })

    //text - span
    const todoTextElement = document.createElement('span')
    todoTextElement.textContent = i_Todo.m_Text
    containerElement.appendChild(todoTextElement)

    //setup container
    todoElement.classList.add('list-item')
    containerElement.classList.add('list-item__container')
    todoElement.appendChild(containerElement)
    //remove Button
    const removeTodoButton = document.createElement('button')
    removeTodoButton.textContent = 'remove'
    removeTodoButton.classList.add('button', 'button--text')
    todoElement.appendChild(removeTodoButton)
    removeTodoButton.addEventListener('click', () =>
    {
        removeTodo(i_Todo.m_Id)
        renderTodos()
        saveTodos()
    })

    return todoElement
}

// generateSummaryDOM
// Arguments: incompletedTodos
// Return value: the summary element
const getSummaryDOM = (i_IncomletedTodos) =>
{
    const summaryParagraph = document.createElement('h2')
    const plural = i_IncomletedTodos.length === 1 ? '' : 's'

    summaryParagraph.classList.add('list-title')
    summaryParagraph.textContent = `you have ${i_IncomletedTodos.length} Incompleted todo${plural} left`
    return summaryParagraph
}

// Make sure to set up the exports

export {renderTodos, generatedTodoDOM, getSummaryDOM}